
/**
 * Client-side Proxy Client
 * Handles communication with the backend AI proxy (/api/ai/chat).
 * Automatically injects user-configured proxy settings from LocalStorage if present.
 */

export interface ChatMessage {
    role: "system" | "user" | "assistant";
    content: string;
}

export interface ProxyChatOptions {
    temperature?: number;
    max_tokens?: number;
    stream?: boolean; // Not yet fully implemented in backend, but reserved
}

/**
 * Sends a chat request to the AI Proxy.
 * Uses the custom proxy configuration from LocalStorage if available.
 * Otherwise, the backend relies on its server-side environment variables.
 */
export async function chatWithProxy(messages: ChatMessage[], options: ProxyChatOptions = {}) {
    // 1. Get User Overrides (Client-Side)
    let headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    const savedConfig = typeof window !== "undefined" ? localStorage.getItem("custom_proxy_config") : null;
    if (savedConfig) {
        try {
            const config = JSON.parse(savedConfig);
            if (config.proxyUrl) {
                headers["x-ai-proxy-url"] = config.proxyUrl;
                headers["x-ai-proxy-key"] = config.apiKey || "";
                headers["x-ai-model"] = config.model || "local-model";
            }
        } catch (e) {
            console.warn("Failed to parse custom proxy config", e);
        }
    }

    // 2. Call Backend
    const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers,
        body: JSON.stringify({
            messages,
            ...options,
        }),
    });

    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error?.message || `Request failed: ${response.statusText}`);
    }

    // 3. Return result (OpenAI format)
    const data = await response.json();
    return data.choices?.[0]?.message?.content;
}
