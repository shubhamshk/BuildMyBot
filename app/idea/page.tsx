"use client";

import { motion } from "framer-motion";
import { Sparkles, Wand2, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getCurrentUser } from "@/lib/auth";
import { LoginRequiredModal } from "@/components/login-required-modal";
import { UpgradeModal } from "@/components/upgrade-modal";
import { validateAPIKey } from "@/lib/generation/service";
import { isAPIKeyConnected } from "@/lib/api-key";
import { checkUsageLimit } from "@/lib/subscriptions/service";

export default function IdeaPage() {
  const router = useRouter();
  const [storyIdea, setStoryIdea] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancedIdea, setEnhancedIdea] = useState<string | null>(null);
  const [showEnhanced, setShowEnhanced] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [usageInfo, setUsageInfo] = useState<{ currentCount: number; limit: number; resetAt: string } | null>(null);
  const [isCheckingUsage, setIsCheckingUsage] = useState(true);

  useEffect(() => {
    (async () => {
      const user = await getCurrentUser();
      if (!user) {
        setShowLoginModal(true);
        setIsCheckingUsage(false);
        return;
      }

      // Check usage limit
      const usageResult = await checkUsageLimit();
      setUsageInfo({
        currentCount: usageResult.currentCount,
        limit: usageResult.limit,
        resetAt: usageResult.resetAt,
      });

      if (!usageResult.allowed) {
        // User has exceeded their limit
        setShowUpgradeModal(true);
      }
      setIsCheckingUsage(false);
    })();
  }, []);

  const handleEnhance = async () => {
    if (!storyIdea.trim()) {
      alert("Please enter a story idea first");
      return;
    }

    if (!isAPIKeyConnected()) {
      router.push("/api-keys");
      return;
    }

    const keyCheck = validateAPIKey();
    if (!keyCheck.valid || !keyCheck.apiKey || !keyCheck.provider) {
      router.push("/api-keys");
      return;
    }

    setIsEnhancing(true);
    try {
      // Get proxy config if using custom provider
      let proxyConfig = null;
      if (keyCheck.provider === "custom") {
        const savedConfig = localStorage.getItem("custom_proxy_config");
        if (savedConfig) {
          try {
            proxyConfig = JSON.parse(savedConfig);
          } catch (e) {
            console.error("Failed to parse proxy config", e);
          }
        }
      }
      
      // Call AI enhancement API
      const response = await fetch("/api/enhance-idea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idea: storyIdea,
          apiKey: keyCheck.apiKey,
          provider: keyCheck.provider,
          proxyConfig,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to enhance idea");
      }

      const data = await response.json();
      setEnhancedIdea(data.enhancedIdea);
      setShowEnhanced(true);
    } catch (error) {
      console.error("Enhancement error:", error);
      alert("Failed to enhance idea. Please try again.");
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleNext = () => {
    const ideaToSave = enhancedIdea && showEnhanced ? enhancedIdea : storyIdea;
    if (ideaToSave.trim()) {
      localStorage.setItem("storyIdea", ideaToSave);
    }
    router.push("/create");
  };

  const handleKeepEnhanced = () => {
    if (enhancedIdea) {
      setStoryIdea(enhancedIdea);
      setShowEnhanced(false);
      setEnhancedIdea(null);
    }
  };

  const handleEditEnhanced = () => {
    if (enhancedIdea) {
      setStoryIdea(enhancedIdea);
      setShowEnhanced(false);
      setEnhancedIdea(null);
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-16 flex items-center justify-center">
      <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => {
          setShowUpgradeModal(false);
          router.push("/");
        }}
        currentCount={usageInfo?.currentCount}
        limit={usageInfo?.limit}
        resetAt={usageInfo?.resetAt}
        reason="You have reached your daily creation limit."
      />

      {isCheckingUsage ? (
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
          <p className="text-slate-400 text-sm">Checking usage limits...</p>
        </div>
      ) : (
        <div className="max-w-2xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-violet-500/30 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-violet-400" />
              </div>
              <h1 className="text-3xl font-bold text-slate-100">Story Idea</h1>
            </div>
            <h2 className="text-2xl font-semibold text-slate-200 mb-3">
              Share Your Story Concept
            </h2>
            <p className="text-slate-400 text-sm">
              Give us a brief idea (1-2 lines) about the character and story you want to create
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-slate-900 rounded-2xl p-6 border border-slate-700 shadow-xl"
          >
            <label className="text-sm font-medium text-slate-300 mb-2 block">
              Story Idea
            </label>
            <textarea
              value={storyIdea}
              onChange={(e) => setStoryIdea(e.target.value)}
              placeholder="e.g., A mysterious detective in a cyberpunk city investigating a series of AI-related crimes..."
              className="w-full h-24 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all outline-none text-slate-100 placeholder:text-slate-500 resize-none"
              maxLength={200}
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-slate-500">
                {storyIdea.length}/200 characters
              </p>
              <p className="text-xs text-slate-500">
                Keep it to 1-2 lines for best results
              </p>
            </div>

            {showEnhanced && enhancedIdea && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 p-4 rounded-lg bg-violet-500/10 border border-violet-500/30"
              >
                <p className="text-xs text-violet-400 mb-2 font-medium">AI Enhanced Idea:</p>
                <p className="text-sm text-slate-300 mb-4">{enhancedIdea}</p>
                <div className="flex gap-2">
                  <button
                    onClick={handleKeepEnhanced}
                    className="flex-1 py-2 rounded-lg bg-violet-500 hover:bg-violet-600 text-white text-sm font-medium transition-colors"
                  >
                    Keep This
                  </button>
                  <button
                    onClick={handleEditEnhanced}
                    className="flex-1 py-2 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors"
                  >
                    Edit It
                  </button>
                </div>
              </motion.div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleNext}
                disabled={isEnhancing}
                className="flex-1 py-3 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-slate-600 transition-colors text-slate-300 font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                Next Step
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleEnhance}
                disabled={!storyIdea.trim() || isEnhancing || showEnhanced}
                className="flex-1 py-3 rounded-lg bg-violet-500 hover:bg-violet-600 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isEnhancing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Enhancing...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    Enhance with AI
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
