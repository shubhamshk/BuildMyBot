/**
 * Server-side subscription service
 * For use in API routes and server components
 */

import { createClient } from "@/lib/supabase/server";
import type { PlanType, SubscriptionStatus } from "./service";

export interface Subscription {
  id: string;
  user_id: string;
  plan_type: PlanType;
  subscription_status: SubscriptionStatus;
  paypal_subscription_id?: string;
  paypal_plan_id?: string;
  created_at: string;
  updated_at: string;
  expires_at?: string;
}

export interface UsageTracking {
  id: string;
  user_id: string;
  daily_creation_count: number;
  last_reset_at: string;
  created_at: string;
  updated_at: string;
}

export interface UsageLimitResult {
  allowed: boolean;
  reason?: string;
  currentCount: number;
  limit: number;
  resetAt: string;
}

const PLAN_LIMITS: Record<PlanType, number> = {
  FREE: 2,
  PRO_MONTHLY: 10,
  PRO_YEARLY: 10,
};

/**
 * Get user's subscription (server-side)
 */
export async function getUserSubscriptionServer(userId: string): Promise<{
  data: Subscription | null;
  error: string | null;
}> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // Create default FREE subscription
      const { data: newSub, error: createError } = await supabase
        .from("subscriptions")
        .insert({
          user_id: userId,
          plan_type: "FREE",
          subscription_status: "ACTIVE",
        })
        .select()
        .single();

      if (createError) {
        return { data: null, error: createError.message };
      }
      return { data: newSub, error: null };
    }
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

/**
 * Get user's usage tracking (server-side)
 */
export async function getUserUsageServer(userId: string): Promise<{
  data: UsageTracking | null;
  error: string | null;
}> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("usage_tracking")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // Create default usage record
      const { data: newUsage, error: createError } = await supabase
        .from("usage_tracking")
        .insert({
          user_id: userId,
          daily_creation_count: 0,
          last_reset_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (createError) {
        return { data: null, error: createError.message };
      }
      return { data: newUsage, error: null };
    }
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

/**
 * Reset usage count if 24 hours have passed
 */
async function resetUsageIfNeededServer(
  userId: string,
  usage: UsageTracking
): Promise<void> {
  const supabase = await createClient();
  const lastReset = new Date(usage.last_reset_at);
  const now = new Date();
  const hoursSinceReset = (now.getTime() - lastReset.getTime()) / (1000 * 60 * 60);

  if (hoursSinceReset >= 24) {
    await supabase
      .from("usage_tracking")
      .update({
        daily_creation_count: 0,
        last_reset_at: now.toISOString(),
      })
      .eq("user_id", userId);
  }
}

/**
 * Check if user can create a character (server-side)
 */
export async function checkUsageLimitServer(userId: string): Promise<UsageLimitResult> {
  const supabase = await createClient();

  // Get subscription
  const { data: subscription, error: subError } = await getUserSubscriptionServer(userId);
  if (subError || !subscription) {
    return {
      allowed: false,
      reason: "Failed to get subscription",
      currentCount: 0,
      limit: 0,
      resetAt: new Date().toISOString(),
    };
  }

  // Check subscription status
  if (subscription.subscription_status !== "ACTIVE") {
    return {
      allowed: false,
      reason: "Subscription is not active",
      currentCount: 0,
      limit: PLAN_LIMITS[subscription.plan_type],
      resetAt: new Date().toISOString(),
    };
  }

  // Get usage
  const { data: usage, error: usageError } = await getUserUsageServer(userId);
  if (usageError || !usage) {
    return {
      allowed: false,
      reason: "Failed to get usage data",
      currentCount: 0,
      limit: PLAN_LIMITS[subscription.plan_type],
      resetAt: new Date().toISOString(),
    };
  }

  // Reset if needed
  await resetUsageIfNeededServer(userId, usage);

  // Refresh usage after potential reset
  const { data: updatedUsage } = await getUserUsageServer(userId);
  const currentUsage = updatedUsage || usage;

  const limit = PLAN_LIMITS[subscription.plan_type];
  const currentCount = currentUsage.daily_creation_count;

  if (currentCount >= limit) {
    const resetAt = new Date(currentUsage.last_reset_at);
    resetAt.setHours(resetAt.getHours() + 24);
    return {
      allowed: false,
      reason: `Daily limit of ${limit} creations reached. Resets in ${Math.ceil(
        (resetAt.getTime() - new Date().getTime()) / (1000 * 60 * 60)
      )} hours.`,
      currentCount,
      limit,
      resetAt: resetAt.toISOString(),
    };
  }

  return {
    allowed: true,
    currentCount,
    limit,
    resetAt: new Date(currentUsage.last_reset_at).toISOString(),
  };
}

/**
 * Increment usage count after successful creation (server-side)
 */
export async function incrementUsageCountServer(userId: string): Promise<{
  success: boolean;
  error: string | null;
}> {
  const supabase = await createClient();

  // Get current usage
  const { data: usage, error: usageError } = await getUserUsageServer(userId);
  if (usageError || !usage) {
    return { success: false, error: "Failed to get usage data" };
  }

  // Reset if needed before incrementing
  await resetUsageIfNeededServer(userId, usage);

  // Increment count
  const { error: updateError } = await supabase
    .from("usage_tracking")
    .update({
      daily_creation_count: (usage.daily_creation_count + 1),
    })
    .eq("user_id", userId);

  if (updateError) {
    return { success: false, error: updateError.message };
  }

  return { success: true, error: null };
}

/**
 * Log creation attempt (server-side)
 */
export async function logCreationAttemptServer(
  userId: string,
  characterId: string | null,
  wasAllowed: boolean,
  errorMessage?: string
): Promise<void> {
  const supabase = await createClient();

  const { data: subscription } = await getUserSubscriptionServer(userId);
  const planType = subscription?.plan_type || "FREE";

  await supabase.from("creation_logs").insert({
    user_id: userId,
    character_id: characterId,
    plan_type: planType,
    was_allowed: wasAllowed,
    error_message: errorMessage || null,
  });
}

/**
 * Update subscription (server-side)
 */
export async function updateSubscriptionServer(
  userId: string,
  updates: {
    plan_type?: PlanType;
    subscription_status?: SubscriptionStatus;
    paypal_subscription_id?: string;
    paypal_plan_id?: string;
    expires_at?: string;
  }
): Promise<{ success: boolean; error: string | null }> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("subscriptions")
    .update(updates)
    .eq("user_id", userId);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}
