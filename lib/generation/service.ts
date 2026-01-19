/**
 * AI Generation Service
 * Handles all AI content generation with API key management and auto-detection
 * 
 * UPDATED: Includes output validation, sanitization, and retry logic for proxy LLMs
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
import { 
  sanitizeAndValidate, 
  ValidationResult 
} from "@/lib/ai/output-sanitizer";

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
 * UPDATED: Includes validation and automatic retry on validation failure
 */
export async function generateWithFallback(
  provider: APIProvider,
  apiKey: string,
  prompt: string,
  generationType: GenerationType,
  maxRetries: number = 1
): Promise<string> {
  const model = getModelForGeneration(provider, generationType);
  const aiProvider = getAIProvider(provider);
  const maxTokens = getMaxTokensForType(generationType);

  let lastError: Error | null = null;
  let lastValidation: ValidationResult | null = null;

  // Attempt generation with retries
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Generate content
      const result = await aiProvider.generate(prompt, apiKey, model, maxTokens);

      // Validate and sanitize output (skip for bio which doesn't have strict template requirements)
      if (generationType === "personality" || generationType === "scenario") {
        const { cleaned, validation } = sanitizeAndValidate(
          result,
          generationType === "personality" ? "personality" : "scenario",
          { autoFix: true, logWarnings: true }
        );

        // If validation passed, return cleaned output
        if (validation.valid) {
          if (attempt > 0) {
            console.log(`[Generation] Succeeded on retry attempt ${attempt}`);
          }
          return cleaned;
        }

        // Validation failed - retry if we have attempts left
        lastValidation = validation;
        if (attempt < maxRetries) {
          console.warn(`[Generation] Validation failed on attempt ${attempt + 1}, retrying...`, validation.errors);
          // Add a stricter instruction to the prompt for retry
          prompt = `${prompt}\n\nCRITICAL: Your previous output was invalid. You MUST follow the exact template structure. Do NOT add any text before or after the template tags.`;
          continue;
        }

        // Out of retries - return cleaned output even if validation failed
        console.error(`[Generation] Validation failed after ${maxRetries + 1} attempts:`, validation.errors);
        return cleaned;
      }

      // For other generation types (bio, imagePrompts), just return the result
      return result;

    } catch (error: any) {
      lastError = error;

      // Try fallback model if available and this is the first attempt
      if (attempt === 0) {
        const fallbackModel = getFallbackModel(provider);
        if (fallbackModel && (error.message?.includes("model") || error.message?.includes("404"))) {
          console.warn(`Primary model ${model} failed, trying fallback ${fallbackModel}`);
          try {
            const result = await aiProvider.generate(prompt, apiKey, fallbackModel, maxTokens);
            
            // Validate and sanitize fallback output
            if (generationType === "personality" || generationType === "scenario") {
              const { cleaned, validation } = sanitizeAndValidate(
                result,
                generationType === "personality" ? "personality" : "scenario",
                { autoFix: true, logWarnings: true }
              );
              
              if (validation.valid || attempt >= maxRetries) {
                return cleaned;
              }
              
              lastValidation = validation;
              continue;
            }
            
            return result;
          } catch (fallbackError: any) {
            // Continue to retry logic
            lastError = fallbackError;
          }
        }
      }

      // If this is not the last attempt, retry
      if (attempt < maxRetries) {
        console.warn(`[Generation] Attempt ${attempt + 1} failed, retrying...`, error.message);
        continue;
      }
    }
  }

  // All attempts failed
  if (lastError) {
    throw new Error(`Generation failed after ${maxRetries + 1} attempts. Last error: ${lastError.message}`);
  }
  
  if (lastValidation) {
    throw new Error(`Generation validation failed after ${maxRetries + 1} attempts. Errors: ${lastValidation.errors.join(", ")}`);
  }

  throw new Error("Generation failed for unknown reason");
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
    // Special handling for custom proxy
    if (selectedProvider === "custom") {
      const proxyConfig = localStorage.getItem("custom_proxy_config");
      if (proxyConfig) {
        // Custom proxy is configured, return valid with a placeholder key
        return { valid: true, apiKey: "custom-proxy-configured", provider: "custom" };
      }
    } else {
      apiKey = getAPIKey(selectedProvider);
      if (apiKey && apiKey.trim() !== "" && apiKey.length >= 10) {
        return { valid: true, apiKey, provider: selectedProvider };
      }
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
