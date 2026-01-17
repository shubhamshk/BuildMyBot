import { createClient } from '@supabase/supabase-js';

export function createAdminClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    if (!supabaseUrl) {
        console.error("[createAdminClient] Missing NEXT_PUBLIC_SUPABASE_URL");
        throw new Error("Missing Supabase URL - check environment variables");
    }

    if (!supabaseServiceKey) {
        console.error("[createAdminClient] Missing SUPABASE_SERVICE_ROLE_KEY");
        throw new Error("Missing Supabase Service Role Key - check environment variables");
    }

    console.log("[createAdminClient] Creating admin client with URL:", supabaseUrl);

    return createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
}
