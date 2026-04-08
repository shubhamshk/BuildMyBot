-- Migration: Add discord_username to pack_subscriptions
-- Run this in Supabase SQL Editor

ALTER TABLE public.pack_subscriptions ADD COLUMN IF NOT EXISTS discord_username TEXT;
