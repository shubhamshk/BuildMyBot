"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Key, CheckCircle2, Eye, EyeOff, Trash2, Plus, AlertTriangle, Copy, Check } from "lucide-react";
import { getAPIKey, setAPIKey, getSelectedProvider, APIProvider, clearAPIKey, clearAllAPIKeys } from "@/lib/api-key";
import { detectProviderFromKey } from "@/lib/ai/provider-detection";

interface APIKeyManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

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
    {
      value: "lmstudio",
      label: "LM Studio",
      placeholder: "lm-studio-...",
      description: "Local LM Studio models running on your machine",
      icon: "💻",
    },
  ];

export function APIKeyManager({ isOpen, onClose, onSave }: APIKeyManagerProps) {
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

  // Load existing keys on mount
  useEffect(() => {
    if (isOpen) {
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
    }
  }, [isOpen]);

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
    setTimeout(() => {
      onSave();
    }, 300);
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

  const getMaskedKey = (key: string) => {
    if (!key) return "";
    return key.length > 12 ? `${key.slice(0, 6)}...${key.slice(-4)}` : "••••••••";
  };

  const handleClose = () => {
    setApiKeys({
      openai: "",
      gemini: "",
      openrouter: "",
      huggingface: "",
      lmstudio: "",
    });
    onClose();
  };

  const hasKey = (provider: APIProvider) => {
    return !!apiKeys[provider];
  };

  const activeProvider = PROVIDERS.find((p) => p.value === activeTab);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 rounded-2xl p-0 max-w-2xl w-full border border-slate-700 pointer-events-auto overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center border border-violet-500/30">
                      <Key className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-slate-100">
                        API Key Manager
                      </h2>
                      <p className="text-xs text-slate-400">
                        Manage your AI provider API keys securely
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-slate-600 transition-colors flex items-center justify-center"
                  >
                    <X className="w-4 h-4 text-slate-300" />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="px-5 pt-4 border-b border-slate-700">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {PROVIDERS.map((provider) => {
                    const hasKeyForProvider = hasKey(provider.value);
                    const isSelected = selectedProvider === provider.value;

                    return (
                      <button
                        key={provider.value}
                        onClick={() => setActiveTab(provider.value)}
                        className={`px-3 py-2 rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 relative flex-shrink-0 ${activeTab === provider.value
                          ? "bg-violet-500/20 border border-violet-500/50 text-violet-400"
                          : "bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-slate-600 text-slate-300"
                          }`}
                      >
                        <span className="text-base">{provider.icon}</span>
                        <span className="text-sm font-medium">{provider.label}</span>
                        {hasKeyForProvider && (
                          <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-violet-400" : "bg-green-400"
                            }`} />
                        )}
                        {isSelected && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 max-h-[60vh] overflow-y-auto">
                {activeProvider && (
                  <div className="space-y-4">
                    {/* Provider Info */}
                    <div>
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="text-2xl">{activeProvider.icon}</span>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-100">
                            {activeProvider.label}
                          </h3>
                          <p className="text-xs text-slate-400">
                            {activeProvider.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* API Key Input */}
                    <div>
                      <label className="text-xs font-medium text-slate-300 mb-1.5 block">
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
                          className="w-full h-10 px-3 pr-10 rounded-lg bg-slate-800 border border-slate-700 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all outline-none font-mono text-sm text-slate-100 placeholder:text-slate-500"
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
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-md hover:bg-slate-700 transition-colors flex items-center justify-center"
                        >
                          {showKeys[activeTab] ? (
                            <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                          ) : (
                            <Eye className="w-3.5 h-3.5 text-slate-400" />
                          )}
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1.5">
                        Your API key is stored locally in your browser and never sent to our servers.
                      </p>
                    </div>

                    {/* Status */}
                    {hasKey(activeTab) && (
                      <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-medium text-green-400">
                              API Key Configured
                            </p>
                            <p className="text-[10px] text-slate-400">
                              {selectedProvider === activeTab
                                ? "Currently active for generation"
                                : "Click 'Save & Activate' to use this key"}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      {hasKey(activeTab) && (
                        <>
                          <button
                            onClick={() => handleCopyKey(activeTab)}
                            className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-slate-600 transition-colors flex items-center gap-1.5 text-slate-300 text-xs font-medium"
                            title="Copy API Key"
                          >
                            {copiedKey === activeTab ? (
                              <Check className="w-3.5 h-3.5 text-green-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                            {copiedKey === activeTab ? "Copied!" : "Copy"}
                          </button>
                          <button
                            onClick={() => handleDeleteKey(activeTab)}
                            className="px-3 py-2 rounded-lg bg-slate-800 border border-red-500/30 hover:bg-red-500/10 hover:border-red-500/50 transition-colors flex items-center gap-1.5 text-red-400 text-xs font-medium"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Remove
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleSaveKey(activeTab)}
                        disabled={!apiKeys[activeTab].trim()}
                        className="flex-1 py-2 rounded-lg bg-violet-500 hover:bg-violet-600 text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {hasKey(activeTab) ? "Update & Activate" : "Save & Activate"}
                      </button>
                    </div>

                    {/* Help Links */}
                    <div className="pt-3 border-t border-slate-700">
                      <p className="text-[10px] text-slate-500 mb-1.5">Need help getting an API key?</p>
                      <div className="flex flex-wrap gap-2">
                        {activeTab === "openai" && (
                          <a
                            href="https://platform.openai.com/api-keys"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-violet-400 hover:text-violet-300 underline"
                          >
                            Get OpenAI API Key →
                          </a>
                        )}
                        {activeTab === "gemini" && (
                          <a
                            href="https://makersuite.google.com/app/apikey"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-violet-400 hover:text-violet-300 underline"
                          >
                            Get Gemini API Key →
                          </a>
                        )}
                        {activeTab === "openrouter" && (
                          <a
                            href="https://openrouter.ai/keys"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-violet-400 hover:text-violet-300 underline"
                          >
                            Get OpenRouter API Key →
                          </a>
                        )}
                        {activeTab === "huggingface" && (
                          <a
                            href="https://huggingface.co/settings/tokens"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-violet-400 hover:text-violet-300 underline"
                          >
                            Get HuggingFace Token →
                          </a>
                        )}
                        {activeTab === "lmstudio" && (
                          <a
                            href="https://lmstudio.ai/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-violet-400 hover:text-violet-300 underline"
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
              <div className="p-4 border-t border-slate-700 bg-slate-800/50">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="text-[10px] text-slate-400">
                      {Object.values(apiKeys).filter((k) => k).length} of {PROVIDERS.length} providers configured
                    </p>
                    {Object.values(apiKeys).some((k) => k) && (
                      <button
                        onClick={handleClearAll}
                        className="text-[10px] text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                        Clear All Keys
                      </button>
                    )}
                  </div>
                  <button
                    onClick={handleClose}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-slate-600 transition-colors text-xs font-medium text-slate-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
