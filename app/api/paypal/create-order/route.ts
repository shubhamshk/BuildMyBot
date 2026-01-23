
import { NextRequest, NextResponse } from "next/server";
import { packs, services, specialPacks } from "@/lib/packs/data";
import { vaultPacks, creatorVaultPack } from "@/data/vaultPacks";

// PayPal API configuration
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
        const { itemId, email, description } = requestData;

        // Find the item in packs or services
        const item = [...packs, ...services, ...specialPacks, ...vaultPacks, creatorVaultPack].find((p) => p.id === itemId);

        if (!item) {
            return NextResponse.json(
                { error: "Invalid item ID" },
                { status: 400 }
            );
        }

        const price = item.price.toString();
        const itemName = (item as any).title || (item as any).name;

        // Get PayPal Token
        const accessToken = await getPayPalAccessToken();

        // Create Order Payload
        // v2/checkout/orders
        const orderPayload = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    reference_id: itemId,
                    description: description ? `${itemName} - ${description.substring(0, 50)}...` : itemName,
                    amount: {
                        currency_code: "USD",
                        value: price,
                    },
                    custom_id: JSON.stringify({ email, itemId, description: description?.substring(0, 100) }), // Pass metadata to trace later
                },
            ],
            payer: {
                email_address: email, // Pre-fill email if possible
            },
            application_context: {
                brand_name: "Characteria",
                landing_page: "NO_PREFERENCE",
                user_action: "PAY_NOW",
                return_url: `${process.env.NEXT_PUBLIC_APP_URL || "https://characteria.me"}/packs?success=true&itemId=${itemId}`,
                cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "https://characteria.me"}/packs?canceled=true`,
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

            // Try parsing JSON error
            let errorMessage = "Failed to create PayPal order";
            try {
                const errorJson = JSON.parse(errorText);
                errorMessage = errorJson.message || errorJson.details?.[0]?.description || errorMessage;
            } catch { }

            return NextResponse.json(
                { error: errorMessage },
                { status: response.status || 500 }
            );
        }

        const orderData = await response.json();

        // Find approval URL
        const approvalUrl = orderData.links?.find((link: any) => link.rel === "approve")?.href;

        if (!approvalUrl) {
            return NextResponse.json(
                { error: "No approval URL found in PayPal response" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            orderId: orderData.id,
            approvalUrl: approvalUrl,
        });
    } catch (error: any) {
        console.error("PayPal Create Order Error:", error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
