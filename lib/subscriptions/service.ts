/**
 * Subscription and Usage Limit Service
 * Handles subscription management and usage limit enforcement
 */

import { createClient } from "@/lib/supabase/client";

export type PlanType = "FREE" | "PRO_MONTHLY" | "PRO_YEARLY";
export type SubscriptionStatus = "ACTIVE" | "INACTIVE" | "CANCELLED" | "EXPIRED";

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

// Plan limits configuration
export const PLAN_LIMITS: Record<PlanType, number> = {
  FREE: 2,
  PRO_MONTHLY: 10,
  PRO_YEARLY: 10,
};

/**
 * Get user's subscription
 */
export async function getUserSubscription(): Promise<{
  data: Subscription | null;
  error: string | null;
}> {
  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { data: null, error: "User not authenticated" };
  }

  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error) {
    // If no subscription exists, create a default FREE one
    if (error.code === "PGRST116") {
      const { data: newSub, error: createError } = await supabase
        .from("subscriptions")
        .insert({
          user_id: user.id,
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
 * Get user's usage tracking
 * NOW DEPRECATED for usage checks - use checkUsageLimit() which calls API
 */
export async function getUserUsage(): Promise<{
  data: UsageTracking | null;
  error: string | null;
}> {
  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { data: null, error: "User not authenticated" };
  }

  const { data, error } = await supabase
    .from("usage_tracking")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // Create default
      const { data: newUsage, error: createError } = await supabase
        .from("usage_tracking")
        .insert({
          user_id: user.id,
          daily_creation_count: 0,
          last_reset_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (createError) return { data: null, error: createError.message };
      return { data: newUsage, error: null };
    }
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

/**
 * Check if user can create a character (usage limit check)
 * FETCHES FROM SERVER API for accuracy and RLS bypass
 */
export async function checkUsageLimit(): Promise<UsageLimitResult> {
  try {
    const response = await fetch("/api/subscriptions/usage", {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch usage limit");
    }

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }

    return data as UsageLimitResult;
  } catch (error) {
    console.error("Check usage limit error:", error);
    // Fallback to strict unknown state
    return {
      allowed: false,
      reason: "Could not verify usage limit (Network Error)",
      currentCount: 0,
      limit: 0,
      resetAt: new Date().toISOString(),
    };
  }
}

/**
 * Increment usage count
 * @deprecated Should be handled by server endpoints
 */
export async function incrementUsageCount(): Promise<{
  success: boolean;
  error: string | null;
}> {
  console.warn("incrementUsageCount (client) is deprecated. Usage is tracked by server actions.");
  return { success: true, error: null };
}

/**
 * Log creation attempt
 * @deprecated Should be handled by server endpoints
 */
export async function logCreationAttempt(
  characterId: string | null,
  wasAllowed: boolean,
  errorMessage?: string
): Promise<void> {
  console.warn("logCreationAttempt (client) is deprecated. Logging is handled by server actions.");
}

/**
 * Update subscription
 */
export async function updateSubscription(
  userId: string,
  updates: {
    plan_type?: PlanType;
    subscription_status?: SubscriptionStatus;
    paypal_subscription_id?: string;
    paypal_plan_id?: string;
    expires_at?: string;
  }
): Promise<{ success: boolean; error: string | null }> {
  const supabase = createClient();

  const { error } = await supabase
    .from("subscriptions")
    .update(updates)
    .eq("user_id", userId);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}
