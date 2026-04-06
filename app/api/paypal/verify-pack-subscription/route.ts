import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_BASE_URL =
  process.env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

async function getAccessToken(): Promise<string> {
  const auth = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`
  ).toString("base64");
  const res = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) throw new Error("Failed to get PayPal access token");
  const data = await res.json();
  return data.access_token;
}

/**
 * Called after PayPal redirects back with ?subscription_id=I-XXXXX
 * Verifies the subscription is ACTIVE and updates the pack_subscriptions table.
 */
export async function POST(request: NextRequest) {
  try {
    const { subscriptionId } = await request.json();

    if (!subscriptionId) {
      return NextResponse.json(
        { error: "subscriptionId is required" },
        { status: 400 }
      );
    }

    // Auth check
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify with PayPal
    const accessToken = await getAccessToken();
    const paypalRes = await fetch(
      `${PAYPAL_BASE_URL}/v1/billing/subscriptions/${subscriptionId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!paypalRes.ok) {
      const err = await paypalRes.json();
      return NextResponse.json(
        { error: "Failed to verify subscription with PayPal", details: err },
        { status: 500 }
      );
    }

    const paypalData = await paypalRes.json();
    console.log(
      `[verify-pack-subscription] PayPal status for ${subscriptionId}:`,
      paypalData.status
    );

    const admin = createAdminClient();

    // Determine next billing date
    const nextBillingDate =
      paypalData.billing_info?.next_billing_time ||
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    if (paypalData.status === "ACTIVE" || paypalData.status === "APPROVED") {
      // Update record in pack_subscriptions
      const { error: updateErr } = await admin
        .from("pack_subscriptions")
        .update({
          status: "ACTIVE",
          next_billing_date: nextBillingDate,
          updated_at: new Date().toISOString(),
        })
        .eq("paypal_subscription_id", subscriptionId)
        .eq("user_id", user.id);

      if (updateErr) {
        // If record doesn't exist yet, try to insert (edge case)
        console.error("[verify-pack-subscription] Update error:", updateErr.message);
      } else {
        console.log(
          `[verify-pack-subscription] ✅ Subscription ${subscriptionId} activated for user ${user.id}`
        );
      }

      return NextResponse.json({
        success: true,
        status: paypalData.status,
        subscriptionId,
        packId: paypalData.custom_id,
        nextBillingDate,
        message: "Pack subscription is active!",
      });
    }

    // Not active yet — return current status
    return NextResponse.json({
      success: false,
      status: paypalData.status,
      subscriptionId,
      message: `Subscription status: ${paypalData.status}`,
    });
  } catch (error: any) {
    console.error("[verify-pack-subscription] Error:", error.message);
    return NextResponse.json(
      { error: error.message || "Failed to verify pack subscription" },
      { status: 500 }
    );
  }
}
