(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/OneDrive/Desktop/makemyBot/components/theme-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
"use client";
;
;
function ThemeProvider({ children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/OneDrive/Desktop/makemyBot/components/theme-provider.tsx",
        lineNumber: 8,
        columnNumber: 10
    }, this);
}
_c = ThemeProvider;
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Desktop/makemyBot/context/CharacterContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CharacterProvider",
    ()=>CharacterProvider,
    "useCharacter",
    ()=>useCharacter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const initialCharacter = {
    basics: {
        name: "",
        age: "",
        gender: "Female",
        setting: "",
        relationship: ""
    },
    personality: {
        warmth: 50,
        confidence: 50,
        calmness: 50,
        reserve: 50
    },
    isComplete: false
};
const CharacterContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function CharacterProvider({ children }) {
    _s();
    const [characters, setCharacters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [activeCharacterIndex, setActiveCharacterIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isMultiMode, setIsMultiMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CharacterProvider.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const saved = localStorage.getItem("characters");
            const savedIndex = localStorage.getItem("activeCharacterIndex");
            const savedMultiMode = localStorage.getItem("isMultiMode");
            if (saved) {
                try {
                    setCharacters(JSON.parse(saved));
                } catch (e) {
                    console.error("Failed to load characters from localStorage");
                }
            }
            if (savedIndex) {
                setActiveCharacterIndex(parseInt(savedIndex, 10));
            }
            if (savedMultiMode) {
                setIsMultiMode(savedMultiMode === "true");
            }
        }
    }["CharacterProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CharacterProvider.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem("characters", JSON.stringify(characters));
            }
        }
    }["CharacterProvider.useEffect"], [
        characters
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CharacterProvider.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem("activeCharacterIndex", activeCharacterIndex.toString());
            }
        }
    }["CharacterProvider.useEffect"], [
        activeCharacterIndex
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CharacterProvider.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem("isMultiMode", isMultiMode.toString());
            }
        }
    }["CharacterProvider.useEffect"], [
        isMultiMode
    ]);
    const updateCharacter = (index, updates)=>{
        setCharacters((prev)=>{
            const updated = [
                ...prev
            ];
            updated[index] = {
                ...updated[index],
                ...updates
            };
            return updated;
        });
    };
    const resetCharacters = ()=>{
        setCharacters([]);
        setActiveCharacterIndex(0);
        setIsMultiMode(false);
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.removeItem("characters");
            localStorage.removeItem("activeCharacterIndex");
            localStorage.removeItem("isMultiMode");
        }
    };
    const initializeCharacters = (count)=>{
        const newCharacters = Array.from({
            length: count
        }, (_, i)=>({
                id: `char-${Date.now()}-${i}`,
                ...initialCharacter
            }));
        setCharacters(newCharacters);
        setIsMultiMode(count > 1);
        setActiveCharacterIndex(0);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CharacterContext.Provider, {
        value: {
            characters,
            setCharacters,
            activeCharacterIndex,
            setActiveCharacterIndex,
            updateCharacter,
            resetCharacters,
            isMultiMode,
            setIsMultiMode,
            initializeCharacters,
            character: characters[activeCharacterIndex] || {
                id: 'temp',
                basics: {
                    name: "",
                    age: "",
                    gender: "Female",
                    setting: "",
                    relationship: ""
                },
                personality: {
                    warmth: 50,
                    confidence: 50,
                    calmness: 50,
                    reserve: 50
                },
                isComplete: false
            }
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/OneDrive/Desktop/makemyBot/context/CharacterContext.tsx",
        lineNumber: 156,
        columnNumber: 5
    }, this);
}
_s(CharacterProvider, "UHMQeVVjDNlg9Yuq3xOI/MSFUOg=");
_c = CharacterProvider;
function useCharacter() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(CharacterContext);
    if (!context) {
        throw new Error("useCharacter must be used within CharacterProvider");
    }
    return context;
}
_s1(useCharacter, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "CharacterProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=OneDrive_Desktop_makemyBot_5b15d959._.js.map