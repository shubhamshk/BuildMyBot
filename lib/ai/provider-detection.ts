/**
 * Provider detection and model selection
 * Auto-detects provider from API key pattern and selects safe models
 */

// ==============================================================================
//  NEW PROXY SYSTEM AVAILABLE
// ==============================================================================
//  We have implemented a Janitor-AI style Proxy System.
//  New features should prefer using the Proxy Route: /api/ai/chat
//  
//  To use the proxy in frontend components:
//  import { chatWithProxy } from "@/lib/ai/proxy-client";
//  
//  To configure the proxy:
//  - Server-side: Set AI_PROXY_URL, AI_PROXY_KEY env vars
//  - Client-side: Visit /settings/proxy to set a custom endpoint (e.g. Localhost)
//  
//  See: lib/ai/proxy-config.ts, app/api/ai/chat/route.ts
// ==============================================================================

import { APIProvider } from "@/lib/api-key";

export type GenerationType = "personality" | "scenario" | "initialMessage" | "bio" | "imagePrompts";

export interface ModelConfig {
  default: string;
  fallback?: string;
  long?: string; // For personality generation
}

export const MODEL_CONFIGS: Record<APIProvider, ModelConfig> = {
  openai: {
    default: "gpt-5-turbo", // Enable GPT-5 for all clients
    long: "gpt-5",
    fallback: "gpt-4o",
  },
  gemini: {
    default: "gemini-2.0-flash",
    fallback: "gemini-1.5-flash",
    long: "gemini-2.0-flash",
  },
  openrouter: {
    default: "openai/gpt-5-turbo",
    long: "openai/gpt-5",
    fallback: "openai/gpt-4o",
  },
  huggingface: {
    default: "meta-llama/Llama-3.1-8B-Instruct",
    fallback: "mistralai/Mistral-7B-Instruct-v0.2",
  },
  lmstudio: {
    default: "local-model",
    long: "local-model",
  },
  custom: {
    default: "local-model",
    long: "local-model",
  },
};

/**
 * Detect provider from API key pattern
 */
export function detectProviderFromKey(apiKey: string): APIProvider | null {
  const trimmed = apiKey.trim();

  if (trimmed.startsWith("sk-or-")) {
    return "openrouter";
  }
  if (trimmed.startsWith("sk-")) {
    return "openai";
  }
  if (trimmed.startsWith("AIza")) {
    return "gemini";
  }
  if (trimmed.startsWith("hf_")) {
    return "huggingface";
  }

  return null;
}

/**
 * Get model for generation type
 */
export function getModelForGeneration(
  provider: APIProvider,
  generationType: GenerationType
): string {
  const config = MODEL_CONFIGS[provider];

  if (generationType === "personality" && config.long) {
    return config.long;
  }

  return config.default;
}

/**
 * Get fallback model for provider
 */
export function getFallbackModel(provider: APIProvider): string | null {
  return MODEL_CONFIGS[provider].fallback || null;
}
