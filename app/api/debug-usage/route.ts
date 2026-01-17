import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { checkUsageLimitServer, getUserSubscriptionServer } from "@/lib/subscriptions/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

/**
 * Debug endpoint to check user's subscription and usage status
 * Helps diagnose production issues
 */
export async function GET(request: NextRequest) {
    try {
        const supabase = await createClient();
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Get subscription details
        const { data: subscription, error: subError } = await getUserSubscriptionServer(user.id);

        // Get usage limit check
        const usageCheck = await checkUsageLimitServer(user.id);

        // Get recent creation logs (last 48 hours)
        const adminClient = createAdminClient();
        const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);
        
        const { data: recentLogs } = await adminClient
            .from("creation_logs")
            .select("*")
            .eq("user_id", user.id)
            .gte("created_at", fortyEightHoursAgo.toISOString())
            .order("created_at", { ascending: false });

        // Get usage tracking record
        const { data: usageTracking } = await adminClient
            .from("usage_tracking")
            .select("*")
            .eq("user_id", user.id)
            .single();

        return NextResponse.json({
            debug: {
                userId: user.id,
                userEmail: user.email,
                timestamp: new Date().toISOString(),
            },
            subscription: {
                found: !!subscription,
                error: subError,
                data: subscription,
            },
            usageCheck: usageCheck,
            usageTracking: usageTracking,
            recentLogs: {
                count: recentLogs?.length || 0,
                logs: recentLogs || [],
                successfulInLast24h: recentLogs?.filter(log => 
                    log.was_allowed && 
                    new Date(log.created_at).getTime() > Date.now() - 24 * 60 * 60 * 1000
                ).length || 0,
            },
        });
    } catch (error: any) {
        console.error("Error in debug-usage:", error);
        return NextResponse.json(
            { error: error.message || "Failed to fetch debug info" },
            { status: 500 }
        );
    }
}
