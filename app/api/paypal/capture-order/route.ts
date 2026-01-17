
import { NextRequest, NextResponse } from "next/server";

// PayPal API configuration
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_BASE_URL = process.env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

/**
 * Get PayPal access token (Duplicated for safety to avoid import issues)
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
        const { orderId } = await request.json();

        if (!orderId) {
            return NextResponse.json(
                { error: "Missing order ID" },
                { status: 400 }
            );
        }

        const accessToken = await getPayPalAccessToken();

        // Capture Order
        // /v2/checkout/orders/{id}/capture
        const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("PayPal capture error:", errorText);

            // If already captured, handle gracefully
            if (response.status === 422 && errorText.includes("ORDER_ALREADY_CAPTURED")) {
                return NextResponse.json({ status: "COMPLETED", message: "Order already captured" });
            }

            let errorMessage = "Failed to capture PayPal order";
            try {
                const errorJson = JSON.parse(errorText);
                errorMessage = errorJson.message || errorJson.details?.[0]?.description || errorMessage;
            } catch { }

            return NextResponse.json(
                { error: errorMessage },
                { status: response.status || 500 }
            );
        }

        const captureData = await response.json();

        // TODO: Here you would save the purchase to your database
        // e.g. await savePurchase({ email: ..., itemId: ..., transactionId: captureData.id })
        // Since we don't have a table yet, we just log it.
        console.log("PAYMENT SUCCESSFUL:", JSON.stringify(captureData, null, 2));

        return NextResponse.json({
            status: captureData.status,
            id: captureData.id,
            payer: captureData.payer,
        });

    } catch (error: any) {
        console.error("PayPal Capture Error:", error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
