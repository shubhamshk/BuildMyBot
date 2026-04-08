import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sanitizeForPayPal } from "@/lib/paypal/sanitize-name";

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_BASE_URL =
  process.env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://characteria.me";

const vaultPlans = [
  { id: "discord-vault-basic", title: "BASIC Vault", price: 9 },
  { id: "discord-vault-premium", title: "PREMIUM Vault", price: 19 },
  { id: "discord-vault-vip", title: "VIP Vault", price: 49 },
];

/** Get a PayPal OAuth access token */
async function getAccessToken(): Promise<string> {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error("PayPal credentials not configured");
  }
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

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`PayPal token error: ${err}`);
  }
  const data = await res.json();
  return data.access_token;
}

async function createProduct(
  accessToken: string,
  packId: string,
  packName: string
): Promise<string> {
  const res = await fetch(`${PAYPAL_BASE_URL}/v1/catalogs/products`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      "PayPal-Request-Id": `prod-${packId}-${Date.now()}`,
    },
    body: JSON.stringify({
      name: `Characteria – ${packName}`,
      description: `Monthly subscription for ${packName}`,
      type: "DIGITAL",
      category: "SOFTWARE",
    }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Product creation failed: ${JSON.stringify(err)}`);
  }
  const data = await res.json();
  return data.id as string;
}

async function createPlan(
  accessToken: string,
  productId: string,
  packId: string,
  packName: string,
  amount: string
): Promise<string> {
  const res = await fetch(`${PAYPAL_BASE_URL}/v1/billing/plans`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      "PayPal-Request-Id": `plan-${packId}-${Date.now()}`,
    },
    body: JSON.stringify({
      product_id: productId,
      name: `${packName} – Monthly`,
      description: `Recurring monthly access to ${packName}`,
      billing_cycles: [
        {
          frequency: { interval_unit: "MONTH", interval_count: 1 },
          tenure_type: "REGULAR",
          sequence: 1,
          total_cycles: 0,
          pricing_scheme: {
            fixed_price: { value: amount, currency_code: "USD" },
          },
        },
      ],
      payment_preferences: {
        auto_bill_outstanding: true,
        setup_fee: { value: "0", currency_code: "USD" },
        setup_fee_failure_action: "CONTINUE",
        payment_failure_threshold: 3,
      },
    }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Plan creation failed: ${JSON.stringify(err)}`);
  }
  const data = await res.json();
  return data.id as string;
}

async function createSubscription(
  accessToken: string,
  planId: string,
  packId: string,
  email: string,
  returnPage: string
): Promise<{ subscriptionId: string; approvalUrl: string }> {
  const res = await fetch(`${PAYPAL_BASE_URL}/v1/billing/subscriptions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      plan_id: planId,
      subscriber: { email_address: email },
      application_context: {
        brand_name: "Characteria",
        locale: "en-US",
        shipping_preference: "NO_SHIPPING",
        user_action: "SUBSCRIBE_NOW",
        payment_method: {
          payer_selected: "PAYPAL",
          payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED",
        },
        return_url: `${APP_URL}${returnPage}?success=true&pack=${packId}`,
        cancel_url: `${APP_URL}${returnPage}?canceled=true`,
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    let detail = text;
    try {
      const j = JSON.parse(text);
      detail = j.message || j.details?.[0]?.description || text;
    } catch {}
    throw new Error(`Subscription creation failed: ${detail}`);
  }

  const data = await res.json();
  const approvalUrl =
    (data.links as { rel: string; href: string }[])?.find(
      (l) => l.rel === "approve"
    )?.href || "";

  return { subscriptionId: data.id, approvalUrl };
}

export async function POST(request: NextRequest) {
  try {
    const { planId, discordUsername } = await request.json();

    if (!planId || !discordUsername) {
      return NextResponse.json({ error: "planId and discordUsername are required" }, { status: 400 });
    }

    const pack = vaultPlans.find((p) => p.id === planId);

    if (!pack) {
      return NextResponse.json(
        { error: `Unknown plan: ${planId}` },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const email = user?.email || "";

    let amount = pack.price.toString();
    if (!amount.includes(".")) amount += ".00";
    else if (amount.split(".")[1].length === 1) amount += "0";

    const returnPage = "/DiscordVault";
    const paypalPackName = sanitizeForPayPal(pack.title);

    const accessToken = await getAccessToken();
    const productId = await createProduct(accessToken, pack.id, paypalPackName);
    const paypalPlanId = await createPlan(
      accessToken,
      productId,
      pack.id,
      paypalPackName,
      amount
    );
    const { subscriptionId, approvalUrl } = await createSubscription(
      accessToken,
      paypalPlanId,
      pack.id,
      email,
      returnPage
    );

    // We log it only if the user is authenticated since pack_subscriptions requires a user_id
    if (user?.id) {
      const admin = createAdminClient();
      const { error: dbErr } = await admin.from("pack_subscriptions").insert({
        user_id: user.id,
        email: email,
        discord_username: discordUsername,
        pack_id: pack.id,
        pack_name: pack.title,
        amount: parseFloat(amount),
        currency: "USD",
        paypal_subscription_id: subscriptionId,
        paypal_plan_id: paypalPlanId,
        paypal_product_id: productId,
        status: "PENDING",
      });

      if (dbErr) {
        console.error("[create-vault-subscription] DB insert error:", dbErr.message);
      } else {
        console.log(
          `[create-vault-subscription] ✅ Pending subscription ${subscriptionId} recorded for plan ${planId}`
        );
      }
    } else {
        console.log(
          `[create-vault-subscription] ✅ PayPal subscription ${subscriptionId} created (Anonymous User)`
        );
    }

    return NextResponse.json({ subscriptionId, approvalUrl, planId: paypalPlanId, productId });
  } catch (error: any) {
    console.error("[create-vault-subscription] Error:", error.message);
    return NextResponse.json(
      { error: error.message || "Failed to create vault subscription" },
      { status: 500 }
    );
  }
}
