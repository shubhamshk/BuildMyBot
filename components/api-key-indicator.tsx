"use client";

import { useState, useEffect } from "react";
import { Key, CheckCircle2, Settings2, ChevronDown } from "lucide-react";
import { isAPIKeyConnected, getSelectedProvider, getAPIKey, APIProvider } from "@/lib/api-key";
import { getUserSubscription } from "@/lib/subscriptions/service";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const PROVIDER_LABELS: Record<APIProvider, string> = {
  openrouter: "OpenRouter",
  openai: "OpenAI",
  gemini: "Gemini",
  huggingface: "HuggingFace",
  lmstudio: "LM Studio",
};

export function APIKeyIndicator() {
  const router = useRouter();
  const [connected, setConnected] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeProvider, setActiveProvider] = useState<APIProvider | null>(null);
  const [maskedKey, setMaskedKey] = useState<string>("");
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    const checkConnection = () => {
      const connected = isAPIKeyConnected();
      setConnected(connected);

      if (connected) {
        const provider = getSelectedProvider();
        setActiveProvider(provider);

        if (provider) {
          const key = getAPIKey(provider);
          if (key) {
            // Show first 4 and last 4 characters
            const masked = key.length > 12
              ? `${key.slice(0, 6)}...${key.slice(-4)}`
              : "••••••••";
            setMaskedKey(masked);
          }
        }
      } else {
        setActiveProvider(null);
        setMaskedKey("");
      }
    };

    checkConnection();

    // Listen for storage changes (from other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key?.startsWith("api_key_") || e.key === "api_key_provider" || e.key === "api_key_connected") {
        checkConnection();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Also check periodically (in case of same-tab updates)
    const interval = setInterval(checkConnection, 1000);

    // Close dropdown when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.api-key-dropdown')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      document.removeEventListener('click', handleClickOutside);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const checkProStatus = async () => {
      const subscription = await getUserSubscription();
      if (subscription.data?.plan_type === "PRO_MONTHLY" || subscription.data?.plan_type === "PRO_YEARLY") {
        setIsPro(true);
      } else {
        setIsPro(false);
      }
    };
    checkProStatus();

    // Re-check Pro status every 5 seconds to catch upgrades
    const interval = setInterval(checkProStatus, 5000);

    // Listen for subscription update events
    const handleSubscriptionUpdate = () => {
      console.log("[APIKeyIndicator] Subscription update detected");
      checkProStatus();
    };
    window.addEventListener("subscription-updated", handleSubscriptionUpdate);

    return () => {
      clearInterval(interval);
      window.removeEventListener("subscription-updated", handleSubscriptionUpdate);
    };
  }, []);

  if (connected && activeProvider) {
    return (
      <div className="flex items-center gap-2">
        {isPro && (
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] uppercase tracking-wider"
          >
            PRO
          </motion.span>
        )}
        <div className="relative api-key-dropdown">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDropdown(!showDropdown);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-emerald-500/30 hover:border-emerald-500 transition-all cursor-pointer shadow-lg group hover:bg-emerald-500/5"
          >
            <div className="relative flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <div className="absolute inset-0 bg-emerald-400 blur-sm opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xs font-bold text-emerald-400 hidden sm:inline whitespace-nowrap">
              {PROVIDER_LABELS[activeProvider]}
            </span>
            <ChevronDown className={`w-3 h-3 text-emerald-500/50 transition-transform flex-shrink-0 ${showDropdown ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                className="absolute right-0 top-full mt-2 w-60 rounded-2xl bg-[#0a0a0f]/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 overflow-hidden"
              >
                <div className="p-4 border-b border-white/5 bg-emerald-500/5">
                  <p className="text-[10px] text-zinc-500 mb-1 uppercase tracking-widest font-bold text-center">Active Provider</p>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <p className="text-sm font-bold text-emerald-400">{PROVIDER_LABELS[activeProvider]}</p>
                  </div>
                </div>

                <div className="p-4 border-b border-white/5 space-y-2">
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">API Key</p>
                  <div className="group relative">
                    <code className="text-xs font-mono text-zinc-300 bg-white/5 px-3 py-2 rounded-xl border border-white/10 block truncate pr-8">
                      {maskedKey}
                    </code>
                    <CheckCircle2 className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-emerald-500/50" />
                  </div>
                </div>

                <div className="p-2">
                  <Link
                    href="/api-keys"
                    onClick={() => setShowDropdown(false)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all text-zinc-300 hover:text-white group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors">
                      <Settings2 className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">Manage Keys</span>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {isPro && (
        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg uppercase tracking-wider">
          PRO
        </span>
      )}
      <Link
        href="/api-keys"
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all shadow-xl group"
      >
        <div className="w-5 h-5 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors">
          <Key className="w-3.5 h-3.5" />
        </div>
        <span className="text-xs font-bold text-zinc-200 whitespace-nowrap tracking-wide">
          Connect API Key
        </span>
      </Link>
    </div>
  );
}
