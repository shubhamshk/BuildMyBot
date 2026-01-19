import { sanitizeAIOutput } from "./output-sanitizer";

export interface AIProvider {
  generate(prompt: string, apiKey: string, model: string, maxTokens?: number): Promise<string>;
}

/**
 * Split combined prompt into system and user messages
 * This prevents system rules from being concatenated with user prompts,
 * which causes proxy LLMs to echo instructions into output
 */
function splitPromptIntoMessages(prompt: string): Array<{ role: string; content: string }> {
  const messages: Array<{ role: string; content: string }> = [];

  // Look for delimiter patterns that indicate system/user split
  const delimiters = [
    "\n\nCHARACTER BASICS:",
    "\n\nCHARACTER:",
    "\n\nUser-provided",
    "\n\nGenerate",
    "\n\nWrite",
    "\n\nCreate",
  ];

  let splitPoint = -1;
  let foundDelimiter = "";
  
  for (const delimiter of delimiters) {
    const index = prompt.indexOf(delimiter);
    if (index !== -1) {
      splitPoint = index;
      foundDelimiter = delimiter;
      break;
    }
  }

  if (splitPoint > 0) {
    // Found a split point - separate system from user
    const systemContent = prompt.substring(0, splitPoint).trim();
    const userContent = prompt.substring(splitPoint + foundDelimiter.length).trim();

    if (systemContent) {
      messages.push({ role: "system", content: systemContent });
    }
    messages.push({ role: "user", content: userContent });
  } else {
    // No clear split - treat entire prompt as user message
    messages.push({ role: "user", content: prompt });
  }

  return messages;
}

/**
 * Google Gemini AI Provider
 */

// ==============================================================================
//  NOTE: PROXY SYSTEM IMPLEMENTATION
//  For generic chat features, prefer using the new Proxy Route: /api/ai/chat
//  It supports custom user-defined proxies (JanitorAI style) and server defaults.
//  Usage: import { chatWithProxy } from "@/lib/ai/proxy-client";
// ==============================================================================

export class GeminiProvider implements AIProvider {
  async generate(prompt: string, apiKey: string, model: string, maxTokens: number = 1800): Promise<string> {
    const url = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: maxTokens,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Gemini API error`;
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = `Gemini API error: ${errorJson.error?.message || errorText}`;
      } catch {
        errorMessage = `Gemini API error: ${errorText}`;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    // Fail loudly on empty response
    if (!text || text.trim() === "") {
      throw new Error("Gemini API returned empty response. Please check your API key and model access.");
    }

    return text.trim();
  }
}

/**
 * OpenAI Provider
 */
export class OpenAIProvider implements AIProvider {
  async generate(prompt: string, apiKey: string, model: string, maxTokens: number = 1800): Promise<string> {
    // CRITICAL: Use proper message structure to prevent system prompt leakage
    const messages = splitPromptIntoMessages(prompt);

    // Determine API endpoint based on model
    const isOpenRouter = model.includes("/");
    const apiUrl = isOpenRouter
      ? "https://openrouter.ai/api/v1/chat/completions"
      : "https://api.openai.com/v1/chat/completions";

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (isOpenRouter) {
      headers["Authorization"] = `Bearer ${apiKey}`;
      headers["HTTP-Referer"] = typeof window !== "undefined" ? window.location.origin : "";
      headers["X-Title"] = "Characteria";
    } else {
      headers["Authorization"] = `Bearer ${apiKey}`;
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: model,
        messages,
        temperature: 0.7,
        max_tokens: maxTokens,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: { message: "Unknown error" } }));
      throw new Error(`API error: ${error.error?.message || "Unknown error"}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;

    // Fail loudly on empty response
    if (!text || text.trim() === "") {
      throw new Error("API returned empty response. Please check your API key and model access.");
    }

    // Sanitize output (especially important for OpenRouter proxy models)
    return sanitizeAIOutput(text.trim());
  }
}

/**
 * HuggingFace Provider (basic implementation)
 */
export class HuggingFaceProvider implements AIProvider {
  async generate(prompt: string, apiKey: string, model: string, maxTokens: number = 1800): Promise<string> {
    // HuggingFace inference API
    const url = `https://api-inference.huggingface.co/models/${model}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: maxTokens,
          temperature: 0.7,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Unknown error" }));
      throw new Error(`HuggingFace API error: ${error.error || "Unknown error"}`);
    }

    const data = await response.json();
    const text = Array.isArray(data) ? data[0]?.generated_text : data.generated_text;

    // Fail loudly on empty response
    if (!text || text.trim() === "") {
      throw new Error("HuggingFace API returned empty response.");
    }

    return text.trim();
  }
}


/**
 * Proxy Provider (for custom endpoints, JanitorAI style)
 * 
 * CRITICAL: This is the most important provider for proper message structure enforcement.
 * Proxy/local LLMs are especially prone to echoing system instructions into output.
 */
export class ProxyProvider implements AIProvider {
  async generate(prompt: string, apiKey: string, model: string, maxTokens: number = 1800): Promise<string> {
    // Get proxy config from localStorage (client-side), apiKey parameter (server-side), or environment
    let proxyUrl = "";
    let proxyKey = "";
    let proxyModel = model || "local-model";

    if (typeof window !== "undefined") {
      // Client-side: get from localStorage
      const savedConfig = localStorage.getItem("custom_proxy_config");
      if (savedConfig) {
        try {
          const config = JSON.parse(savedConfig);
          proxyUrl = config.proxyUrl || "";
          proxyKey = config.apiKey || "";
          proxyModel = config.model || model || "local-model";
        } catch (e) {
          console.warn("Failed to parse proxy config", e);
        }
      }
    } else {
      // Server-side: try to parse apiKey as JSON config first, then fall back to environment
      if (apiKey && apiKey.startsWith("{")) {
        try {
          const config = JSON.parse(apiKey);
          proxyUrl = config.proxyUrl || "";
          proxyKey = config.apiKey || "";
          proxyModel = config.model || model || "local-model";
        } catch (e) {
          console.warn("Failed to parse proxy config from apiKey", e);
        }
      }
      
      // Fall back to environment variables if not provided via apiKey
      if (!proxyUrl) {
        proxyUrl = process.env.AI_PROXY_URL || "";
        proxyKey = process.env.AI_PROXY_KEY || "";
        proxyModel = process.env.AI_PROXY_MODEL || model || "local-model";
      }
    }

    if (!proxyUrl) {
      throw new Error("Custom proxy URL not configured. Please configure in API Keys settings or set AI_PROXY_URL environment variable.");
    }

    // Ensure URL ends with /v1/chat/completions
    if (!proxyUrl.endsWith("/v1/chat/completions")) {
      proxyUrl = proxyUrl.replace(/\/+$/, "") + "/v1/chat/completions";
    }

    // CRITICAL: Use proper message structure to prevent system prompt leakage
    // This is the most important fix for proxy LLMs
    const messages = splitPromptIntoMessages(prompt);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (proxyKey) {
      headers["Authorization"] = `Bearer ${proxyKey}`;
    }

    const response = await fetch(proxyUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: proxyModel,
        messages,
        temperature: 0.7,
        max_tokens: maxTokens,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Proxy API error (${response.status})`;
      
      // Check if response is HTML (Cloudflare error pages, etc.)
      const isHtmlError = errorText.trim().startsWith('<!DOCTYPE') || errorText.trim().startsWith('<html') || errorText.includes('<html');
      
      // Special handling for Cloudflare 524 timeout
      if (isHtmlError && (response.status === 524 || errorText.includes('524: A timeout occurred') || errorText.includes('Error code 524'))) {
        errorMessage = `⚠️ Cloudflare Timeout (524)\n\nYour proxy took too long to respond (>100s for free Cloudflare tunnel).\n\n✅ SOLUTION: Streaming is now enabled! This error should not appear again.\nThe AI will stream responses in real-time, bypassing the timeout.\n\nIf you still see this error, your proxy may not support streaming.\nTry: Using a different model, reducing complexity, or using a non-Cloudflare proxy.`;
      } else if (isHtmlError) {
        // Extract title from HTML for other HTML errors
        const titleMatch = errorText.match(/<title>([^<]+)<\/title>/i);
        const title = titleMatch ? titleMatch[1] : 'Unknown error';
        errorMessage = `Proxy error (${response.status}): ${title}`;
      } else {
        // Try to parse as JSON
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = `Proxy API error: ${errorJson.error?.message || errorText}`;
        } catch {
          // Plain text error - truncate if too long
          const truncatedText = errorText.length > 200 ? errorText.substring(0, 200) + '...' : errorText;
          errorMessage = `Proxy API error: ${truncatedText || response.statusText}`;
        }
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;

    if (!text || text.trim() === "") {
      throw new Error("Proxy API returned empty response.");
    }

    // CRITICAL: Sanitize proxy output (most important for local LLMs)
    // This removes leaked system instructions, jailbreaks, and malformed tokens
    return sanitizeAIOutput(text.trim());
  }
}

// NOTE: Model Capability Warning
// Small models (≤ 3B parameters) often fail structured output requirements.
// Proxy formatting reliability improves significantly with 7B+ models.
// Recommended: Llama 3 8B, Mistral 7B, or larger instruction-tuned models.
// The output sanitizer provides a safety net, but cannot fix fundamentally incoherent output.

/**
 * LM Studio Provider (OpenAI compatible, local only)
 */
export class LMStudioProvider implements AIProvider {
  async generate(prompt: string, apiKey: string, model: string, maxTokens: number = 1800): Promise<string> {
    const apiUrl = "http://localhost:1234/v1/chat/completions";
    
    // CRITICAL: Use proper message structure to prevent system prompt leakage
    const messages = splitPromptIntoMessages(prompt);

    // Create a custom agent with extended timeouts for local LLMs
    // Dynamically import undici to avoid issues in non-Node environments or build times
    const { Agent } = await import("undici");
    const dispatcher = new Agent({
      headersTimeout: 1200000, // 20 minutes
      connectTimeout: 60000,
      bodyTimeout: 1200000,
    });

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": apiKey ? `Bearer ${apiKey}` : "Bearer unused",
      },
      body: JSON.stringify({
        model: model || "local-model",
        messages,
        temperature: 0.7,
        max_tokens: maxTokens,
      }),
      // @ts-ignore - dispatcher is supported by undici but not typed in standard fetch
      dispatcher,
    } as any);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`LM Studio error (${response.status}): ${errorText || "Is LM Studio running?"}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;

    if (!text || text.trim() === "") {
      throw new Error("LM Studio returned empty response.");
    }

    // Sanitize output (local LLMs are prone to instruction leakage)
    return sanitizeAIOutput(text.trim());
  }
}

/**
 * Get AI provider instance
 */
export function getAIProvider(provider: "openai" | "gemini" | "openrouter" | "huggingface" | "lmstudio" | "custom"): AIProvider {
  if (provider === "openai" || provider === "openrouter") {
    return new OpenAIProvider();
  }
  if (provider === "gemini") {
    return new GeminiProvider();
  }
  if (provider === "huggingface") {
    return new HuggingFaceProvider();
  }
  if (provider === "lmstudio") {
    return new LMStudioProvider();
  }
  if (provider === "custom") {
    return new ProxyProvider();
  }
  throw new Error(`Unknown provider: ${provider}`);
}
