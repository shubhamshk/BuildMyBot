
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    try {
        const supabaseAdmin = createAdminClient();
        const supabase = await createClient();

        // 1. Check if Service Role Key is available (don't log it)
        const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;

        // 2. Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Not authenticated. Please visit this page in the browser where you are logged in.",
                hasServiceKey,
                hint: "If you are seeing this, you need to sign in first then come back to this URL."
            });
        }

        const report: any = {
            userId: user.id,
            steps: []
        };

        // 3. Try to write to usage_tracking using Admin Client
        report.steps.push("Attempting to write to usage_tracking...");

        // Check if record exists
        const { data: usageData, error: fetchError } = await supabaseAdmin
            .from("usage_tracking")
            .select("*")
            .eq("user_id", user.id)
            .single();

        let usageWriteResult;

        if (usageData) {
            // Try update
            const { data, error } = await supabaseAdmin
                .from("usage_tracking")
                .update({ updated_at: new Date().toISOString() })
                .eq("user_id", user.id)
                .select();

            if (error) {
                report.steps.push({ name: "usage_tracking update", status: "FAILED", error: error.message, code: error.code, details: error.details });
            } else {
                report.steps.push({ name: "usage_tracking update", status: "SUCCESS" });
            }
        } else {
            // Try insert
            const { data, error } = await supabaseAdmin
                .from("usage_tracking")
                .insert({
                    user_id: user.id,
                    daily_creation_count: 0,
                    last_reset_at: new Date().toISOString()
                })
                .select();

            if (error) {
                report.steps.push({ name: "usage_tracking insert", status: "FAILED", error: error.message, code: error.code, details: error.details });
            } else {
                report.steps.push({ name: "usage_tracking insert", status: "SUCCESS" });
            }
        }

        // 4. Try to write to creation_logs
        report.steps.push("Attempting to write to creation_logs...");
        const { data: logData, error: logError } = await supabaseAdmin
            .from("creation_logs")
            .insert({
                user_id: user.id,
                character_id: null,
                plan_type: "DEBUG",
                was_allowed: true,
                error_message: "Debug log test"
            })
            .select();

        if (logError) {
            report.steps.push({ name: "creation_logs insert", status: "FAILED", error: logError.message, code: logError.code, details: logError.details });
        } else {
            report.steps.push({ name: "creation_logs insert", status: "SUCCESS" });
        }

        return NextResponse.json(report);

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
