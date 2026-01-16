export interface AIProvider {
  generate(prompt: string, apiKey: string, model: string, maxTokens?: number): Promise<string>;
}

/**
 * Google Gemini AI Provider
 */
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
    // Handle system/user message split if prompt contains system instructions
    let messages: Array<{ role: string; content: string }> = [];

    if (prompt.includes("CRITICAL RULES:") || prompt.includes("You are an expert")) {
      // Split system and user prompts
      const systemMatch = prompt.match(/^([\s\S]+?)(?=\n\nCHARACTER|CHARACTER BASICS|User-provided|Generate|Write|Create)/);
      const systemPrompt = systemMatch ? systemMatch[1].trim() : "";
      const userPrompt = systemMatch ? prompt.replace(systemMatch[1], "").trim() : prompt;

      if (systemPrompt) {
        messages.push({ role: "system", content: systemPrompt });
      }
      messages.push({ role: "user", content: userPrompt });
    } else {
      messages.push({ role: "user", content: prompt });
    }

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

    return text.trim();
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
 * LM Studio Provider (OpenAI compatible, local only)
 */
export class LMStudioProvider implements AIProvider {
  async generate(prompt: string, apiKey: string, model: string, maxTokens: number = 1800): Promise<string> {
    const apiUrl = "http://localhost:1234/v1/chat/completions";
    let messages: Array<{ role: string; content: string }> = [];

    const marker = "\n\nCHARACTER";
    if (prompt.includes(marker)) {
      const parts = prompt.split(marker);
      messages.push({ role: "system", content: parts[0].trim() });
      messages.push({ role: "user", content: "CHARACTER" + parts.slice(1).join(marker).trim() });
    } else {
      messages.push({ role: "user", content: prompt });
    }

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
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`LM Studio error (${response.status}): ${errorText || "Is LM Studio running?"}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;

    if (!text || text.trim() === "") {
      throw new Error("LM Studio returned empty response.");
    }

    return text.trim();
  }
}

/**
 * Get AI provider instance
 */
export function getAIProvider(provider: "openai" | "gemini" | "openrouter" | "huggingface" | "lmstudio"): AIProvider {
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
  throw new Error(`Unknown provider: ${provider}`);
}
