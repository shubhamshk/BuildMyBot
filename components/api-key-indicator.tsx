"use client";

import { useState, useEffect } from "react";
import { Key, CheckCircle2, Settings2, ChevronDown } from "lucide-react";
import { isAPIKeyConnected, getSelectedProvider, getAPIKey, APIProvider } from "@/lib/api-key";
import { APIKeyManager } from "./api-key-manager";

const PROVIDER_LABELS: Record<APIProvider, string> = {
  openrouter: "OpenRouter",
  openai: "OpenAI",
  gemini: "Gemini",
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
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-slate-900 border border-green-500/40 hover:border-green-500/60 hover:bg-slate-800 transition-all cursor-pointer shadow-lg"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
            <span className="text-xs font-medium text-green-400 hidden sm:inline whitespace-nowrap">
              {PROVIDER_LABELS[activeProvider]}
            </span>
            <ChevronDown className={`w-3 h-3 text-green-400 transition-transform flex-shrink-0 ${showDropdown ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 top-full mt-1.5 w-56 rounded-lg bg-slate-900 border border-slate-700 shadow-2xl z-50 overflow-hidden">
              <div className="p-2.5 border-b border-slate-700">
                <p className="text-[10px] text-slate-400 mb-0.5 uppercase tracking-wide">Active Provider</p>
                <p className="text-xs font-semibold text-green-400">{PROVIDER_LABELS[activeProvider]}</p>
              </div>
              <div className="p-2.5 border-b border-slate-700">
                <p className="text-[10px] text-slate-400 mb-1 uppercase tracking-wide">API Key</p>
                <code className="text-[10px] font-mono text-slate-300 bg-slate-800 px-2 py-1 rounded border border-slate-700 block truncate">
                  {maskedKey}
                </code>
              </div>
              <div className="p-2">
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    setShowModal(true);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-2 rounded-md hover:bg-slate-800 transition-colors text-left border border-transparent hover:border-slate-700"
                >
                  <Settings2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="text-xs text-slate-200 font-medium">Manage API Keys</span>
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
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-slate-900 border border-slate-700 hover:border-slate-600 hover:bg-slate-800 transition-all shadow-lg"
      >
        <Key className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
        <span className="text-xs font-medium text-slate-300 hidden sm:inline whitespace-nowrap">
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
