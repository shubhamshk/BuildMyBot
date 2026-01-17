import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { checkUsageLimitServer } from "@/lib/subscriptions/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    try {
        console.log("[/api/subscriptions/usage] GET request received");
        
        const supabase = await createClient();
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError) {
            console.error("[/api/subscriptions/usage] Auth error:", userError);
            return NextResponse.json(
                { error: "Authentication failed", details: userError.message },
                { status: 401 }
            );
        }

        if (!user) {
            console.warn("[/api/subscriptions/usage] No user found");
            return NextResponse.json(
                { error: "Unauthorized - No user session" },
                { status: 401 }
            );
        }

        console.log(`[/api/subscriptions/usage] User authenticated: ${user.id}`);

        try {
            const usageResult = await checkUsageLimitServer(user.id);
            console.log(`[/api/subscriptions/usage] Usage result:`, usageResult);
            return NextResponse.json(usageResult);
        } catch (limitError: any) {
            console.error("[/api/subscriptions/usage] Error in checkUsageLimitServer:", limitError);
            // Return a safe fallback for FREE users
            return NextResponse.json({
                allowed: true,
                currentCount: 0,
                limit: 2,
                resetAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
                reason: "Error checking usage - defaulting to FREE plan",
            });
        }
    } catch (error: any) {
        console.error("[/api/subscriptions/usage] Unexpected error:", error);
        // Return safe fallback instead of error to prevent blocking users
        return NextResponse.json({
            allowed: true,
            currentCount: 0,
            limit: 2,
            resetAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            reason: "System error - defaulting to FREE plan limits",
        });
    }
}
