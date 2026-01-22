-- FIX: Ensure Usage Tracking & Logs Tables Exist with Proper Permissions

-- 1. Ensure `usage_tracking` exists with correct columns
CREATE TABLE IF NOT EXISTS public.usage_tracking (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    daily_creation_count INTEGER NOT NULL DEFAULT 0,
    last_reset_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    CONSTRAINT unique_user_usage UNIQUE (user_id)
);

-- 2. Ensure `creation_logs` exists with correct columns
CREATE TABLE IF NOT EXISTS public.creation_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    character_id UUID NULL, 
    -- Note: We make character_id nullable or remove FK constraint to prevent errors if character doesn't exist yet/deleted
    -- But ideally it references characters(id). 
    -- Let's check if we need to drop the constraint if it causes issues with non-UUIDs (though we fixed that in code).
    
    creation_type TEXT NOT NULL DEFAULT 'CHARACTER',
    plan_type TEXT NOT NULL,
    was_allowed BOOLEAN NOT NULL DEFAULT true,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Fix `creation_logs` character_id if it exists but has issues
-- We want to ensure character_id is UUID. If it was text before, this might fail, but let's assume it's clean or empty.
-- Safe column update:
DO $$ 
BEGIN 
    -- Add columns if they are missing
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'creation_logs' AND column_name = 'character_id') THEN
        ALTER TABLE public.creation_logs ADD COLUMN character_id UUID;
    END IF;
END $$;

-- 4. Enable RLS
ALTER TABLE public.usage_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creation_logs ENABLE ROW LEVEL SECURITY;

-- 5. Create or Update RLS Policies (Drop existing to avoid conflicts)

-- Usage Tracking Policies
DROP POLICY IF EXISTS "Users can view their own usage" ON public.usage_tracking;
CREATE POLICY "Users can view their own usage" ON public.usage_tracking
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own usage" ON public.usage_tracking;
CREATE POLICY "Users can insert their own usage" ON public.usage_tracking
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own usage" ON public.usage_tracking;
CREATE POLICY "Users can update their own usage" ON public.usage_tracking
    FOR UPDATE USING (auth.uid() = user_id);

-- Service Role (Admin) Policies - Explicitly allow service role full access
-- Supabase Service Role usually bypasses RLS, but explicit policies help prevent confusion
DROP POLICY IF EXISTS "Service role can do everything on usage_tracking" ON public.usage_tracking;
CREATE POLICY "Service role can do everything on usage_tracking" ON public.usage_tracking
    FOR ALL USING (auth.role() = 'service_role');


-- Creation Logs Policies
DROP POLICY IF EXISTS "Users can view their own creation logs" ON public.creation_logs;
CREATE POLICY "Users can view their own creation logs" ON public.creation_logs
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own creation logs" ON public.creation_logs;
CREATE POLICY "Users can insert their own creation logs" ON public.creation_logs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service role can do everything on creation_logs" ON public.creation_logs;
CREATE POLICY "Service role can do everything on creation_logs" ON public.creation_logs
    FOR ALL USING (auth.role() = 'service_role');

-- 6. Ensure existing users have usage_tracking records
-- This inserts a row for any user in auth.users that doesn't have a usage_tracking row
INSERT INTO public.usage_tracking (user_id, daily_creation_count, last_reset_at)
SELECT id, 0, NOW() 
FROM auth.users 
WHERE id NOT IN (SELECT user_id FROM public.usage_tracking)
ON CONFLICT (user_id) DO NOTHING;

-- 7. Grant permissions just in case
GRANT ALL ON public.usage_tracking TO postgres, service_role;
GRANT ALL ON public.creation_logs TO postgres, service_role;
GRANT SELECT, INSERT, UPDATE ON public.usage_tracking TO authenticated;
GRANT SELECT, INSERT ON public.creation_logs TO authenticated;
