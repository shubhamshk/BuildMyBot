"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Crown, Zap, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getUserSubscription, checkUsageLimit } from "@/lib/subscriptions/service";

export function SubscriptionStatusCard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);
  const [usageInfo, setUsageInfo] = useState<{
    currentCount: number;
    limit: number;
    resetAt: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
    // Refresh every 30 seconds
    const interval = setInterval(loadUserData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadUserData = async () => {
    try {
      const supabase = createClient();
      const { data: { user: currentUser } } = await supabase.auth.getUser();

      if (!currentUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      setUser(currentUser);

      const [subscriptionResult, usageResult] = await Promise.all([
        getUserSubscription(),
        checkUsageLimit(),
      ]);

      if (subscriptionResult.data) {
        setCurrentPlan(subscriptionResult.data.plan_type);
      }

      if (usageResult.allowed !== undefined) {
        setUsageInfo({
          currentCount: usageResult.currentCount,
          limit: usageResult.limit,
          resetAt: usageResult.resetAt,
        });
      }
    } catch (error) {
      console.error("Error loading subscription data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Don't show for logged-out users
  if (loading || !user) {
    return null;
  }

  const isPro = currentPlan === "PRO_MONTHLY" || currentPlan === "PRO_YEARLY";
  const remaining = usageInfo ? usageInfo.limit - usageInfo.currentCount : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-4xl mx-auto mb-12"
    >
      <div
        className={`rounded-2xl border-2 p-6 transition-all ${isPro
          ? "bg-gradient-to-br from-violet-500/10 to-blue-500/10 border-violet-500/30 shadow-lg shadow-violet-500/10"
          : "glass border-border"
          }`}
      >
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-4">
          {/* Left: Plan Info */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-2">
              {isPro ? (
                <Crown className="w-5 h-5 text-violet-400" />
              ) : (
                <Sparkles className="w-5 h-5 text-muted-foreground" />
              )}
              <h3 className="text-lg font-semibold text-foreground">
                {isPro ? "Pro Plan" : "Free Plan"}
              </h3>
              {isPro && (
                <span className="px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-400 text-xs font-semibold">
                  Active
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {isPro
                ? "You're on the Pro plan with 10 creations per day."
                : "You're currently on the Free plan. Upgrade to Pro to unlock more daily creations."}
            </p>

            {/* Usage Info */}
            {usageInfo && (
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2 sm:gap-4 text-sm mt-1">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Today:</span>
                  <span className="font-semibold text-foreground">
                    {usageInfo.currentCount} / {usageInfo.limit} creations
                  </span>
                </div>
                {remaining > 0 && (
                  <span className="text-muted-foreground">
                    {remaining} remaining
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Right: Action Button */}
          <div className="flex-shrink-0">
            {isPro ? (
              <button
                onClick={() => router.push("/pricing")}
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-foreground font-semibold flex items-center gap-2 transition-all border border-slate-700"
              >
                <Zap className="w-4 h-4" />
                Manage Subscription
              </button>
            ) : (
              <motion.button
                onClick={() => router.push("/pricing")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white font-semibold flex items-center gap-2 transition-all shadow-lg shadow-violet-500/30"
              >
                <Crown className="w-4 h-4" />
                Upgrade to Pro
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
