/**
 * Provider detection and model selection
 * Auto-detects provider from API key pattern and selects safe models
 */

import { APIProvider } from "@/lib/api-key";

export type GenerationType = "personality" | "scenario" | "initialMessage" | "bio" | "imagePrompts";

export interface ModelConfig {
  default: string;
  fallback?: string;
  long?: string; // For personality generation
}

export const MODEL_CONFIGS: Record<APIProvider, ModelConfig> = {
  openai: {
    default: "gpt-4o-mini",
    long: "gpt-4o",
    fallback: "gpt-3.5-turbo",
  },
  gemini: {
    default: "gemini-2.0-flash",
    fallback: "gemini-1.5-flash",
    long: "gemini-2.0-flash",
  },
  openrouter: {
    default: "openai/gpt-4o-mini",
    long: "openai/gpt-4o",
    fallback: "openai/gpt-3.5-turbo",
  },
  huggingface: {
    default: "meta-llama/Llama-3.1-8B-Instruct",
    fallback: "mistralai/Mistral-7B-Instruct-v0.2",
  },
  lmstudio: {
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
