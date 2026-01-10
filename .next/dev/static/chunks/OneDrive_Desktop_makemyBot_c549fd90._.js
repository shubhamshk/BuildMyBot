(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/basics.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BasicsStep
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$context$2f$CharacterContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/context/CharacterContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function BasicsStep({ characterIndex, onNext }) {
    _s();
    const { characters, updateCharacter } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$context$2f$CharacterContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCharacter"])();
    const character = characters[characterIndex];
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const validate = ()=>{
        const newErrors = {};
        if (!character.basics.name.trim()) newErrors.name = "Name is required";
        if (!character.basics.age) newErrors.age = "Age is required";
        if (!character.basics.setting.trim()) newErrors.setting = "Setting is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleNext = ()=>{
        if (validate()) {
            onNext();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-2xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-4xl font-bold text-foreground mb-3",
                children: "Basic Info"
            }, void 0, false, {
                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/basics.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-muted-foreground mb-8",
                children: "Let's start with the fundamentals of your character."
            }, void 0, false, {
                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/basics.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass rounded-3xl p-6 md:p-8 space-y-6 border border-border",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm font-medium text-foreground mb-2 block",
                                children: "Character Name"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/basics.tsx",
                                lineNumber: 42,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "e.g., Elara Vance",
                                value: character.basics.name,
                                onChange: (e)=>updateCharacter(characterIndex, {
                                        basics: {
                                            ...character.basics,
                                            name: e.target.value
                                        }
                                    }),
                                className: `w-full h-12 px-4 rounded-xl glass border transition-all outline-none ${errors.name ? "border-red-500/50 focus:border-red-500" : "border-border focus:border-violet-500"}`
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/basics.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this),
                            errors.name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-red-400 mt-1",
                                children: errors.name
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/basics.tsx",
                                lineNumber: 60,
                                columnNumber: 27
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/basics.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-sm font-medium text-foreground mb-2 block",
                                        children: "Age"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/basics.tsx",
                                        lineNumber: 65,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        placeholder: "24",
                                        value: character.basics.age,
                                        onChange: (e)=>updateCharacter(characterIndex, {
                                                basics: {
                                                    ...character.basics,
                                                    age: e.target.value
                                                }
                                            }),
                                        className: `w-full h-12 px-4 rounded-xl glass border transition-all outline-none ${errors.age ? "border-red-500/50 focus:border-red-500" : "border-border focus:border-violet-500"}`
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/basics.tsx",
                                        lineNumber: 66,
                                        columnNumber: 13
                                    }, this),
                                    errors.age && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-red-400 mt-1",
                                        children: errors.age
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/basics.tsx",
                                        lineNumber: 81,
                                        columnNumber: 28
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/basics.tsx",
                                lineNumber: 64,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-sm font-medium text-foreground mb-2 block",
                                        children: "Gender"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/basics.tsx",
                                        lineNumber: 84,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: character.basics.gender,
                                        onChange: (e)=>updateCharacter(characterIndex, {
                                                basics: {
                                                    ...character.basics,
                                                    gender: e.target.value
                                                }
                                            }),
                                        className: "w-full h-12 px-4 rounded-xl glass border border-border focus:border-violet-500 transition-all outline-none appearance-none cursor-pointer [&>option]:bg-zinc-900 [&>option]:text-white",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Female",
                                                className: "bg-zinc-900 text-white",
                                                children: "Female"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/basics.tsx",
                                                lineNumber: 94,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Male",
                                                className: "bg-zinc-900 text-white",
                                                children: "Male"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/basics.tsx",
                                                lineNumber: 95,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Non-binary",
                                                className: "bg-zinc-900 text-white",
                                                children: "Non-binary"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/basics.tsx",
                                                lineNumber: 96,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Other",
                                                className: "bg-zinc-900 text-white",
                                                children: "Other"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/basics.tsx",
                                                lineNumber: 97,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/basics.tsx",
                                        lineNumber: 85,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/basics.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/basics.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm font-medium text-foreground mb-2 block",
                                children: "Story Setting"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/basics.tsx",
                                lineNumber: 103,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "e.g., Cyberpunk Neo-Tokyo, Medieval Fantasy Kingdom",
                                value: character.basics.setting,
                                onChange: (e)=>updateCharacter(characterIndex, {
                                        basics: {
                                            ...character.basics,
                                            setting: e.target.value
                                        }
                                    }),
                                className: `w-full h-12 px-4 rounded-xl glass border transition-all outline-none ${errors.setting ? "border-red-500/50 focus:border-red-500" : "border-border focus:border-violet-500"}`
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/basics.tsx",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this),
                            errors.setting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-red-400 mt-1",
                                children: errors.setting
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/basics.tsx",
                                lineNumber: 121,
                                columnNumber: 30
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/basics.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm font-medium text-foreground mb-2 block",
                                children: "Relationship to User"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/basics.tsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "e.g., Mentor, Arch-rival, Ally",
                                value: character.basics.relationship,
                                onChange: (e)=>updateCharacter(characterIndex, {
                                        basics: {
                                            ...character.basics,
                                            relationship: e.target.value
                                        }
                                    }),
                                className: "w-full h-12 px-4 rounded-xl glass border border-border focus:border-violet-500 transition-all outline-none"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/basics.tsx",
                                lineNumber: 128,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/basics.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/basics.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                onClick: handleNext,
                className: "w-full mt-8 py-4 rounded-2xl bg-violet-500 hover:bg-violet-600 text-white font-semibold flex items-center justify-center gap-2 transition-colors",
                whileHover: {
                    scale: 1.02
                },
                whileTap: {
                    scale: 0.98
                },
                children: [
                    "Next Step",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                        className: "w-5 h-5"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/basics.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/basics.tsx",
                lineNumber: 142,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/basics.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_s(BasicsStep, "G/w78sJ4fX2iM6NqA6Z4Mq/ElCU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$context$2f$CharacterContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCharacter"]
    ];
});
_c = BasicsStep;
var _c;
__turbopack_context__.k.register(_c, "BasicsStep");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/personality.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PersonalityStep
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$context$2f$CharacterContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/context/CharacterContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function PersonalityStep({ characterIndex, onNext, onBack }) {
    _s();
    const { characters, updateCharacter } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$context$2f$CharacterContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCharacter"])();
    const character = characters[characterIndex];
    const sliders = [
        {
            key: "warmth",
            label: "Warm vs. Cold",
            left: "WARM",
            right: "COLD"
        },
        {
            key: "confidence",
            label: "Shy vs. Confident",
            left: "SHY",
            right: "CONFIDENT"
        },
        {
            key: "calmness",
            label: "Calm vs. Chaotic",
            left: "CALM",
            right: "CHAOTIC"
        },
        {
            key: "reserve",
            label: "Emotional vs. Reserved",
            left: "EMOTIONAL",
            right: "RESERVED"
        }
    ];
    const getLabel = (key, value)=>{
        if (key === "warmth") {
            if (value < 30) return "Cold";
            if (value > 70) return "Warm";
            return "Neutral";
        }
        if (key === "confidence") {
            if (value < 30) return "Shy";
            if (value > 70) return "Very Confident";
            return "Balanced";
        }
        if (key === "calmness") {
            if (value < 30) return "Chaotic";
            if (value > 70) return "Calm";
            return "Balanced";
        }
        if (key === "reserve") {
            if (value < 30) return "Emotional";
            if (value > 70) return "Reserved";
            return "Balanced";
        }
        return "Neutral";
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-4xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-4xl font-bold text-foreground mb-3",
                children: "Personality Profile"
            }, void 0, false, {
                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/personality.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-muted-foreground mb-8",
                children: "Define the core temperament and behavioral nuances of your AI character."
            }, void 0, false, {
                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/personality.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6 mb-8",
                children: sliders.map((slider, index)=>{
                    const value = character.personality[slider.key];
                    const label = getLabel(slider.key, value);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-medium text-foreground",
                                        children: slider.label
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/personality.tsx",
                                        lineNumber: 89,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-3 py-1 rounded-lg bg-violet-500/20 text-violet-400 text-xs font-medium",
                                        children: label
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/personality.tsx",
                                        lineNumber: 90,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/personality.tsx",
                                lineNumber: 88,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between text-xs text-muted-foreground mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: slider.left
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/personality.tsx",
                                                lineNumber: 97,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: slider.right
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/personality.tsx",
                                                lineNumber: 98,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/personality.tsx",
                                        lineNumber: 96,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "range",
                                        min: "0",
                                        max: "100",
                                        value: value,
                                        onChange: (e)=>updateCharacter(characterIndex, {
                                                personality: {
                                                    ...character.personality,
                                                    [slider.key]: parseInt(e.target.value)
                                                }
                                            }),
                                        className: "w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-violet-500",
                                        style: {
                                            background: `linear-gradient(to right, rgb(139, 92, 246) 0%, rgb(139, 92, 246) ${value}%, rgb(63, 63, 70) ${value}%, rgb(63, 63, 70) 100%)`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/personality.tsx",
                                        lineNumber: 100,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/personality.tsx",
                                lineNumber: 95,
                                columnNumber: 15
                            }, this)
                        ]
                    }, slider.key, true, {
                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/personality.tsx",
                        lineNumber: 81,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/personality.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onBack,
                        className: "flex-1 py-4 rounded-2xl glass border border-border hover:bg-white/5 transition-colors text-center font-medium",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                className: "w-5 h-5 inline mr-2"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/personality.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this),
                            "Back"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/personality.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                        onClick: onNext,
                        className: "flex-[2] py-4 rounded-2xl bg-violet-500 hover:bg-violet-600 text-white font-semibold flex items-center justify-center gap-2 transition-colors",
                        whileHover: {
                            scale: 1.02
                        },
                        whileTap: {
                            scale: 0.98
                        },
                        children: [
                            "Next Step",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/personality.tsx",
                                lineNumber: 139,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/personality.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/personality.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/personality.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
_s(PersonalityStep, "V8CJrl0g7WHL4nt0C8RXdluEABc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$context$2f$CharacterContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCharacter"]
    ];
});
_c = PersonalityStep;
var _c;
__turbopack_context__.k.register(_c, "PersonalityStep");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/backstory.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BackstoryStep
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$context$2f$CharacterContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/context/CharacterContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const BACKSTORY_STYLES = [
    "Mysterious Past",
    "Tragic Origin",
    "Heroic Journey",
    "Villain Arc",
    "Rise to Power",
    "Fall from Grace",
    "Redemption Story",
    "Coming of Age",
    "Forbidden Love",
    "Revenge Quest"
];
function BackstoryStep({ characterIndex, onNext, onBack }) {
    _s();
    const { characters, updateCharacter } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$context$2f$CharacterContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCharacter"])();
    const character = characters[characterIndex];
    const [showCustomInput, setShowCustomInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [customStyle, setCustomStyle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const handleStyleSelect = (style)=>{
        updateCharacter(characterIndex, {
            backstoryStyle: style
        });
        setShowCustomInput(false);
        setCustomStyle("");
    };
    const handleCustomSubmit = ()=>{
        if (customStyle.trim()) {
            handleStyleSelect(customStyle.trim());
        }
    };
    const isCustomSelected = character.backstoryStyle && !BACKSTORY_STYLES.includes(character.backstoryStyle);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-2xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-4xl font-bold text-foreground mb-3",
                children: "Backstory Style"
            }, void 0, false, {
                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/backstory.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-muted-foreground mb-8",
                children: "Choose the narrative style for your character's backstory."
            }, void 0, false, {
                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/backstory.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 md:grid-cols-3 gap-4 mb-4",
                children: BACKSTORY_STYLES.map((style)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                        onClick: ()=>handleStyleSelect(style),
                        whileHover: {
                            scale: 1.02
                        },
                        whileTap: {
                            scale: 0.98
                        },
                        className: `p-4 rounded-xl glass border-2 transition-all text-left relative overflow-hidden group ${character.backstoryStyle === style ? "border-violet-500 bg-violet-500/20 shadow-lg shadow-violet-500/20" : "border-border hover:border-violet-500/50"}`,
                        children: [
                            character.backstoryStyle === style && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    scale: 0
                                },
                                animate: {
                                    scale: 1
                                },
                                className: "absolute top-2 right-2 w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-2 h-2 rounded-full bg-white"
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/backstory.tsx",
                                    lineNumber: 73,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/backstory.tsx",
                                lineNumber: 68,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `text-sm font-medium transition-colors ${character.backstoryStyle === style ? "text-violet-400" : "text-foreground"}`,
                                children: style
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/backstory.tsx",
                                lineNumber: 76,
                                columnNumber: 13
                            }, this),
                            character.backstoryStyle === style && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0
                                },
                                animate: {
                                    opacity: 1
                                },
                                className: "absolute inset-0 border-2 border-violet-500/30 rounded-xl pointer-events-none"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/backstory.tsx",
                                lineNumber: 82,
                                columnNumber: 15
                            }, this)
                        ]
                    }, style, true, {
                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/backstory.tsx",
                        lineNumber: 56,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/backstory.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            showCustomInput ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    height: 0
                },
                animate: {
                    opacity: 1,
                    height: "auto"
                },
                exit: {
                    opacity: 0,
                    height: 0
                },
                className: "mb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "glass rounded-xl p-4 border-2 border-violet-500/50 bg-violet-500/10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "text-sm font-medium text-foreground mb-2 block",
                            children: "Custom Backstory Style"
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/backstory.tsx",
                            lineNumber: 101,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: customStyle,
                                    onChange: (e)=>setCustomStyle(e.target.value),
                                    placeholder: "e.g., Time Traveler, Immortal Being...",
                                    className: "flex-1 h-12 px-4 rounded-xl glass border border-violet-500/50 focus:border-violet-500 transition-all outline-none",
                                    autoFocus: true,
                                    onKeyDown: (e)=>{
                                        if (e.key === "Enter") {
                                            handleCustomSubmit();
                                        }
                                        if (e.key === "Escape") {
                                            setShowCustomInput(false);
                                            setCustomStyle("");
                                        }
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/backstory.tsx",
                                    lineNumber: 105,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleCustomSubmit,
                                    className: "px-4 py-2 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-medium transition-colors",
                                    children: "Add"
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/backstory.tsx",
                                    lineNumber: 122,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setShowCustomInput(false);
                                        setCustomStyle("");
                                    },
                                    className: "px-4 py-2 rounded-xl glass border border-border hover:bg-white/5 transition-colors",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/backstory.tsx",
                                    lineNumber: 128,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/backstory.tsx",
                            lineNumber: 104,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/backstory.tsx",
                    lineNumber: 100,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/backstory.tsx",
                lineNumber: 94,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                onClick: ()=>setShowCustomInput(true),
                whileHover: {
                    scale: 1.02
                },
                whileTap: {
                    scale: 0.98
                },
                className: "w-full mb-4 py-3 rounded-xl glass border-2 border-dashed border-border hover:border-violet-500/50 transition-all flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                        className: "w-4 h-4"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/backstory.tsx",
                        lineNumber: 147,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-medium",
                        children: "Add Custom Style"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/backstory.tsx",
                        lineNumber: 148,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/backstory.tsx",
                lineNumber: 141,
                columnNumber: 9
            }, this),
            isCustomSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: -10
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                className: "mb-4 p-4 rounded-xl glass border-2 border-violet-500 bg-violet-500/20 shadow-lg shadow-violet-500/20 relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-2 right-2 w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-2 h-2 rounded-full bg-white"
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/backstory.tsx",
                            lineNumber: 160,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/backstory.tsx",
                        lineNumber: 159,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-medium text-violet-400 mb-1",
                        children: "Selected Custom Style"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/backstory.tsx",
                        lineNumber: 162,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-foreground font-semibold",
                        children: character.backstoryStyle
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/backstory.tsx",
                        lineNumber: 163,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            updateCharacter(characterIndex, {
                                backstoryStyle: ""
                            });
                            setShowCustomInput(true);
                        },
                        className: "mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors",
                        children: "Change"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/backstory.tsx",
                        lineNumber: 164,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/backstory.tsx",
                lineNumber: 154,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onBack,
                        className: "flex-1 py-4 rounded-2xl glass border border-border hover:bg-white/5 transition-colors text-center font-medium",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                className: "w-5 h-5 inline mr-2"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/backstory.tsx",
                                lineNumber: 181,
                                columnNumber: 11
                            }, this),
                            "Back"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/backstory.tsx",
                        lineNumber: 177,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                        onClick: onNext,
                        disabled: !character.backstoryStyle,
                        className: "flex-[2] py-4 rounded-2xl bg-violet-500 hover:bg-violet-600 text-white font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                        whileHover: {
                            scale: 1.02
                        },
                        whileTap: {
                            scale: 0.98
                        },
                        children: [
                            "Next Step",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/backstory.tsx",
                                lineNumber: 192,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/backstory.tsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/backstory.tsx",
                lineNumber: 176,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/backstory.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_s(BackstoryStep, "CzpGsua8pYjVD/2GhkhLtq6ZUBY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$context$2f$CharacterContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCharacter"]
    ];
});
_c = BackstoryStep;
var _c;
__turbopack_context__.k.register(_c, "BackstoryStep");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SpeechStep
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$context$2f$CharacterContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/context/CharacterContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const TONE_OPTIONS = [
    "Formal & Precise",
    "Casual & Warm",
    "Mysterious & Cryptic",
    "Playful & Energetic",
    "Serious & Authoritative",
    "Gentle & Empathetic"
];
const VOCABULARY_OPTIONS = [
    "Archival & Technical",
    "Simple & Direct",
    "Poetic & Flowery",
    "Modern & Slang",
    "Academic & Complex",
    "Conversational"
];
function SpeechStep({ characterIndex, onNext, onBack }) {
    _s();
    const { characters, updateCharacter } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$context$2f$CharacterContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCharacter"])();
    const character = characters[characterIndex];
    const [showCustomTone, setShowCustomTone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showCustomVocab, setShowCustomVocab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [customTone, setCustomTone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [customVocab, setCustomVocab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const speechRules = character.speechRules || {};
    const handleToneSelect = (tone)=>{
        updateCharacter(characterIndex, {
            speechRules: {
                ...speechRules,
                tone
            }
        });
        setShowCustomTone(false);
        setCustomTone("");
    };
    const handleVocabSelect = (vocab)=>{
        updateCharacter(characterIndex, {
            speechRules: {
                ...speechRules,
                vocabulary: vocab
            }
        });
        setShowCustomVocab(false);
        setCustomVocab("");
    };
    const isCustomTone = speechRules.tone && !TONE_OPTIONS.includes(speechRules.tone);
    const isCustomVocab = speechRules.vocabulary && !VOCABULARY_OPTIONS.includes(speechRules.vocabulary);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-2xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-4xl font-bold text-foreground mb-3",
                children: "Speech & Behavior"
            }, void 0, false, {
                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-muted-foreground mb-8",
                children: "Define how your character speaks and behaves."
            }, void 0, false, {
                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6 mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm font-medium text-foreground mb-3 block",
                                children: "Tone"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-3 mb-3",
                                children: TONE_OPTIONS.map((tone)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                        onClick: ()=>handleToneSelect(tone),
                                        whileHover: {
                                            scale: 1.02
                                        },
                                        whileTap: {
                                            scale: 0.98
                                        },
                                        className: `p-3 rounded-xl glass border-2 transition-all text-sm relative overflow-hidden group ${speechRules.tone === tone ? "border-violet-500 bg-violet-500/20 shadow-lg shadow-violet-500/20" : "border-border hover:border-violet-500/50"}`,
                                        children: [
                                            speechRules.tone === tone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: {
                                                    scale: 0
                                                },
                                                animate: {
                                                    scale: 1
                                                },
                                                className: "absolute top-2 right-2 w-4 h-4 rounded-full bg-violet-500 flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-1.5 h-1.5 rounded-full bg-white"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                                    lineNumber: 91,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                                lineNumber: 86,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `transition-colors ${speechRules.tone === tone ? "text-violet-400 font-semibold" : "text-foreground"}`,
                                                children: tone
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                                lineNumber: 94,
                                                columnNumber: 17
                                            }, this),
                                            speechRules.tone === tone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: {
                                                    opacity: 0
                                                },
                                                animate: {
                                                    opacity: 1
                                                },
                                                className: "absolute inset-0 border-2 border-violet-500/30 rounded-xl pointer-events-none"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                                lineNumber: 100,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, tone, true, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                        lineNumber: 74,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                children: showCustomTone ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        height: 0
                                    },
                                    animate: {
                                        opacity: 1,
                                        height: "auto"
                                    },
                                    exit: {
                                        opacity: 0,
                                        height: 0
                                    },
                                    className: "mb-3",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "glass rounded-xl p-3 border-2 border-violet-500/50 bg-violet-500/10",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: customTone,
                                                    onChange: (e)=>setCustomTone(e.target.value),
                                                    placeholder: "e.g., Sarcastic & Witty...",
                                                    className: "flex-1 h-10 px-3 rounded-lg glass border border-violet-500/50 focus:border-violet-500 transition-all outline-none text-sm",
                                                    autoFocus: true,
                                                    onKeyDown: (e)=>{
                                                        if (e.key === "Enter" && customTone.trim()) {
                                                            handleToneSelect(customTone.trim());
                                                        }
                                                        if (e.key === "Escape") {
                                                            setShowCustomTone(false);
                                                            setCustomTone("");
                                                        }
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                                    lineNumber: 121,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>customTone.trim() && handleToneSelect(customTone.trim()),
                                                    className: "px-3 py-2 rounded-lg bg-violet-500 hover:bg-violet-600 text-white text-sm font-medium transition-colors",
                                                    children: "Add"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                                    lineNumber: 138,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        setShowCustomTone(false);
                                                        setCustomTone("");
                                                    },
                                                    className: "px-3 py-2 rounded-lg glass border border-border hover:bg-white/5 text-sm transition-colors",
                                                    children: "Cancel"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                                    lineNumber: 144,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                            lineNumber: 120,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                        lineNumber: 119,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                    lineNumber: 113,
                                    columnNumber: 15
                                }, this) : !isCustomTone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                    onClick: ()=>setShowCustomTone(true),
                                    whileHover: {
                                        scale: 1.02
                                    },
                                    whileTap: {
                                        scale: 0.98
                                    },
                                    className: "w-full py-2 rounded-xl glass border-2 border-dashed border-border hover:border-violet-500/50 transition-all flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                            lineNumber: 164,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Add Custom Tone"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                            lineNumber: 165,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                    lineNumber: 158,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                lineNumber: 111,
                                columnNumber: 11
                            }, this),
                            isCustomTone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    y: -10
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                className: "mb-3 p-3 rounded-xl glass border-2 border-violet-500 bg-violet-500/20 shadow-lg shadow-violet-500/20 relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute top-2 right-2 w-4 h-4 rounded-full bg-violet-500 flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-1.5 h-1.5 rounded-full bg-white"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                            lineNumber: 179,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                        lineNumber: 178,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-medium text-violet-400 mb-1",
                                        children: "Selected Custom Tone"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                        lineNumber: 181,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-semibold text-foreground",
                                        children: speechRules.tone
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                        lineNumber: 182,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            updateCharacter(characterIndex, {
                                                speechRules: {
                                                    ...speechRules,
                                                    tone: ""
                                                }
                                            });
                                            setShowCustomTone(true);
                                        },
                                        className: "mt-1 text-xs text-muted-foreground hover:text-foreground transition-colors",
                                        children: "Change"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                        lineNumber: 183,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                lineNumber: 173,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm font-medium text-foreground mb-3 block",
                                children: "Vocabulary"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                lineNumber: 200,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-3 mb-3",
                                children: VOCABULARY_OPTIONS.map((vocab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                        onClick: ()=>handleVocabSelect(vocab),
                                        whileHover: {
                                            scale: 1.02
                                        },
                                        whileTap: {
                                            scale: 0.98
                                        },
                                        className: `p-3 rounded-xl glass border-2 transition-all text-sm relative overflow-hidden group ${speechRules.vocabulary === vocab ? "border-violet-500 bg-violet-500/20 shadow-lg shadow-violet-500/20" : "border-border hover:border-violet-500/50"}`,
                                        children: [
                                            speechRules.vocabulary === vocab && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: {
                                                    scale: 0
                                                },
                                                animate: {
                                                    scale: 1
                                                },
                                                className: "absolute top-2 right-2 w-4 h-4 rounded-full bg-violet-500 flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-1.5 h-1.5 rounded-full bg-white"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                                    lineNumber: 220,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                                lineNumber: 215,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `transition-colors ${speechRules.vocabulary === vocab ? "text-violet-400 font-semibold" : "text-foreground"}`,
                                                children: vocab
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                                lineNumber: 223,
                                                columnNumber: 17
                                            }, this),
                                            speechRules.vocabulary === vocab && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: {
                                                    opacity: 0
                                                },
                                                animate: {
                                                    opacity: 1
                                                },
                                                className: "absolute inset-0 border-2 border-violet-500/30 rounded-xl pointer-events-none"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                                lineNumber: 229,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, vocab, true, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                        lineNumber: 203,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                lineNumber: 201,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                children: showCustomVocab ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        height: 0
                                    },
                                    animate: {
                                        opacity: 1,
                                        height: "auto"
                                    },
                                    exit: {
                                        opacity: 0,
                                        height: 0
                                    },
                                    className: "mb-3",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "glass rounded-xl p-3 border-2 border-violet-500/50 bg-violet-500/10",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: customVocab,
                                                    onChange: (e)=>setCustomVocab(e.target.value),
                                                    placeholder: "e.g., Ancient & Mystical...",
                                                    className: "flex-1 h-10 px-3 rounded-lg glass border border-violet-500/50 focus:border-violet-500 transition-all outline-none text-sm",
                                                    autoFocus: true,
                                                    onKeyDown: (e)=>{
                                                        if (e.key === "Enter" && customVocab.trim()) {
                                                            handleVocabSelect(customVocab.trim());
                                                        }
                                                        if (e.key === "Escape") {
                                                            setShowCustomVocab(false);
                                                            setCustomVocab("");
                                                        }
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                                    lineNumber: 250,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>customVocab.trim() && handleVocabSelect(customVocab.trim()),
                                                    className: "px-3 py-2 rounded-lg bg-violet-500 hover:bg-violet-600 text-white text-sm font-medium transition-colors",
                                                    children: "Add"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                                    lineNumber: 267,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        setShowCustomVocab(false);
                                                        setCustomVocab("");
                                                    },
                                                    className: "px-3 py-2 rounded-lg glass border border-border hover:bg-white/5 text-sm transition-colors",
                                                    children: "Cancel"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                                    lineNumber: 273,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                            lineNumber: 249,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                        lineNumber: 248,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                    lineNumber: 242,
                                    columnNumber: 15
                                }, this) : !isCustomVocab && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                    onClick: ()=>setShowCustomVocab(true),
                                    whileHover: {
                                        scale: 1.02
                                    },
                                    whileTap: {
                                        scale: 0.98
                                    },
                                    className: "w-full py-2 rounded-xl glass border-2 border-dashed border-border hover:border-violet-500/50 transition-all flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                            lineNumber: 293,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Add Custom Vocabulary"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                            lineNumber: 294,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                    lineNumber: 287,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                lineNumber: 240,
                                columnNumber: 11
                            }, this),
                            isCustomVocab && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    y: -10
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                className: "mb-3 p-3 rounded-xl glass border-2 border-violet-500 bg-violet-500/20 shadow-lg shadow-violet-500/20 relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute top-2 right-2 w-4 h-4 rounded-full bg-violet-500 flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-1.5 h-1.5 rounded-full bg-white"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                            lineNumber: 308,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                        lineNumber: 307,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-medium text-violet-400 mb-1",
                                        children: "Selected Custom Vocabulary"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                        lineNumber: 310,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-semibold text-foreground",
                                        children: speechRules.vocabulary
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                        lineNumber: 311,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            updateCharacter(characterIndex, {
                                                speechRules: {
                                                    ...speechRules,
                                                    vocabulary: ""
                                                }
                                            });
                                            setShowCustomVocab(true);
                                        },
                                        className: "mt-1 text-xs text-muted-foreground hover:text-foreground transition-colors",
                                        children: "Change"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                        lineNumber: 312,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                lineNumber: 302,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                        lineNumber: 199,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm font-medium text-foreground mb-2 block",
                                children: "Speech Patterns (Optional)"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                lineNumber: 328,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                placeholder: "e.g., Uses 'hmm' frequently, speaks in questions...",
                                value: speechRules.patterns || "",
                                onChange: (e)=>updateCharacter(characterIndex, {
                                        speechRules: {
                                            ...speechRules,
                                            patterns: e.target.value
                                        }
                                    }),
                                className: "w-full h-24 px-4 py-3 rounded-xl glass border border-border focus:border-violet-500 transition-all outline-none resize-none"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                lineNumber: 331,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                        lineNumber: 327,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onBack,
                        className: "flex-1 py-4 rounded-2xl glass border border-border hover:bg-white/5 transition-colors text-center font-medium",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                className: "w-5 h-5 inline mr-2"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                lineNumber: 349,
                                columnNumber: 11
                            }, this),
                            "Back"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                        lineNumber: 345,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                        onClick: onNext,
                        disabled: !speechRules.tone || !speechRules.vocabulary,
                        className: "flex-[2] py-4 rounded-2xl bg-violet-500 hover:bg-violet-600 text-white font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                        whileHover: {
                            scale: 1.02
                        },
                        whileTap: {
                            scale: 0.98
                        },
                        children: [
                            "Next Step",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                                lineNumber: 360,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                        lineNumber: 352,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
                lineNumber: 344,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
_s(SpeechStep, "StofGU5QoLVAwTyNNKEK4KxStCI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$context$2f$CharacterContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCharacter"]
    ];
});
_c = SpeechStep;
var _c;
__turbopack_context__.k.register(_c, "SpeechStep");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/boundaries.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BoundariesStep
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$context$2f$CharacterContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/context/CharacterContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const CONTENT_RATINGS = [
    "SFW",
    "PG-13",
    "Mature",
    "Explicit"
];
function BoundariesStep({ characterIndex, onNext, onBack }) {
    _s();
    const { characters, updateCharacter } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$context$2f$CharacterContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCharacter"])();
    const character = characters[characterIndex];
    const boundaries = character.boundaries || {};
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-2xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-4xl font-bold text-foreground mb-3",
                children: "Boundaries & Tone"
            }, void 0, false, {
                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/boundaries.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-muted-foreground mb-8",
                children: "Set the content boundaries and overall tone for your character."
            }, void 0, false, {
                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/boundaries.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6 mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm font-medium text-foreground mb-3 block",
                                children: "Content Rating"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/boundaries.tsx",
                                lineNumber: 30,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-4 gap-3",
                                children: CONTENT_RATINGS.map((rating)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                        onClick: ()=>updateCharacter(characterIndex, {
                                                boundaries: {
                                                    ...boundaries,
                                                    contentRating: rating
                                                }
                                            }),
                                        whileHover: {
                                            scale: 1.02
                                        },
                                        whileTap: {
                                            scale: 0.98
                                        },
                                        className: `p-3 rounded-xl glass border-2 transition-all text-sm font-medium relative overflow-hidden group ${boundaries.contentRating === rating ? "border-violet-500 bg-violet-500/20 shadow-lg shadow-violet-500/20" : "border-border hover:border-violet-500/50"}`,
                                        children: [
                                            boundaries.contentRating === rating && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: {
                                                    scale: 0
                                                },
                                                animate: {
                                                    scale: 1
                                                },
                                                className: "absolute top-1 right-1 w-4 h-4 rounded-full bg-violet-500 flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-1.5 h-1.5 rounded-full bg-white"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/boundaries.tsx",
                                                    lineNumber: 56,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/boundaries.tsx",
                                                lineNumber: 51,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `transition-colors ${boundaries.contentRating === rating ? "text-violet-400 font-bold" : "text-foreground"}`,
                                                children: rating
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/boundaries.tsx",
                                                lineNumber: 59,
                                                columnNumber: 17
                                            }, this),
                                            boundaries.contentRating === rating && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: {
                                                    opacity: 0
                                                },
                                                animate: {
                                                    opacity: 1
                                                },
                                                className: "absolute inset-0 border-2 border-violet-500/30 rounded-xl pointer-events-none"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/boundaries.tsx",
                                                lineNumber: 65,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, rating, true, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/boundaries.tsx",
                                        lineNumber: 35,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/boundaries.tsx",
                                lineNumber: 33,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/boundaries.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm font-medium text-foreground mb-2 block",
                                children: "Topics to Avoid (Optional)"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/boundaries.tsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                placeholder: "e.g., Violence, Politics, Religion...",
                                value: boundaries.topics || "",
                                onChange: (e)=>updateCharacter(characterIndex, {
                                        boundaries: {
                                            ...boundaries,
                                            topics: e.target.value
                                        }
                                    }),
                                className: "w-full h-24 px-4 py-3 rounded-xl glass border border-border focus:border-violet-500 transition-all outline-none resize-none"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/boundaries.tsx",
                                lineNumber: 80,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/boundaries.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm font-medium text-foreground mb-2 block",
                                children: "Overall Tone (Optional)"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/boundaries.tsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                placeholder: "e.g., Light-hearted, Serious, Dark...",
                                value: boundaries.tone || "",
                                onChange: (e)=>updateCharacter(characterIndex, {
                                        boundaries: {
                                            ...boundaries,
                                            tone: e.target.value
                                        }
                                    }),
                                className: "w-full h-24 px-4 py-3 rounded-xl glass border border-border focus:border-violet-500 transition-all outline-none resize-none"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/boundaries.tsx",
                                lineNumber: 96,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/boundaries.tsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/boundaries.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onBack,
                        className: "flex-1 py-4 rounded-2xl glass border border-border hover:bg-white/5 transition-colors text-center font-medium",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                className: "w-5 h-5 inline mr-2"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/boundaries.tsx",
                                lineNumber: 114,
                                columnNumber: 11
                            }, this),
                            "Back"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/boundaries.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                        onClick: onNext,
                        disabled: !boundaries.contentRating,
                        className: "flex-[2] py-4 rounded-2xl bg-violet-500 hover:bg-violet-600 text-white font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                        whileHover: {
                            scale: 1.02
                        },
                        whileTap: {
                            scale: 0.98
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/boundaries.tsx",
                                lineNumber: 124,
                                columnNumber: 11
                            }, this),
                            "Generate Character",
                            characterIndex === 0 && characters.length > 1 ? "s" : ""
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/boundaries.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/boundaries.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/boundaries.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_s(BoundariesStep, "V8CJrl0g7WHL4nt0C8RXdluEABc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$context$2f$CharacterContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCharacter"]
    ];
});
_c = BoundariesStep;
var _c;
__turbopack_context__.k.register(_c, "BoundariesStep");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Desktop/makemyBot/components/api-key-modal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "APIKeyModal",
    ()=>APIKeyModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Key$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/lucide-react/dist/esm/icons/key.js [app-client] (ecmascript) <export default as Key>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const PROVIDERS = [
    {
        value: "openai",
        label: "OpenAI",
        placeholder: "sk-..."
    },
    {
        value: "gemini",
        label: "Google Gemini",
        placeholder: "AIza..."
    },
    {
        value: "openrouter",
        label: "OpenRouter",
        placeholder: "sk-or-..."
    },
    {
        value: "huggingface",
        label: "HuggingFace",
        placeholder: "hf_..."
    }
];
function APIKeyModal({ isOpen, onClose, onSave }) {
    _s();
    const [selectedProvider, setSelectedProvider] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("openai");
    const [apiKey, setApiKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isSaving, setIsSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "APIKeyModal.useEffect": ()=>{
            if (isOpen) {
                // Load existing key for selected provider if any
                const stored = localStorage.getItem(`api_key_${selectedProvider}`);
                if (stored) {
                    setApiKey(stored);
                } else {
                    setApiKey("");
                }
            }
        }
    }["APIKeyModal.useEffect"], [
        isOpen,
        selectedProvider
    ]);
    const handleSave = ()=>{
        if (!apiKey.trim()) return;
        setIsSaving(true);
        // Store API key in localStorage
        localStorage.setItem(`api_key_${selectedProvider}`, apiKey.trim());
        localStorage.setItem("api_key_provider", selectedProvider);
        localStorage.setItem("api_key_connected", "true");
        // Small delay for UX
        setTimeout(()=>{
            setIsSaving(false);
            onSave();
            onClose();
        }, 300);
    };
    const handleClose = ()=>{
        setApiKey("");
        onClose();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                    fileName: "[project]/OneDrive/Desktop/makemyBot/components/api-key-modal.tsx",
                    lineNumber: 66,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                        className: "glass rounded-3xl p-8 max-w-md w-full border border-border pointer-events-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Key$3e$__["Key"], {
                                                    className: "w-5 h-5 text-violet-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/makemyBot/components/api-key-modal.tsx",
                                                    lineNumber: 88,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/api-key-modal.tsx",
                                                lineNumber: 87,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "text-xl font-semibold text-foreground",
                                                        children: "API Key Required"
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/api-key-modal.tsx",
                                                        lineNumber: 91,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-muted-foreground",
                                                        children: "Enter your API key to generate content"
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/api-key-modal.tsx",
                                                        lineNumber: 94,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/api-key-modal.tsx",
                                                lineNumber: 90,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/api-key-modal.tsx",
                                        lineNumber: 86,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleClose,
                                        className: "w-8 h-8 rounded-lg glass border border-border hover:bg-white/5 transition-colors flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "w-4 h-4 text-foreground"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/makemyBot/components/api-key-modal.tsx",
                                            lineNumber: 103,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/api-key-modal.tsx",
                                        lineNumber: 99,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/api-key-modal.tsx",
                                lineNumber: 85,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-sm font-medium text-foreground mb-2 block",
                                        children: "AI Provider"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/api-key-modal.tsx",
                                        lineNumber: 109,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: selectedProvider,
                                        onChange: (e)=>setSelectedProvider(e.target.value),
                                        className: "w-full h-12 px-4 rounded-xl glass border border-border focus:border-violet-500 transition-all outline-none appearance-none cursor-pointer bg-background [&>option]:bg-zinc-900 [&>option]:text-white",
                                        children: PROVIDERS.map((provider)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: provider.value,
                                                className: "bg-zinc-900 text-white",
                                                children: provider.label
                                            }, provider.value, false, {
                                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/api-key-modal.tsx",
                                                lineNumber: 118,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/api-key-modal.tsx",
                                        lineNumber: 112,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/api-key-modal.tsx",
                                lineNumber: 108,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-sm font-medium text-foreground mb-2 block",
                                        children: "API Key"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/api-key-modal.tsx",
                                        lineNumber: 127,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "password",
                                        value: apiKey,
                                        onChange: (e)=>setApiKey(e.target.value),
                                        placeholder: PROVIDERS.find((p)=>p.value === selectedProvider)?.placeholder,
                                        className: "w-full h-12 px-4 rounded-xl glass border border-border focus:border-violet-500 transition-all outline-none font-mono text-sm",
                                        autoFocus: true
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/api-key-modal.tsx",
                                        lineNumber: 130,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted-foreground mt-2",
                                        children: "Your API key is stored locally and never sent to our servers."
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/api-key-modal.tsx",
                                        lineNumber: 138,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/api-key-modal.tsx",
                                lineNumber: 126,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleClose,
                                        className: "flex-1 py-3 rounded-xl glass border border-border hover:bg-white/5 transition-colors font-medium",
                                        children: "Close"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/api-key-modal.tsx",
                                        lineNumber: 145,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSave,
                                        disabled: !apiKey.trim() || isSaving,
                                        className: "flex-1 py-3 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
                                        children: isSaving ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/makemyBot/components/api-key-modal.tsx",
                                                    lineNumber: 158,
                                                    columnNumber: 23
                                                }, this),
                                                "Saving..."
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/makemyBot/components/api-key-modal.tsx",
                                                    lineNumber: 163,
                                                    columnNumber: 23
                                                }, this),
                                                "Save Key"
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/api-key-modal.tsx",
                                        lineNumber: 151,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/components/api-key-modal.tsx",
                                lineNumber: 144,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/makemyBot/components/api-key-modal.tsx",
                        lineNumber: 76,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/OneDrive/Desktop/makemyBot/components/api-key-modal.tsx",
                    lineNumber: 75,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/OneDrive/Desktop/makemyBot/components/api-key-modal.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
_s(APIKeyModal, "zalwuyTuVOz7bIIeWeYOCJ5b37M=");
_c = APIKeyModal;
var _c;
__turbopack_context__.k.register(_c, "APIKeyModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Desktop/makemyBot/lib/ai/provider-detection.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
    },
    lmstudio: {
        default: "local-model",
        long: "local-model"
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
"[project]/OneDrive/Desktop/makemyBot/lib/api-key.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$lib$2f$ai$2f$provider$2d$detection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/lib/ai/provider-detection.ts [app-client] (ecmascript)");
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
    const detected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$lib$2f$ai$2f$provider$2d$detection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detectProviderFromKey"])(key);
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
        "huggingface",
        "lmstudio"
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
        "huggingface",
        "lmstudio"
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
"[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WizardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$context$2f$CharacterContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/context/CharacterContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$components$2f$wizard$2d$steps$2f$basics$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/basics.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$components$2f$wizard$2d$steps$2f$personality$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/personality.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$components$2f$wizard$2d$steps$2f$backstory$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/backstory.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$components$2f$wizard$2d$steps$2f$speech$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/speech.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$components$2f$wizard$2d$steps$2f$boundaries$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/components/wizard-steps/boundaries.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$components$2f$api$2d$key$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/components/api-key-modal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$lib$2f$api$2d$key$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/makemyBot/lib/api-key.ts [app-client] (ecmascript)");
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
;
;
;
;
const STEPS = [
    {
        id: "basics",
        label: "Basics"
    },
    {
        id: "personality",
        label: "Personality"
    },
    {
        id: "backstory",
        label: "Backstory"
    },
    {
        id: "speech",
        label: "Speech & Behavior"
    },
    {
        id: "boundaries",
        label: "Boundaries & Tone"
    }
];
function WizardPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { characters, activeCharacterIndex, setActiveCharacterIndex, updateCharacter, isMultiMode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$context$2f$CharacterContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCharacter"])();
    const [currentStep, setCurrentStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [showAPIKeyModal, setShowAPIKeyModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [characterSteps, setCharacterSteps] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    // Redirect if no characters initialized
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WizardPage.useEffect": ()=>{
            if (characters.length === 0) {
                router.push("/create");
            }
        }
    }["WizardPage.useEffect"], [
        characters,
        router
    ]);
    // Initialize step tracking for each character
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WizardPage.useEffect": ()=>{
            const steps = {};
            characters.forEach({
                "WizardPage.useEffect": (char)=>{
                    if (characterSteps[char.id] === undefined) {
                        steps[char.id] = 0;
                    }
                }
            }["WizardPage.useEffect"]);
            if (Object.keys(steps).length > 0) {
                setCharacterSteps({
                    "WizardPage.useEffect": (prev)=>({
                            ...prev,
                            ...steps
                        })
                }["WizardPage.useEffect"]);
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["WizardPage.useEffect"], [
        characters.length
    ]);
    // Update current step when character changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WizardPage.useEffect": ()=>{
            const currentCharId = characters[activeCharacterIndex]?.id;
            if (currentCharId) {
                const step = characterSteps[currentCharId] ?? 0;
                setCurrentStep(step);
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["WizardPage.useEffect"], [
        activeCharacterIndex
    ]);
    if (characters.length === 0) {
        return null;
    }
    const currentCharacter = characters[activeCharacterIndex];
    const currentStepId = STEPS[currentStep].id;
    const handleNext = ()=>{
        const currentCharId = currentCharacter.id;
        if (currentStep < STEPS.length - 1) {
            const nextStep = currentStep + 1;
            setCurrentStep(nextStep);
            setCharacterSteps((prev)=>({
                    ...prev,
                    [currentCharId]: nextStep
                }));
        } else {
            // Last step - check if current character is complete
            const isComplete = currentCharacter.basics.name && currentCharacter.basics.setting && currentCharacter.backstoryStyle && currentCharacter.speechRules?.tone && currentCharacter.boundaries?.contentRating;
            if (isComplete) {
                // Check if all characters are complete
                const allComplete = characters.every((char)=>{
                    return char.basics.name && char.basics.setting && char.backstoryStyle && char.speechRules?.tone && char.boundaries?.contentRating;
                });
                if (allComplete) {
                    handleGenerate();
                } else {
                    // Find next incomplete character
                    const nextIncompleteIndex = characters.findIndex((char, idx)=>idx > activeCharacterIndex && (!char.basics.name || !char.basics.setting || !char.backstoryStyle || !char.speechRules?.tone || !char.boundaries?.contentRating));
                    if (nextIncompleteIndex !== -1) {
                        setActiveCharacterIndex(nextIncompleteIndex);
                        setCurrentStep(0);
                        setCharacterSteps((prev)=>({
                                ...prev,
                                [characters[nextIncompleteIndex].id]: 0
                            }));
                    }
                }
            }
        }
    };
    const handleBack = ()=>{
        const currentCharId = currentCharacter.id;
        if (currentStep > 0) {
            const prevStep = currentStep - 1;
            setCurrentStep(prevStep);
            setCharacterSteps((prev)=>({
                    ...prev,
                    [currentCharId]: prevStep
                }));
        }
    };
    const handleCharacterSwitch = (index)=>{
        setActiveCharacterIndex(index);
        const charId = characters[index].id;
        const step = characterSteps[charId] ?? 0;
        setCurrentStep(step);
    };
    const handleGenerate = ()=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$lib$2f$api$2d$key$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAPIKeyConnected"])()) {
            setShowAPIKeyModal(true);
            return;
        }
        // Navigate to results
        if (isMultiMode) {
            router.push("/characters/results");
        } else {
            router.push(`/character/${currentCharacter.id}`);
        }
    };
    const getStepProgress = (charIndex)=>{
        const char = characters[charIndex];
        let completed = 0;
        if (char.basics.name && char.basics.setting) completed++;
        if (char.personality.warmth !== 50 || char.personality.confidence !== 50) completed++;
        if (char.backstoryStyle) completed++;
        if (char.speechRules?.tone) completed++;
        if (char.boundaries?.contentRating) completed++;
        return completed;
    };
    const renderStep = ()=>{
        switch(currentStepId){
            case "basics":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$components$2f$wizard$2d$steps$2f$basics$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    characterIndex: activeCharacterIndex,
                    onNext: handleNext
                }, void 0, false, {
                    fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                    lineNumber: 182,
                    columnNumber: 16
                }, this);
            case "personality":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$components$2f$wizard$2d$steps$2f$personality$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    characterIndex: activeCharacterIndex,
                    onNext: handleNext,
                    onBack: handleBack
                }, void 0, false, {
                    fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                    lineNumber: 184,
                    columnNumber: 16
                }, this);
            case "backstory":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$components$2f$wizard$2d$steps$2f$backstory$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    characterIndex: activeCharacterIndex,
                    onNext: handleNext,
                    onBack: handleBack
                }, void 0, false, {
                    fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                    lineNumber: 186,
                    columnNumber: 16
                }, this);
            case "speech":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$components$2f$wizard$2d$steps$2f$speech$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    characterIndex: activeCharacterIndex,
                    onNext: handleNext,
                    onBack: handleBack
                }, void 0, false, {
                    fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                    lineNumber: 188,
                    columnNumber: 16
                }, this);
            case "boundaries":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$components$2f$wizard$2d$steps$2f$boundaries$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    characterIndex: activeCharacterIndex,
                    onNext: handleGenerate,
                    onBack: handleBack
                }, void 0, false, {
                    fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                    lineNumber: 190,
                    columnNumber: 16
                }, this);
            default:
                return null;
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-background px-4 py-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-6xl mx-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/create",
                                className: "inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                                        lineNumber: 205,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm",
                                        children: "Back"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                                        lineNumber: 206,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                                lineNumber: 201,
                                columnNumber: 11
                            }, this),
                            isMultiMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-medium text-muted-foreground mb-4",
                                        children: "Select Character to Edit"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                                        lineNumber: 212,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4",
                                        children: characters.map((char, index)=>{
                                            const progress = getStepProgress(index);
                                            const isActive = index === activeCharacterIndex;
                                            const isComplete = progress === STEPS.length;
                                            const progressPercent = progress / STEPS.length * 100;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                                onClick: ()=>handleCharacterSwitch(index),
                                                whileHover: {
                                                    scale: 1.02
                                                },
                                                whileTap: {
                                                    scale: 0.98
                                                },
                                                className: `relative glass rounded-2xl p-4 border-2 transition-all overflow-hidden group ${isActive ? "border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/20" : "border-border hover:border-violet-500/50"}`,
                                                children: [
                                                    isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                        initial: {
                                                            scale: 0
                                                        },
                                                        animate: {
                                                            scale: 1
                                                        },
                                                        className: "absolute top-2 right-2 w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-2 h-2 rounded-full bg-white"
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                                                            lineNumber: 240,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                                                        lineNumber: 235,
                                                        columnNumber: 25
                                                    }, this),
                                                    isComplete && !isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute top-2 right-2 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                            className: "w-3 h-3 text-white"
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                                                            lineNumber: 247,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                                                        lineNumber: 246,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `w-12 h-12 rounded-xl mb-3 flex items-center justify-center font-bold text-lg transition-all ${isActive ? "bg-violet-500/20 border-2 border-violet-500/50 text-violet-400" : "bg-muted border-2 border-border text-muted-foreground"}`,
                                                        children: index + 1
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                                                        lineNumber: 252,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: `text-sm font-semibold mb-2 text-left transition-colors ${isActive ? "text-foreground" : "text-foreground/70"}`,
                                                        children: char.basics.name || `Character ${index + 1}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                                                        lineNumber: 260,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-1.5 rounded-full glass overflow-hidden mb-2",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                            className: `h-full rounded-full ${isComplete ? "bg-green-500" : "bg-violet-500"}`,
                                                            initial: {
                                                                width: 0
                                                            },
                                                            animate: {
                                                                width: `${progressPercent}%`
                                                            },
                                                            transition: {
                                                                duration: 0.3
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                                                            lineNumber: 267,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                                                        lineNumber: 266,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-muted-foreground text-left",
                                                        children: [
                                                            progress,
                                                            " of ",
                                                            STEPS.length,
                                                            " steps"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                                                        lineNumber: 277,
                                                        columnNumber: 23
                                                    }, this),
                                                    !isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute inset-0 bg-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                                                        lineNumber: 283,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, char.id, true, {
                                                fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                                                lineNumber: 223,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                                        lineNumber: 215,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                                lineNumber: 211,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-center gap-3 mb-4",
                                        children: [
                                            isMultiMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-3 py-1.5 rounded-lg glass border border-violet-500/30 bg-violet-500/10",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-semibold text-violet-400",
                                                    children: [
                                                        "Character ",
                                                        activeCharacterIndex + 1,
                                                        " of ",
                                                        characters.length
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                                                    lineNumber: 297,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                                                lineNumber: 296,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-2xl font-bold text-foreground",
                                                children: "Character Wizard"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                                                lineNumber: 302,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                                        lineNumber: 294,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-center gap-2 mb-4",
                                        children: STEPS.map((step, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: {
                                                    scale: 0.8
                                                },
                                                animate: {
                                                    scale: index <= currentStep ? 1 : 0.8
                                                },
                                                className: `h-2 rounded-full transition-all ${index <= currentStep ? "w-10 bg-violet-500 shadow-lg shadow-violet-500/30" : "w-8 bg-muted"}`
                                            }, step.id, false, {
                                                fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                                                lineNumber: 306,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                                        lineNumber: 304,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium text-foreground",
                                                children: [
                                                    "Step ",
                                                    currentStep + 1,
                                                    " of ",
                                                    STEPS.length
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                                                lineNumber: 318,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted-foreground",
                                                children: "•"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                                                lineNumber: 321,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-muted-foreground",
                                                children: STEPS[currentStep].label
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                                                lineNumber: 322,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                                        lineNumber: 317,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                                lineNumber: 293,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                        lineNumber: 200,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        mode: "wait",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                x: 20
                            },
                            animate: {
                                opacity: 1,
                                x: 0
                            },
                            exit: {
                                opacity: 0,
                                x: -20
                            },
                            transition: {
                                duration: 0.3,
                                ease: [
                                    0.22,
                                    1,
                                    0.36,
                                    1
                                ]
                            },
                            children: renderStep()
                        }, currentStepId, false, {
                            fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                            lineNumber: 331,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                        lineNumber: 330,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                lineNumber: 198,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$components$2f$api$2d$key$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APIKeyModal"], {
                isOpen: showAPIKeyModal,
                onClose: ()=>setShowAPIKeyModal(false),
                onSave: ()=>{
                    setShowAPIKeyModal(false);
                    handleGenerate();
                }
            }, void 0, false, {
                fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
                lineNumber: 344,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/OneDrive/Desktop/makemyBot/app/wizard/page.tsx",
        lineNumber: 197,
        columnNumber: 5
    }, this);
}
_s(WizardPage, "ieo3QAW3l+kf0hn+Sqm8JN6SMRE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$makemyBot$2f$context$2f$CharacterContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCharacter"]
    ];
});
_c = WizardPage;
var _c;
__turbopack_context__.k.register(_c, "WizardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=OneDrive_Desktop_makemyBot_c549fd90._.js.map