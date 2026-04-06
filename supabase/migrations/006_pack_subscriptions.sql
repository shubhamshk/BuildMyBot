-- Migration: Add pack_subscriptions table for recurring pack payments
-- Run this in Supabase SQL Editor

-- Drop old table if it still exists
DROP TABLE IF EXISTS public.user_pack_subscriptions CASCADE;

-- Create new pack_subscriptions table
CREATE TABLE IF NOT EXISTS public.pack_subscriptions (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                 UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email                   TEXT NOT NULL DEFAULT '',
  pack_id                 TEXT NOT NULL,
  pack_name               TEXT NOT NULL DEFAULT '',
  amount                  NUMERIC(10, 2) NOT NULL,
  currency                TEXT NOT NULL DEFAULT 'USD',
  paypal_subscription_id  TEXT UNIQUE,
  paypal_plan_id          TEXT,
  paypal_product_id       TEXT,
  status                  TEXT NOT NULL DEFAULT 'PENDING'
                            CHECK (status IN ('PENDING', 'ACTIVE', 'CANCELLED', 'SUSPENDED', 'EXPIRED')),
  next_billing_date       TIMESTAMPTZ,
  cancelled_at            TIMESTAMPTZ,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_pack_subscriptions_user_id  ON public.pack_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_pack_subscriptions_pack_id  ON public.pack_subscriptions(pack_id);
CREATE INDEX IF NOT EXISTS idx_pack_subscriptions_status   ON public.pack_subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_pack_subscriptions_paypal_id ON public.pack_subscriptions(paypal_subscription_id);

-- Enable Row Level Security
ALTER TABLE public.pack_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can read their own subscriptions
CREATE POLICY "Users can read own pack subscriptions"
  ON public.pack_subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Only service role (admin) can insert/update/delete
CREATE POLICY "Service role full access to pack subscriptions"
  ON public.pack_subscriptions FOR ALL
  USING (true)
  WITH CHECK (true);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_pack_subscriptions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_pack_subscriptions_updated_at ON public.pack_subscriptions;
CREATE TRIGGER trg_pack_subscriptions_updated_at
  BEFORE UPDATE ON public.pack_subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_pack_subscriptions_updated_at();
