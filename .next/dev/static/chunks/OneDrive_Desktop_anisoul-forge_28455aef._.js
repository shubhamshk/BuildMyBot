(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/OneDrive/Desktop/anisoul-forge/lib/ai/provider-detection.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Provider detection and model selection
 * Auto-detects provider from API key pattern and selects safe models
 */ __turbopack_context__.s([
    "MODEL_CONFIGS",
    ()=>MODEL_CONFIGS,
    "detectProviderFromKey",
    ()=>detectProviderFromKey,
    "getFallbackModel",
    ()=>getFallbackModel,
    "getModelForGeneration",
    ()=>getModelForGeneration
]);
const MODEL_CONFIGS = {
    openai: {
        default: "gpt-4o-mini",
        long: "gpt-4o",
        fallback: "gpt-3.5-turbo"
    },
    gemini: {
        default: "gemini-2.0-flash",
        fallback: "gemini-1.5-flash",
        long: "gemini-2.0-flash"
    },
    openrouter: {
        default: "openai/gpt-4o-mini",
        long: "openai/gpt-4o",
        fallback: "openai/gpt-3.5-turbo"
    },
    huggingface: {
        default: "meta-llama/Llama-3.1-8B-Instruct",
        fallback: "mistralai/Mistral-7B-Instruct-v0.2"
    }
};
function detectProviderFromKey(apiKey) {
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
function getModelForGeneration(provider, generationType) {
    const config = MODEL_CONFIGS[provider];
    if (generationType === "personality" && config.long) {
        return config.long;
    }
    return config.default;
}
function getFallbackModel(provider) {
    return MODEL_CONFIGS[provider].fallback || null;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Desktop/anisoul-forge/lib/api-key.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearAPIKey",
    ()=>clearAPIKey,
    "clearAllAPIKeys",
    ()=>clearAllAPIKeys,
    "getAPIKey",
    ()=>getAPIKey,
    "getAllAPIKeys",
    ()=>getAllAPIKeys,
    "getSelectedProvider",
    ()=>getSelectedProvider,
    "isAPIKeyConnected",
    ()=>isAPIKeyConnected,
    "setAPIKey",
    ()=>setAPIKey
]);
/**
 * API Key management utilities
 * All keys stored in localStorage (frontend only)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$ai$2f$provider$2d$detection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/lib/ai/provider-detection.ts [app-client] (ecmascript)");
;
function getAPIKey(provider) {
    if (provider) {
        const key = localStorage.getItem(`api_key_${provider}`);
        return key && key.trim() !== "" ? key : null;
    }
    const selectedProvider = getSelectedProvider();
    if (!selectedProvider) return null;
    const key = localStorage.getItem(`api_key_${selectedProvider}`);
    return key && key.trim() !== "" ? key : null;
}
function setAPIKey(provider, key) {
    // Validate key format matches provider
    const detected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$ai$2f$provider$2d$detection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detectProviderFromKey"])(key);
    if (detected && detected !== provider) {
        console.warn(`API key format suggests ${detected} but saving as ${provider}`);
    }
    localStorage.setItem(`api_key_${provider}`, key.trim());
    localStorage.setItem("api_key_provider", provider);
    localStorage.setItem("api_key_connected", "true");
}
function getSelectedProvider() {
    const provider = localStorage.getItem("api_key_provider");
    return provider;
}
function isAPIKeyConnected() {
    // First check if there's a selected provider
    const provider = getSelectedProvider();
    if (!provider) {
        // Clear any stale connected flag if no provider
        localStorage.removeItem("api_key_connected");
        return false;
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
function clearAPIKey() {
    const provider = getSelectedProvider();
    if (provider) {
        localStorage.removeItem(`api_key_${provider}`);
    }
    localStorage.removeItem("api_key_provider");
    localStorage.removeItem("api_key_connected");
}
function clearAllAPIKeys() {
    const providers = [
        "openai",
        "gemini",
        "openrouter",
        "huggingface"
    ];
    providers.forEach((provider)=>{
        localStorage.removeItem(`api_key_${provider}`);
    });
    localStorage.removeItem("api_key_provider");
    localStorage.removeItem("api_key_connected");
}
function getAllAPIKeys() {
    const providers = [
        "openai",
        "gemini",
        "openrouter",
        "huggingface"
    ];
    const result = {};
    providers.forEach((provider)=>{
        const key = localStorage.getItem(`api_key_${provider}`);
        if (key && key.trim() !== "") {
            result[provider] = {
                exists: true,
                masked: key.length > 12 ? `${key.slice(0, 6)}...${key.slice(-4)}` : "••••••••"
            };
        } else {
            result[provider] = {
                exists: false,
                masked: ""
            };
        }
    });
    return result;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "APIKeyManager",
    ()=>APIKeyManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Key$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/lucide-react/dist/esm/icons/key.js [app-client] (ecmascript) <export default as Key>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/lucide-react/dist/esm/icons/eye-off.js [app-client] (ecmascript) <export default as EyeOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$api$2d$key$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/lib/api-key.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$ai$2f$provider$2d$detection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/lib/ai/provider-detection.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const PROVIDERS = [
    {
        value: "openai",
        label: "OpenAI",
        placeholder: "sk-...",
        description: "GPT-4, GPT-3.5, and other OpenAI models",
        icon: "🤖"
    },
    {
        value: "gemini",
        label: "Google Gemini",
        placeholder: "AIza...",
        description: "Gemini Pro and other Google AI models",
        icon: "💎"
    },
    {
        value: "openrouter",
        label: "OpenRouter",
        placeholder: "sk-or-...",
        description: "Access to multiple models (Claude, DeepSeek, etc.)",
        icon: "🌐"
    },
    {
        value: "huggingface",
        label: "HuggingFace",
        placeholder: "hf_...",
        description: "Open-source models from HuggingFace",
        icon: "🤗"
    }
];
function APIKeyManager({ isOpen, onClose, onSave }) {
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("openai");
    const [apiKeys, setApiKeys] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        openai: "",
        gemini: "",
        openrouter: "",
        huggingface: ""
    });
    const [showKeys, setShowKeys] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        openai: false,
        gemini: false,
        openrouter: false,
        huggingface: false
    });
    const [selectedProvider, setSelectedProvider] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [copiedKey, setCopiedKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Load existing keys on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "APIKeyManager.useEffect": ()=>{
            if (isOpen) {
                const keys = {
                    openai: "",
                    gemini: "",
                    openrouter: "",
                    huggingface: ""
                };
                PROVIDERS.forEach({
                    "APIKeyManager.useEffect": (provider)=>{
                        const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$api$2d$key$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAPIKey"])(provider.value);
                        if (key) {
                            keys[provider.value] = key;
                        }
                    }
                }["APIKeyManager.useEffect"]);
                setApiKeys(keys);
                setSelectedProvider((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$api$2d$key$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSelectedProvider"])());
                // Set active tab to selected provider or first provider
                const savedProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$api$2d$key$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSelectedProvider"])();
                if (savedProvider) {
                    setActiveTab(savedProvider);
                }
            }
        }
    }["APIKeyManager.useEffect"], [
        isOpen
    ]);
    const handleSaveKey = (provider)=>{
        const key = apiKeys[provider].trim();
        if (!key) return;
        // Validate key format (basic check)
        if (key.length < 10) {
            alert("Please enter a valid API key (minimum 10 characters)");
            return;
        }
        // Validate key format matches provider
        const detected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$ai$2f$provider$2d$detection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detectProviderFromKey"])(key);
        if (detected && detected !== provider) {
            const confirmed = confirm(`This API key format suggests it's for ${detected.toUpperCase()}, but you're saving it as ${provider.toUpperCase()}. Continue anyway?`);
            if (!confirmed) return;
        } else if (!detected) {
            alert("Warning: Could not detect API key format. Please verify it's correct for the selected provider.");
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$api$2d$key$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setAPIKey"])(provider, key);
        setSelectedProvider(provider);
        // Update local state
        setApiKeys((prev)=>({
                ...prev,
                [provider]: key
            }));
        // Show success feedback
        setTimeout(()=>{
            onSave();
        }, 300);
    };
    const handleDeleteKey = (provider)=>{
        if (confirm(`Are you sure you want to remove the ${PROVIDERS.find((p)=>p.value === provider)?.label} API key?`)) {
            // Clear this specific key
            localStorage.removeItem(`api_key_${provider}`);
            // If this was the selected provider, clear selection
            if (selectedProvider === provider) {
                localStorage.removeItem("api_key_provider");
                localStorage.removeItem("api_key_connected");
                setSelectedProvider(null);
            }
            setApiKeys((prev)=>({
                    ...prev,
                    [provider]: ""
                }));
        }
    };
    const handleClearAll = ()=>{
        if (confirm("Are you sure you want to remove ALL API keys? This action cannot be undone.")) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$api$2d$key$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearAllAPIKeys"])();
            setApiKeys({
                openai: "",
                gemini: "",
                openrouter: "",
                huggingface: ""
            });
            setSelectedProvider(null);
        }
    };
    const handleCopyKey = async (provider)=>{
        const key = apiKeys[provider];
        if (key) {
            try {
                await navigator.clipboard.writeText(key);
                setCopiedKey(provider);
                setTimeout(()=>setCopiedKey(null), 2000);
            } catch (err) {
                console.error("Failed to copy key:", err);
            }
        }
    };
    const getMaskedKey = (key)=>{
        if (!key) return "";
        return key.length > 12 ? `${key.slice(0, 6)}...${key.slice(-4)}` : "••••••••";
    };
    const handleClose = ()=>{
        setApiKeys({
            openai: "",
            gemini: "",
            openrouter: "",
            huggingface: ""
        });
        onClose();
    };
    const hasKey = (provider)=>{
        return !!apiKeys[provider];
    };
    const activeProvider = PROVIDERS.find((p)=>p.value === activeTab);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    onClick: handleClose,
                    className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                }, void 0, false, {
                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                    lineNumber: 198,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            scale: 0.95,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            scale: 1,
                            y: 0
                        },
                        exit: {
                            opacity: 0,
                            scale: 0.95,
                            y: 20
                        },
                        transition: {
                            duration: 0.2,
                            ease: [
                                0.22,
                                1,
                                0.36,
                                1
                            ]
                        },
                        onClick: (e)=>e.stopPropagation(),
                        className: "glass rounded-3xl p-0 max-w-3xl w-full border border-border pointer-events-auto overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6 border-b border-border",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Key$3e$__["Key"], {
                                                        className: "w-6 h-6 text-violet-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                        lineNumber: 221,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                    lineNumber: 220,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "text-2xl font-semibold text-foreground",
                                                            children: "API Key Manager"
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                            lineNumber: 224,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-muted-foreground",
                                                            children: "Manage your AI provider API keys securely"
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                            lineNumber: 227,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                    lineNumber: 223,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                            lineNumber: 219,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleClose,
                                            className: "w-10 h-10 rounded-lg glass border border-border hover:bg-white/5 transition-colors flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                className: "w-5 h-5 text-foreground"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                lineNumber: 236,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                            lineNumber: 232,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                    lineNumber: 218,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                lineNumber: 217,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-6 pt-6 border-b border-border",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2 overflow-x-auto pb-2",
                                    children: PROVIDERS.map((provider)=>{
                                        const hasKeyForProvider = hasKey(provider.value);
                                        const isSelected = selectedProvider === provider.value;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setActiveTab(provider.value),
                                            className: `px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 relative ${activeTab === provider.value ? "bg-violet-500/20 border-2 border-violet-500 text-violet-400" : "glass border border-border hover:bg-white/5 text-muted-foreground"}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-lg",
                                                    children: provider.icon
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                    lineNumber: 258,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium",
                                                    children: provider.label
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                    lineNumber: 259,
                                                    columnNumber: 25
                                                }, this),
                                                hasKeyForProvider && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `w-2 h-2 rounded-full ${isSelected ? "bg-violet-400" : "bg-green-400"}`
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                    lineNumber: 261,
                                                    columnNumber: 27
                                                }, this),
                                                isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                    className: "w-4 h-4 text-violet-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                    lineNumber: 266,
                                                    columnNumber: 27
                                                }, this)
                                            ]
                                        }, provider.value, true, {
                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                            lineNumber: 249,
                                            columnNumber: 23
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                    lineNumber: 243,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                lineNumber: 242,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6",
                                children: activeProvider && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-3xl",
                                                        children: activeProvider.icon
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                        lineNumber: 281,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "text-xl font-semibold text-foreground",
                                                                children: activeProvider.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                                lineNumber: 283,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-muted-foreground",
                                                                children: activeProvider.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                                lineNumber: 286,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                        lineNumber: 282,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                lineNumber: 280,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                            lineNumber: 279,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-sm font-medium text-foreground mb-2 block",
                                                    children: "API Key"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                    lineNumber: 295,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: showKeys[activeTab] ? "text" : "password",
                                                            value: apiKeys[activeTab],
                                                            onChange: (e)=>setApiKeys((prev)=>({
                                                                        ...prev,
                                                                        [activeTab]: e.target.value
                                                                    })),
                                                            placeholder: activeProvider.placeholder,
                                                            className: "w-full h-12 px-4 pr-12 rounded-xl glass border border-border focus:border-violet-500 transition-all outline-none font-mono text-sm",
                                                            autoFocus: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                            lineNumber: 299,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>setShowKeys((prev)=>({
                                                                        ...prev,
                                                                        [activeTab]: !prev[activeTab]
                                                                    })),
                                                            className: "absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-center",
                                                            children: showKeys[activeTab] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                                                                className: "w-4 h-4 text-muted-foreground"
                                                            }, void 0, false, {
                                                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                                lineNumber: 323,
                                                                columnNumber: 29
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                                className: "w-4 h-4 text-muted-foreground"
                                                            }, void 0, false, {
                                                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                                lineNumber: 325,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                            lineNumber: 312,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                    lineNumber: 298,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-muted-foreground mt-2",
                                                    children: "Your API key is stored locally in your browser and never sent to our servers."
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                    lineNumber: 329,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                            lineNumber: 294,
                                            columnNumber: 21
                                        }, this),
                                        hasKey(activeTab) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-4 rounded-xl glass border border-green-500/30 bg-green-500/10",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                        className: "w-5 h-5 text-green-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                        lineNumber: 338,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-medium text-green-400",
                                                                children: "API Key Configured"
                                                            }, void 0, false, {
                                                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                                lineNumber: 340,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-muted-foreground",
                                                                children: selectedProvider === activeTab ? "Currently active for generation" : "Click 'Save & Activate' to use this key"
                                                            }, void 0, false, {
                                                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                                lineNumber: 343,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                        lineNumber: 339,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                lineNumber: 337,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                            lineNumber: 336,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-3",
                                            children: [
                                                hasKey(activeTab) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleCopyKey(activeTab),
                                                            className: "px-4 py-2.5 rounded-xl glass border border-border hover:bg-white/5 transition-colors flex items-center gap-2 text-muted-foreground",
                                                            title: "Copy API Key",
                                                            children: [
                                                                copiedKey === activeTab ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                    className: "w-4 h-4 text-green-400"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                                    lineNumber: 363,
                                                                    columnNumber: 31
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                                    className: "w-4 h-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                                    lineNumber: 365,
                                                                    columnNumber: 31
                                                                }, this),
                                                                copiedKey === activeTab ? "Copied!" : "Copy"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                            lineNumber: 357,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleDeleteKey(activeTab),
                                                            className: "px-4 py-2.5 rounded-xl glass border border-red-500/30 hover:bg-red-500/10 transition-colors flex items-center gap-2 text-red-400",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                    className: "w-4 h-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                                    lineNumber: 373,
                                                                    columnNumber: 29
                                                                }, this),
                                                                "Remove"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                            lineNumber: 369,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleSaveKey(activeTab),
                                                    disabled: !apiKeys[activeTab].trim(),
                                                    className: "flex-1 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                            lineNumber: 383,
                                                            columnNumber: 25
                                                        }, this),
                                                        hasKey(activeTab) ? "Update & Activate" : "Save & Activate"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                    lineNumber: 378,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                            lineNumber: 354,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "pt-4 border-t border-border",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-muted-foreground mb-2",
                                                    children: "Need help getting an API key?"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                    lineNumber: 390,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-2",
                                                    children: [
                                                        activeTab === "openai" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: "https://platform.openai.com/api-keys",
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className: "text-xs text-violet-400 hover:text-violet-300 underline",
                                                            children: "Get OpenAI API Key →"
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                            lineNumber: 393,
                                                            columnNumber: 27
                                                        }, this),
                                                        activeTab === "gemini" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: "https://makersuite.google.com/app/apikey",
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className: "text-xs text-violet-400 hover:text-violet-300 underline",
                                                            children: "Get Gemini API Key →"
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                            lineNumber: 403,
                                                            columnNumber: 27
                                                        }, this),
                                                        activeTab === "openrouter" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: "https://openrouter.ai/keys",
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className: "text-xs text-violet-400 hover:text-violet-300 underline",
                                                            children: "Get OpenRouter API Key →"
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                            lineNumber: 413,
                                                            columnNumber: 27
                                                        }, this),
                                                        activeTab === "huggingface" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: "https://huggingface.co/settings/tokens",
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className: "text-xs text-violet-400 hover:text-violet-300 underline",
                                                            children: "Get HuggingFace Token →"
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                            lineNumber: 423,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                    lineNumber: 391,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                            lineNumber: 389,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                    lineNumber: 277,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                lineNumber: 275,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6 border-t border-border bg-muted/30",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-muted-foreground",
                                                    children: [
                                                        Object.values(apiKeys).filter((k)=>k).length,
                                                        " of ",
                                                        PROVIDERS.length,
                                                        " providers configured"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                    lineNumber: 442,
                                                    columnNumber: 21
                                                }, this),
                                                Object.values(apiKeys).some((k)=>k) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: handleClearAll,
                                                    className: "text-xs text-red-400 hover:text-red-300 flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                            className: "w-3 h-3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                            lineNumber: 450,
                                                            columnNumber: 25
                                                        }, this),
                                                        "Clear All Keys"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                    lineNumber: 446,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                            lineNumber: 441,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleClose,
                                            className: "px-4 py-2 rounded-xl glass border border-border hover:bg-white/5 transition-colors text-sm font-medium",
                                            children: "Close"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                            lineNumber: 455,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                    lineNumber: 440,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                lineNumber: 439,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                        lineNumber: 208,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                    lineNumber: 207,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
        lineNumber: 194,
        columnNumber: 5
    }, this);
}
_s(APIKeyManager, "ORn+Rw3GKwhCf055SRFkzhZJOxs=");
_c = APIKeyManager;
var _c;
__turbopack_context__.k.register(_c, "APIKeyManager");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Desktop/anisoul-forge/lib/ai/providers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GeminiProvider",
    ()=>GeminiProvider,
    "HuggingFaceProvider",
    ()=>HuggingFaceProvider,
    "OpenAIProvider",
    ()=>OpenAIProvider,
    "getAIProvider",
    ()=>getAIProvider
]);
class GeminiProvider {
    async generate(prompt, apiKey, model, maxTokens = 1800) {
        const url = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: maxTokens
                }
            })
        });
        if (!response.ok) {
            const errorText = await response.text();
            let errorMessage = `Gemini API error`;
            try {
                const errorJson = JSON.parse(errorText);
                errorMessage = `Gemini API error: ${errorJson.error?.message || errorText}`;
            } catch  {
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
class OpenAIProvider {
    async generate(prompt, apiKey, model, maxTokens = 1800) {
        // Handle system/user message split if prompt contains system instructions
        let messages = [];
        if (prompt.includes("CRITICAL RULES:") || prompt.includes("You are an expert")) {
            // Split system and user prompts
            const systemMatch = prompt.match(/^(.+?)(?=\n\nCHARACTER|CHARACTER BASICS|User-provided|Generate|Write|Create)/s);
            const systemPrompt = systemMatch ? systemMatch[1].trim() : "";
            const userPrompt = systemMatch ? prompt.replace(systemMatch[1], "").trim() : prompt;
            if (systemPrompt) {
                messages.push({
                    role: "system",
                    content: systemPrompt
                });
            }
            messages.push({
                role: "user",
                content: userPrompt
            });
        } else {
            messages.push({
                role: "user",
                content: prompt
            });
        }
        // Determine API endpoint based on model
        const isOpenRouter = model.includes("/");
        const apiUrl = isOpenRouter ? "https://openrouter.ai/api/v1/chat/completions" : "https://api.openai.com/v1/chat/completions";
        const headers = {
            "Content-Type": "application/json"
        };
        if (isOpenRouter) {
            headers["Authorization"] = `Bearer ${apiKey}`;
            headers["HTTP-Referer"] = ("TURBOPACK compile-time truthy", 1) ? window.location.origin : "TURBOPACK unreachable";
            headers["X-Title"] = "AI Character Builder";
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
                max_tokens: maxTokens
            })
        });
        if (!response.ok) {
            const error = await response.json().catch(()=>({
                    error: {
                        message: "Unknown error"
                    }
                }));
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
class HuggingFaceProvider {
    async generate(prompt, apiKey, model, maxTokens = 1800) {
        // HuggingFace inference API
        const url = `https://api-inference.huggingface.co/models/${model}`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                inputs: prompt,
                parameters: {
                    max_new_tokens: maxTokens,
                    temperature: 0.7
                }
            })
        });
        if (!response.ok) {
            const error = await response.json().catch(()=>({
                    error: "Unknown error"
                }));
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
function getAIProvider(provider) {
    if (provider === "openai" || provider === "openrouter") {
        return new OpenAIProvider();
    }
    if (provider === "gemini") {
        return new GeminiProvider();
    }
    if (provider === "huggingface") {
        return new HuggingFaceProvider();
    }
    throw new Error(`Unknown provider: ${provider}`);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Desktop/anisoul-forge/lib/prompts/janitor-ai.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Janitor AI format prompt builders
 * Follows exact template structure from Janitor AI Master Guide
 */ __turbopack_context__.s([
    "buildInitialMessagePrompt",
    ()=>buildInitialMessagePrompt,
    "buildJanitorPersonalityPrompt",
    ()=>buildJanitorPersonalityPrompt,
    "buildScenarioPrompt",
    ()=>buildScenarioPrompt,
    "getPersonalitySystemPrompt",
    ()=>getPersonalitySystemPrompt
]);
/**
 * Normalize personality sliders into descriptive text
 */ function normalizePersonality(personality) {
    const traits = [];
    // Warmth
    if (personality.warmth > 70) {
        traits.push("warm, empathetic, and approachable");
    } else if (personality.warmth < 30) {
        traits.push("reserved, stoic, and emotionally distant");
    } else {
        traits.push("balanced in emotional warmth");
    }
    // Confidence
    if (personality.confidence > 70) {
        traits.push("bold, assertive, and takes the lead");
    } else if (personality.confidence < 30) {
        traits.push("shy, submissive, and prefers to follow");
    } else {
        traits.push("moderately confident");
    }
    // Calmness
    if (personality.calmness > 70) {
        traits.push("calm, predictable, and methodical");
    } else if (personality.calmness < 30) {
        traits.push("chaotic, playful, and unpredictable");
    } else {
        traits.push("balanced between calm and chaotic");
    }
    // Reserve
    if (personality.reserve > 70) {
        traits.push("reserved, internal, and mysterious");
    } else if (personality.reserve < 30) {
        traits.push("expressive, vibrant, and emotionally open");
    } else {
        traits.push("moderately expressive");
    }
    return traits.join(", ");
}
/**
 * Build system prompt for Janitor AI personality generation
 */ function buildPersonalitySystemPrompt() {
    return `You are an expert Janitor AI bot creator. Your task is to create detailed, immersive character personalities following the EXACT Janitor AI format.

CRITICAL RULES (NON-NEGOTIABLE):
- NEVER control {{user}} or speak for the user
- NEVER omit any section
- NEVER add commentary or explanations
- Use third-person narration only
- Avoid negative instructions (say what they DO, not what they DON'T)
- Permanent tokens should be concise but complete
- Personality defines what is ALWAYS true
- Dialogue examples are illustrative ONLY - do NOT use verbatim
- Avoid excessive sexual detail in permanent tokens
- Output plain text only - no markdown, no code blocks

MANDATORY TEMPLATE STRUCTURE:
You MUST output EXACTLY this format with ALL sections filled:

<npcs>
(50–100 word descriptions for NPCs if relevant, or leave empty if none)
</npcs>

<character_name>
Full Name:
Aliases:
Species:
Nationality:
Ethnicity:
Age:
Occupation/Role:
Appearance:
Scent:
Clothing:

[Backstory:
Concise but complete backstory.
Use bullet points for key events.]

Current Residence:

[Relationships:
Describe relationships.
Include one short in-character quote per relationship.]

[Personality
Traits:
Likes:
Dislikes:
Insecurities:
Physical behaviour:
Opinions:]

[Intimacy
Turn-ons:
During Sex:]

[Dialogue
Accent/tone rules.
[These are merely examples of how CHARACTER NAME may speak and should NOT be used verbatim.]
Greeting:
Surprised:
Stressed:
Memory:
Opinion:]

[Notes
Misc traits, secrets, quirks]
</character_name>

STRICT REQUIREMENTS:
- Fill ALL fields with appropriate, detailed content
- Keep backstory concise but complete (2-4 paragraphs)
- Dialogue examples should be natural and varied (1-2 sentences each)
- Never include placeholder text like "TBD" or "..."
- Never add explanations outside the template
- Format must be preserved exactly as shown
- Start with <npcs> and end with </character_name>
- All brackets and tags must be included`;
}
function buildJanitorPersonalityPrompt(character) {
    const normalizedTraits = normalizePersonality(character.personality);
    const backstoryStyle = character.backstoryStyle || "Mysterious Past";
    const speechTone = character.speechRules?.tone || "Casual & Warm";
    const speechVocab = character.speechRules?.vocabulary || "Conversational";
    const contentRating = character.boundaries?.contentRating || "SFW";
    const setting = character.basics.setting || "Modern Day";
    const relationship = character.basics.relationship || "Stranger";
    return `Create a complete Janitor AI personality profile for this character:

CHARACTER BASICS:
- Name: ${character.basics.name}
- Age: ${character.basics.age}
- Gender: ${character.basics.gender}
- Setting: ${setting}
- Relationship to user: ${relationship}

PERSONALITY TRAITS:
${normalizedTraits}

BACKSTORY STYLE: ${backstoryStyle}

SPEECH STYLE:
- Tone: ${speechTone}
- Vocabulary: ${speechVocab}
${character.speechRules?.patterns ? `- Patterns: ${character.speechRules.patterns}` : ""}

CONTENT RATING: ${contentRating}
${character.boundaries?.topics ? `- Topics to avoid: ${character.boundaries.topics}` : ""}
${character.boundaries?.tone ? `- Overall tone: ${character.boundaries.tone}` : ""}

CRITICAL: You MUST output the complete personality profile using ONLY the template format provided. Do not add any text before <npcs> or after </character_name>. Do not include explanations, comments, or markdown formatting. Output the raw template with all sections filled.`;
}
function buildScenarioPrompt(character, userScenario) {
    const systemPrompt = `You are an expert Janitor AI bot creator. Create an immersive scenario with greeting that:
- Sets the scene with rich atmospheric details
- Includes the character's first message/greeting naturally woven in
- Uses **double asterisks** for character dialogue
- Uses *single asterisks* for narrative descriptions and actions
- NEVER controls {{user}} or speaks for the user
- Is scene-forward and immersive
- Avoids lore dumps
- Shows the character in the moment

FORMAT EXAMPLE:
**It's [time/date]—a [atmosphere] day with [sensory details]. [Scene setup with context].**

*[Character name] is [doing something], wearing [outfit description]. [More character details and actions]. [Their mannerisms and presence].*

*[Narrative building tension or atmosphere. What's happening in the scene. The mood and context.]*

*[Character notices {{user}} or initiates interaction. Their body language and expression.]* **"[Character's spoken greeting or first words]"** *[they say/whisper/call out], [additional action or expression].*

*[Optional: More scene details or character thoughts/observations about the situation.]*

The output should be 4-8 paragraphs, alternating between **bold dialogue** and *italic descriptions*.`;
    const userPrompt = userScenario ? `User-provided scenario idea: ${userScenario}\n\nCreate an immersive scenario with the character's greeting woven in, following the format above.` : `Generate an immersive scenario with greeting for this character:

CHARACTER:
- Name: ${character.basics.name}
- Setting: ${character.basics.setting}
- Backstory Style: ${character.backstoryStyle || "Mysterious Past"}
- Personality: ${normalizePersonality(character.personality)}
- Relationship to user: ${character.basics.relationship}
- Speech Tone: ${character.speechRules?.tone || "Casual & Warm"}
- Speech Vocabulary: ${character.speechRules?.vocabulary || "Conversational"}

Create an engaging scenario that sets up the world, shows the character in their element, and includes their natural first interaction/greeting with {{user}}. Use **bold** for dialogue and *italics* for descriptions.`;
    return `${systemPrompt}\n\n${userPrompt}`;
}
function buildInitialMessagePrompt(character, scenario) {
    const systemPrompt = `You are an expert Janitor AI bot creator. Write the first message from the character that:
- NEVER speaks or acts for {{user}}
- Uses **double asterisks** for character dialogue
- Uses *single asterisks* for narrative descriptions and actions
- Is NPC-driven (the character initiates)
- Avoids lore dumps
- Has no time skips
- Is scene-forward (shows what's happening NOW)
- Sets the tone naturally

The message should be 2-4 paragraphs with rich sensory details.`;
    const userPrompt = `Write the first message for:

CHARACTER:
- Name: ${character.basics.name}
- Setting: ${character.basics.setting}
- Personality: ${normalizePersonality(character.personality)}
- Speech Tone: ${character.speechRules?.tone || "Casual & Warm"}
- Speech Vocabulary: ${character.speechRules?.vocabulary || "Conversational"}
${scenario ? `\nSCENARIO:\n${scenario}` : ""}

Generate the initial message using **bold** for dialogue and *italics* for descriptions/actions.`;
    return `${systemPrompt}\n\n${userPrompt}`;
}
function getPersonalitySystemPrompt() {
    return buildPersonalitySystemPrompt();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Desktop/anisoul-forge/lib/generation/service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * AI Generation Service
 * Handles all AI content generation with API key management and auto-detection
 */ __turbopack_context__.s([
    "generateInitialMessage",
    ()=>generateInitialMessage,
    "generatePersonality",
    ()=>generatePersonality,
    "generateScenario",
    ()=>generateScenario,
    "validateAPIKey",
    ()=>validateAPIKey
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$api$2d$key$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/lib/api-key.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$ai$2f$providers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/lib/ai/providers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$prompts$2f$janitor$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/lib/prompts/janitor-ai.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$ai$2f$provider$2d$detection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/lib/ai/provider-detection.ts [app-client] (ecmascript)");
;
;
;
;
/**
 * Get max tokens based on generation type
 */ function getMaxTokensForType(generationType) {
    switch(generationType){
        case "personality":
            return 1800;
        case "scenario":
            return 1200; // Increased for combined scenario + greeting
        case "initialMessage":
            return 550;
        default:
            return 1800;
    }
}
/**
 * Generate with fallback retry logic
 */ async function generateWithFallback(provider, apiKey, prompt, generationType) {
    const model = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$ai$2f$provider$2d$detection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getModelForGeneration"])(provider, generationType);
    const aiProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$ai$2f$providers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAIProvider"])(provider);
    const maxTokens = getMaxTokensForType(generationType);
    try {
        const result = await aiProvider.generate(prompt, apiKey, model, maxTokens);
        return result;
    } catch (error) {
        // Try fallback model if available
        const fallbackModel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$ai$2f$provider$2d$detection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFallbackModel"])(provider);
        if (fallbackModel && (error.message?.includes("model") || error.message?.includes("404"))) {
            console.warn(`Primary model ${model} failed, trying fallback ${fallbackModel}`);
            try {
                const result = await aiProvider.generate(prompt, apiKey, fallbackModel, maxTokens);
                return result;
            } catch (fallbackError) {
                throw new Error(`Generation failed with both models. Primary: ${error.message}. Fallback: ${fallbackError.message}`);
            }
        }
        throw error;
    }
}
async function generatePersonality(character, apiKey, provider) {
    const systemPrompt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$prompts$2f$janitor$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPersonalitySystemPrompt"])();
    const userPrompt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$prompts$2f$janitor$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildJanitorPersonalityPrompt"])(character);
    // For OpenAI/OpenRouter, use system/user messages
    if (provider === "openai" || provider === "openrouter") {
        const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;
        return await generateWithFallback(provider, apiKey, fullPrompt, "personality");
    }
    // For Gemini/HuggingFace, combine into single prompt
    const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;
    return await generateWithFallback(provider, apiKey, fullPrompt, "personality");
}
async function generateScenario(character, userScenario, apiKey, provider) {
    const prompt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$prompts$2f$janitor$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildScenarioPrompt"])(character, userScenario);
    return await generateWithFallback(provider, apiKey, prompt, "scenario");
}
async function generateInitialMessage(character, scenario, apiKey, provider) {
    const prompt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$prompts$2f$janitor$2d$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildInitialMessagePrompt"])(character, scenario);
    return await generateWithFallback(provider, apiKey, prompt, "initialMessage");
}
function validateAPIKey() {
    // First try to get selected provider
    const selectedProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$api$2d$key$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSelectedProvider"])();
    let apiKey = null;
    let provider = selectedProvider;
    if (selectedProvider) {
        apiKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$api$2d$key$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAPIKey"])(selectedProvider);
        if (apiKey && apiKey.trim() !== "" && apiKey.length >= 10) {
            return {
                valid: true,
                apiKey,
                provider: selectedProvider
            };
        }
    }
    // Auto-detect from all stored keys
    const providers = [
        "openai",
        "gemini",
        "openrouter",
        "huggingface"
    ];
    for (const p of providers){
        const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$api$2d$key$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAPIKey"])(p);
        if (key && key.trim() !== "" && key.length >= 10) {
            const detected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$ai$2f$provider$2d$detection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detectProviderFromKey"])(key);
            if (detected === p) {
                // Update selected provider
                localStorage.setItem("api_key_provider", p);
                localStorage.setItem("api_key_connected", "true");
                return {
                    valid: true,
                    apiKey: key,
                    provider: p
                };
            }
        }
    }
    return {
        valid: false,
        apiKey: null,
        provider: null,
        error: "No valid API key found. Please add an API key in the API Key Manager."
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CharacterResultPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$context$2f$CharacterContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/context/CharacterContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$components$2f$api$2d$key$2d$manager$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$generation$2f$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/lib/generation/service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$api$2d$key$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/lib/api-key.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
function CharacterResultPage() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { characters, updateCharacter } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$context$2f$CharacterContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCharacter"])();
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showAPIKeyModal, setShowAPIKeyModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [scenarioInput, setScenarioInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [showScenarioModal, setShowScenarioModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isGenerating, setIsGenerating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const character = characters.find((char)=>char.id === params.id);
    const [sections, setSections] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        personality: {
            loading: false,
            error: null,
            content: character?.generatedContent?.personality || ""
        },
        scenarioGreeting: {
            loading: false,
            error: null,
            content: character?.generatedContent?.scenario || ""
        }
    });
    // Check API key and generate on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CharacterResultPage.useEffect": ()=>{
            if (!character) return;
            // Check if already fully generated
            if (character.generatedContent?.personality && character.generatedContent?.scenario) {
                setSections({
                    personality: {
                        loading: false,
                        error: null,
                        content: character.generatedContent.personality || ""
                    },
                    scenarioGreeting: {
                        loading: false,
                        error: null,
                        content: character.generatedContent.scenario || ""
                    }
                });
                return;
            }
            // Check API key - HARD BLOCK
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$api$2d$key$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAPIKeyConnected"])()) {
                setShowAPIKeyModal(true);
                return;
            }
            // Start generation
            handleGenerateAll();
        }
    }["CharacterResultPage.useEffect"], [
        character?.id
    ]);
    // Listen for API key changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CharacterResultPage.useEffect": ()=>{
            const handleStorageChange = {
                "CharacterResultPage.useEffect.handleStorageChange": ()=>{
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$api$2d$key$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAPIKeyConnected"])() && !character?.generatedContent?.personality) {
                        handleGenerateAll();
                    }
                }
            }["CharacterResultPage.useEffect.handleStorageChange"];
            window.addEventListener("storage", handleStorageChange);
            return ({
                "CharacterResultPage.useEffect": ()=>window.removeEventListener("storage", handleStorageChange)
            })["CharacterResultPage.useEffect"];
        }
    }["CharacterResultPage.useEffect"], [
        character?.id
    ]);
    const updateSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CharacterResultPage.useCallback[updateSection]": (sectionId, updates)=>{
            setSections({
                "CharacterResultPage.useCallback[updateSection]": (prev)=>({
                        ...prev,
                        [sectionId]: {
                            ...prev[sectionId],
                            ...updates
                        }
                    })
            }["CharacterResultPage.useCallback[updateSection]"]);
        }
    }["CharacterResultPage.useCallback[updateSection]"], []);
    const updateCharacterContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CharacterResultPage.useCallback[updateCharacterContent]": (sectionId, content)=>{
            const charIndex = characters.findIndex({
                "CharacterResultPage.useCallback[updateCharacterContent].charIndex": (c)=>c.id === character?.id
            }["CharacterResultPage.useCallback[updateCharacterContent].charIndex"]);
            if (charIndex !== -1) {
                const currentContent = character?.generatedContent || {};
                updateCharacter(charIndex, {
                    generatedContent: {
                        ...currentContent,
                        [sectionId === "personality" ? "personality" : sectionId === "scenario" ? "scenario" : "initialMessage"]: content
                    }
                });
            }
        }
    }["CharacterResultPage.useCallback[updateCharacterContent]"], [
        character,
        characters,
        updateCharacter
    ]);
    const handleGenerateSection = async (sectionId, apiKey, provider)=>{
        if (!character) return;
        const keyCheck = apiKey && provider ? {
            valid: true,
            apiKey,
            provider
        } : (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$generation$2f$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateAPIKey"])();
        if (!keyCheck.valid || !keyCheck.apiKey || !keyCheck.provider) {
            setShowAPIKeyModal(true);
            throw new Error(keyCheck.error || "API key required");
        }
        updateSection(sectionId, {
            loading: true,
            error: null
        });
        try {
            let content = "";
            if (sectionId === "personality") {
                content = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$generation$2f$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generatePersonality"])(character, keyCheck.apiKey, keyCheck.provider);
            } else if (sectionId === "scenario") {
                const userScenario = scenarioInput.trim() || undefined;
                content = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$generation$2f$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateScenario"])(character, userScenario, keyCheck.apiKey, keyCheck.provider);
            } else if (sectionId === "initialMessage") {
                const scenario = sections.scenario.content || undefined;
                content = await generateInitialMessage(character, scenario, keyCheck.apiKey, keyCheck.provider);
            }
            // Validate content is not empty
            if (!content || content.trim() === "") {
                throw new Error("Generation returned empty content. Please try again.");
            }
            updateSection(sectionId, {
                loading: false,
                error: null,
                content
            });
            updateCharacterContent(sectionId, content);
        } catch (error) {
            updateSection(sectionId, {
                loading: false,
                error: error.message || "Generation failed",
                content: sections[sectionId].content
            });
            throw error;
        }
    };
    const handleGenerateAll = async ()=>{
        if (!character || isGenerating) return;
        const keyCheck = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$generation$2f$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateAPIKey"])();
        if (!keyCheck.valid || !keyCheck.apiKey || !keyCheck.provider) {
            setShowAPIKeyModal(true);
            return;
        }
        setIsGenerating(true);
        try {
            // Step 1: Generate Personality (MUST succeed)
            await handleGenerateSection("personality", keyCheck.apiKey, keyCheck.provider);
            // Step 2: Show scenario modal after personality succeeds
            setShowScenarioModal(true);
        } catch (error) {
            console.error("Generation failed:", error);
        } finally{
            setIsGenerating(false);
        }
    };
    const handleScenarioSubmit = async ()=>{
        setShowScenarioModal(false);
        const keyCheck = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$generation$2f$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateAPIKey"])();
        if (!keyCheck.valid || !keyCheck.apiKey || !keyCheck.provider) {
            setShowAPIKeyModal(true);
            return;
        }
        setIsGenerating(true);
        try {
            // Step 2: Generate scenario
            await handleGenerateSection("scenario", keyCheck.apiKey, keyCheck.provider);
            // Step 3: Generate initial message (after scenario succeeds)
            await handleGenerateSection("initialMessage", keyCheck.apiKey, keyCheck.provider);
        } catch (error) {
            console.error("Scenario/Message generation failed:", error);
        } finally{
            setIsGenerating(false);
        }
    };
    const handleSkipScenario = async ()=>{
        setShowScenarioModal(false);
        setScenarioInput("");
        const keyCheck = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$generation$2f$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateAPIKey"])();
        if (!keyCheck.valid || !keyCheck.apiKey || !keyCheck.provider) {
            setShowAPIKeyModal(true);
            return;
        }
        setIsGenerating(true);
        try {
            // Generate scenario without user input
            await handleGenerateSection("scenario", keyCheck.apiKey, keyCheck.provider);
            // Generate initial message
            await handleGenerateSection("initialMessage", keyCheck.apiKey, keyCheck.provider);
        } catch (error) {
            console.error("Generation failed:", error);
        } finally{
            setIsGenerating(false);
        }
    };
    const handleRewrite = async (sectionId)=>{
        await handleGenerateSection(sectionId);
    };
    const copyToClipboard = (text, section)=>{
        navigator.clipboard.writeText(text);
        setCopied(section);
        setTimeout(()=>setCopied(null), 2000);
    };
    if (!character) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-background flex items-center justify-center px-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xl font-semibold text-foreground mb-4",
                        children: "Character not found"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                        lineNumber: 239,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/create",
                        className: "inline-block px-6 py-3 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-medium transition-colors",
                        children: "Create Character"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                        lineNumber: 240,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                lineNumber: 238,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
            lineNumber: 237,
            columnNumber: 7
        }, this);
    }
    const displaySections = [
        {
            id: "personality",
            title: "Personality",
            content: sections.personality.content,
            loading: sections.personality.loading,
            error: sections.personality.error
        },
        {
            id: "scenario",
            title: "Scenario",
            content: sections.scenario.content,
            loading: sections.scenario.loading,
            error: sections.scenario.error
        },
        {
            id: "initialMessage",
            title: "Initial Message",
            content: sections.initialMessage.content,
            loading: sections.initialMessage.loading,
            error: sections.initialMessage.error
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-background px-4 py-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-4xl mx-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/wizard",
                                className: "inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                        lineNumber: 284,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm",
                                        children: "Back to Wizard"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                        lineNumber: 285,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                lineNumber: 280,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-4xl font-bold text-foreground mb-2",
                                children: character.basics.name
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                lineNumber: 287,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted-foreground",
                                children: [
                                    character.basics.setting,
                                    " • ",
                                    character.basics.age,
                                    " years old"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                lineNumber: 288,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                        lineNumber: 279,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: displaySections.map((section, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    y: 20
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    delay: index * 0.1
                                },
                                className: "glass rounded-2xl p-6 border border-border",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-xl font-semibold text-foreground",
                                                children: section.title
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                                lineNumber: 304,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>copyToClipboard(section.content || "", section.id),
                                                        disabled: !section.content || section.loading,
                                                        className: "px-3 py-1.5 rounded-lg glass border border-border hover:bg-white/5 transition-colors flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed",
                                                        children: copied === section.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckCircle2, {
                                                                    className: "w-4 h-4 text-green-400"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                                                    lineNumber: 313,
                                                                    columnNumber: 25
                                                                }, this),
                                                                "Copied!"
                                                            ]
                                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Copy, {
                                                                    className: "w-4 h-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                                                    lineNumber: 318,
                                                                    columnNumber: 25
                                                                }, this),
                                                                "Copy"
                                                            ]
                                                        }, void 0, true)
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                                        lineNumber: 306,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleRewrite(section.id),
                                                        disabled: section.loading || isGenerating,
                                                        className: "px-3 py-1.5 rounded-lg glass border border-border hover:bg-white/5 transition-colors flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed",
                                                        children: [
                                                            section.loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                                className: "w-4 h-4 animate-spin"
                                                            }, void 0, false, {
                                                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                                                lineNumber: 329,
                                                                columnNumber: 23
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RefreshCw, {
                                                                className: "w-4 h-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                                                lineNumber: 331,
                                                                columnNumber: 23
                                                            }, this),
                                                            "Rewrite"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                                        lineNumber: 323,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                                lineNumber: 305,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                        lineNumber: 303,
                                        columnNumber: 15
                                    }, this),
                                    section.loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-center py-12",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                className: "w-6 h-6 animate-spin text-violet-400"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                                lineNumber: 340,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-3 text-muted-foreground",
                                                children: "Generating..."
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                                lineNumber: 341,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                        lineNumber: 339,
                                        columnNumber: 17
                                    }, this) : section.error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "py-4 px-4 rounded-xl bg-red-500/10 border border-red-500/30",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-red-400 font-medium mb-1",
                                                children: "Generation Failed"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                                lineNumber: 345,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-red-400/80",
                                                children: section.error
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                                lineNumber: 346,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleRewrite(section.id),
                                                className: "mt-2 text-xs text-red-400 hover:text-red-300 underline",
                                                children: "Try again"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                                lineNumber: 347,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                        lineNumber: 344,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: section.content,
                                        onChange: (e)=>{
                                            updateSection(section.id, {
                                                content: e.target.value
                                            });
                                            updateCharacterContent(section.id, e.target.value);
                                        },
                                        className: "w-full min-h-32 px-4 py-3 rounded-xl glass border border-border focus:border-violet-500 transition-all outline-none resize-y text-sm font-mono",
                                        placeholder: section.content ? "" : "Content will be generated here..."
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                        lineNumber: 355,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, section.id, true, {
                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                lineNumber: 296,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                        lineNumber: 294,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 flex gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/create",
                                className: "flex-1 py-4 rounded-2xl glass border border-border hover:bg-white/5 transition-colors text-center font-medium",
                                children: "Create Another"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                lineNumber: 371,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.push("/wizard"),
                                className: "flex-1 py-4 rounded-2xl bg-violet-500 hover:bg-violet-600 text-white font-semibold transition-colors",
                                children: "Edit Character"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                lineNumber: 377,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                        lineNumber: 370,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                lineNumber: 277,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$components$2f$api$2d$key$2d$manager$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APIKeyManager"], {
                isOpen: showAPIKeyModal,
                onClose: ()=>setShowAPIKeyModal(false),
                onSave: ()=>{
                    setShowAPIKeyModal(false);
                    // Immediately restart generation
                    if (!character.generatedContent?.personality) {
                        handleGenerateAll();
                    }
                }
            }, void 0, false, {
                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                lineNumber: 387,
                columnNumber: 7
            }, this),
            showScenarioModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 bg-black/50 backdrop-blur-sm",
                        onClick: ()=>{}
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                        lineNumber: 402,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            scale: 0.95
                        },
                        animate: {
                            opacity: 1,
                            scale: 1
                        },
                        className: "glass rounded-3xl p-8 max-w-2xl w-full border border-border relative z-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-bold text-foreground mb-4",
                                children: "Define Scenario (Optional)"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                lineNumber: 411,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted-foreground mb-6",
                                children: "You can provide a custom scenario or let AI generate one based on your character."
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                lineNumber: 412,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: scenarioInput,
                                onChange: (e)=>setScenarioInput(e.target.value),
                                placeholder: "e.g., The character is in a coffee shop, waiting for someone. It's raining outside...",
                                className: "w-full h-32 px-4 py-3 rounded-xl glass border border-border focus:border-violet-500 transition-all outline-none resize-none mb-6"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                lineNumber: 415,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSkipScenario,
                                        disabled: isGenerating,
                                        className: "flex-1 py-3 rounded-xl glass border border-border hover:bg-white/5 transition-colors font-medium disabled:opacity-50",
                                        children: "Skip (AI Generate)"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                        lineNumber: 422,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleScenarioSubmit,
                                        disabled: isGenerating,
                                        className: "flex-1 py-3 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-medium transition-colors disabled:opacity-50",
                                        children: "Continue"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                        lineNumber: 429,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                lineNumber: 421,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                        lineNumber: 406,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                lineNumber: 401,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
        lineNumber: 276,
        columnNumber: 5
    }, this);
}
_s(CharacterResultPage, "2IkQxuB1yGRcrtjKBRgoPuIvlSE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$context$2f$CharacterContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCharacter"]
    ];
});
_c = CharacterResultPage;
var _c;
__turbopack_context__.k.register(_c, "CharacterResultPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=OneDrive_Desktop_anisoul-forge_28455aef._.js.map