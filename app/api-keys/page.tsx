"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Key, CheckCircle2, Eye, EyeOff, Trash2, Copy, Check, ArrowLeft, Sparkles } from "lucide-react";
import { getAPIKey, setAPIKey, getSelectedProvider, APIProvider, clearAPIKey, clearAllAPIKeys } from "@/lib/api-key";
import { detectProviderFromKey } from "@/lib/ai/provider-detection";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PROVIDERS: Array<{
  value: APIProvider;
  label: string;
  placeholder: string;
  description: string;
  icon: string;
}> = [
    {
      value: "openrouter",
      label: "OpenRouter",
      placeholder: "sk-or-...",
      description: "Access to multiple models (Claude, DeepSeek, etc.)",
      icon: "🌐",
    },
    {
      value: "openai",
      label: "OpenAI",
      placeholder: "sk-...",
      description: "GPT-4, GPT-3.5, and other OpenAI models",
      icon: "🤖",
    },
    {
      value: "gemini",
      label: "Google Gemini",
      placeholder: "AIza...",
      description: "Gemini Pro and other Google AI models",
      icon: "💎",
    },
    {
      value: "huggingface",
      label: "HuggingFace",
      placeholder: "hf_...",
      description: "Open-source models from HuggingFace",
      icon: "🤗",
    },
    /* {
      value: "lmstudio",
      label: "LM Studio",
      placeholder: "lm-studio-...",
      description: "Local LM Studio models running on your machine",
      icon: "💻",
    }, */
  ];


export default function APIKeysPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<APIProvider>("openai");
  const [apiKeys, setApiKeys] = useState<Record<APIProvider, string>>({
    openai: "",
    gemini: "",
    openrouter: "",
    huggingface: "",
    lmstudio: "",
  });
  const [showKeys, setShowKeys] = useState<Record<APIProvider, boolean>>({
    openai: false,
    gemini: false,
    openrouter: false,
    huggingface: false,
    lmstudio: false,
  });
  const [selectedProvider, setSelectedProvider] = useState<APIProvider | null>(null);
  const [copiedKey, setCopiedKey] = useState<APIProvider | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<APIProvider | null>(null);

  // Load existing keys on mount
  useEffect(() => {
    const keys: Record<APIProvider, string> = {
      openai: "",
      gemini: "",
      openrouter: "",
      huggingface: "",
      lmstudio: "",
    };

    PROVIDERS.forEach((provider) => {
      const key = getAPIKey(provider.value);
      if (key) {
        keys[provider.value] = key;
      }
    });

    setApiKeys(keys);
    setSelectedProvider(getSelectedProvider());

    // Set active tab to selected provider or first provider
    const savedProvider = getSelectedProvider();
    if (savedProvider) {
      setActiveTab(savedProvider);
    }
  }, []);

  const handleSaveKey = (provider: APIProvider) => {
    const key = apiKeys[provider].trim();
    if (!key) return;

    // Validate key format (basic check)
    if (key.length < 10) {
      alert("Please enter a valid API key (minimum 10 characters)");
      return;
    }

    // Validate key format matches provider
    const detected = detectProviderFromKey(key);
    if (detected && detected !== provider) {
      const confirmed = confirm(
        `This API key format suggests it's for ${detected.toUpperCase()}, but you're saving it as ${provider.toUpperCase()}. Continue anyway?`
      );
      if (!confirmed) return;
    } else if (!detected) {
      alert("Warning: Could not detect API key format. Please verify it's correct for the selected provider.");
    }

    setAPIKey(provider, key);
    setSelectedProvider(provider);

    // Update local state
    setApiKeys((prev) => ({ ...prev, [provider]: key }));

    // Show success feedback
    setSaveSuccess(provider);
    setTimeout(() => {
      setSaveSuccess(null);
    }, 2000);
  };

  const handleDeleteKey = (provider: APIProvider) => {
    if (confirm(`Are you sure you want to remove the ${PROVIDERS.find(p => p.value === provider)?.label} API key?`)) {
      // Clear this specific key
      localStorage.removeItem(`api_key_${provider}`);

      // If this was the selected provider, clear selection
      if (selectedProvider === provider) {
        localStorage.removeItem("api_key_provider");
        localStorage.removeItem("api_key_connected");
        setSelectedProvider(null);
      }

      setApiKeys((prev) => ({ ...prev, [provider]: "" }));
    }
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to remove ALL API keys? This action cannot be undone.")) {
      clearAllAPIKeys();
      setApiKeys({
        openai: "",
        gemini: "",
        openrouter: "",
        huggingface: "",
        lmstudio: "",
      });
      setSelectedProvider(null);
    }
  };

  const handleCopyKey = async (provider: APIProvider) => {
    const key = apiKeys[provider];
    if (key) {
      try {
        await navigator.clipboard.writeText(key);
        setCopiedKey(provider);
        setTimeout(() => setCopiedKey(null), 2000);
      } catch (err) {
        console.error("Failed to copy key:", err);
      }
    }
  };

  const hasKey = (provider: APIProvider) => {
    return !!apiKeys[provider];
  };

  const activeProvider = PROVIDERS.find((p) => p.value === activeTab);

  return (
    <div className="min-h-screen bg-background">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <Key className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">
                API Key Manager
              </h1>
              <p className="text-muted-foreground">
                Manage your AI provider API keys securely
              </p>
            </div>
          </motion.div>
        </div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 p-4 rounded-xl glass border border-violet-500/30 bg-violet-500/5"
        >
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-violet-300 mb-1">
                Secure Local Storage
              </p>
              <p className="text-xs text-slate-400">
                Your API keys are stored locally in your browser and never sent to our servers. They're used only to generate your characters.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl border border-border overflow-hidden"
        >
          {/* Tabs */}
          <div className="px-6 pt-6 pb-4 border-b border-border">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {PROVIDERS.map((provider) => {
                const hasKeyForProvider = hasKey(provider.value);
                const isSelected = selectedProvider === provider.value;

                return (
                  <button
                    key={provider.value}
                    onClick={() => setActiveTab(provider.value)}
                    className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 relative flex-shrink-0 ${activeTab === provider.value
                      ? "bg-violet-500/20 border border-violet-500/50 text-violet-400 shadow-lg shadow-violet-500/10"
                      : "bg-slate-800/50 border border-slate-700 hover:bg-slate-800 hover:border-slate-600 text-slate-300"
                      }`}
                  >
                    <span className="text-lg">{provider.icon}</span>
                    <span className="text-sm font-medium">{provider.label}</span>
                    {hasKeyForProvider && (
                      <div
                        className={`w-2 h-2 rounded-full ${isSelected ? "bg-violet-400" : "bg-green-400"
                          }`}
                      />
                    )}
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-violet-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeProvider && (
              <div className="space-y-6">
                {/* Provider Info */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{activeProvider.icon}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {activeProvider.label}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {activeProvider.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* API Key Input */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    API Key
                  </label>
                  <div className="relative">
                    <input
                      type={showKeys[activeTab] ? "text" : "password"}
                      value={apiKeys[activeTab]}
                      onChange={(e) =>
                        setApiKeys((prev) => ({
                          ...prev,
                          [activeTab]: e.target.value,
                        }))
                      }
                      placeholder={activeProvider.placeholder}
                      className="w-full h-12 px-4 pr-12 rounded-xl glass border border-border focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all outline-none font-mono text-sm text-foreground placeholder:text-muted-foreground"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowKeys((prev) => ({
                          ...prev,
                          [activeTab]: !prev[activeTab],
                        }))
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center"
                    >
                      {showKeys[activeTab] ? (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Your API key is stored locally in your browser and never sent to our servers.
                  </p>
                </div>

                {/* Status */}
                {hasKey(activeTab) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-green-500/10 border border-green-500/30"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-green-400">
                          API Key Configured
                        </p>
                        <p className="text-xs text-slate-400">
                          {selectedProvider === activeTab
                            ? "Currently active for generation"
                            : "Click 'Save & Activate' to use this key"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Success Message */}
                {saveSuccess === activeTab && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/30"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-violet-400 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-violet-400">
                          Successfully saved and activated!
                        </p>
                        <p className="text-xs text-slate-400">
                          Your API key is now ready to use
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                  {hasKey(activeTab) && (
                    <>
                      <button
                        onClick={() => handleCopyKey(activeTab)}
                        className="px-4 py-2.5 rounded-xl glass border border-border hover:bg-slate-800 hover:border-slate-600 transition-colors flex items-center gap-2 text-foreground text-sm font-medium"
                        title="Copy API Key"
                      >
                        {copiedKey === activeTab ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                        {copiedKey === activeTab ? "Copied!" : "Copy"}
                      </button>
                      <button
                        onClick={() => handleDeleteKey(activeTab)}
                        className="px-4 py-2.5 rounded-xl glass border border-red-500/30 hover:bg-red-500/10 hover:border-red-500/50 transition-colors flex items-center gap-2 text-red-400 text-sm font-medium"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleSaveKey(activeTab)}
                    disabled={!apiKeys[activeTab].trim()}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {hasKey(activeTab) ? "Update & Activate" : "Save & Activate"}
                  </button>
                </div>

                {/* Help Links */}
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">Need help getting an API key?</p>
                  <div className="flex flex-wrap gap-3">
                    {activeTab === "openai" && (
                      <a
                        href="https://platform.openai.com/api-keys"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-violet-400 hover:text-violet-300 underline"
                      >
                        Get OpenAI API Key →
                      </a>
                    )}
                    {activeTab === "gemini" && (
                      <a
                        href="https://makersuite.google.com/app/apikey"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-violet-400 hover:text-violet-300 underline"
                      >
                        Get Gemini API Key →
                      </a>
                    )}
                    {activeTab === "openrouter" && (
                      <a
                        href="https://openrouter.ai/keys"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-violet-400 hover:text-violet-300 underline"
                      >
                        Get OpenRouter API Key →
                      </a>
                    )}
                    {activeTab === "huggingface" && (
                      <a
                        href="https://huggingface.co/settings/tokens"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-violet-400 hover:text-violet-300 underline"
                      >
                        Get HuggingFace Token →
                      </a>
                    )}
                    {activeTab === "lmstudio" && (
                      <a
                        href="https://lmstudio.ai/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-violet-400 hover:text-violet-300 underline"
                      >
                        Download LM Studio →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border bg-slate-900/30">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-4 flex-wrap">
                <p className="text-xs text-muted-foreground">
                  {Object.values(apiKeys).filter((k) => k).length} of {PROVIDERS.length} providers configured
                </p>
                {Object.values(apiKeys).some((k) => k) && (
                  <button
                    onClick={handleClearAll}
                    className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    Clear All Keys
                  </button>
                )}
              </div>
              <Link
                href="/"
                className="px-4 py-2 rounded-xl glass border border-border hover:bg-slate-800 hover:border-slate-600 transition-colors text-sm font-medium text-foreground"
              >
                Done
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
