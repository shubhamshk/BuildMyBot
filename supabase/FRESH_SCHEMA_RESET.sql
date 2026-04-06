-- ============================================================
-- CHARACTERIA / BUILDMYBOT — COMPLETE FRESH DATABASE SCHEMA
-- Run this ENTIRE script in your Supabase SQL Editor
-- It will drop all existing tables and recreate them cleanly
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- 0. SAFE CLEANUP: Drop all triggers, functions, and tables
-- ────────────────────────────────────────────────────────────

-- Drop triggers first (to avoid dependency errors)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS update_characters_updated_at ON characters;
DROP TRIGGER IF EXISTS update_subscriptions_updated_at ON subscriptions;
DROP TRIGGER IF EXISTS update_usage_tracking_updated_at ON usage_tracking;

-- Drop functions
DROP FUNCTION IF EXISTS create_user_subscription() CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Drop tables in correct dependency order (children before parents)
DROP TABLE IF EXISTS public.creation_logs CASCADE;
DROP TABLE IF EXISTS public.purchases CASCADE;
DROP TABLE IF EXISTS public.donations CASCADE;
DROP TABLE IF EXISTS public.usage_tracking CASCADE;
DROP TABLE IF EXISTS public.subscriptions CASCADE;
DROP TABLE IF EXISTS public.characters CASCADE;

-- ────────────────────────────────────────────────────────────
-- 1. CHARACTERS TABLE
-- ────────────────────────────────────────────────────────────
CREATE TABLE public.characters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Basic character info
  name TEXT NOT NULL,
  age TEXT NOT NULL,
  gender TEXT NOT NULL,
  setting TEXT NOT NULL,
  relationship TEXT NOT NULL,

  -- Personality sliders (0–100)
  personality_warmth INTEGER NOT NULL DEFAULT 50,
  personality_confidence INTEGER NOT NULL DEFAULT 50,
  personality_calmness INTEGER NOT NULL DEFAULT 50,
  personality_reserve INTEGER NOT NULL DEFAULT 50,

  -- Optional style settings
  backstory_style TEXT,
  speech_tone TEXT,
  speech_vocabulary TEXT,
  speech_patterns TEXT,
  content_rating TEXT,
  topics TEXT,
  tone TEXT,

  -- Generated content
  generated_personality TEXT,
  generated_backstory TEXT,
  generated_traits TEXT,
  generated_speech TEXT,
  generated_initial_message TEXT,
  generated_scenario TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX characters_user_id_idx ON public.characters(user_id);
CREATE INDEX characters_created_at_idx ON public.characters(created_at DESC);

-- ────────────────────────────────────────────────────────────
-- 2. SUBSCRIPTIONS TABLE
-- ────────────────────────────────────────────────────────────
CREATE TABLE public.subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Plan details — includes ALL plan types used in code
  plan_type TEXT NOT NULL DEFAULT 'FREE'
    CHECK (plan_type IN ('FREE', 'PRO_MONTHLY', 'PRO_YEARLY', 'ULTIMATE_CREATOR')),
  subscription_status TEXT NOT NULL DEFAULT 'ACTIVE'
    CHECK (subscription_status IN ('ACTIVE', 'INACTIVE', 'CANCELLED', 'EXPIRED')),

  -- PayPal integration
  paypal_subscription_id TEXT UNIQUE,
  paypal_plan_id TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  expires_at TIMESTAMPTZ,

  -- One record per user
  CONSTRAINT unique_user_subscription UNIQUE (user_id)
);

CREATE INDEX subscriptions_user_id_idx ON public.subscriptions(user_id);
CREATE INDEX subscriptions_status_idx ON public.subscriptions(subscription_status);
CREATE INDEX subscriptions_paypal_id_idx ON public.subscriptions(paypal_subscription_id);

-- ────────────────────────────────────────────────────────────
-- 3. USAGE TRACKING TABLE
-- ────────────────────────────────────────────────────────────
CREATE TABLE public.usage_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  daily_creation_count INTEGER NOT NULL DEFAULT 0,
  last_reset_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  CONSTRAINT unique_user_usage UNIQUE (user_id)
);

CREATE INDEX usage_tracking_user_id_idx ON public.usage_tracking(user_id);

-- ────────────────────────────────────────────────────────────
-- 4. CREATION LOGS TABLE (tracks daily character creations)
-- ────────────────────────────────────────────────────────────
CREATE TABLE public.creation_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  character_id UUID,  -- nullable in case character gets deleted

  creation_type TEXT NOT NULL DEFAULT 'CHARACTER',
  plan_type TEXT NOT NULL,
  was_allowed BOOLEAN NOT NULL DEFAULT true,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX creation_logs_user_id_idx ON public.creation_logs(user_id);
CREATE INDEX creation_logs_created_at_idx ON public.creation_logs(created_at DESC);

-- ────────────────────────────────────────────────────────────
-- 5. PURCHASES TABLE (pack/one-time product purchases via PayPal)
-- Tracks payments captured from /api/paypal/capture-order
-- ────────────────────────────────────────────────────────────
CREATE TABLE public.purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Buyer info (can be non-authenticated customers)
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,  -- nullable if buying as guest
  email TEXT NOT NULL,

  -- What they bought
  item_id TEXT NOT NULL,          -- e.g. "starter-pack", "pro-bundle"
  item_name TEXT,
  amount NUMERIC(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',

  -- PayPal transaction details
  paypal_order_id TEXT UNIQUE NOT NULL,
  paypal_capture_id TEXT UNIQUE,
  paypal_payer_id TEXT,
  paypal_payer_email TEXT,
  paypal_status TEXT NOT NULL DEFAULT 'PENDING'
    CHECK (paypal_status IN ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED')),

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX purchases_email_idx ON public.purchases(email);
CREATE INDEX purchases_user_id_idx ON public.purchases(user_id);
CREATE INDEX purchases_paypal_order_id_idx ON public.purchases(paypal_order_id);
CREATE INDEX purchases_created_at_idx ON public.purchases(created_at DESC);

-- ────────────────────────────────────────────────────────────
-- 6. DONATIONS TABLE (tracks donations via /api/paypal/create-donation)
-- ────────────────────────────────────────────────────────────
CREATE TABLE public.donations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Donor info
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,  -- nullable (guest donors)
  email TEXT NOT NULL,

  -- Donation details
  amount NUMERIC(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  plan_name TEXT,                  -- e.g. "Custom Support ($25)", "Premium VIP"
  is_custom BOOLEAN NOT NULL DEFAULT false,

  -- PayPal transaction details
  paypal_order_id TEXT UNIQUE NOT NULL,
  paypal_capture_id TEXT UNIQUE,
  paypal_payer_id TEXT,
  paypal_payer_email TEXT,
  paypal_status TEXT NOT NULL DEFAULT 'PENDING'
    CHECK (paypal_status IN ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED')),

  -- Extra metadata
  notes TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX donations_email_idx ON public.donations(email);
CREATE INDEX donations_user_id_idx ON public.donations(user_id);
CREATE INDEX donations_paypal_order_id_idx ON public.donations(paypal_order_id);
CREATE INDEX donations_created_at_idx ON public.donations(created_at DESC);

-- ────────────────────────────────────────────────────────────
-- 7. AUTO-UPDATE updated_at FUNCTION & TRIGGERS
-- ────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_characters_updated_at
  BEFORE UPDATE ON public.characters
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_usage_tracking_updated_at
  BEFORE UPDATE ON public.usage_tracking
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_purchases_updated_at
  BEFORE UPDATE ON public.purchases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_donations_updated_at
  BEFORE UPDATE ON public.donations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ────────────────────────────────────────────────────────────
-- 8. AUTO-CREATE SUBSCRIPTION + USAGE RECORDS ON SIGNUP
-- ────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION create_user_records()
RETURNS TRIGGER AS $$
BEGIN
  -- Create FREE subscription row
  INSERT INTO public.subscriptions (user_id, plan_type, subscription_status)
  VALUES (NEW.id, 'FREE', 'ACTIVE')
  ON CONFLICT (user_id) DO NOTHING;

  -- Create usage tracking row
  INSERT INTO public.usage_tracking (user_id, daily_creation_count, last_reset_at)
  VALUES (NEW.id, 0, NOW())
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING '[create_user_records] Error for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION create_user_records();

-- ────────────────────────────────────────────────────────────
-- 9. ROW LEVEL SECURITY
-- ────────────────────────────────────────────────────────────

-- CHARACTERS
ALTER TABLE public.characters ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own characters"   ON public.characters FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own characters" ON public.characters FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own characters" ON public.characters FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own characters" ON public.characters FOR DELETE USING (auth.uid() = user_id);
-- Service role bypass (for admin operations)
CREATE POLICY "Service role full access to characters" ON public.characters FOR ALL USING (auth.role() = 'service_role');

-- SUBSCRIPTIONS
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own subscription"   ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own subscription" ON public.subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own subscription" ON public.subscriptions FOR UPDATE USING (auth.uid() = user_id);
-- Service role can update any subscription (needed for webhook/payment capture)
CREATE POLICY "Service role full access to subscriptions" ON public.subscriptions FOR ALL USING (auth.role() = 'service_role');

-- USAGE TRACKING
ALTER TABLE public.usage_tracking ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own usage"   ON public.usage_tracking FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own usage" ON public.usage_tracking FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own usage" ON public.usage_tracking FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Service role full access to usage_tracking" ON public.usage_tracking FOR ALL USING (auth.role() = 'service_role');

-- CREATION LOGS
ALTER TABLE public.creation_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own logs"   ON public.creation_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own logs" ON public.creation_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Service role full access to creation_logs" ON public.creation_logs FOR ALL USING (auth.role() = 'service_role');

-- PURCHASES  (service role only for writes — buyers are identified by email, not necessarily auth'd)
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own purchases" ON public.purchases FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service role full access to purchases" ON public.purchases FOR ALL USING (auth.role() = 'service_role');

-- DONATIONS (service role only for writes)
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own donations" ON public.donations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service role full access to donations" ON public.donations FOR ALL USING (auth.role() = 'service_role');

-- ────────────────────────────────────────────────────────────
-- 10. GRANT EXPLICIT PERMISSIONS
-- ────────────────────────────────────────────────────────────
GRANT ALL ON public.characters       TO postgres, service_role;
GRANT ALL ON public.subscriptions    TO postgres, service_role;
GRANT ALL ON public.usage_tracking   TO postgres, service_role;
GRANT ALL ON public.creation_logs    TO postgres, service_role;
GRANT ALL ON public.purchases        TO postgres, service_role;
GRANT ALL ON public.donations        TO postgres, service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.characters     TO authenticated;
GRANT SELECT, INSERT, UPDATE         ON public.subscriptions  TO authenticated;
GRANT SELECT, INSERT, UPDATE         ON public.usage_tracking TO authenticated;
GRANT SELECT, INSERT                 ON public.creation_logs  TO authenticated;
GRANT SELECT                         ON public.purchases      TO authenticated;
GRANT SELECT                         ON public.donations      TO authenticated;

-- ────────────────────────────────────────────────────────────
-- 11. BACKFILL: existing users who have no subscription row yet
-- ────────────────────────────────────────────────────────────
INSERT INTO public.subscriptions (user_id, plan_type, subscription_status)
SELECT id, 'FREE', 'ACTIVE'
FROM auth.users
WHERE id NOT IN (SELECT user_id FROM public.subscriptions)
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO public.usage_tracking (user_id, daily_creation_count, last_reset_at)
SELECT id, 0, NOW()
FROM auth.users
WHERE id NOT IN (SELECT user_id FROM public.usage_tracking)
ON CONFLICT (user_id) DO NOTHING;

-- ────────────────────────────────────────────────────────────
-- DONE ✓
-- Tables created: characters, subscriptions, usage_tracking,
--                 creation_logs, purchases, donations
-- ────────────────────────────────────────────────────────────
