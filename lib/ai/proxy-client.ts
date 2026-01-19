
/**
 * Client-side Proxy Client
 * Handles communication with the backend AI proxy (/api/ai/chat).
 * Automatically injects user-configured proxy settings from LocalStorage if present.
 * 
 * CRITICAL: Enforces proper chat message role structure to prevent system prompt leakage
 * - System messages: Rules, jailbreaks, formatting constraints (NEVER visible in output)
 * - User messages: Character data and generation instructions
 * - Assistant messages: Generated content ONLY
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
 * Enforces proper message structure for proxy LLMs
 * Ensures system, user, and assistant roles are properly separated
 * 
 * WHY THIS IS CRITICAL:
 * Proxy/local LLMs often fail to distinguish between:
 * - System instructions (should never appear in output)
 * - User prompts (the actual generation request)
 * - Assistant responses (the generated content)
 * 
 * By enforcing role separation, we prevent jailbreak text and rules
 * from leaking into the final character content.
 */
function enforceMessageStructure(messages: ChatMessage[]): ChatMessage[] {
    // Separate messages by role
    const systemMessages = messages.filter(m => m.role === "system");
    const userMessages = messages.filter(m => m.role === "user");
    const assistantMessages = messages.filter(m => m.role === "assistant");

    // Reconstruct with proper order: system → user → assistant
    const structured: ChatMessage[] = [];

    // Add system messages first (these contain rules and jailbreaks)
    if (systemMessages.length > 0) {
        // Combine all system messages into one
        const combinedSystem = systemMessages.map(m => m.content).join("\n\n");
        structured.push({
            role: "system",
            content: combinedSystem,
        });
    }

    // Add user messages (these contain the actual generation request)
    if (userMessages.length > 0) {
        // Combine all user messages into one
        const combinedUser = userMessages.map(m => m.content).join("\n\n");
        structured.push({
            role: "user",
            content: combinedUser,
        });
    }

    // Add assistant messages if any (for multi-turn conversations)
    assistantMessages.forEach(m => structured.push(m));

    return structured;
}

/**
 * Sends a chat request to the AI Proxy.
 * Uses the custom proxy configuration from LocalStorage if available.
 * Otherwise, the backend relies on its server-side environment variables.
 * 
 * AUTOMATICALLY enforces proper message structure to prevent system leakage.
 */
export async function chatWithProxy(messages: ChatMessage[], options: ProxyChatOptions = {}) {
    // 1. Enforce proper message structure (CRITICAL for proxy LLMs)
    const structuredMessages = enforceMessageStructure(messages);

    // 2. Get User Overrides (Client-Side)
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

    // 3. Call Backend with structured messages
    const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers,
        body: JSON.stringify({
            messages: structuredMessages,
            ...options,
        }),
    });

    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error?.message || `Request failed: ${response.statusText}`);
    }

    // 4. Return result (OpenAI format)
    const data = await response.json();
    return data.choices?.[0]?.message?.content;
}
