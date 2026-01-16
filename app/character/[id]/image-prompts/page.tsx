
"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, AlertCircle, Loader2, Image as ImageIcon, Lock } from "lucide-react";
import Link from "next/link";
import { useCharacter } from "@/context/CharacterContext";
import { ImagePrompt } from "@/lib/generation/image-prompts";
import { validateAPIKey } from "@/lib/generation/service";
import { PromptCard } from "@/components/prompt-card";
import { getUserSubscription } from "@/lib/subscriptions/service";

export default function ImagePromptsPage() {
    // 1. Hooks
    const params = useParams();
    const router = useRouter();
    const { characters } = useCharacter();

    // 2. State
    const [prompts, setPrompts] = useState<ImagePrompt[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedPromptIndex, setSelectedPromptIndex] = useState(0);
    const [isPro, setIsPro] = useState(false);
    const [checkingSubscription, setCheckingSubscription] = useState(true);

    // 3. Derived
    const character = characters.find((c) => c.id === params?.id);

    // 4. Effects
    // Check subscription
    useEffect(() => {
        async function checkSub() {
            try {
                const { data } = await getUserSubscription();
                setIsPro(data?.plan_type === "PRO_MONTHLY" || data?.plan_type === "PRO_YEARLY");
            } catch (e) {
                console.error("Failed to check subscription", e);
            } finally {
                setCheckingSubscription(false);
            }
        }
        checkSub();
    }, []);

    // 5. Handlers
    const handleGenerate = async () => {
        if (!character) return;

        // API Key Check
        const keyCheck = validateAPIKey();
        if (!keyCheck.valid) {
            router.push("/api-keys");
            return;
        }

        setLoading(true);
        setError(null);
        setPrompts(null); // Reset previous

        try {
            const response = await fetch("/api/generate-image-prompts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    character,
                    apiKey: keyCheck.apiKey,
                    provider: keyCheck.provider
                }),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || "Failed to generate prompts");
            }

            const data = await response.json();
            setPrompts(data.prompts);
            // Auto selection remains 0
        } catch (err: any) {
            setError(err.message || "Something went wrong generating prompts");
        } finally {
            setLoading(false);
        }
    };

    // 6. Loading/Error States
    if (!character) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <p className="text-muted-foreground">Character not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Navbar / Header */}
            <div className="border-b border-border bg-background/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href={`/character/${character.id}`}
                            className="p-2 rounded-xl hover:bg-white/5 text-muted-foreground hover:text-foreground transition-all"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold flex items-center gap-2">
                                <ImageIcon className="w-5 h-5 text-violet-500" />
                                Image Prompts
                            </h1>
                            <p className="text-xs text-muted-foreground">
                                Generating for <span className="text-violet-400 font-medium">{character.basics.name}</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${isPro ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-300' : 'bg-white/5 border-white/10 text-muted-foreground'}`}>
                            {isPro ? "PRO UNLOCKED" : "FREE PLAN"}
                        </span>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {!prompts && !loading && !error && (
                    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center max-w-lg mx-auto">
                        <div className="w-24 h-24 rounded-3xl bg-violet-500/10 flex items-center justify-center mb-8 relative">
                            <Sparkles className="w-12 h-12 text-violet-400 animate-pulse" />
                            <div className="absolute inset-0 bg-violet-500/20 blur-xl rounded-full" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Visualize {character.basics.name}</h2>
                        <p className="text-muted-foreground mb-8 text-lg">
                            Generate 10 professional-grade image prompts tailored to your character's personality, appearance, and story.
                            <br /><span className="text-sm opacity-70 mt-2 block">(Compatible with Stable Diffusion, Midjourney, etc.)</span>
                        </p>
                        <button
                            onClick={handleGenerate}
                            className="group relative px-8 py-4 bg-violet-600 hover:bg-violet-500 rounded-2xl font-semibold text-lg transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(139,92,246,0.5)]"
                        >
                            <span className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5" /> Generate Prompts
                            </span>
                        </button>
                    </div>
                )}

                {loading && (
                    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
                        <Loader2 className="w-12 h-12 text-violet-500 animate-spin mb-6" />
                        <h3 className="text-xl font-medium mb-2">Dreaming up visuals...</h3>
                        <p className="text-muted-foreground">Crafting detailed prompts for {character.basics.name}</p>
                    </div>
                )}

                {error && (
                    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center max-w-md mx-auto">
                        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6 text-red-400">
                            <AlertCircle className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-medium mb-2 text-red-400">Generation Failed</h3>
                        <p className="text-muted-foreground mb-6">{error}</p>
                        <button
                            onClick={handleGenerate}
                            className="px-6 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {prompts && (
                    <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
                        {/* Left Sidebar: Categories */}
                        <div className="w-full lg:w-80 flex-shrink-0 space-y-2 lg:sticky lg:top-24 h-fit">
                            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 px-2">Prompt Styles</h3>
                            {prompts.map((prompt, idx) => {
                                const isLocked = !isPro && idx >= 3;
                                const isSelected = selectedPromptIndex === idx;

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedPromptIndex(idx)}
                                        className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center justify-between group ${isSelected
                                            ? "bg-violet-500/10 border-violet-500/50 text-violet-200"
                                            : "bg-white/5 border-transparent hover:bg-white/10 text-muted-foreground hover:text-foreground"
                                            }`}
                                    >
                                        <span className="font-medium truncate">{prompt.category}</span>
                                        {isLocked && <Lock className="w-3.5 h-3.5 opacity-50" />}
                                    </button>
                                );
                            })}

                            <button
                                onClick={handleGenerate}
                                className="w-full mt-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2"
                            >
                                <Loader2 className="w-3 h-3 opacity-0 group-hover:opacity-100" /> Regenerate All
                            </button>
                        </div>

                        {/* Right Content: Selected Card */}
                        <div className="flex-1">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedPromptIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="h-full"
                                >
                                    <PromptCard
                                        prompt={prompts[selectedPromptIndex]}
                                        index={selectedPromptIndex}
                                        isLocked={!isPro && selectedPromptIndex >= 3}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
