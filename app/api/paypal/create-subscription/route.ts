import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { updateSubscriptionServer } from "@/lib/subscriptions/server";

// PayPal API configuration
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_BASE_URL = process.env.PAYPAL_MODE === "live" 
  ? "https://api-m.paypal.com" 
  : "https://api-m.sandbox.paypal.com";

// Plan pricing
const PLAN_PRICING = {
  MONTHLY: { amount: "6.00", currency: "USD" },
  YEARLY: { amount: "49.00", currency: "USD" },
};

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
    const errorText = await response.text();
    console.error("PayPal token error:", errorText);
    throw new Error(`Failed to get PayPal access token: ${response.status}`);
  }

  const data = await response.json();
  return data.access_token;
}

/**
 * Create a PayPal product
 */
async function createPayPalProduct(accessToken: string): Promise<string> {
  const response = await fetch(`${PAYPAL_BASE_URL}/v1/catalogs/products`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "Prefer": "return=representation",
    },
    body: JSON.stringify({
      name: "Characteria Pro",
      description: "Pro subscription for Characteria",
      type: "SERVICE",
      category: "SOFTWARE",
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("PayPal product creation error:", errorData);
    throw new Error(`Failed to create PayPal product: ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  return data.id;
}

/**
 * Create a PayPal plan
 */
async function createPayPalPlan(
  accessToken: string,
  productId: string,
  planType: "PRO_MONTHLY" | "PRO_YEARLY"
): Promise<string> {
  const pricing = planType === "PRO_MONTHLY" ? PLAN_PRICING.MONTHLY : PLAN_PRICING.YEARLY;
  const billingCycle = planType === "PRO_MONTHLY" 
    ? { interval_unit: "MONTH", interval_count: 1 }
    : { interval_unit: "YEAR", interval_count: 1 };

  const response = await fetch(`${PAYPAL_BASE_URL}/v1/billing/plans`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "Prefer": "return=representation",
    },
    body: JSON.stringify({
      product_id: productId,
      name: planType === "PRO_MONTHLY" ? "Pro Monthly" : "Pro Yearly",
      description: planType === "PRO_MONTHLY" 
        ? "Monthly subscription for Characteria Pro"
        : "Yearly subscription for Characteria Pro",
      billing_cycles: [
        {
          frequency: billingCycle,
          tenure_type: "REGULAR",
          sequence: 1,
          total_cycles: 0, // Infinite cycles
          pricing_scheme: {
            fixed_price: {
              value: pricing.amount,
              currency_code: pricing.currency,
            },
          },
        },
      ],
      payment_preferences: {
        auto_bill_outstanding: true,
        setup_fee: {
          value: "0",
          currency_code: pricing.currency,
        },
        setup_fee_failure_action: "CONTINUE",
        payment_failure_threshold: 3,
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("PayPal plan creation error:", errorData);
    throw new Error(`Failed to create PayPal plan: ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  return data.id;
}

/**
 * Create PayPal subscription
 */
export async function POST(request: NextRequest) {
  try {
    const { planType } = await request.json();

    if (!planType || (planType !== "PRO_MONTHLY" && planType !== "PRO_YEARLY")) {
      return NextResponse.json(
        { error: "Invalid plan type" },
        { status: 400 }
      );
    }

    // Check authentication
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Get PayPal access token
    const accessToken = await getPayPalAccessToken();

    // Create product
    // Note: PayPal may return an existing product if one with the same name exists
    let productId: string;
    try {
      productId = await createPayPalProduct(accessToken);
    } catch (error: any) {
      console.error("Product creation error:", error);
      return NextResponse.json(
        { 
          error: "Failed to create PayPal product", 
          message: error.message || "Please check your PayPal credentials and try again"
        },
        { status: 500 }
      );
    }

    // Create plan dynamically
    const planId = await createPayPalPlan(accessToken, productId, planType);

    // Create subscription
    const subscriptionResponse = await fetch(`${PAYPAL_BASE_URL}/v1/billing/subscriptions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation",
      },
      body: JSON.stringify({
        plan_id: planId,
        start_time: new Date(Date.now() + 60000).toISOString(), // Start 1 minute from now
        subscriber: {
          email_address: user.email,
        },
        application_context: {
          brand_name: "Characteria",
          locale: "en-US",
          shipping_preference: "NO_SHIPPING",
          user_action: "SUBSCRIBE_NOW",
          payment_method: {
            payer_selected: "PAYPAL",
            payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED",
          },
          return_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/pricing?success=true`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/pricing?canceled=true`,
        },
      }),
    });

    if (!subscriptionResponse.ok) {
      const errorText = await subscriptionResponse.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText };
      }
      console.error("PayPal subscription creation error:", errorData);
      return NextResponse.json(
        { 
          error: "Failed to create PayPal subscription", 
          details: errorData,
          message: errorData.message || errorData.details?.[0]?.description || "Unknown error"
        },
        { status: subscriptionResponse.status || 500 }
      );
    }

    const subscriptionData = await subscriptionResponse.json();

    // Store subscription ID in database (temporary, will be confirmed via webhook)
    await updateSubscriptionServer(user.id, {
      paypal_subscription_id: subscriptionData.id,
      paypal_plan_id: planId,
    });

    // Return approval URL
    const approvalUrl = subscriptionData.links?.find(
      (link: any) => link.rel === "approve"
    )?.href;

    if (!approvalUrl) {
      return NextResponse.json(
        { error: "No approval URL found in PayPal response" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      subscriptionId: subscriptionData.id,
      approvalUrl,
    });
  } catch (error: any) {
    console.error("PayPal subscription error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create subscription" },
      { status: 500 }
    );
  }
}
