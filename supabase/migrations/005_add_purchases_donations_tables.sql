-- Migration 005: Add purchases and donations tables for PayPal payment tracking
-- Run this in Supabase SQL Editor

-- ── purchases table ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT NOT NULL,

  item_id TEXT NOT NULL,
  item_name TEXT,
  amount NUMERIC(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',

  paypal_order_id TEXT UNIQUE NOT NULL,
  paypal_capture_id TEXT UNIQUE,
  paypal_payer_id TEXT,
  paypal_payer_email TEXT,
  paypal_status TEXT NOT NULL DEFAULT 'PENDING'
    CHECK (paypal_status IN ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED')),

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS purchases_email_idx          ON public.purchases(email);
CREATE INDEX IF NOT EXISTS purchases_user_id_idx        ON public.purchases(user_id);
CREATE INDEX IF NOT EXISTS purchases_paypal_order_id_idx ON public.purchases(paypal_order_id);
CREATE INDEX IF NOT EXISTS purchases_created_at_idx     ON public.purchases(created_at DESC);

-- ── donations table ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.donations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT NOT NULL,

  amount NUMERIC(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  plan_name TEXT,
  is_custom BOOLEAN NOT NULL DEFAULT false,

  paypal_order_id TEXT UNIQUE NOT NULL,
  paypal_capture_id TEXT UNIQUE,
  paypal_payer_id TEXT,
  paypal_payer_email TEXT,
  paypal_status TEXT NOT NULL DEFAULT 'PENDING'
    CHECK (paypal_status IN ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED')),

  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS donations_email_idx          ON public.donations(email);
CREATE INDEX IF NOT EXISTS donations_user_id_idx        ON public.donations(user_id);
CREATE INDEX IF NOT EXISTS donations_paypal_order_id_idx ON public.donations(paypal_order_id);
CREATE INDEX IF NOT EXISTS donations_created_at_idx     ON public.donations(created_at DESC);

-- ── updated_at triggers ──────────────────────────────────────────────────────
DROP TRIGGER IF EXISTS update_purchases_updated_at ON public.purchases;
CREATE TRIGGER update_purchases_updated_at
  BEFORE UPDATE ON public.purchases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_donations_updated_at ON public.donations;
CREATE TRIGGER update_donations_updated_at
  BEFORE UPDATE ON public.donations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ── RLS ──────────────────────────────────────────────────────────────────────
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own purchases"             ON public.purchases;
DROP POLICY IF EXISTS "Service role full access to purchases"    ON public.purchases;
DROP POLICY IF EXISTS "Users can view own donations"             ON public.donations;
DROP POLICY IF EXISTS "Service role full access to donations"    ON public.donations;

CREATE POLICY "Users can view own purchases"          ON public.purchases FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service role full access to purchases" ON public.purchases FOR ALL   USING (auth.role() = 'service_role');

CREATE POLICY "Users can view own donations"          ON public.donations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service role full access to donations" ON public.donations FOR ALL   USING (auth.role() = 'service_role');

-- ── Permissions ──────────────────────────────────────────────────────────────
GRANT ALL ON public.purchases TO postgres, service_role;
GRANT ALL ON public.donations TO postgres, service_role;
GRANT SELECT ON public.purchases TO authenticated;
GRANT SELECT ON public.donations TO authenticated;
