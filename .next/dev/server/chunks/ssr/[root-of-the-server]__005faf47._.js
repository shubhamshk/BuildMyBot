module.exports = [
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/OneDrive/Desktop/anisoul-forge/lib/api-key.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * API Key management utilities
 * All keys stored in localStorage (frontend only)
 */ __turbopack_context__.s([
    "clearAPIKey",
    ()=>clearAPIKey,
    "getAPIKey",
    ()=>getAPIKey,
    "getSelectedProvider",
    ()=>getSelectedProvider,
    "isAPIKeyConnected",
    ()=>isAPIKeyConnected,
    "setAPIKey",
    ()=>setAPIKey
]);
function getAPIKey(provider) {
    if (provider) {
        return localStorage.getItem(`api_key_${provider}`);
    }
    const selectedProvider = getSelectedProvider();
    if (!selectedProvider) return null;
    return localStorage.getItem(`api_key_${selectedProvider}`);
}
function setAPIKey(provider, key) {
    localStorage.setItem(`api_key_${provider}`, key);
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
}),
"[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "APIKeyManager",
    ()=>APIKeyManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Key$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/lucide-react/dist/esm/icons/key.js [app-ssr] (ecmascript) <export default as Key>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/lucide-react/dist/esm/icons/eye.js [app-ssr] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/lucide-react/dist/esm/icons/eye-off.js [app-ssr] (ecmascript) <export default as EyeOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$api$2d$key$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/lib/api-key.ts [app-ssr] (ecmascript)");
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
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("openai");
    const [apiKeys, setApiKeys] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        openai: "",
        gemini: "",
        openrouter: "",
        huggingface: ""
    });
    const [showKeys, setShowKeys] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        openai: false,
        gemini: false,
        openrouter: false,
        huggingface: false
    });
    const [selectedProvider, setSelectedProvider] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Load existing keys on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isOpen) {
            const keys = {
                openai: "",
                gemini: "",
                openrouter: "",
                huggingface: ""
            };
            PROVIDERS.forEach((provider)=>{
                const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$api$2d$key$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAPIKey"])(provider.value);
                if (key) {
                    keys[provider.value] = key;
                }
            });
            setApiKeys(keys);
            setSelectedProvider((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$api$2d$key$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSelectedProvider"])());
            // Set active tab to selected provider or first provider
            const savedProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$api$2d$key$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSelectedProvider"])();
            if (savedProvider) {
                setActiveTab(savedProvider);
            }
        }
    }, [
        isOpen
    ]);
    const handleSaveKey = (provider)=>{
        const key = apiKeys[provider].trim();
        if (!key) return;
        // Validate key format (basic check)
        if (key.length < 10) {
            alert("Please enter a valid API key");
            return;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$api$2d$key$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setAPIKey"])(provider, key);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
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
                    lineNumber: 154,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6 border-b border-border",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Key$3e$__["Key"], {
                                                        className: "w-6 h-6 text-violet-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                        lineNumber: 177,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                    lineNumber: 176,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "text-2xl font-semibold text-foreground",
                                                            children: "API Key Manager"
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                            lineNumber: 180,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-muted-foreground",
                                                            children: "Manage your AI provider API keys securely"
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                            lineNumber: 183,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                    lineNumber: 179,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                            lineNumber: 175,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleClose,
                                            className: "w-10 h-10 rounded-lg glass border border-border hover:bg-white/5 transition-colors flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                className: "w-5 h-5 text-foreground"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                lineNumber: 192,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                            lineNumber: 188,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                    lineNumber: 174,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                lineNumber: 173,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-6 pt-6 border-b border-border",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2 overflow-x-auto pb-2",
                                    children: PROVIDERS.map((provider)=>{
                                        const hasKeyForProvider = hasKey(provider.value);
                                        const isSelected = selectedProvider === provider.value;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setActiveTab(provider.value),
                                            className: `px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 relative ${activeTab === provider.value ? "bg-violet-500/20 border-2 border-violet-500 text-violet-400" : "glass border border-border hover:bg-white/5 text-muted-foreground"}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-lg",
                                                    children: provider.icon
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                    lineNumber: 214,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium",
                                                    children: provider.label
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                    lineNumber: 215,
                                                    columnNumber: 25
                                                }, this),
                                                hasKeyForProvider && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `w-2 h-2 rounded-full ${isSelected ? "bg-violet-400" : "bg-green-400"}`
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                    lineNumber: 217,
                                                    columnNumber: 27
                                                }, this),
                                                isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                    className: "w-4 h-4 text-violet-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                    lineNumber: 222,
                                                    columnNumber: 27
                                                }, this)
                                            ]
                                        }, provider.value, true, {
                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                            lineNumber: 205,
                                            columnNumber: 23
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                    lineNumber: 199,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                lineNumber: 198,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6",
                                children: activeProvider && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-3xl",
                                                        children: activeProvider.icon
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                        lineNumber: 237,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "text-xl font-semibold text-foreground",
                                                                children: activeProvider.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                                lineNumber: 239,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-muted-foreground",
                                                                children: activeProvider.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                                lineNumber: 242,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                        lineNumber: 238,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                lineNumber: 236,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                            lineNumber: 235,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-sm font-medium text-foreground mb-2 block",
                                                    children: "API Key"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                    lineNumber: 251,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                                            lineNumber: 255,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>setShowKeys((prev)=>({
                                                                        ...prev,
                                                                        [activeTab]: !prev[activeTab]
                                                                    })),
                                                            className: "absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-center",
                                                            children: showKeys[activeTab] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                                                                className: "w-4 h-4 text-muted-foreground"
                                                            }, void 0, false, {
                                                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                                lineNumber: 279,
                                                                columnNumber: 29
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                                className: "w-4 h-4 text-muted-foreground"
                                                            }, void 0, false, {
                                                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                                lineNumber: 281,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                            lineNumber: 268,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                    lineNumber: 254,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-muted-foreground mt-2",
                                                    children: "Your API key is stored locally in your browser and never sent to our servers."
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                    lineNumber: 285,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                            lineNumber: 250,
                                            columnNumber: 21
                                        }, this),
                                        hasKey(activeTab) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-4 rounded-xl glass border border-green-500/30 bg-green-500/10",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                        className: "w-5 h-5 text-green-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                        lineNumber: 294,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-medium text-green-400",
                                                                children: "API Key Configured"
                                                            }, void 0, false, {
                                                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                                lineNumber: 296,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-muted-foreground",
                                                                children: selectedProvider === activeTab ? "Currently active for generation" : "Click 'Save & Activate' to use this key"
                                                            }, void 0, false, {
                                                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                                lineNumber: 299,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                        lineNumber: 295,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                lineNumber: 293,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                            lineNumber: 292,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-3",
                                            children: [
                                                hasKey(activeTab) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleDeleteKey(activeTab),
                                                    className: "px-4 py-2.5 rounded-xl glass border border-red-500/30 hover:bg-red-500/10 transition-colors flex items-center gap-2 text-red-400",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                            lineNumber: 316,
                                                            columnNumber: 27
                                                        }, this),
                                                        "Remove"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                    lineNumber: 312,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleSaveKey(activeTab),
                                                    disabled: !apiKeys[activeTab].trim(),
                                                    className: "flex-1 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                            lineNumber: 325,
                                                            columnNumber: 25
                                                        }, this),
                                                        hasKey(activeTab) ? "Update & Activate" : "Save & Activate"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                    lineNumber: 320,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                            lineNumber: 310,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "pt-4 border-t border-border",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-muted-foreground mb-2",
                                                    children: "Need help getting an API key?"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                    lineNumber: 332,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-2",
                                                    children: [
                                                        activeTab === "openai" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: "https://platform.openai.com/api-keys",
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className: "text-xs text-violet-400 hover:text-violet-300 underline",
                                                            children: "Get OpenAI API Key →"
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                            lineNumber: 335,
                                                            columnNumber: 27
                                                        }, this),
                                                        activeTab === "gemini" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: "https://makersuite.google.com/app/apikey",
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className: "text-xs text-violet-400 hover:text-violet-300 underline",
                                                            children: "Get Gemini API Key →"
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                            lineNumber: 345,
                                                            columnNumber: 27
                                                        }, this),
                                                        activeTab === "openrouter" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: "https://openrouter.ai/keys",
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className: "text-xs text-violet-400 hover:text-violet-300 underline",
                                                            children: "Get OpenRouter API Key →"
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                            lineNumber: 355,
                                                            columnNumber: 27
                                                        }, this),
                                                        activeTab === "huggingface" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: "https://huggingface.co/settings/tokens",
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className: "text-xs text-violet-400 hover:text-violet-300 underline",
                                                            children: "Get HuggingFace Token →"
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                            lineNumber: 365,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                                    lineNumber: 333,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                            lineNumber: 331,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                    lineNumber: 233,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                lineNumber: 231,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6 border-t border-border bg-muted/30",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted-foreground",
                                            children: [
                                                Object.values(apiKeys).filter((k)=>k).length,
                                                " of ",
                                                PROVIDERS.length,
                                                " providers configured"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                            lineNumber: 383,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleClose,
                                            className: "px-4 py-2 rounded-xl glass border border-border hover:bg-white/5 transition-colors text-sm font-medium",
                                            children: "Close"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                            lineNumber: 386,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                    lineNumber: 382,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                                lineNumber: 381,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                        lineNumber: 164,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
                    lineNumber: 163,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx",
        lineNumber: 150,
        columnNumber: 5
    }, this);
}
}),
"[project]/OneDrive/Desktop/anisoul-forge/lib/ai/providers.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
    async generate(prompt, apiKey, model) {
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
                    maxOutputTokens: 8000
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
    async generate(prompt, apiKey, model) {
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
            headers["HTTP-Referer"] = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "";
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
                max_tokens: 8000
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
    async generate(prompt, apiKey, model) {
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
                    max_new_tokens: 2000,
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
}),
"[project]/OneDrive/Desktop/anisoul-forge/lib/prompts/janitor-ai.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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

CRITICAL RULES:
- NEVER control {{user}} or speak for the user
- Use third-person narration
- Avoid negative instructions (say what they DO, not what they DON'T)
- Permanent tokens should be concise but complete
- Personality defines what is ALWAYS true
- Dialogue examples are illustrative ONLY - do NOT use verbatim
- Avoid excessive sexual detail in permanent tokens
- Keep formatting EXACTLY as specified

TEMPLATE STRUCTURE:
You must follow this EXACT format with all sections:

<npcs>
(50–100 word descriptions for NPCs if relevant)
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

IMPORTANT:
- Fill ALL fields with appropriate content
- Keep backstory concise but complete
- Dialogue examples should be natural and varied
- Never include placeholder text
- Format must be preserved exactly`;
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

Generate the complete personality profile following the EXACT template format provided.`;
}
function buildScenarioPrompt(character, userScenario) {
    const systemPrompt = `You are an expert Janitor AI bot creator. Create engaging scenarios that:
- Define the world and situation
- NEVER control {{user}} or speak for the user
- Set up an immersive starting point
- Align with the character's backstory and personality
- Use third-person narration
- Avoid lore dumps
- Make the scenario scene-forward

Scenario should be 2-4 paragraphs, setting up where the character is, what's happening, and the initial situation.`;
    const userPrompt = userScenario ? `User-provided scenario idea: ${userScenario}\n\nRefine and expand this into a complete scenario following Janitor AI best practices.` : `Generate a scenario for this character:

CHARACTER:
- Name: ${character.basics.name}
- Setting: ${character.basics.setting}
- Backstory Style: ${character.backstoryStyle || "Mysterious Past"}
- Personality: ${normalizePersonality(character.personality)}
- Relationship to user: ${character.basics.relationship}

Create an engaging scenario that sets up the initial situation and world.`;
    return `${systemPrompt}\n\n${userPrompt}`;
}
function buildInitialMessagePrompt(character, scenario) {
    const systemPrompt = `You are an expert Janitor AI bot creator. Write the first message from the character that:
- NEVER speaks or acts for {{user}}
- Is NPC-driven (the character initiates)
- Avoids lore dumps
- Has no time skips
- Is scene-forward (shows what's happening NOW)
- Sets the tone naturally
- Feels like a real first message

The message should be 2-4 sentences, showing the character in the moment.`;
    const userPrompt = `Write the first message for:

CHARACTER:
- Name: ${character.basics.name}
- Setting: ${character.basics.setting}
- Personality: ${normalizePersonality(character.personality)}
- Speech Tone: ${character.speechRules?.tone || "Casual & Warm"}
- Speech Vocabulary: ${character.speechRules?.vocabulary || "Conversational"}
${scenario ? `\nSCENARIO:\n${scenario}` : ""}

Generate the initial message that the character would send to start the conversation.`;
    return `${systemPrompt}\n\n${userPrompt}`;
}
function getPersonalitySystemPrompt() {
    return buildPersonalitySystemPrompt();
}
}),
"[project]/OneDrive/Desktop/anisoul-forge/lib/generation/service.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * AI Generation Service
 * Handles all AI content generation with API key management
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
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$api$2d$key$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/lib/api-key.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$ai$2f$providers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/lib/ai/providers.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$prompts$2f$janitor$2d$ai$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/lib/prompts/janitor-ai.ts [app-ssr] (ecmascript)");
;
;
;
/**
 * Get AI provider instance
 */ function getProvider(provider) {
    if (provider === "openai" || provider === "openrouter") {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$ai$2f$providers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OpenAIProvider"]();
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$ai$2f$providers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GeminiProvider"]();
}
async function generatePersonality(character, apiKey, provider) {
    const systemPrompt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$prompts$2f$janitor$2d$ai$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPersonalitySystemPrompt"])();
    const userPrompt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$prompts$2f$janitor$2d$ai$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildJanitorPersonalityPrompt"])(character);
    const aiProvider = getProvider(provider);
    // For OpenAI, use system/user messages
    if (provider === "openai" || provider === "openrouter") {
        const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;
        return await aiProvider.generate(fullPrompt, apiKey, provider === "openrouter" ? "openai/gpt-4" : "gpt-4");
    }
    // For Gemini, combine into single prompt
    const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;
    return await aiProvider.generate(fullPrompt, apiKey, "gemini-1.5-flash");
}
async function generateScenario(character, userScenario, apiKey, provider) {
    const prompt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$prompts$2f$janitor$2d$ai$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildScenarioPrompt"])(character, userScenario);
    const aiProvider = getProvider(provider);
    if (provider === "openai" || provider === "openrouter") {
        return await aiProvider.generate(prompt, apiKey, provider === "openrouter" ? "openai/gpt-4" : "gpt-4");
    }
    return await aiProvider.generate(prompt, apiKey, "gemini-1.5-flash");
}
async function generateInitialMessage(character, scenario, apiKey, provider) {
    const prompt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$prompts$2f$janitor$2d$ai$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildInitialMessagePrompt"])(character, scenario);
    const aiProvider = getProvider(provider);
    if (provider === "openai" || provider === "openrouter") {
        return await aiProvider.generate(prompt, apiKey, provider === "openrouter" ? "openai/gpt-4" : "gpt-4");
    }
    return await aiProvider.generate(prompt, apiKey, "gemini-1.5-flash");
}
function validateAPIKey() {
    const provider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$api$2d$key$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSelectedProvider"])();
    if (!provider) {
        return {
            valid: false,
            apiKey: null,
            provider: null
        };
    }
    const apiKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$api$2d$key$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAPIKey"])(provider);
    if (!apiKey || apiKey.trim() === "") {
        return {
            valid: false,
            apiKey: null,
            provider: null
        };
    }
    return {
        valid: true,
        apiKey,
        provider
    };
}
}),
"[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CharacterResultPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-ssr] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/lucide-react/dist/esm/icons/copy.js [app-ssr] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-ssr] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$context$2f$CharacterContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/context/CharacterContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$components$2f$api$2d$key$2d$manager$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/components/api-key-manager.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$generation$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/lib/generation/service.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$api$2d$key$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/anisoul-forge/lib/api-key.ts [app-ssr] (ecmascript)");
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
;
function CharacterResultPage() {
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { characters, updateCharacter } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$context$2f$CharacterContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCharacter"])();
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showAPIKeyModal, setShowAPIKeyModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [scenarioInput, setScenarioInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [showScenarioModal, setShowScenarioModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasGenerated, setHasGenerated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const character = characters.find((char)=>char.id === params.id);
    const [sections, setSections] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        personality: {
            loading: false,
            error: null,
            content: character?.generatedContent?.personality || ""
        },
        scenario: {
            loading: false,
            error: null,
            content: character?.generatedContent?.scenario || ""
        },
        initialMessage: {
            loading: false,
            error: null,
            content: character?.generatedContent?.initialMessage || ""
        }
    });
    // Check API key and generate on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!character) return;
        // Check if already generated
        if (character.generatedContent?.personality) {
            setSections({
                personality: {
                    loading: false,
                    error: null,
                    content: character.generatedContent.personality || ""
                },
                scenario: {
                    loading: false,
                    error: null,
                    content: character.generatedContent.scenario || ""
                },
                initialMessage: {
                    loading: false,
                    error: null,
                    content: character.generatedContent.initialMessage || ""
                }
            });
            setHasGenerated(true);
            return;
        }
        // Check API key
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$api$2d$key$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAPIKeyConnected"])()) {
            setShowAPIKeyModal(true);
            return;
        }
        // Start generation
        handleGenerateAll();
    }, [
        character?.id
    ]);
    const handleGenerateAll = async ()=>{
        if (!character) return;
        const keyCheck = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$generation$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validateAPIKey"])();
        if (!keyCheck.valid || !keyCheck.apiKey || !keyCheck.provider) {
            setShowAPIKeyModal(true);
            return;
        }
        // Generate personality first
        await handleGenerateSection("personality", keyCheck.apiKey, keyCheck.provider);
        // Show scenario modal after personality
        setShowScenarioModal(true);
    };
    const handleGenerateSection = async (sectionId, apiKey, provider)=>{
        if (!character) return;
        const keyCheck = apiKey && provider ? {
            valid: true,
            apiKey,
            provider
        } : (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$generation$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validateAPIKey"])();
        if (!keyCheck.valid || !keyCheck.apiKey || !keyCheck.provider) {
            setShowAPIKeyModal(true);
            return;
        }
        setSections((prev)=>({
                ...prev,
                [sectionId]: {
                    ...prev[sectionId],
                    loading: true,
                    error: null
                }
            }));
        try {
            let content = "";
            if (sectionId === "personality") {
                content = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$generation$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generatePersonality"])(character, keyCheck.apiKey, keyCheck.provider);
            } else if (sectionId === "scenario") {
                const userScenario = scenarioInput.trim() || undefined;
                content = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$generation$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateScenario"])(character, userScenario, keyCheck.apiKey, keyCheck.provider);
            } else if (sectionId === "initialMessage") {
                const scenario = sections.scenario.content || undefined;
                content = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$lib$2f$generation$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateInitialMessage"])(character, scenario, keyCheck.apiKey, keyCheck.provider);
            }
            // Update section state
            setSections((prev)=>({
                    ...prev,
                    [sectionId]: {
                        loading: false,
                        error: null,
                        content
                    }
                }));
            // Update character context
            const charIndex = characters.findIndex((c)=>c.id === character.id);
            if (charIndex !== -1) {
                const currentContent = character.generatedContent || {};
                updateCharacter(charIndex, {
                    generatedContent: {
                        ...currentContent,
                        [sectionId === "personality" ? "personality" : sectionId === "scenario" ? "scenario" : "initialMessage"]: content
                    }
                });
            }
        } catch (error) {
            setSections((prev)=>({
                    ...prev,
                    [sectionId]: {
                        loading: false,
                        error: error.message || "Generation failed",
                        content: prev[sectionId].content
                    }
                }));
        }
    };
    const handleScenarioSubmit = async ()=>{
        setShowScenarioModal(false);
        // Generate scenario
        await handleGenerateSection("scenario");
        // Then generate initial message
        setTimeout(async ()=>{
            await handleGenerateSection("initialMessage");
        }, 500);
    };
    const handleSkipScenario = async ()=>{
        setShowScenarioModal(false);
        setScenarioInput("");
        // Generate scenario without user input
        await handleGenerateSection("scenario");
        // Then generate initial message
        setTimeout(async ()=>{
            await handleGenerateSection("initialMessage");
        }, 500);
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-background flex items-center justify-center px-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xl font-semibold text-foreground mb-4",
                        children: "Character not found"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                        lineNumber: 199,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/create",
                        className: "inline-block px-6 py-3 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-medium transition-colors",
                        children: "Create Character"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                        lineNumber: 200,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                lineNumber: 198,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
            lineNumber: 197,
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-background px-4 py-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-4xl mx-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/wizard",
                                className: "inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                        lineNumber: 244,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm",
                                        children: "Back to Wizard"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                        lineNumber: 245,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                lineNumber: 240,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-4xl font-bold text-foreground mb-2",
                                children: character.basics.name
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                lineNumber: 247,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted-foreground",
                                children: [
                                    character.basics.setting,
                                    " • ",
                                    character.basics.age,
                                    " years old"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                lineNumber: 248,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                        lineNumber: 239,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: displaySections.map((section, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-xl font-semibold text-foreground",
                                                children: section.title
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                                lineNumber: 264,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>copyToClipboard(section.content || "", section.id),
                                                        disabled: !section.content || section.loading,
                                                        className: "px-3 py-1.5 rounded-lg glass border border-border hover:bg-white/5 transition-colors flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed",
                                                        children: copied === section.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                    className: "w-4 h-4 text-green-400"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                                                    lineNumber: 273,
                                                                    columnNumber: 25
                                                                }, this),
                                                                "Copied!"
                                                            ]
                                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                                    className: "w-4 h-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                                                    lineNumber: 278,
                                                                    columnNumber: 25
                                                                }, this),
                                                                "Copy"
                                                            ]
                                                        }, void 0, true)
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                                        lineNumber: 266,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleRewrite(section.id),
                                                        disabled: section.loading,
                                                        className: "px-3 py-1.5 rounded-lg glass border border-border hover:bg-white/5 transition-colors flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed",
                                                        children: [
                                                            section.loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                                className: "w-4 h-4 animate-spin"
                                                            }, void 0, false, {
                                                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                                                lineNumber: 289,
                                                                columnNumber: 23
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                                className: "w-4 h-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                                                lineNumber: 291,
                                                                columnNumber: 23
                                                            }, this),
                                                            "Rewrite"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                                        lineNumber: 283,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                                lineNumber: 265,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                        lineNumber: 263,
                                        columnNumber: 15
                                    }, this),
                                    section.loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-center py-12",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                className: "w-6 h-6 animate-spin text-violet-400"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                                lineNumber: 300,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-3 text-muted-foreground",
                                                children: "Generating..."
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                                lineNumber: 301,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                        lineNumber: 299,
                                        columnNumber: 17
                                    }, this) : section.error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "py-4 px-4 rounded-xl bg-red-500/10 border border-red-500/30",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-red-400",
                                                children: section.error
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                                lineNumber: 305,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleRewrite(section.id),
                                                className: "mt-2 text-xs text-red-400 hover:text-red-300 underline",
                                                children: "Try again"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                                lineNumber: 306,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                        lineNumber: 304,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: section.content,
                                        onChange: (e)=>{
                                            const charIndex = characters.findIndex((c)=>c.id === character.id);
                                            if (charIndex !== -1) {
                                                const currentContent = character.generatedContent || {};
                                                updateCharacter(charIndex, {
                                                    generatedContent: {
                                                        ...currentContent,
                                                        [section.id === "personality" ? "personality" : section.id === "scenario" ? "scenario" : "initialMessage"]: e.target.value
                                                    }
                                                });
                                            }
                                            setSections((prev)=>({
                                                    ...prev,
                                                    [section.id]: {
                                                        ...prev[section.id],
                                                        content: e.target.value
                                                    }
                                                }));
                                        },
                                        className: "w-full min-h-32 px-4 py-3 rounded-xl glass border border-border focus:border-violet-500 transition-all outline-none resize-y text-sm font-mono",
                                        placeholder: section.content ? "" : "Content will be generated here..."
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                        lineNumber: 314,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, section.id, true, {
                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                lineNumber: 256,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                        lineNumber: 254,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 flex gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/create",
                                className: "flex-1 py-4 rounded-2xl glass border border-border hover:bg-white/5 transition-colors text-center font-medium",
                                children: "Create Another"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                lineNumber: 342,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.push("/wizard"),
                                className: "flex-1 py-4 rounded-2xl bg-violet-500 hover:bg-violet-600 text-white font-semibold transition-colors",
                                children: "Edit Character"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                lineNumber: 348,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                        lineNumber: 341,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                lineNumber: 237,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$components$2f$api$2d$key$2d$manager$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIKeyManager"], {
                isOpen: showAPIKeyModal,
                onClose: ()=>setShowAPIKeyModal(false),
                onSave: ()=>{
                    setShowAPIKeyModal(false);
                    if (!hasGenerated) {
                        handleGenerateAll();
                    }
                }
            }, void 0, false, {
                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                lineNumber: 358,
                columnNumber: 7
            }, this),
            showScenarioModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 bg-black/50 backdrop-blur-sm",
                        onClick: ()=>setShowScenarioModal(false)
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                        lineNumber: 372,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-bold text-foreground mb-4",
                                children: "Define Scenario (Optional)"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                lineNumber: 381,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted-foreground mb-6",
                                children: "You can provide a custom scenario or let AI generate one based on your character."
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                lineNumber: 382,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: scenarioInput,
                                onChange: (e)=>setScenarioInput(e.target.value),
                                placeholder: "e.g., The character is in a coffee shop, waiting for someone. It's raining outside...",
                                className: "w-full h-32 px-4 py-3 rounded-xl glass border border-border focus:border-violet-500 transition-all outline-none resize-none mb-6"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                lineNumber: 385,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSkipScenario,
                                        className: "flex-1 py-3 rounded-xl glass border border-border hover:bg-white/5 transition-colors font-medium",
                                        children: "Skip (AI Generate)"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                        lineNumber: 392,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$anisoul$2d$forge$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleScenarioSubmit,
                                        className: "flex-1 py-3 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-medium transition-colors",
                                        children: "Continue"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                        lineNumber: 398,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                                lineNumber: 391,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                        lineNumber: 376,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
                lineNumber: 371,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/OneDrive/Desktop/anisoul-forge/app/character/[id]/page.tsx",
        lineNumber: 236,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__005faf47._.js.map