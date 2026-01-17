/**
 * AI Generation Service
 * Handles all AI content generation with API key management and auto-detection
 */

import { CharacterState } from "@/context/CharacterContext";
import { getAPIKey, getSelectedProvider, APIProvider } from "@/lib/api-key";
import { getAIProvider } from "@/lib/ai/providers";
import {
  buildJanitorPersonalityPrompt,
  getPersonalitySystemPrompt,
  buildScenarioPrompt,
  buildInitialMessagePrompt,
  buildCombinedScenarioPrompt,
  buildBioPrompt,
} from "@/lib/prompts/janitor-ai";
import {
  detectProviderFromKey,
  getModelForGeneration,
  getFallbackModel,
  GenerationType,
} from "@/lib/ai/provider-detection";

export interface GenerationState {
  loading: boolean;
  error: string | null;
  content: string | null;
}

/**
 * Get max tokens based on generation type
 * Total output (personality + scenario + initial message + bio) should stay within 800-1200 tokens
 * Individual limits are set to ensure combined output fits within range
 */
function getMaxTokensForType(generationType: GenerationType): number {
  switch (generationType) {
    case "personality":
      return 800; // ~400-500 tokens target (reduced from 1800 to fit total budget)
    case "scenario":
      return 300; // ~300-400 tokens target (scenario section only, initial message separate)
    case "initialMessage":
      return 500; // ~200-300 tokens target
    case "bio":
      return 300; // ~200-300 tokens target
    case "imagePrompts":
      return 2000;
    default:
      return 500;
  }
}

/**
 * Generate with fallback retry logic
 */
export async function generateWithFallback(
  provider: APIProvider,
  apiKey: string,
  prompt: string,
  generationType: GenerationType
): Promise<string> {
  const model = getModelForGeneration(provider, generationType);
  const aiProvider = getAIProvider(provider);
  const maxTokens = getMaxTokensForType(generationType);

  try {
    const result = await aiProvider.generate(prompt, apiKey, model, maxTokens);
    return result;
  } catch (error: any) {
    // Try fallback model if available
    const fallbackModel = getFallbackModel(provider);
    if (fallbackModel && (error.message?.includes("model") || error.message?.includes("404"))) {
      console.warn(`Primary model ${model} failed, trying fallback ${fallbackModel}`);
      try {
        const result = await aiProvider.generate(prompt, apiKey, fallbackModel, maxTokens);
        return result;
      } catch (fallbackError: any) {
        throw new Error(`Generation failed with both models. Primary: ${error.message}. Fallback: ${fallbackError.message}`);
      }
    }
    throw error;
  }
}

/**
 * Generate personality content in Janitor AI format
 */
export async function generatePersonality(
  character: CharacterState,
  apiKey: string,
  provider: APIProvider
): Promise<string> {
  const systemPrompt = getPersonalitySystemPrompt();
  const userPrompt = buildJanitorPersonalityPrompt(character);

  // For OpenAI/OpenRouter, use system/user messages
  if (provider === "openai" || provider === "openrouter") {
    const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;
    return await generateWithFallback(provider, apiKey, fullPrompt, "personality");
  }

  // For Gemini/HuggingFace, combine into single prompt
  const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;
  return await generateWithFallback(provider, apiKey, fullPrompt, "personality");
}

/**
 * Generate scenario
 */
export async function generateScenario(
  character: CharacterState,
  userScenario: string | undefined,
  apiKey: string,
  provider: APIProvider
): Promise<string> {
  const prompt = buildScenarioPrompt(character, userScenario);
  return await generateWithFallback(provider, apiKey, prompt, "scenario");
}

/**
 * Generate initial message
 */
export async function generateInitialMessage(
  character: CharacterState,
  scenario: string | undefined,
  apiKey: string,
  provider: APIProvider
): Promise<string> {
  const prompt = buildInitialMessagePrompt(character, scenario);
  return await generateWithFallback(provider, apiKey, prompt, "initialMessage");
}

/**
 * Generate COMBINED scenario for multiple characters in one story
 */
export async function generateCombinedScenario(
  characters: CharacterState[],
  userScenario: string | undefined,
  apiKey: string,
  provider: APIProvider
): Promise<string> {
  const prompt = buildCombinedScenarioPrompt(characters, userScenario);
  // Use scenario type but with increased tokens for multiple characters
  return await generateWithFallback(provider, apiKey, prompt, "scenario");
}

/**
 * Generate bio for character
 */
export async function generateBio(
  character: CharacterState,
  scenario: string,
  apiKey: string,
  provider: APIProvider
): Promise<string> {
  const prompt = buildBioPrompt(character, scenario);
  return await generateWithFallback(provider, apiKey, prompt, "bio");
}

/**
 * Validate API key and auto-detect provider
 */
export function validateAPIKey(): { valid: boolean; apiKey: string | null; provider: APIProvider | null; error?: string } {
  // First try to get selected provider
  const selectedProvider = getSelectedProvider();
  let apiKey: string | null = null;
  let provider: APIProvider | null = selectedProvider;

  if (selectedProvider) {
    apiKey = getAPIKey(selectedProvider);
    if (apiKey && apiKey.trim() !== "" && apiKey.length >= 10) {
      return { valid: true, apiKey, provider: selectedProvider };
    }
  }

  // Auto-detect from all stored keys
  const providers: APIProvider[] = ["openrouter", "openai", "gemini", "huggingface", "lmstudio"];
  for (const p of providers) {
    const key = getAPIKey(p);
    if (key && key.trim() !== "" && key.length >= 10) {
      const detected = detectProviderFromKey(key);
      if (detected === p) {
        // Update selected provider
        localStorage.setItem("api_key_provider", p);
        localStorage.setItem("api_key_connected", "true");
        return { valid: true, apiKey: key, provider: p };
      }
    }
  }

  return {
    valid: false,
    apiKey: null,
    provider: null,
    error: "No valid API key found. Please add an API key in the API Key Manager.",
  };
}
