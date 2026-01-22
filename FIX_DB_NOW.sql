-- URGENT: Run this FIRST in Supabase SQL Editor
-- This creates the necessary permissions for the backend to work

-- 1. Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view their own creation logs" ON public.creation_logs;
DROP POLICY IF EXISTS "Users can insert their own creation logs" ON public.creation_logs;
DROP POLICY IF EXISTS "Service role can do everything on creation_logs" ON public.creation_logs;

-- 2. Ensure table exists with correct structure
CREATE TABLE IF NOT EXISTS public.creation_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    character_id TEXT NULL, -- Changed to TEXT to accept any ID format
    creation_type TEXT NOT NULL DEFAULT 'CHARACTER',
    plan_type TEXT NOT NULL DEFAULT 'FREE',
    was_allowed BOOLEAN NOT NULL DEFAULT true,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Add index for faster queries
CREATE INDEX IF NOT EXISTS creation_logs_user_created_idx 
    ON public.creation_logs(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS creation_logs_character_idx 
    ON public.creation_logs(user_id, character_id) 
    WHERE character_id IS NOT NULL;

-- 4. Enable RLS
ALTER TABLE public.creation_logs ENABLE ROW LEVEL SECURITY;

-- 5. Create policies with service role bypass
-- Service role (your backend with SUPABASE_SERVICE_ROLE_KEY) bypasses RLS automatically
-- But we add explicit policies for clarity

CREATE POLICY "Enable all for service role" 
ON public.creation_logs
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Users can view own logs" 
ON public.creation_logs
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own logs" 
ON public.creation_logs
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 6. Grant explicit permissions
GRANT ALL ON public.creation_logs TO service_role;
GRANT SELECT, INSERT ON public.creation_logs TO authenticated;

-- 7. Verify it worked
DO $$
BEGIN
    RAISE NOTICE '✓ creation_logs table configured successfully';
    RAISE NOTICE 'Table exists: %', (SELECT COUNT(*) FROM information_schema.tables WHERE table_name = 'creation_logs');
    RAISE NOTICE 'Policies created: %', (SELECT COUNT(*) FROM pg_policies WHERE tablename = 'creation_logs');
END $$;
