/**
 * Server-side subscription service
 * For use in API routes and server components
 */

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
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
 * Sync usage count from creation_logs table (last 24 hours)
 * This ensures accuracy by counting actual successful creations
 */
export async function syncUsageFromLogsServer(userId: string): Promise<number> {
  const supabase = createAdminClient();

  // Get the last reset time (24 hours ago)
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  // Count successful creations in the last 24 hours
  const { count, error } = await supabase
    .from("creation_logs")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("was_allowed", true)
    .gte("created_at", twentyFourHoursAgo.toISOString());

  if (error) {
    console.error("Error counting creation logs:", error);
    // Fallback: try to get from usage_tracking directly
    const { data: usage } = await supabase
      .from("usage_tracking")
      .select("daily_creation_count")
      .eq("user_id", userId)
      .single();

    return usage?.daily_creation_count || 0;
  }

  const actualCount = count || 0;

  // Update usage_tracking to match actual count
  // We don't care about the result of this update, just fire and forget (awaiting to ensure it runs)
  const { error: upsertError } = await supabase
    .from("usage_tracking")
    .upsert({
      user_id: userId,
      daily_creation_count: actualCount,
      last_reset_at: twentyFourHoursAgo.toISOString(),
      updated_at: now.toISOString(),
    }, { onConflict: "user_id" });

  if (upsertError) {
    console.error("Error syncing usage tracking:", upsertError);
  }

  return actualCount;
}

/**
 * Get user's subscription (server-side)
 */
export async function getUserSubscriptionServer(userId: string): Promise<{
  data: Subscription | null;
  error: string | null;
}> {
  const supabase = createAdminClient();

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
  const supabase = createAdminClient();

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
 * Check if user can create a character (server-side)
 */
export async function checkUsageLimitServer(userId: string): Promise<UsageLimitResult> {
  const supabase = createAdminClient();

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

  // SYNC from creation_logs for accuracy
  // This counts actual successful creations in the last 24 hours
  const currentCount = await syncUsageFromLogsServer(userId);

  const limit = PLAN_LIMITS[subscription.plan_type];
  const now = new Date();
  const resetAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24h from now

  if (currentCount >= limit) {
    return {
      allowed: false,
      reason: `Daily limit of ${limit} creations reached. Creates will reset as older ones expire (rolling 24h window).`,
      currentCount,
      limit,
      resetAt: resetAt.toISOString(),
    };
  }

  return {
    allowed: true,
    currentCount,
    limit,
    resetAt: resetAt.toISOString(),
  };
}

/**
 * Increment usage count after successful creation (server-side)
 * uses Admin Client to bypass RLS
 */
export async function incrementUsageCountServer(userId: string): Promise<{
  success: boolean;
  error: string | null;
}> {
  // Use Admin Client to ensure we can update usage tracking regardless of RLS
  const supabase = createAdminClient();

  // We primarily rely on Sync from logs, but we can increment locally to keep cache fresh immediately
  const { data: usage, error: usageError } = await getUserUsageServer(userId);

  if (usageError || !usage) {
    return { success: false, error: "Failed to get usage data" };
  }

  const newCount = usage.daily_creation_count + 1;
  const now = new Date();

  // Update with new values
  const { error: updateError } = await supabase
    .from("usage_tracking")
    .update({
      daily_creation_count: newCount,
      updated_at: now.toISOString(),
    })
    .eq("user_id", userId);

  if (updateError) {
    console.error("Failed to increment usage:", updateError);
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
  const supabase = createAdminClient();

  const { data: subscription } = await getUserSubscriptionServer(userId);
  const planType = subscription?.plan_type || "FREE";

  const { error } = await supabase.from("creation_logs").insert({
    user_id: userId,
    character_id: characterId,
    plan_type: planType,
    was_allowed: wasAllowed,
    error_message: errorMessage || null,
  });

  if (error) {
    console.error("CRITICAL: Failed to write to creation_logs:", error);
    // We cannot do much else, but logging is essential for debugging
  }
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
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("subscriptions")
    .update(updates)
    .eq("user_id", userId);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}
