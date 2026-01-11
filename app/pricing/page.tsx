
"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Crown, Loader2, ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { getUserSubscription, checkUsageLimit } from "@/lib/subscriptions/service";
import { createClient } from "@/lib/supabase/client";

const PLANS = [
  {
    id: "FREE",
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out the platform",
    features: [
      "2 AI creations per 24 hours",
      "Basic character generation",
      "Save unlimited characters",
      "Community support",
    ],
    cta: "Current Plan",
    popular: false,
    icon: Sparkles,
  },
  {
    id: "PRO_MONTHLY",
    name: "Pro Monthly",
    price: "$6",
    period: "per month",
    description: "Best for regular creators",
    features: [
      "10 AI creations per 24 hours",
      "Advanced generation features",
      "Priority processing",
      "Save unlimited characters",
      "Email support",
    ],
    cta: "Subscribe Now",
    popular: true,
    icon: Zap,
  },
  {
    id: "PRO_YEARLY",
    name: "Pro Yearly",
    price: "$49",
    period: "per year",
    description: "Best value for power users",
    originalPrice: "$72",
    savings: "Save 32%",
    features: [
      "10 AI creations per 24 hours",
      "Advanced generation features",
      "Priority processing",
      "Save unlimited characters",
      "Email support",
      "Early access to new features",
    ],
    cta: "Subscribe Now",
    popular: false,
    icon: Crown,
  },
];


function PricingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);
  const [usageInfo, setUsageInfo] = useState<{
    currentCount: number;
    limit: number;
    resetAt: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isPolling, setIsPolling] = useState(false);

  useEffect(() => {
    loadUserData();
    // Check for success/cancel from PayPal
    const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");
    if (success) {
      setIsPolling(true);
      pollForSubscriptionUpdate();
    }
    if (canceled) {
      setError("Subscription was canceled. You can try again anytime.");
    }
  }, [searchParams]);

  const pollForSubscriptionUpdate = async () => {
    const maxAttempts = 5;
    const pollInterval = 2000;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      await new Promise(resolve => setTimeout(resolve, pollInterval));
      try {
        const verifyResponse = await fetch("/api/paypal/verify-subscription", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (verifyResponse.ok) {
          const verifyData = await verifyResponse.json();
          if (verifyData.success && (verifyData.plan_type === "PRO_MONTHLY" || verifyData.plan_type === "PRO_YEARLY")) {
            setCurrentPlan(verifyData.plan_type);
            setUsageInfo({
              currentCount: 0,
              limit: verifyData.limit || 10,
              resetAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            });
            setIsPolling(false);
            setShowSuccessModal(true);
            window.dispatchEvent(new CustomEvent("subscription-updated"));
            router.replace("/pricing");
            return;
          }
        }
      } catch (err) {
        console.error("[Pricing] Verification attempt failed:", err);
      }
    }
    setIsPolling(false);
    await loadUserData();
    setError("Payment processing. Please refresh the page in a moment.");
    router.replace("/pricing");
  };

  const loadUserData = async () => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth/signin?redirect=/pricing");
        return;
      }
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
    } catch (err: any) {
      console.error("Error loading user data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId: string) => {
    if (planId === "FREE" || planId === currentPlan) {
      return;
    }
    setProcessing(planId);
    setError(null);
    try {
      const response = await fetch("/api/paypal/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planType: planId }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create subscription");
      }
      const data = await response.json();
      if (data.approvalUrl) {
        window.location.href = data.approvalUrl;
      } else {
        throw new Error("No approval URL received");
      }
    } catch (err: any) {
      setError(err.message || "Failed to start subscription process");
      setProcessing(null);
    }
  };

  if (loading || isPolling) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-violet-400" />
        {isPolling && (
          <p className="text-slate-400 text-sm">Updating your subscription...</p>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-16">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Welcome to Pro! 🎉
            </h2>
            <p className="text-slate-400 mb-4">
              Congratulations! You've successfully upgraded to the Pro plan.
            </p>
            <div className="bg-slate-800 rounded-lg p-4 mb-6">
              <p className="text-sm text-slate-300">
                Your new benefits:
              </p>
              <ul className="text-sm text-violet-400 mt-2 space-y-1">
                <li>✓ 10 AI creations per day</li>
                <li>✓ Priority processing</li>
                <li>✓ Advanced features unlocked</li>
              </ul>
            </div>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Start Creating!
            </button>
          </motion.div>
        </div>
      )}
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock the full potential of AI character creation with our flexible plans
          </p>
        </motion.div>
        {usageInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 max-w-2xl mx-auto"
          >
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-slate-100 mb-4">
                Your Usage Today
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Creations used</span>
                  <span className="text-slate-100 font-semibold">
                    {usageInfo.currentCount} / {usageInfo.limit}
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(usageInfo.currentCount / usageInfo.limit) * 100}%` }}
                    className="bg-violet-500 h-2.5 rounded-full"
                  />
                </div>
                <p className="text-sm text-slate-500">
                  Resets in {Math.ceil(
                    (new Date(usageInfo.resetAt).getTime() - new Date().getTime()) / (1000 * 60 * 60)
                  )} hours
                </p>
              </div>
            </div>
          </motion.div>
        )}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 max-w-2xl mx-auto"
          >
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400">
              {error}
            </div>
          </motion.div>
        )}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PLANS.map((plan, index) => {
            const Icon = plan.icon;
            const isCurrentPlan = plan.id === currentPlan;
            const isProcessing = processing === plan.id;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl border-2 p-8 transition-all ${
                  plan.popular
                    ? "border-violet-500 bg-violet-500/5 shadow-lg shadow-violet-500/20"
                    : "border-border bg-slate-900/50"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-violet-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
                    plan.popular ? "bg-violet-500/20" : "bg-slate-800"
                  }`}>
                    <Icon className={`w-8 h-8 ${plan.popular ? "text-violet-400" : "text-slate-400"}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    {plan.period !== "forever" && (
                      <span className="text-muted-foreground">/{plan.period}</span>
                    )}
                  </div>
                  {plan.originalPrice && (
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-sm text-muted-foreground line-through">
                        {plan.originalPrice}
                      </span>
                      <span className="text-sm font-semibold text-green-400">
                        {plan.savings}
                      </span>
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={isCurrentPlan || isProcessing}
                  className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    isCurrentPlan
                      ? "bg-slate-800 text-slate-400 cursor-not-allowed"
                      : plan.popular
                      ? "bg-violet-500 hover:bg-violet-600 text-white"
                      : "bg-slate-800 hover:bg-slate-700 text-foreground"
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : isCurrentPlan ? (
                    <>
                      <Check className="w-5 h-5" />
                      Current Plan
                    </>
                  ) : (
                    <>
                      {plan.cta}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-foreground mb-2">
                How does the rolling 24-hour limit work?
              </h3>
              <p className="text-sm text-muted-foreground">
                Your creation limit resets 24 hours after your first creation of the day, not at midnight. 
                This gives you more flexibility in when you can create characters.
              </p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-foreground mb-2">
                Can I cancel my subscription anytime?
              </h3>
              <p className="text-sm text-muted-foreground">
                Yes, you can cancel your subscription at any time. You'll continue to have access 
                until the end of your billing period, then you'll be moved to the Free plan.
              </p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-foreground mb-2">
                What happens to my characters if I downgrade?
              </h3>
              <p className="text-sm text-muted-foreground">
                All your saved characters remain accessible. You'll just have the Free plan's 
                creation limits (2 per 24 hours) instead of Pro limits.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <Suspense>
      <PricingContent />
    </Suspense>
  );
}
