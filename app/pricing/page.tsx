
"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Crown, Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getUserSubscription, checkUsageLimit } from "@/lib/subscriptions/service";
import { createClient } from "@/lib/supabase/client";

const PLANS = [
  {
    id: "FREE",
    name: "Explorer",
    price: "$0",
    period: "forever",
    description: "Browse the marketplace and taste the future.",
    features: [
      "Browse unlimited bots & packs",
      "Access to free starter bots",
      "View public image galleries",
      "Basic community support",
    ],
    cta: "Start Exploring",
    popular: false,
    icon: Sparkles,
  },
  {
    id: "PRO_MONTHLY",
    name: "Collector's Club",
    price: "$19",
    period: "per month",
    description: "Fresh premium content delivered every month.",
    features: [
      "Access to 5 Premium Bot Drops / month",
      "1 Exclusive 'Spicy' Image Pack / month",
      "Early access to Trending Characters",
      "Vote on next month's themes",
      "High-res image downloads (4K)",
    ],
    cta: "Join the Club",
    popular: true,
    icon: Zap,
  },
  {
    id: "PRO_YEARLY",
    name: "VIP Syndicate",
    price: "$79",
    period: "per year",
    description: "The ultimate vault key for serious collectors.",
    originalPrice: "$228",
    savings: "Save 65%",
    features: [
      "Everything in Collector's Club",
      "Acress to bot craetion Courses , tools and guides ", 
      "UNLIMITED access to all past & future bots",
      "Complete 'Spicy' Image Vault Access",
      "1 Custom Bot Request per month (Made for YOU)",
      "Priority Access to new 'Uncensored' models",
      "Private Discord VIP Lounge",
    ],
    cta: "Become a VIP",
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
          if (verifyData.success &&
            (verifyData.plan_type === "PRO_MONTHLY" ||
              verifyData.plan_type === "PRO_YEARLY")) {
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
                <li>✓ 15 AI creations per day</li>
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
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-amber-500/10 blur-[120px] -z-10 pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-8 pt-4 px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group">
            <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">Power</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Unlock the full potential of AI character creation with our flexible plans.
            Upgrade anytime as your needs grow.
          </p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 max-w-2xl mx-auto"
          >
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              {error}
            </div>
          </motion.div>
        )}

        {/* PLANS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20 px-4">
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
                className={`relative rounded-[2rem] p-8 transition-all duration-300 flex flex-col ${plan.popular
                  ? "bg-neutral-900/80 border-2 border-amber-500/50 shadow-[0_0_40px_rgba(245,158,11,0.2)] md:-mt-8 md:mb-8 z-10 scale-105 md:scale-100"
                  : "bg-neutral-900/40 border border-white/10 hover:border-amber-500/30 hover:bg-neutral-900/60"
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-amber-500 to-orange-600 text-black px-4 py-1 rounded-full text-sm font-bold shadow-lg shadow-amber-900/20 uppercase tracking-wide">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-8">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${plan.popular
                    ? "bg-amber-500/20 text-amber-400"
                    : "bg-white/5 text-neutral-400 group-hover:text-amber-400"
                    }`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-medium text-neutral-400 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-5xl font-bold text-white tracking-tight">{plan.price}</span>
                    {plan.period !== "forever" && (
                      <span className="text-neutral-500 font-medium">{plan.period.replace("per ", "/")}</span>
                    )}
                  </div>

                  {plan.originalPrice && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-neutral-600 line-through decoration-neutral-600">
                        {plan.originalPrice}
                      </span>
                      <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                        {plan.savings}
                      </span>
                    </div>
                  )}

                  <p className="text-sm text-neutral-400 leading-relaxed min-h-[40px]">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-neutral-300">
                      <div className="mt-1 w-4 h-4 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 text-amber-500" />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={isCurrentPlan || isProcessing}
                  className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 transform active:scale-95 ${isCurrentPlan
                    ? "bg-white/5 text-neutral-500 cursor-not-allowed border border-white/5"
                    : plan.popular
                      ? "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black shadow-lg shadow-amber-900/20"
                      : "bg-white text-black hover:bg-neutral-200"
                    }`}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : isCurrentPlan ? (
                    <>
                      <Check className="w-4 h-4" />
                      Active Plan
                    </>
                  ) : (
                    <>
                      {plan.cta}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>
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
