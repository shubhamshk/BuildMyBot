-- Migration 003: Fix subscription trigger and plan_type constraint
-- This migration is idempotent (safe to run multiple times)

-- ① Ensure plan_type includes ULTIMATE_CREATOR (in case migration 002 was applied before)
DO $$
BEGIN
  -- Drop old constraint if it exists (doesn't include ULTIMATE_CREATOR)
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'subscriptions'
    AND constraint_name = 'subscriptions_plan_type_check'
  ) THEN
    ALTER TABLE public.subscriptions DROP CONSTRAINT subscriptions_plan_type_check;
  END IF;

  -- Add updated constraint with all plan types
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'subscriptions'
    AND constraint_name = 'subscriptions_plan_type_check'
  ) THEN
    ALTER TABLE public.subscriptions
      ADD CONSTRAINT subscriptions_plan_type_check
      CHECK (plan_type IN ('FREE', 'PRO_MONTHLY', 'PRO_YEARLY', 'ULTIMATE_CREATOR'));
  END IF;
END $$;

-- ② Recreate the user signup trigger function more robustly
CREATE OR REPLACE FUNCTION create_user_subscription()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.subscriptions (user_id, plan_type, subscription_status)
  VALUES (NEW.id, 'FREE', 'ACTIVE')
  ON CONFLICT (user_id) DO NOTHING;

  INSERT INTO public.usage_tracking (user_id, daily_creation_count, last_reset_at)
  VALUES (NEW.id, 0, NOW())
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Error creating records for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ③ Ensure the trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION create_user_subscription();

-- ④ Service role policies for subscriptions (needed for webhook/admin updates)
DROP POLICY IF EXISTS "Service role full access to subscriptions" ON public.subscriptions;
CREATE POLICY "Service role full access to subscriptions" ON public.subscriptions
  FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role full access to usage_tracking" ON public.usage_tracking;
CREATE POLICY "Service role full access to usage_tracking" ON public.usage_tracking
  FOR ALL USING (auth.role() = 'service_role');
