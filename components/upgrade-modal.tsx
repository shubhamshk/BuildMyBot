"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Crown, Loader2, ArrowRight, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCount?: number;
  limit?: number;
  resetAt?: string;
  reason?: string;
}

export function UpgradeModal({
  isOpen,
  onClose,
  currentCount = 0,
  limit = 2,
  resetAt,
  reason,
}: UpgradeModalProps) {
  const router = useRouter();
  const [processing, setProcessing] = useState<string | null>(null);

  const handleUpgrade = async (planType: "PRO_MONTHLY" | "PRO_YEARLY") => {
    setProcessing(planType);

    try {
      const response = await fetch("/api/paypal/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planType }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create subscription");
      }

      const data = await response.json();

      // Redirect to PayPal approval URL
      if (data.approvalUrl) {
        window.location.href = data.approvalUrl;
      } else {
        throw new Error("No approval URL received");
      }
    } catch (error: any) {
      alert(error.message || "Failed to start subscription process");
      setProcessing(null);
    }
  };

  const hoursUntilReset = resetAt
    ? Math.ceil((new Date(resetAt).getTime() - new Date().getTime()) / (1000 * 60 * 60))
    : 24;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-violet-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Daily Limit Reached</h2>
                    <p className="text-sm text-muted-foreground">Upgrade to create more</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg hover:bg-slate-800 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Usage Info */}
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Today's Usage</span>
                    <span className="text-sm font-semibold text-slate-200">
                      {currentCount} / {limit} creations
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                    <div
                      className="bg-violet-500 h-2 rounded-full"
                      style={{ width: `${(currentCount / limit) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500">
                    Limit resets in {hoursUntilReset} hour{hoursUntilReset !== 1 ? "s" : ""}
                  </p>
                </div>

                {reason && (
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                    <p className="text-sm text-yellow-400">{reason}</p>
                  </div>
                )}

                {/* Upgrade Options */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Upgrade to Pro</h3>
                  
                  {/* Monthly Plan */}
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 hover:border-violet-500/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Zap className="w-5 h-5 text-violet-400" />
                        <div>
                          <h4 className="font-semibold text-foreground">Pro Monthly</h4>
                          <p className="text-sm text-muted-foreground">10 creations per 24 hours</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-foreground">$6</div>
                        <div className="text-xs text-muted-foreground">per month</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleUpgrade("PRO_MONTHLY")}
                      disabled={processing !== null}
                      className="w-full py-2.5 rounded-lg bg-violet-500 hover:bg-violet-600 text-white font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {processing === "PRO_MONTHLY" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Subscribe Monthly
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Yearly Plan */}
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 hover:border-violet-500/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Crown className="w-5 h-5 text-violet-400" />
                        <div>
                          <h4 className="font-semibold text-foreground">Pro Yearly</h4>
                          <p className="text-sm text-muted-foreground">10 creations per 24 hours</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-foreground">$49</div>
                        <div className="text-xs text-muted-foreground">per year</div>
                        <div className="text-xs text-green-400 font-semibold mt-1">Save 32%</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleUpgrade("PRO_YEARLY")}
                      disabled={processing !== null}
                      className="w-full py-2.5 rounded-lg bg-violet-500 hover:bg-violet-600 text-white font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {processing === "PRO_YEARLY" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Subscribe Yearly
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-slate-700">
                  <button
                    onClick={() => {
                      onClose();
                      router.push("/pricing");
                    }}
                    className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    View all plans and features →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
