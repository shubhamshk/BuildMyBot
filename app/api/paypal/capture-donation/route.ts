import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

// PayPal API configuration
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_BASE_URL =
    process.env.PAYPAL_MODE === "live"
        ? "https://api-m.paypal.com"
        : "https://api-m.sandbox.paypal.com";

async function getPayPalAccessToken(): Promise<string> {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
        throw new Error("PayPal credentials not configured");
    }

    const auth = Buffer.from(
        `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`
    ).toString("base64");

    const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${auth}`,
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
        const { orderId, email, amount, planName, isCustom } = await request.json();

        if (!orderId) {
            return NextResponse.json(
                { error: "Missing order ID" },
                { status: 400 }
            );
        }

        const accessToken = await getPayPalAccessToken();

        // ── Capture the donation order with PayPal ─────────────────────────
        const captureResponse = await fetch(
            `${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (!captureResponse.ok) {
            const errorText = await captureResponse.text();
            console.error("PayPal donation capture error:", errorText);

            // If already captured, treat as success
            if (
                captureResponse.status === 422 &&
                errorText.includes("ORDER_ALREADY_CAPTURED")
            ) {
                return NextResponse.json({
                    status: "COMPLETED",
                    message: "Donation already captured",
                });
            }

            let errorMessage = "Failed to capture PayPal donation";
            try {
                const errorJson = JSON.parse(errorText);
                errorMessage =
                    errorJson.message ||
                    errorJson.details?.[0]?.description ||
                    errorMessage;
            } catch { }

            return NextResponse.json(
                { error: errorMessage },
                { status: captureResponse.status || 500 }
            );
        }

        const captureData = await captureResponse.json();
        console.log("✅ PayPal donation capture SUCCESS:", JSON.stringify(captureData, null, 2));

        // ── Extract donation details from PayPal response ──────────────────
        const purchaseUnit = captureData.purchase_units?.[0];
        const capture = purchaseUnit?.payments?.captures?.[0];
        const captureId = capture?.id;
        const captureStatus = captureData.status; // "COMPLETED"
        const payerEmail = captureData.payer?.email_address || email || "";
        const payerId = captureData.payer?.payer_id || "";
        const capturedAmount = parseFloat(capture?.amount?.value || amount?.toString() || "0");

        // Try to extract custom_id metadata (set when creating the donation order)
        let resolvedEmail = payerEmail || email;
        let resolvedPlanName = planName || "";
        let resolvedIsCustom = isCustom || false;
        try {
            const customId = purchaseUnit?.custom_id;
            if (customId) {
                const meta = JSON.parse(customId);
                resolvedEmail = resolvedEmail || meta.email || "";
                resolvedPlanName = resolvedPlanName || meta.planName || "";
                resolvedIsCustom = meta.type === "custom" || resolvedIsCustom;
            }
        } catch { /* custom_id may not be JSON */ }

        // ── Write to Supabase `donations` table ────────────────────────────
        const supabase = createAdminClient();

        const { error: dbError } = await supabase.from("donations").insert({
            email: resolvedEmail || "unknown@donor.com",
            amount: capturedAmount,
            currency: capture?.amount?.currency_code || "USD",
            plan_name: resolvedPlanName || null,
            is_custom: resolvedIsCustom,
            paypal_order_id: orderId,
            paypal_capture_id: captureId || null,
            paypal_payer_id: payerId || null,
            paypal_payer_email: payerEmail || null,
            paypal_status: captureStatus === "COMPLETED" ? "COMPLETED" : "PENDING",
        });

        if (dbError) {
            // Don't fail the response — payment already went through.
            console.error("⚠️ DB write failed after donation capture:", dbError.message);
        } else {
            console.log(`✅ Donation recorded in DB: $${capturedAmount} from ${resolvedEmail}, order ${orderId}`);
        }

        return NextResponse.json({
            status: captureData.status,
            id: captureData.id,
            captureId,
            amount: capturedAmount,
            payer: captureData.payer,
        });
    } catch (error: any) {
        console.error("PayPal Donation Capture Error:", error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
