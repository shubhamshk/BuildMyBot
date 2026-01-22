-- CRITICAL FIX: Remove foreign key constraint that's blocking creation logs
-- Run this in Supabase SQL Editor NOW

-- 1. Drop the problematic foreign key constraint
ALTER TABLE public.creation_logs 
DROP CONSTRAINT IF EXISTS creation_logs_character_id_fkey;

-- 2. Make character_id nullable (it already is, but let's be sure)
ALTER TABLE public.creation_logs 
ALTER COLUMN character_id DROP NOT NULL;

-- 3. Verify it worked
SELECT 
    conname AS constraint_name,
    contype AS constraint_type
FROM pg_constraint 
WHERE conrelid = 'public.creation_logs'::regclass
  AND conname LIKE '%character_id%';

-- If the above returns no rows, the fix worked!
