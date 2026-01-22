# Creation Count Fix - Complete Rebuild

## Problem
The creation count was stuck at "0 / 2" and never updated, allowing unlimited free character generations.

## Root Causes
1. **Over-complexity**: The system used TWO tables (`usage_tracking` and `creation_logs`) which got out of sync
2. **Silent failures**: Database write failures weren't properly handled
3. **RLS Issues**: Row Level Security policies were blocking server-side updates
4. **Reconciliation bugs**: The sync logic would reset the count to 0 if logs were empty

## Solution: Complete Simplification

### What Changed
- **Removed dependency on `usage_tracking` table** - No longer used for counting
- **Single source of truth**: `creation_logs` table now handles everything
- **Counts unique character IDs** in last 24 hours instead of trying to maintain a counter
- **Simpler function names** for clarity

### New Architecture

#### Tracking System
```
User creates character
    ↓
Check: Has this character ID been logged before?
    ↓ NO (new character)
    Check: How many unique character IDs in last 24h?
        ↓ < 2 (FREE user)
        ✓ Allow creation
        ✓ Log to creation_logs table
    ↓ YES (regenerating)
    ✓ Allow for free (don't count again)
```

### Key Functions (lib/subscriptions/server.ts)

1. **`checkUsageLimitServer(userId)`**
   - Queries `creation_logs` for unique character IDs in last 24h
   - Returns count, limit, and whether creation is allowed
   - Simple, no reconciliation logic

2. **`logCharacterCreation(userId, characterId, wasAllowed, errorMessage?)`**
   - Single function to log ANY creation attempt
   - Replaces both `incrementUsageCountServer` and `logCreationAttemptServer`
   - Returns success/error for visibility

3. **`hasCharacterBeenLogged(userId, characterId)`**
   - Checks if character ID already exists in logs
   - Prevents double-counting on regenerations

### Where It's Used

#### `/api/generate-section` (main character generation)
- Each character generates 3 sections: personality, scenario, bio
- **Only the FIRST section** logs the character
- Subsequent sections for same character are free

#### `/api/process-characters` (bulk/wizard generation)
- Used for multi-character creation
- Logs each unique character once

### Database Requirements

The fix relies on the `creation_logs` table having proper structure and permissions.

**Run this SQL in Supabase** (already saved to `supabase/migrations/004_fix_usage_tracking_schema.sql`):

```sql
-- Ensure creation_logs exists
CREATE TABLE IF NOT EXISTS public.creation_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    character_id UUID NULL,
    creation_type TEXT NOT NULL DEFAULT 'CHARACTER',
    plan_type TEXT NOT NULL,
    was_allowed BOOLEAN NOT NULL DEFAULT true,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.creation_logs ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own logs
CREATE POLICY "Users can view their own creation logs" ON public.creation_logs
    FOR SELECT USING (auth.uid() = user_id);

-- Allow users to insert their own logs  
CREATE POLICY "Users can insert their own creation logs" ON public.creation_logs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- CRITICAL: Allow service role (backend) full access
CREATE POLICY "Service role can do everything on creation_logs" ON public.creation_logs
    FOR ALL USING (auth.role() = 'service_role');

-- Grant permissions
GRANT ALL ON public.creation_logs TO postgres, service_role;
GRANT SELECT, INSERT ON public.creation_logs TO authenticated;
```

## Testing

1. **Fresh Start**: Clear your browser cache and/or create a NEW test account
2. **Create Character 1**: Should work, count shows "1 / 2"
3. **Regenerate Sections**: Should NOT increment count (still "1 / 2")
4. **Create Character 2**: Should work, count shows "2 / 2"  
5. **Try Character 3**: Should be BLOCKED with upgrade modal

## Files Changed

- ✅ `lib/subscriptions/server.ts` - Completely rewritten (simplified)
- ✅ `app/api/generate-section/route.ts` - Updated to use new functions
- ✅ `app/api/process-characters/route.ts` - Updated to use new functions
- ✅ `context/CharacterContext.tsx` - Fixed ID generation (UUIDs)
- ✅ `supabase/migrations/004_fix_usage_tracking_schema.sql` - Database fix

## Why This Will Work

1. **No silent failures**: Every log operation returns success/error
2. **No sync issues**: Only one table to query
3. **No RLS blocks**: Service role has explicit permission
4. **Simple counting**: Just count unique IDs in last 24h
5. **Proper UUIDs**: Character IDs match database expectations

## Monitoring

Check server logs for these messages:
- `✓ Logged creation for character {id}` - Success
- `✗ Failed to log creation` - Database error (investigate)
- `Character {id} already logged - free regeneration` - Working as intended
- `Found X unique characters in last 24h` - Current usage

## Rollback Plan

If issues occur, you can temporarily disable limits by setting `PLAN_LIMITS.FREE = 999` in `lib/subscriptions/server.ts` line 40.
