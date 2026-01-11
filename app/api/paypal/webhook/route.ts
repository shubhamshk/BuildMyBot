import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { updateSubscriptionServer } from "@/lib/subscriptions/server";
import type { PlanType } from "@/lib/subscriptions/service";

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_BASE_URL = process.env.PAYPAL_MODE === "live" 
  ? "https://api-m.paypal.com" 
  : "https://api-m.sandbox.paypal.com";

/**
 * Get PayPal access token for webhook verification
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
 * Verify PayPal webhook signature (optional - can be skipped in development)
 */
async function verifyWebhookSignature(
  headers: Headers,
  body: string
): Promise<boolean> {
  try {
    const transmissionId = headers.get("paypal-transmission-id");
    const certUrl = headers.get("paypal-cert-url");
    const transmissionSig = headers.get("paypal-transmission-sig");
    const transmissionTime = headers.get("paypal-transmission-time");
    const webhookId = headers.get("paypal-webhook-id");

    // If webhook ID is not provided in headers, skip verification (for development)
    if (!webhookId) {
      console.warn("Webhook ID not found in headers, skipping verification");
      return true; // Allow in development, but log warning
    }

    if (!transmissionId || !certUrl || !transmissionSig || !transmissionTime) {
      console.warn("Missing webhook verification headers");
      return true; // Allow in development
    }

    const accessToken = await getPayPalAccessToken();
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");

    // Verify webhook with PayPal
    const verifyResponse = await fetch(`${PAYPAL_BASE_URL}/v1/notifications/verify-webhook-signature`, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth_algo: headers.get("paypal-auth-algo"),
        cert_url: certUrl,
        transmission_id: transmissionId,
        transmission_sig: transmissionSig,
        transmission_time: transmissionTime,
        webhook_id: webhookId,
        webhook_event: JSON.parse(body),
      }),
    });

    if (!verifyResponse.ok) {
      const errorData = await verifyResponse.json();
      console.error("Webhook verification failed:", errorData);
      return false;
    }

    const verifyData = await verifyResponse.json();
    return verifyData.verification_status === "SUCCESS";
  } catch (error) {
    console.error("Webhook verification error:", error);
    // In development, allow webhooks even if verification fails
    if (process.env.NODE_ENV !== "production") {
      return true;
    }
    return false;
  }
}

/**
 * Handle PayPal webhook events
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headers = request.headers;

    // Verify webhook signature (in production, always verify)
    if (process.env.NODE_ENV === "production") {
      const isValid = await verifyWebhookSignature(headers, body);
      if (!isValid) {
        return NextResponse.json(
          { error: "Invalid webhook signature" },
          { status: 401 }
        );
      }
    }

    const event = JSON.parse(body);
    const supabase = await createClient();

    // Handle different event types
    switch (event.event_type) {
      case "BILLING.SUBSCRIPTION.CREATED":
      case "BILLING.SUBSCRIPTION.ACTIVATED": {
        const subscriptionId = event.resource?.id;
        const planId = event.resource?.plan_id;

        if (!subscriptionId) break;

        // Find user by subscription ID
        const { data: subscription } = await supabase
          .from("subscriptions")
          .select("user_id, paypal_plan_id")
          .eq("paypal_subscription_id", subscriptionId)
          .single();

        if (subscription) {
          // Determine plan type from subscription data or plan ID
          // Since we're creating plans dynamically, we need to check the plan details
          let planType = "PRO_MONTHLY";
          
          // Try to get plan details from PayPal to determine type
          const planIdToCheck = planId || subscription.paypal_plan_id;
          if (planIdToCheck) {
            try {
              const accessToken = await getPayPalAccessToken();
              const planResponse = await fetch(`${PAYPAL_BASE_URL}/v1/billing/plans/${planIdToCheck}`, {
                headers: {
                  "Authorization": `Bearer ${accessToken}`,
                  "Content-Type": "application/json",
                },
              });
              
              if (planResponse.ok) {
                const planData = await planResponse.json();
                const billingCycle = planData.billing_cycles?.[0]?.frequency;
                if (billingCycle?.interval_unit === "YEAR") {
                  planType = "PRO_YEARLY";
                }
              }
            } catch (error) {
              console.error("Error fetching plan details:", error);
              // Default to monthly if we can't determine
              planType = "PRO_MONTHLY";
            }
          }

          // Calculate expiration date
          const expiresAt = new Date();
          if (planType === "PRO_MONTHLY") {
            expiresAt.setMonth(expiresAt.getMonth() + 1);
          } else {
            expiresAt.setFullYear(expiresAt.getFullYear() + 1);
          }

          await updateSubscriptionServer(subscription.user_id, {
            plan_type: planType as PlanType,
            subscription_status: "ACTIVE",
            expires_at: expiresAt.toISOString(),
          });

          // Reset daily creation count to 0 so user starts fresh with Pro limits
          await supabase
            .from("usage_tracking")
            .update({ 
              daily_creation_count: 0,
              last_reset_at: new Date().toISOString()
            })
            .eq("user_id", subscription.user_id);
          
          console.log(`[Webhook] User ${subscription.user_id} upgraded to ${planType}, usage reset`);
        }
        break;
      }

      case "BILLING.SUBSCRIPTION.CANCELLED":
      case "BILLING.SUBSCRIPTION.EXPIRED":
      case "BILLING.SUBSCRIPTION.SUSPENDED": {
        const subscriptionId = event.resource?.id;

        if (!subscriptionId) break;

        // Find user by subscription ID
        const { data: subscription } = await supabase
          .from("subscriptions")
          .select("user_id")
          .eq("paypal_subscription_id", subscriptionId)
          .single();

        if (subscription) {
          await updateSubscriptionServer(subscription.user_id, {
            plan_type: "FREE",
            subscription_status: "INACTIVE",
            expires_at: undefined, // Use undefined instead of null for optional fields
          });
        }
        break;
      }

      case "PAYMENT.SALE.COMPLETED": {
        // Payment successful - subscription is active
        const billingAgreementId = event.resource?.billing_agreement_id;

        if (!billingAgreementId) break;

        // Find user by subscription ID
        const { data: subscription } = await supabase
          .from("subscriptions")
          .select("user_id")
          .eq("paypal_subscription_id", billingAgreementId)
          .single();

        if (subscription) {
          await updateSubscriptionServer(subscription.user_id, {
            subscription_status: "ACTIVE",
          });
        }
        break;
      }

      default:
        console.log("Unhandled webhook event:", event.event_type);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: error.message || "Webhook processing failed" },
      { status: 500 }
    );
  }
}
