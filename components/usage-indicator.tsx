"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, AlertCircle, CheckCircle2 } from "lucide-react";
import { checkUsageLimit, getUserSubscription } from "@/lib/subscriptions/service";
import { UpgradeModal } from "./upgrade-modal";

export function UsageIndicator() {
  const [usageInfo, setUsageInfo] = useState<{
    currentCount: number;
    limit: number;
    resetAt: string;
  } | null>(null);
  const [planType, setPlanType] = useState<string>("FREE");
  const [loading, setLoading] = useState(true);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    loadUsage();
    // Refresh every 10 seconds to catch upgrades quickly
    const interval = setInterval(loadUsage, 10000);

    // Listen for subscription update events
    const handleSubscriptionUpdate = () => {
      console.log("[UsageIndicator] Subscription update detected, refreshing...");
      loadUsage();
    };
    window.addEventListener("subscription-updated", handleSubscriptionUpdate);

    return () => {
      clearInterval(interval);
      window.removeEventListener("subscription-updated", handleSubscriptionUpdate);
    };
  }, []);

  const loadUsage = async () => {
    try {
      const [subscriptionResult, usageResult] = await Promise.all([
        getUserSubscription(),
        checkUsageLimit(),
      ]);

      if (subscriptionResult.data) {
        setPlanType(subscriptionResult.data.plan_type);
      }

      if (usageResult.allowed !== undefined) {
        setUsageInfo({
          currentCount: usageResult.currentCount,
          limit: usageResult.limit,
          resetAt: usageResult.resetAt,
        });
      }
    } catch (error) {
      console.error("Error loading usage:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !usageInfo) {
    return null;
  }

  const percentage = (usageInfo.currentCount / usageInfo.limit) * 100;
  const isNearLimit = percentage >= 80;
  const isAtLimit = percentage >= 100;
  const hoursUntilReset = Math.ceil(
    (new Date(usageInfo.resetAt).getTime() - new Date().getTime()) / (1000 * 60 * 60)
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-4 right-4 z-40"
      >
        <div
          className={`rounded-xl border p-4 shadow-lg backdrop-blur-sm transition-all ${isAtLimit
              ? "bg-red-500/10 border-red-500/30"
              : isNearLimit
                ? "bg-yellow-500/10 border-yellow-500/30"
                : "bg-slate-900/90 border-slate-700"
            }`}
        >
          <div className="flex items-center gap-3 mb-2">
            {isAtLimit ? (
              <AlertCircle className="w-5 h-5 text-red-400" />
            ) : isNearLimit ? (
              <AlertCircle className="w-5 h-5 text-yellow-400" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-violet-400" />
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-foreground">
                  {planType === "FREE"
                    ? "Free Plan"
                    : planType === "PRO_MONTHLY"
                      ? "Pro Monthly"
                      : planType === "PRO_YEARLY"
                        ? "Pro Yearly"
                        : planType === "ULTIMATE_CREATOR"
                          ? "Ultimate Creator"
                          : "Pro Plan"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {usageInfo.currentCount} / {usageInfo.limit}
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 mb-1">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(percentage, 100)}%` }}
                  className={`h-1.5 rounded-full ${isAtLimit
                      ? "bg-red-500"
                      : isNearLimit
                        ? "bg-yellow-500"
                        : "bg-violet-500"
                    }`}
                />
              </div>
              {isAtLimit ? (
                <button
                  onClick={() => setShowUpgradeModal(true)}
                  className="text-xs text-red-400 hover:text-red-300 font-semibold mt-1"
                >
                  Upgrade to create more →
                </button>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Resets in {hoursUntilReset}h
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        currentCount={usageInfo.currentCount}
        limit={usageInfo.limit}
        resetAt={usageInfo.resetAt}
        reason={
          isAtLimit
            ? `You've reached your daily limit of ${usageInfo.limit} creations. Upgrade to Pro for 10 creations per day.`
            : undefined
        }
      />
    </>
  );
}
