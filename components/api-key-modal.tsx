"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Key, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface APIKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const PROVIDERS = [
  { value: "openai", label: "OpenAI", placeholder: "sk-..." },
  { value: "gemini", label: "Google Gemini", placeholder: "AIza..." },
  { value: "openrouter", label: "OpenRouter", placeholder: "sk-or-..." },
  { value: "huggingface", label: "HuggingFace", placeholder: "hf_..." },
];

export function APIKeyModal({ isOpen, onClose, onSave }: APIKeyModalProps) {
  const [selectedProvider, setSelectedProvider] = useState("openai");
  const [apiKey, setApiKey] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Load existing key for selected provider if any
      const stored = localStorage.getItem(`api_key_${selectedProvider}`);
      if (stored) {
        setApiKey(stored);
      } else {
        setApiKey("");
      }
    }
  }, [isOpen, selectedProvider]);

  const handleSave = () => {
    if (!apiKey.trim()) return;

    setIsSaving(true);

    // Store API key in localStorage
    localStorage.setItem(`api_key_${selectedProvider}`, apiKey.trim());
    localStorage.setItem("api_key_provider", selectedProvider);
    localStorage.setItem("api_key_connected", "true");

    // Small delay for UX
    setTimeout(() => {
      setIsSaving(false);
      onSave();
      onClose();
    }, 300);
  };

  const handleClose = () => {
    setApiKey("");
    onClose();
  };

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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            style={{ pointerEvents: 'auto' }}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[550] flex items-center justify-center h-full w-full px-30">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-3xl p-6 sm:p-8 max-w-md w-full border border-border shadow-2xl pointer-events-auto bg-background"
              style={{
                boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)',
                maxWidth: '420px',
                minWidth: '0',
                margin: '0 auto',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                    <Key className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">
                      API Key Required
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Enter your API key to generate content
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-lg glass border border-border hover:bg-white/5 transition-colors flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-foreground" />
                </button>
              </div>

              {/* Provider Selection */}
              <div className="mb-6">
                <label className="text-sm font-medium text-foreground mb-2 block">
                  AI Provider
                </label>
                <select
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl glass border border-border focus:border-violet-500 transition-all outline-none appearance-none cursor-pointer bg-background [&>option]:bg-zinc-900 [&>option]:text-white"
                >
                  {PROVIDERS.map((provider) => (
                    <option key={provider.value} value={provider.value} className="bg-zinc-900 text-white">
                      {provider.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* API Key Input */}
              <div className="mb-6">
                <label className="text-sm font-medium text-foreground mb-2 block">
                  API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder={PROVIDERS.find((p) => p.value === selectedProvider)?.placeholder}
                  className="w-full h-12 px-4 rounded-xl glass border border-border focus:border-violet-500 transition-all outline-none font-mono text-sm"
                  autoFocus
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Your API key is stored locally and never sent to our servers.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 flex-col sm:flex-row">
                <button
                  onClick={handleClose}
                  className="flex-1 py-3 rounded-xl glass border border-border hover:bg-white/5 transition-colors font-medium"
                >
                  Close
                </button>
                <button
                  onClick={handleSave}
                  disabled={!apiKey.trim() || isSaving}
                  className="flex-1 py-3 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Save Key
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
