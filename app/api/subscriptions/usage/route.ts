import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { checkUsageLimitServer } from "@/lib/subscriptions/server";

export const dynamic = "force-dynamic";

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

        const usageResult = await checkUsageLimitServer(user.id);

        return NextResponse.json(usageResult);
    } catch (error: any) {
        console.error("Error fetching usage:", error);
        return NextResponse.json(
            { error: error.message || "Failed to fetch usage" },
            { status: 500 }
        );
    }
}
