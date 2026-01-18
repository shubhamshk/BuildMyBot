/**
 * API Key management utilities
 * All keys stored in localStorage (frontend only)
 */

import { detectProviderFromKey } from "@/lib/ai/provider-detection";

export type APIProvider = "openai" | "gemini" | "openrouter" | "huggingface" | "lmstudio" | "custom";

export function getAPIKey(provider?: APIProvider): string | null {
  if (provider === "custom") return null; // Custom proxy doesn't use this storage mechanism directly

  if (provider) {
    const key = localStorage.getItem(`api_key_${provider}`);
    return key && key.trim() !== "" ? key : null;
  }

  const selectedProvider = getSelectedProvider();
  if (!selectedProvider) return null;

  // If custom proxy is selected, we consider it "connected" if the config exists, 
  // but we don't return a single "key" here because it's complex config.
  if (selectedProvider === "custom") return "custom-proxy-active";

  const key = localStorage.getItem(`api_key_${selectedProvider}`);
  return key && key.trim() !== "" ? key : null;
}

export function setAPIKey(provider: APIProvider, key: string): void {
  if (provider === "custom") {
    // Custom proxy settings are handled in app/api-keys/page.tsx directly
    // But we set the provider selection here
    localStorage.setItem("api_key_provider", provider);
    localStorage.setItem("api_key_connected", "true");
    return;
  }

  // Validate key format matches provider
  const detected = detectProviderFromKey(key);
  if (detected && detected !== provider) {
    console.warn(`API key format suggests ${detected} but saving as ${provider}`);
  }

  localStorage.setItem(`api_key_${provider}`, key.trim());
  localStorage.setItem("api_key_provider", provider);
  localStorage.setItem("api_key_connected", "true");
}

export function getSelectedProvider(): APIProvider | null {
  const provider = localStorage.getItem("api_key_provider");
  return provider as APIProvider | null;
}

export function isAPIKeyConnected(): boolean {
  // First check if there's a selected provider
  const provider = getSelectedProvider();
  if (!provider) {
    // Clear any stale connected flag if no provider
    localStorage.removeItem("api_key_connected");
    return false;
  }

  if (provider === "custom") {
    // Check if custom config exists
    const config = localStorage.getItem("custom_proxy_config");
    return !!config;
  }

  // Get the actual key
  const key = localStorage.getItem(`api_key_${provider}`);

  // Validate key exists and is not empty
  if (!key || key.trim() === "" || key.length < 10) {
    // Clear connected flag if key is invalid
    localStorage.removeItem("api_key_connected");
    return false;
  }

  // Check connected flag
  const connected = localStorage.getItem("api_key_connected");
  return connected === "true";
}

export function clearAPIKey(): void {
  const provider = getSelectedProvider();
  if (provider && provider !== "custom") {
    localStorage.removeItem(`api_key_${provider}`);
  }
  localStorage.removeItem("api_key_provider");
  localStorage.removeItem("api_key_connected");
}

/**
 * Clear all API keys from all providers
 */
export function clearAllAPIKeys(): void {
  const providers: APIProvider[] = ["openai", "gemini", "openrouter", "huggingface", "lmstudio"];
  providers.forEach((provider) => {
    localStorage.removeItem(`api_key_${provider}`);
  });
  localStorage.removeItem("custom_proxy_config");
  localStorage.removeItem("api_key_provider");
  localStorage.removeItem("api_key_connected");
}

/**
 * Get all configured API keys (masked for display)
 */
export function getAllAPIKeys(): Record<APIProvider, { exists: boolean; masked: string }> {
  const providers: APIProvider[] = ["openai", "gemini", "openrouter", "huggingface", "lmstudio", "custom"];
  const result: Record<APIProvider, { exists: boolean; masked: string }> = {} as any;

  providers.forEach((provider) => {
    if (provider === "custom") {
      const config = localStorage.getItem("custom_proxy_config");
      result[provider] = { exists: !!config, masked: config ? "Proxy Configured" : "" };
      return;
    }

    const key = localStorage.getItem(`api_key_${provider}`);
    if (key && key.trim() !== "") {
      result[provider] = {
        exists: true,
        masked: key.length > 12 ? `${key.slice(0, 6)}...${key.slice(-4)}` : "••••••••",
      };
    } else {
      result[provider] = { exists: false, masked: "" };
    }
  });

  return result;
}
