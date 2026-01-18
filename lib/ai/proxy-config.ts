
import { APIProvider } from "@/lib/api-key";

export interface ProxyConfig {
    name: string;
    model: string;
    proxyUrl: string;
    apiKey?: string;
}

/**
 * Get the default server-side proxy configuration from environment variables.
 * This is the "safe" storage method for production deployments.
 */
export function getServerProxyConfig(): ProxyConfig | null {
    const proxyUrl = process.env.AI_PROXY_URL;

    if (!proxyUrl) {
        return null;
    }

    return {
        name: process.env.AI_PROXY_NAME || "Server Default",
        model: process.env.AI_PROXY_MODEL || "gpt-3.5-turbo",
        proxyUrl: proxyUrl.endsWith("/v1/chat/completions")
            ? proxyUrl
            : `${proxyUrl.replace(/\/+$/, "")}/v1/chat/completions`,
        apiKey: process.env.AI_PROXY_KEY,
    };
}

/**
 * Validates a proxy configuration.
 */
export function validateProxyConfig(config: Partial<ProxyConfig>): { valid: boolean; error?: string } {
    if (!config.proxyUrl) {
        return { valid: false, error: "Proxy URL is required" };
    }

    try {
        new URL(config.proxyUrl);
    } catch (e) {
        return { valid: false, error: "Invalid Proxy URL format" };
    }

    // JanitorAI/OpenAI proxies typically end in /v1/chat/completions or /v1
    // We strictly enforce /v1/chat/completions as per requirements, 
    // but we can auto-append in the UI/Logic if missing. 
    // For validation, we prefer it to be explicit or fixable.

    return { valid: true };
}
