import { NextRequest, NextResponse } from "next/server";

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_BASE_URL = process.env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

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

export async function POST(request: NextRequest) {
    try {
        const requestData = await request.json();
        const { amount, email, planName } = requestData;

        if (!amount) {
            return NextResponse.json({ error: "Amount is required" }, { status: 400 });
        }

        const accessToken = await getPayPalAccessToken();

        const orderPayload = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    reference_id: `donation_${Date.now()}`,
                    description: `Donation: ${planName} - $${amount}`,
                    amount: {
                        currency_code: "USD",
                        value: amount.toString(),
                    },
                    custom_id: JSON.stringify({ email, type: "donation", amount }), 
                },
            ],
            payer: {
                email_address: email || undefined,
            },
            application_context: {
                brand_name: "Jerry Chef Donations",
                landing_page: "NO_PREFERENCE",
                user_action: "PAY_NOW",
                return_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/donation?success=true`,
                cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/donation?canceled=true`,
            },
        };

        const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify(orderPayload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("PayPal create order error:", errorText);

            let errorMessage = "Failed to create PayPal order";
            try {
                const errorJson = JSON.parse(errorText);
                errorMessage = errorJson.message || errorJson.details?.[0]?.description || errorMessage;
            } catch { }

            return NextResponse.json({ error: errorMessage }, { status: response.status || 500 });
        }

        const orderData = await response.json();
        const approvalUrl = orderData.links?.find((link: any) => link.rel === "approve")?.href;

        if (!approvalUrl) {
            return NextResponse.json({ error: "No approval URL found in PayPal response" }, { status: 500 });
        }

        return NextResponse.json({
            orderId: orderData.id,
            approvalUrl: approvalUrl,
        });
    } catch (error: any) {
        console.error("PayPal Create Donation Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
