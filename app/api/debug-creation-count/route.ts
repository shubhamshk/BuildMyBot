/**
 * Debug endpoint to check what's happening with usage tracking
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { checkUsageLimitServer, getUserSubscriptionServer } from "@/lib/subscriptions/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const adminSupabase = createAdminClient();

        // 1. Check subscription
        const { data: subscription } = await getUserSubscriptionServer(user.id);

        // 2. Query creation_logs directly as admin
        const { data: logs, error: logsError } = await adminSupabase
            .from("creation_logs")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
            .limit(10);

        // 3. Get usage check result
        const usageCheck = await checkUsageLimitServer(user.id);

        // 4. Try to write a test log
        const testCharId = crypto.randomUUID();
        const { data: testLog, error: testError } = await adminSupabase
            .from("creation_logs")
            .insert({
                user_id: user.id,
                character_id: testCharId,
                plan_type: subscription?.plan_type || "FREE",
                was_allowed: true,
                error_message: "DEBUG TEST LOG",
            })
            .select()
            .single();

        // 5. Delete the test log
        if (testLog) {
            await adminSupabase
                .from("creation_logs")
                .delete()
                .eq("id", testLog.id);
        }

        return NextResponse.json({
            debug: {
                user_id: user.id,
                user_email: user.email,
                subscription,
                usage_check: usageCheck,
                recent_logs: logs,
                logs_query_error: logsError,
                test_write: {
                    success: !!testLog,
                    error: testError,
                    test_log: testLog,
                },
                env_check: {
                    has_supabase_url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
                    has_service_key: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
                },
            },
        });
    } catch (error: any) {
        console.error("[debug-usage] Error:", error);
        return NextResponse.json(
            { error: error.message, stack: error.stack },
            { status: 500 }
        );
    }
}
