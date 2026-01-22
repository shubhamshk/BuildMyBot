/**
 * Server-side subscription service - SIMPLIFIED FOR RELIABILITY
 * Single source of truth: creation_logs table
 */

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
  PRO_YEARLY: 15,
  ULTIMATE_CREATOR: 100,
};

/**
 * Get user's subscription (server-side)
 */
export async function getUserSubscriptionServer(userId: string): Promise<{
  data: Subscription | null;
  error: string | null;
}> {
  try {
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        console.log(`[getUserSubscriptionServer] Creating FREE subscription for user ${userId}`);
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
          console.error(`[getUserSubscriptionServer] Failed to create subscription:`, createError);
          return { data: null, error: createError.message };
        }
        return { data: newSub, error: null };
      }
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error: any) {
    console.error(`[getUserSubscriptionServer] Unexpected error:`, error);
    return { data: null, error: error.message || "Unexpected error fetching subscription" };
  }
}

/**
 * Check if user can create a character (server-side)
 * SIMPLIFIED: Count unique character IDs from creation_logs in last 24h
 */
export async function checkUsageLimitServer(userId: string): Promise<UsageLimitResult> {
  const supabase = createAdminClient();

  console.log(`[checkUsageLimitServer] Checking usage for user: ${userId}`);

  // Get subscription
  const { data: subscription, error: subError } = await getUserSubscriptionServer(userId);
  if (subError || !subscription) {
    console.error(`[checkUsageLimitServer] Failed to get subscription:`, subError);
    return {
      allowed: false,
      reason: "Failed to get subscription",
      currentCount: 0,
      limit: PLAN_LIMITS["FREE"],
      resetAt: new Date().toISOString(),
    };
  }

  const limit = PLAN_LIMITS[subscription.plan_type];

  // Check subscription status - only enforce for paid plans
  if (subscription.subscription_status !== "ACTIVE" && subscription.plan_type !== "FREE") {
    console.warn(`[checkUsageLimitServer] Paid subscription not active for user ${userId}`);
    return {
      allowed: false,
      reason: "Subscription is not active",
      currentCount: 0,
      limit,
      resetAt: new Date().toISOString(),
    };
  }

  // Count UNIQUE character IDs created in last 24 hours  
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  console.log(`[checkUsageLimitServer] Counting unique characters since ${twentyFourHoursAgo.toISOString()}`);

  // Query to get distinct character IDs
  const { data: logs, error: logsError } = await supabase
    .from("creation_logs")
    .select("character_id")
    .eq("user_id", userId)
    .eq("was_allowed", true)
    .not("character_id", "is", null)
    .gte("created_at", twentyFourHoursAgo.toISOString());

  if (logsError) {
    console.error("[checkUsageLimitServer] Error querying logs:", logsError);
    // Be conservative: deny access if we can't verify
    return {
      allowed: false,
      reason: "Error checking usage limits",
      currentCount: 0,
      limit,
      resetAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };
  }

  // Count unique character IDs
  const uniqueCharacterIds = new Set(logs?.map(log => log.character_id) || []);
  const currentCount = uniqueCharacterIds.size;

  console.log(`[checkUsageLimitServer] Found ${currentCount} unique characters in last 24h (limit: ${limit})`);
  console.log(`[checkUsageLimitServer] Unique character IDs:`, Array.from(uniqueCharacterIds));

  const resetAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  if (currentCount >= limit) {
    return {
      allowed: false,
      reason: `Daily limit of ${limit} creations reached. Limit resets in 24 hours from your oldest creation.`,
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
 * Log a successful character creation
 * This is the ONLY function that records usage
 */
export async function logCharacterCreation(
  userId: string,
  characterId: string,
  wasAllowed: boolean = true,
  errorMessage?: string
): Promise<{ success: boolean; error: string | null }> {
  const supabase = createAdminClient();

  console.log(`[logCharacterCreation] Logging creation for user ${userId}, character ${characterId}, allowed: ${wasAllowed}`);

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
    console.error("[logCharacterCreation] CRITICAL: Failed to write to creation_logs:", error);
    return { success: false, error: error.message };
  }

  console.log(`[logCharacterCreation] ✓ Successfully logged creation for character ${characterId}`);
  return { success: true, error: null };
}

/**
 * Check if a specific character has already been logged
 * Used to prevent double-counting when regenerating sections
 */
export async function hasCharacterBeenLogged(userId: string, characterId: string): Promise<boolean> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("creation_logs")
    .select("id")
    .eq("user_id", userId)
    .eq("character_id", characterId)
    .eq("was_allowed", true)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("[hasCharacterBeenLogged] Error checking logs:", error);
    return false;
  }

  const hasBeenLogged = !!data;
  console.log(`[hasCharacterBeenLogged] Character ${characterId} logged before: ${hasBeenLogged}`);
  return hasBeenLogged;
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
