"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import {
    Sparkles,
    ArrowLeft,
    Copy,
    Check,
    Image as ImageIcon,
    Settings2,
    ExternalLink,
    Zap,
    Camera,
    Film,
    Grid,
    Lock,
    Wand2
} from "lucide-react";
import Link from "next/link";
import { useCharacter } from "@/context/CharacterContext";
import { validateAPIKey } from "@/lib/generation/service";
import { PromptStyle } from "@/lib/imagePrompts/buildPrompt";
import { getUserSubscription } from "@/lib/subscriptions/service";

function ImageGeneratorContent() {
    const { characters, character, setActiveCharacterIndex, activeCharacterIndex } = useCharacter();
    const searchParams = useSearchParams();
    const [mode, setMode] = useState<"character" | "story">("character");
    const [style, setStyle] = useState<PromptStyle>("Portrait");
    const [storyIdea, setStoryIdea] = useState("");
    const [prompts, setPrompts] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [isPro, setIsPro] = useState(false);

    useEffect(() => {
        const modeParam = searchParams.get("mode");
        if (modeParam === "story") {
            setMode("story");
        } else {
            // Only recover mode from local storage if no URL param is present
            const savedMode = localStorage.getItem("saved_gen_mode");
            if (savedMode === "character" || savedMode === "story") {
                setMode(savedMode);
            }
        }
    }, [searchParams]);

    // Recover state from local storage on mount
    useEffect(() => {
        try {
            const savedPrompts = localStorage.getItem("generated_prompts");
            if (savedPrompts) {
                setPrompts(JSON.parse(savedPrompts));
            }

            const savedStory = localStorage.getItem("saved_story_idea");
            if (savedStory) {
                setStoryIdea(savedStory);
            }
        } catch (e) {
            console.error("Failed to load saved state", e);
        }
    }, []);

    // Save state to local storage
    useEffect(() => {
        localStorage.setItem("generated_prompts", JSON.stringify(prompts));
    }, [prompts]);

    useEffect(() => {
        localStorage.setItem("saved_story_idea", storyIdea);
    }, [storyIdea]);

    useEffect(() => {
        localStorage.setItem("saved_gen_mode", mode);
    }, [mode]);

    useEffect(() => {
        const checkSub = async () => {
            const { data } = await getUserSubscription();
            if (data && (data.plan_type === "PRO_MONTHLY" || data.plan_type === "PRO_YEARLY")) {
                setIsPro(true);
            }
        };
        checkSub();
    }, []);

    const STYLES: { id: PromptStyle; label: string; icon: any; desc: string }[] = [
        { id: "Portrait", label: "Portrait", icon: Camera, desc: "High quality character portraits" },
        { id: "Dynamic", label: "Dynamic", icon: Zap, desc: "Action poses and intense angles" },
        { id: "Cinematic", label: "Cinematic", icon: Film, desc: "Movie-like lighting and atmosphere" },
        { id: "Pixel", label: "Pixel Art", icon: Grid, desc: "Retro 8-bit game style" },
    ];

    const handleGenerate = async () => {
        setLoading(true);
        setError(null);
        setPrompts([]);

        try {
            const { valid, apiKey, provider, error: keyError } = validateAPIKey();
            if (!valid || !apiKey || !provider) {
                throw new Error(keyError || "API Key not configured");
            }

            let payload: any = {
                apiKey,
                provider,
                style
            };

            if (mode === "character") {
                const targetCharacter = characters[activeCharacterIndex];
                if (!targetCharacter) {
                    throw new Error("No character selected");
                }
                payload.character = targetCharacter;
            } else {
                if (!storyIdea.trim()) {
                    throw new Error("Please describe your story idea");
                }
                payload.storyIdea = storyIdea;
            }

            const response = await fetch("/api/generate-strict-prompts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Generation failed");

            setPrompts(data.prompts);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = async (text: string, index: number) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        } catch (e) {
            console.error("Failed to copy", e);
        }
    };

    // Helper to extract enhancer name for badge
    const getEnhancerBadge = (prompt: string) => {
        if (prompt.includes("Pony")) return "Pony XL";
        if (prompt.includes("Animagine")) return "Animagine";
        if (prompt.includes("DreamShaper")) return "DreamShaper";
        if (prompt.includes("Detailed Eyes")) return "LoRA: Eyes";
        if (prompt.includes("Vibrant Colors")) return "LoRA: Colors";
        if (prompt.includes("BadHand")) return "Emb: BadHand";
        if (prompt.includes("EasyNegative")) return "Emb: Negative";
        return "Base Model";
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Background FX */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
                            <ImageIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">Image Prompt Generator</h1>
                            <p className="text-muted-foreground">Create AI-optimized prompts for Tensor.art and Stable Diffusion</p>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Left: Configuration */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* Mode Switcher */}
                        <div className="glass p-1 rounded-xl border border-border flex">
                            <button
                                onClick={() => setMode("character")}
                                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${mode === "character" ? "bg-pink-500/10 text-pink-300 shadow-sm" : "text-slate-400 hover:text-slate-200"}`}
                            >
                                From Character
                            </button>
                            <button
                                onClick={() => setMode("story")}
                                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${mode === "story" ? "bg-pink-500/10 text-pink-300 shadow-sm" : "text-slate-400 hover:text-slate-200"}`}
                            >
                                From Idea
                            </button>
                        </div>

                        {/* Input Area */}
                        <div className="glass p-5 rounded-2xl border border-border">
                            {mode === "character" ? (
                                <>
                                    <label className="text-sm font-medium text-foreground mb-3 block flex items-center gap-2">
                                        <Settings2 className="w-4 h-4 text-pink-400" />
                                        Select Character
                                    </label>

                                    {characters.length === 0 ? (
                                        <div className="text-sm text-muted-foreground">No characters found.</div>
                                    ) : (
                                        <div className="space-y-2">
                                            {characters.map((c, i) => (
                                                <button
                                                    key={c.id}
                                                    onClick={() => setActiveCharacterIndex(i)}
                                                    className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${activeCharacterIndex === i
                                                        ? "bg-pink-500/10 border-pink-500/30 text-pink-300"
                                                        : "bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50 text-slate-400"
                                                        }`}
                                                >
                                                    <div className="font-medium truncate">{c.basics.name || "Unnamed"}</div>
                                                    <div className="text-xs opacity-60 truncate">{c.basics.gender} • {c.basics.age}</div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    <label className="text-sm font-medium text-foreground mb-3 block flex items-center gap-2">
                                        <Wand2 className="w-4 h-4 text-pink-400" />
                                        Story Idea
                                    </label>
                                    <textarea
                                        value={storyIdea}
                                        onChange={(e) => setStoryIdea(e.target.value)}
                                        placeholder="Describe the story or idea...&#10;Ex: A cyberpunk assassin in a neon city"
                                        className="w-full h-32 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-pink-500/50 outline-none text-sm text-slate-200 resize-none placeholder:text-slate-600"
                                    />
                                    <p className="text-xs text-muted-foreground mt-2">
                                        We will generate visual prompts based on this idea.
                                    </p>
                                </>
                            )}
                        </div>

                        {/* Style Selector */}
                        <div className="glass p-5 rounded-2xl border border-border">
                            <label className="text-sm font-medium text-foreground mb-3 block">Prompt Style</label>
                            <div className="grid grid-cols-2 gap-2">
                                {STYLES.map((s) => (
                                    <button
                                        key={s.id}
                                        onClick={() => setStyle(s.id)}
                                        className={`p-3 rounded-xl border text-left transition-all ${style === s.id
                                            ? "bg-gradient-to-br from-pink-500/20 to-rose-600/20 border-pink-500/40 shadow-inner"
                                            : "bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50"
                                            }`}
                                    >
                                        <s.icon className={`w-5 h-5 mb-2 ${style === s.id ? "text-pink-400" : "text-slate-500"}`} />
                                        <div className={`text-sm font-medium ${style === s.id ? "text-pink-300" : "text-slate-400"}`}>
                                            {s.label}
                                        </div>
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-muted-foreground mt-3 px-1">
                                {STYLES.find(s => s.id === style)?.desc}
                            </p>
                        </div>

                        {/* Generate Button */}
                        <button
                            onClick={handleGenerate}
                            disabled={loading || (mode === "character" && characters.length === 0) || (mode === "story" && !storyIdea.trim())}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold shadow-lg shadow-pink-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Sparkles className="w-5 h-5 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    Generate Prompts
                                </>
                            )}
                        </button>

                        {error && (
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                {error}
                                {error.includes("API Key") && (
                                    <Link href="/api-keys" className="block mt-2 underline">Configure API Keys</Link>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right: Results */}
                    <div className="lg:col-span-2">
                        <div className="glass h-full min-h-[500px] p-6 rounded-2xl border border-border">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-foreground">Generated Prompts {prompts.length > 0 && `(${prompts.length})`}</h2>
                                {prompts.length > 0 && (
                                    <a
                                        href="https://tensor.art"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs flex items-center gap-1.5 text-pink-400 hover:text-pink-300 transition-colors"
                                    >
                                        <ExternalLink className="w-3 h-3" />
                                        Open Tensor.art
                                    </a>
                                )}
                            </div>

                            {prompts.length === 0 && !loading && (
                                <div className="h-64 flex flex-col items-center justify-center text-muted-foreground text-sm opacity-60">
                                    <ImageIcon className="w-12 h-12 mb-3 opacity-20" />
                                    Select a character and style to generate optimized prompts
                                </div>
                            )}

                            {loading && (
                                <div className="space-y-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="h-32 rounded-xl bg-slate-800/50 animate-pulse" />
                                    ))}
                                </div>
                            )}

                            <div className="space-y-4">
                                <AnimatePresence>
                                    {prompts.map((prompt, idx) => {
                                        // LIMIT LOGIC:
                                        // Story Mode: Free users get 3.
                                        // Character Mode: Free users get 2.
                                        const limit = mode === "story" ? 3 : 2;
                                        const isLocked = !isPro && idx >= limit;

                                        return (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className={`group relative p-4 rounded-xl border transition-all overflow-hidden ${isLocked
                                                    ? "bg-slate-900/30 border-slate-800/50 cursor-pointer"
                                                    : "bg-slate-900/50 hover:bg-slate-900/80 border-slate-800 hover:border-pink-500/30"
                                                    }`}
                                                onClick={() => {
                                                    if (isLocked) {
                                                        window.location.href = "/pricing";
                                                    }
                                                }}
                                            >
                                                {isLocked && (
                                                    <div className="absolute inset-0 z-10 backdrop-blur-[6px] bg-slate-950/20 flex flex-col items-center justify-center text-center p-4 transition-all group-hover:bg-slate-950/10">
                                                        <div className="w-10 h-10 rounded-full bg-slate-900/80 border border-slate-700/50 flex items-center justify-center mb-2 shadow-lg group-hover:scale-110 transition-transform">
                                                            <Lock className="w-5 h-5 text-pink-400" />
                                                        </div>
                                                        <p className="text-sm font-semibold text-white drop-shadow-md">
                                                            Unlock 10+ Prompt Variations
                                                        </p>
                                                        <p className="text-xs text-pink-300 font-medium mt-1 flex items-center gap-1">
                                                            Upgrade to Pro <ExternalLink className="w-3 h-3" />
                                                        </p>
                                                    </div>
                                                )}

                                                <div className={`flex items-start justify-between gap-4 mb-2 ${isLocked ? "opacity-20 blur-sm select-none" : ""}`}>
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/20">
                                                        {getEnhancerBadge(prompt)}
                                                    </span>
                                                    {!isLocked && (
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    copyToClipboard(prompt, idx);
                                                                }}
                                                                className={`p-1.5 rounded-lg transition-colors ${copiedIndex === idx
                                                                    ? "bg-green-500/20 text-green-400"
                                                                    : "bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                                                                    }`}
                                                                title="Copy Prompt"
                                                            >
                                                                {copiedIndex === idx ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>

                                                <p className={`text-sm font-mono text-slate-300 break-words leading-relaxed opacity-90 ${isLocked ? "blur-sm opacity-30 select-none" : ""}`}>
                                                    {isLocked ? "This is a premium prompt that is hidden for free users. Upgrade to see more variations." : prompt}
                                                </p>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ImageGeneratorPage() {
    return (
        <Suspense>
            <ImageGeneratorContent />
        </Suspense>
    );
}
