"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Key, CheckCircle2, Eye, EyeOff, Trash2, Copy, Check, ArrowLeft, Sparkles, AlertCircle, Server, Save, Zap, Globe, Settings } from "lucide-react";
import { getAPIKey, setAPIKey, getSelectedProvider, APIProvider, clearAPIKey, clearAllAPIKeys, isAPIKeyConnected } from "@/lib/api-key";
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
      value: "custom",
      label: "Custom Proxy",
      placeholder: "",
      description: "Connect to LM Studio, Ollama, or any OpenAI-compatible API",
      icon: "⚙️",
    },
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

  ];

interface ProxyConfig {
  name: string;
  model: string;
  proxyUrl: string;
  apiKey?: string;
}

const STORAGE_KEY = "custom_proxy_config";

export default function APIKeysPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<APIProvider>("openai");
  const [apiKeys, setApiKeys] = useState<Record<APIProvider, string>>({
    openai: "",
    gemini: "",
    openrouter: "",
    huggingface: "",
    lmstudio: "",
    custom: "",
  });
  const [showKeys, setShowKeys] = useState<Record<APIProvider, boolean>>({
    openai: false,
    gemini: false,
    openrouter: false,
    huggingface: false,
    lmstudio: false,
    custom: false,
  });
  const [selectedProvider, setSelectedProvider] = useState<APIProvider | null>(null);
  const [copiedKey, setCopiedKey] = useState<APIProvider | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<APIProvider | null>(null);

  // Custom Proxy State
  const [proxyConfig, setProxyConfig] = useState<ProxyConfig>({
    name: "Custom Proxy",
    model: "local-model",
    proxyUrl: "http://localhost:1234/v1/chat/completions",
    apiKey: "",
  });
  const [isTestLoading, setIsTestLoading] = useState(false);
  const [testStatus, setTestStatus] = useState<"idle" | "success" | "error">("idle");
  const [testMessage, setTestMessage] = useState("");
  const [proxySaved, setProxySaved] = useState(false);

  const [isProxyEditing, setIsProxyEditing] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Test status for regular API keys
  const [apiKeyTestLoading, setApiKeyTestLoading] = useState<Record<APIProvider, boolean>>({
    openai: false,
    gemini: false,
    openrouter: false,
    huggingface: false,
    lmstudio: false,
    custom: false,
  });
  const [apiKeyTestStatus, setApiKeyTestStatus] = useState<Record<APIProvider, "idle" | "success" | "error">>({
    openai: "idle",
    gemini: "idle",
    openrouter: "idle",
    huggingface: "idle",
    lmstudio: "idle",
    custom: "idle",
  });
  const [apiKeyTestMessage, setApiKeyTestMessage] = useState<Record<APIProvider, string>>({
    openai: "",
    gemini: "",
    openrouter: "",
    huggingface: "",
    lmstudio: "",
    custom: "",
  });

  // Load existing keys on mount
  useEffect(() => {
    const keys: Record<APIProvider, string> = {
      openai: "",
      gemini: "",
      openrouter: "",
      huggingface: "",
      lmstudio: "",
      custom: "",
    };

    PROVIDERS.forEach((provider) => {
      const key = getAPIKey(provider.value);
      if (key) {
        keys[provider.value] = key;
      }
    });

    // Handle Custom Config separately as it's not a single key
    const savedProxyConfig = localStorage.getItem(STORAGE_KEY);
    if (savedProxyConfig) {
      try {
        setProxyConfig(JSON.parse(savedProxyConfig));
        // Flag custom as having content if config exists
        keys.custom = "proxy-configured";
        setIsProxyEditing(false); // Default to view mode if saved
      } catch (e) {
        console.error("Failed to parse saved proxy config", e);
      }
    }

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

  const handleSaveProxy = () => {
    // Basic Validation
    if (!proxyConfig.proxyUrl) {
      alert("Proxy URL is required");
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(proxyConfig));

    // Also set providers state to activate it
    setAPIKey("custom", "proxy-configured");
    setSelectedProvider("custom");
    setApiKeys((prev) => ({ ...prev, custom: "proxy-configured" }));

    // Show Success Modal
    setShowSuccessModal(true);

    // Close modal and switch to view mode after delay
    setTimeout(() => {
      setShowSuccessModal(false);
      setIsProxyEditing(false);
    }, 1500);
  };

  const handleTestProxyConnection = async () => {
    setIsTestLoading(true);
    setTestStatus("idle");
    setTestMessage("");

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-ai-proxy-url": proxyConfig.proxyUrl,
          "x-ai-proxy-key": proxyConfig.apiKey || "",
          "x-ai-model": proxyConfig.model,
        },
        body: JSON.stringify({
          messages: [
            { role: "user", content: "Say 'Connection Successful' if you can hear me." }
          ],
          max_tokens: 20,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to connect to proxy");
      }

      setTestStatus("success");
      setTestMessage(data.choices?.[0]?.message?.content || "Connection successful!");

      // We don't auto-save here anymore to force user to click "Save" for the full flow
      // or we can auto-save if desired. Let's keep it explicit "Save" for now 
      // as they might be just testing.

    } catch (error: any) {
      setTestStatus("error");
      setTestMessage(error.message || "Connection failed");
    } finally {
      setIsTestLoading(false);
    }
  };

  const handleTestAPIKey = async (provider: APIProvider) => {
    const key = apiKeys[provider];
    if (!key || key.trim().length < 10) {
      setApiKeyTestStatus((prev) => ({ ...prev, [provider]: "error" }));
      setApiKeyTestMessage((prev) => ({ ...prev, [provider]: "Please enter a valid API key first" }));
      return;
    }

    setApiKeyTestLoading((prev) => ({ ...prev, [provider]: true }));
    setApiKeyTestStatus((prev) => ({ ...prev, [provider]: "idle" }));
    setApiKeyTestMessage((prev) => ({ ...prev, [provider]: "" }));

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            { role: "user", content: "Say 'API key is valid and working!' if you can hear me." }
          ],
          max_tokens: 30,
          provider: provider,
          apiKey: key,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to validate API key");
      }

      setApiKeyTestStatus((prev) => ({ ...prev, [provider]: "success" }));
      setApiKeyTestMessage((prev) => ({ ...prev, [provider]: data.choices?.[0]?.message?.content || "API key is valid!" }));

      // Auto-clear success message after 5 seconds
      setTimeout(() => {
        setApiKeyTestStatus((prev) => ({ ...prev, [provider]: "idle" }));
      }, 5000);

    } catch (error: any) {
      setApiKeyTestStatus((prev) => ({ ...prev, [provider]: "error" }));
      setApiKeyTestMessage((prev) => ({ ...prev, [provider]: error.message || "API key validation failed" }));

      // Auto-clear error message after 5 seconds
      setTimeout(() => {
        setApiKeyTestStatus((prev) => ({ ...prev, [provider]: "idle" }));
      }, 5000);
    } finally {
      setApiKeyTestLoading((prev) => ({ ...prev, [provider]: false }));
    }
  };

  const handleClearProxy = () => {
    if (confirm("Are you sure you want to clear your custom proxy settings?")) {
      localStorage.removeItem(STORAGE_KEY);
      setProxyConfig({
        name: "Custom Proxy",
        model: "local-model",
        proxyUrl: "http://localhost:1234/v1/chat/completions",
        apiKey: "",
      });
      setTestStatus("idle");
      setTestMessage("");

      // If it was selected, disconnect it
      if (selectedProvider === "custom") {
        clearAPIKey(); // This clears selection
        setSelectedProvider(null);
      }
      setApiKeys((prev) => ({ ...prev, custom: "" }));
      setIsProxyEditing(true); // Go back to edit mode
    }
  };


  const handleDeleteKey = (provider: APIProvider) => {
    if (provider === "custom") {
      handleClearProxy();
      return;
    }

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
      localStorage.removeItem(STORAGE_KEY); // Clear custom proxy config too
      setApiKeys({
        openai: "",
        gemini: "",
        openrouter: "",
        huggingface: "",
        lmstudio: "",
        custom: "",
      });
      setSelectedProvider(null);
      // Reset proxy config state
      setProxyConfig({
        name: "Custom Proxy",
        model: "local-model",
        proxyUrl: "http://localhost:1234/v1/chat/completions",
        apiKey: "",
      });
      setIsProxyEditing(true);
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
    <div className="min-h-screen bg-background relative">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-900 border border-violet-500/30 p-8 rounded-2xl shadow-2xl shadow-violet-500/20 max-w-sm w-full text-center flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full bg-violet-500/20 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-violet-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Proxy Configured!</h3>
            <p className="text-slate-400">Your custom proxy settings have been saved and activated.</p>
          </motion.div>
        </div>
      )}

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
            {activeProvider?.value === "custom" ? (
              <div className="space-y-6">
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

                {/* --- CUSTOM PROXY EDIT vs VIEW --- */}
                {isProxyEditing ? (
                  <div className="p-6 rounded-xl bg-slate-800/20 border border-slate-700/50 animate-in slide-in-from-top-4 duration-300">
                    <div className="grid gap-6">
                      {/* Configuration Name */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                          <Settings className="w-3 h-3 text-violet-400" />
                          Configuration Name
                        </label>
                        <input
                          type="text"
                          value={proxyConfig.name}
                          onChange={(e) => setProxyConfig({ ...proxyConfig, name: e.target.value })}
                          placeholder="e.g. My Local LM Studio"
                          className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 outline-none transition-all text-sm"
                        />
                      </div>

                      {/* Model Name */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                          <Zap className="w-3 h-3 text-yellow-400" />
                          Model Name
                        </label>
                        <input
                          type="text"
                          value={proxyConfig.model}
                          onChange={(e) => setProxyConfig({ ...proxyConfig, model: e.target.value })}
                          placeholder="e.g. llama-3.2-1b-instruct"
                          className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 outline-none transition-all text-sm"
                        />
                        <p className="text-xs text-slate-500 mt-2">
                          The exact model ID required by your provider.
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Proxy URL */}
                        <div className="md:col-span-2">
                          <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                            <Globe className="w-3 h-3 text-blue-400" />
                            Proxy Endpoint URL
                          </label>
                          <input
                            type="text"
                            value={proxyConfig.proxyUrl}
                            onChange={(e) => setProxyConfig({ ...proxyConfig, proxyUrl: e.target.value })}
                            placeholder="https://.../v1/chat/completions"
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 outline-none transition-all font-mono text-sm"
                          />
                          <p className="text-xs text-slate-500 mt-2">
                            Must be an OpenAI-compatible endpoint ending in <code className="bg-slate-800 px-1 rounded">/v1/chat/completions</code>.
                          </p>
                        </div>

                        {/* API Key */}
                        <div className="md:col-span-2">
                          <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                            <Key className="w-3 h-3 text-green-400" />
                            API Key (Optional)
                          </label>
                          <input
                            type="password"
                            value={proxyConfig.apiKey}
                            onChange={(e) => setProxyConfig({ ...proxyConfig, apiKey: e.target.value })}
                            placeholder="sk-..."
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 outline-none transition-all font-mono text-sm"
                          />
                        </div>
                      </div>

                      {/* Test Results */}
                      {testStatus === "error" && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-red-400 text-sm">Connection Failed</h4>
                            <p className="text-xs text-red-300/80 mt-1">{testMessage}</p>
                          </div>
                        </div>
                      )}

                      {testStatus === "success" && (
                        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-green-400 text-sm">Connection Successful</h4>
                            <p className="text-xs text-green-300/80 mt-1">Response: &quot;{testMessage}&quot;</p>
                          </div>
                        </div>
                      )}


                      {/* Actions */}
                      <div className="flex flex-col gap-3 pt-2">
                        <div className="flex gap-3">
                          <button
                            onClick={handleTestProxyConnection}
                            disabled={isTestLoading || !proxyConfig.proxyUrl}
                            className={`flex-1 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-all text-sm ${isTestLoading
                              ? "bg-slate-700 text-slate-400 cursor-wait"
                              : "bg-slate-700 hover:bg-slate-600 text-white"
                              }`}
                          >
                            {isTestLoading ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                Testing...
                              </>
                            ) : (
                              <>
                                <Server className="w-4 h-4" />
                                Test Connection
                              </>
                            )}
                          </button>

                          <button
                            onClick={handleSaveProxy}
                            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-medium flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20 transition-all text-sm"
                          >
                            <Save className="w-4 h-4" />
                            Save & Activate
                          </button>
                        </div>

                        {/* Cancel Edit if we have a saved config */}
                        {hasKey("custom") && (
                          <button
                            onClick={() => setIsProxyEditing(false)}
                            className="text-sm text-slate-400 hover:text-white mt-1"
                          >
                            Cancel Editing
                          </button>
                        )}

                        {hasKey("custom") && (
                          <button
                            onClick={handleClearProxy}
                            className="text-xs text-red-400 hover:text-red-300 flex items-center justify-center gap-1 mt-2 mb-2"
                          >
                            <Trash2 className="w-3 h-3" />
                            Clear Proxy Configuration
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* --- VIEW MODE --- */
                  <div className="p-8 rounded-xl bg-slate-800/30 border border-green-500/30 flex flex-col items-center text-center animate-in slide-in-from-bottom-4 duration-300">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4 border border-green-500/30 shadow-lg shadow-green-500/10">
                      <CheckCircle2 className="w-8 h-8 text-green-400" />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1">
                      {proxyConfig.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-6">
                      <span className="px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 text-xs border border-slate-600">
                        {proxyConfig.model}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-green-900/50 text-green-400 text-xs border border-green-800">
                        Active
                      </span>
                    </div>

                    <div className="w-full max-w-md bg-slate-900/50 rounded-lg p-3 mb-6 border border-slate-800">
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-mono break-all justify-center">
                        <Globe className="w-3 h-3 shrink-0" />
                        {proxyConfig.proxyUrl}
                      </div>
                    </div>

                    <div className="flex gap-3 w-full max-w-sm">
                      <button
                        onClick={handleTestProxyConnection}
                        disabled={isTestLoading}
                        className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                          isTestLoading
                            ? "bg-slate-700 text-slate-400 cursor-wait"
                            : "bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-500/20"
                        }`}
                      >
                        {isTestLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            Testing...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            Test Connection
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => setIsProxyEditing(true)}
                        className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm transition-colors shadow-lg shadow-violet-500/20"
                      >
                        Edit Configuration
                      </button>
                    </div>

                    {/* View Mode Test Result */}
                    {testStatus === "success" && (
                      <div className="mt-4 text-xs text-green-400 bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20 animate-in fade-in">
                        ✅ Test Successful: &quot;{testMessage}&quot;
                      </div>
                    )}

                    {testStatus === "error" && (
                      <div className="mt-4 text-xs text-red-400 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20 animate-in fade-in">
                        ❌ Test Failed: {testMessage}
                      </div>
                    )}

                  </div>
                )}

                <div className="text-center">
                  <p className="text-xs text-slate-500">
                    Learn how to set up <a href="#" className="underline hover:text-slate-400">LM Studio</a> or <a href="#" className="underline hover:text-slate-400">Ollama</a> for local generation.
                  </p>
                </div>
              </div>
            ) : activeProvider && (
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

                {/* Test Success Message */}
                {apiKeyTestStatus[activeTab] === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-green-500/10 border border-green-500/30"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-green-400">
                          API Key is Valid!
                        </p>
                        <p className="text-xs text-green-300/80 mt-1">
                          Response: &quot;{apiKeyTestMessage[activeTab]}&quot;
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Test Error Message */}
                {apiKeyTestStatus[activeTab] === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/30"
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-red-400">
                          API Key Validation Failed
                        </p>
                        <p className="text-xs text-red-300/80 mt-1">
                          {apiKeyTestMessage[activeTab]}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Actions */}
                <div className="flex flex-col gap-3">
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

                  {/* Test Button - Shows after key is entered */}
                  {apiKeys[activeTab].trim().length >= 10 && (
                    <button
                      onClick={() => handleTestAPIKey(activeTab)}
                      disabled={apiKeyTestLoading[activeTab]}
                      className={`w-full py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-all text-sm ${
                        apiKeyTestLoading[activeTab]
                          ? "bg-slate-700 text-slate-400 cursor-wait"
                          : hasKey(activeTab)
                          ? "bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-500/20"
                          : "bg-slate-700 hover:bg-slate-600 text-white"
                      }`}
                    >
                      {apiKeyTestLoading[activeTab] ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          Testing API Key...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          Test API Key
                        </>
                      )}
                    </button>
                  )}
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
