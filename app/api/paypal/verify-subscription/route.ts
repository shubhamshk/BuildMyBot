import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { updateSubscriptionServer } from "@/lib/subscriptions/server";
import type { PlanType } from "@/lib/subscriptions/service";

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_BASE_URL = process.env.PAYPAL_MODE === "live"
  ? "https://api-m.paypal.com"
  : "https://api-m.sandbox.paypal.com";

/**
 * Get PayPal access token
 */
async function getPayPalAccessToken(): Promise<string> {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error("PayPal credentials not configured");
  }

  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");

  const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    throw new Error("Failed to get PayPal access token");
  }

  const data = await response.json();
  return data.access_token;
}

/**
 * Verify subscription directly with PayPal and update database
 * This endpoint is called after PayPal redirect to ensure subscription is activated
 * (especially useful when webhooks aren't available in development)
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient(); // Authenticated client for user check
    const adminSupabase = createAdminClient(); // Admin client for table updates

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const accessToken = await getPayPalAccessToken();

    // 1. Check User Pack Subscriptions (Pending)
    const { data: pendingPackSubs } = await adminSupabase
      .from("user_pack_subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "PENDING");

    if (pendingPackSubs && pendingPackSubs.length > 0) {
      for (const packSub of pendingPackSubs) {
        if (!packSub.paypal_subscription_id) continue;

        try {
          const paypalResponse = await fetch(
            `${PAYPAL_BASE_URL}/v1/billing/subscriptions/${packSub.paypal_subscription_id}`,
            {
              headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (paypalResponse.ok) {
            const paypalData = await paypalResponse.json();
            if (paypalData.status === "ACTIVE" || paypalData.status === "APPROVED") {
              // Activate Pack Subscription
              await adminSupabase
                .from("user_pack_subscriptions")
                .update({
                  status: "ACTIVE",
                  updated_at: new Date().toISOString()
                })
                .eq("id", packSub.id);

              console.log(`[Verify] Activated pack subscription ${packSub.id} for user ${user.id}`);

              return NextResponse.json({
                success: true,
                plan_type: packSub.pack_id,
                status: "ACTIVE",
                message: "Pack subscription activated!",
              });
            }
          }
        } catch (err) {
          console.error(`[Verify] Error checking pack sub ${packSub.id}:`, err);
        }
      }
    }

    // 2. Check Regular Subscription (Legacy/Plan Logic)
    // Get user's subscription from database
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (!subscription || !subscription.paypal_subscription_id) {
      // If we found no pack subs and no regular subs, return 404 or just success:false
      return NextResponse.json({
        success: false,
        message: "No pending subscriptions found to verify",
      });
    }

    // Verify regular subscription with PayPal
    const paypalResponse = await fetch(
      `${PAYPAL_BASE_URL}/v1/billing/subscriptions/${subscription.paypal_subscription_id}`,
      {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!paypalResponse.ok) {
      return NextResponse.json(
        { error: "Failed to verify subscription with PayPal" },
        { status: 500 }
      );
    }

    const paypalSubscription = await paypalResponse.json();

    console.log("[Verify] PayPal subscription status:", paypalSubscription.status);

    // Check if subscription is active
    if (paypalSubscription.status === "ACTIVE" || paypalSubscription.status === "APPROVED") {
      // Determine plan type from billing cycle
      let planType: PlanType = "PRO_MONTHLY";

      if (paypalSubscription.plan_id) {
        try {
          const planResponse = await fetch(
            `${PAYPAL_BASE_URL}/v1/billing/plans/${paypalSubscription.plan_id}`,
            {
              headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (planResponse.ok) {
            const planData = await planResponse.json();
            const billingCycle = planData.billing_cycles?.[0]?.frequency;

            if (planData.name === "Ultimate Creator" || planData.name === "Ultimate Creator Access") {
              planType = "ULTIMATE_CREATOR";
            } else if (billingCycle?.interval_unit === "YEAR") {
              planType = "PRO_YEARLY";
            }
          }
        } catch (error) {
          console.error("Error fetching plan details:", error);
        }
      }

      // Calculate expiration date
      const expiresAt = new Date();
      if (planType === "PRO_MONTHLY") {
        expiresAt.setMonth(expiresAt.getMonth() + 1);
      } else {
        expiresAt.setFullYear(expiresAt.getFullYear() + 1);
      }

      // Update subscription in database
      await updateSubscriptionServer(user.id, {
        plan_type: planType,
        subscription_status: "ACTIVE",
        expires_at: expiresAt.toISOString(),
      });

      // Reset usage count for new Pro user
      await adminSupabase
        .from("usage_tracking")
        .upsert({
          user_id: user.id,
          daily_creation_count: 0,
          last_reset_at: new Date().toISOString(),
        }, {
          onConflict: "user_id"
        });

      console.log(`[Verify] User ${user.id} upgraded to ${planType}, usage reset to 0`);

      return NextResponse.json({
        success: true,
        plan_type: planType,
        status: "ACTIVE",
        message: "Subscription verified and activated!",
        limit: planType === "ULTIMATE_CREATOR" ? 100 : (planType === "PRO_YEARLY" ? 15 : 10),
      });
    }

    // Subscription not active yet
    return NextResponse.json({
      success: false,
      plan_type: subscription.plan_type,
      status: paypalSubscription.status,
      message: `Subscription status: ${paypalSubscription.status}`,
    });

  } catch (error: any) {
    console.error("Verify subscription error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to verify subscription" },
      { status: 500 }
    );
  }
}
