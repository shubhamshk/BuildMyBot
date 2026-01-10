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
      value: "openrouter",
      label: "OpenRouter",
      placeholder: "sk-or-...",
      description: "Access to multiple models (Claude, DeepSeek, etc.)",
      icon: "🌐",
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
      placeholder: "unused-key",
      description: "Local model running via LM Studio (OpenAI compatible)",
      icon: "🏠",
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
              className="glass rounded-3xl p-0 max-w-3xl w-full border border-border pointer-events-auto overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
                      <Key className="w-6 h-6 text-violet-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-foreground">
                        API Key Manager
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Manage your AI provider API keys securely
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    className="w-10 h-10 rounded-lg glass border border-border hover:bg-white/5 transition-colors flex items-center justify-center"
                  >
                    <X className="w-5 h-5 text-foreground" />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="px-6 pt-6 border-b border-border">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {PROVIDERS.map((provider) => {
                    const hasKeyForProvider = hasKey(provider.value);
                    const isSelected = selectedProvider === provider.value;

                    return (
                      <button
                        key={provider.value}
                        onClick={() => setActiveTab(provider.value)}
                        className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 relative ${activeTab === provider.value
                          ? "bg-violet-500/20 border-2 border-violet-500 text-violet-400"
                          : "glass border border-border hover:bg-white/5 text-muted-foreground"
                          }`}
                      >
                        <span className="text-lg">{provider.icon}</span>
                        <span className="font-medium">{provider.label}</span>
                        {hasKeyForProvider && (
                          <div className={`w-2 h-2 rounded-full ${isSelected ? "bg-violet-400" : "bg-green-400"
                            }`} />
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
                          className="w-full h-12 px-4 pr-12 rounded-xl glass border border-border focus:border-violet-500 transition-all outline-none font-mono text-sm"
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
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-center"
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
                      <div className="p-4 rounded-xl glass border border-green-500/30 bg-green-500/10">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                          <div>
                            <p className="text-sm font-medium text-green-400">
                              API Key Configured
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {selectedProvider === activeTab
                                ? "Currently active for generation"
                                : "Click 'Save & Activate' to use this key"}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3">
                      {hasKey(activeTab) && (
                        <>
                          <button
                            onClick={() => handleCopyKey(activeTab)}
                            className="px-4 py-2.5 rounded-xl glass border border-border hover:bg-white/5 transition-colors flex items-center gap-2 text-muted-foreground"
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
                            className="px-4 py-2.5 rounded-xl glass border border-red-500/30 hover:bg-red-500/10 transition-colors flex items-center gap-2 text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleSaveKey(activeTab)}
                        disabled={!apiKeys[activeTab].trim()}
                        className="flex-1 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        {hasKey(activeTab) ? "Update & Activate" : "Save & Activate"}
                      </button>
                    </div>

                    {/* Help Links */}
                    <div className="pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground mb-2">Need help getting an API key?</p>
                      <div className="flex flex-wrap gap-2">
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
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-border bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <p className="text-xs text-muted-foreground">
                      {Object.values(apiKeys).filter((k) => k).length} of {PROVIDERS.length} providers configured
                    </p>
                    {Object.values(apiKeys).some((k) => k) && (
                      <button
                        onClick={handleClearAll}
                        className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        Clear All Keys
                      </button>
                    )}
                  </div>
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 rounded-xl glass border border-border hover:bg-white/5 transition-colors text-sm font-medium"
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
