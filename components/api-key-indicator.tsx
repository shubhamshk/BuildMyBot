"use client";

import { useState, useEffect } from "react";
import { Key, CheckCircle2, Settings2, ChevronDown } from "lucide-react";
import { isAPIKeyConnected, getSelectedProvider, getAPIKey, APIProvider } from "@/lib/api-key";
import { APIKeyManager } from "./api-key-manager";

const PROVIDER_LABELS: Record<APIProvider, string> = {
  openai: "OpenAI",
  gemini: "Gemini",
  openrouter: "OpenRouter",
  huggingface: "HuggingFace",
  lmstudio: "LM Studio",
};

export function APIKeyIndicator() {
  const [connected, setConnected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeProvider, setActiveProvider] = useState<APIProvider | null>(null);
  const [maskedKey, setMaskedKey] = useState<string>("");

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

  if (connected && activeProvider) {
    return (
      <>
        <div className="relative api-key-dropdown">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDropdown(!showDropdown);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass border border-green-500/30 bg-green-500/10 hover:bg-green-500/20 transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span className="text-xs font-medium text-green-400 hidden sm:inline">
              {PROVIDER_LABELS[activeProvider]}
            </span>
            <ChevronDown className={`w-3 h-3 text-green-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 w-64 rounded-xl glass border border-border shadow-xl z-50 overflow-hidden">
              <div className="p-3 border-b border-border">
                <p className="text-xs text-muted-foreground mb-1">Active Provider</p>
                <p className="text-sm font-medium text-foreground">{PROVIDER_LABELS[activeProvider]}</p>
              </div>
              <div className="p-3 border-b border-border">
                <p className="text-xs text-muted-foreground mb-1">API Key</p>
                <code className="text-xs font-mono text-foreground bg-muted/50 px-2 py-1 rounded">
                  {maskedKey}
                </code>
              </div>
              <div className="p-2">
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    setShowModal(true);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-left"
                >
                  <Settings2 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">Manage API Keys</span>
                </button>
              </div>
            </div>
          )}
        </div>
        <APIKeyManager
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={() => {
            setShowModal(false);
            setConnected(true);
          }}
        />
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass border border-border hover:bg-white/5 transition-colors"
      >
        <Key className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground hidden sm:inline">
          Connect API Key
        </span>
      </button>
      <APIKeyManager
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={() => {
          setShowModal(false);
          setConnected(true);
        }}
      />
    </>
  );
}
