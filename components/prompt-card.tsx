
import { useState } from "react";
import { Copy, Check, ExternalLink, Lock } from "lucide-react";
import { ImagePrompt } from "@/lib/generation/image-prompts";
import { motion } from "framer-motion";

interface PromptCardProps {
    prompt: ImagePrompt;
    index: number;
    isLocked?: boolean;
}

export function PromptCard({ prompt, index, isLocked = false }: PromptCardProps) {
    const [copiedPositive, setCopiedPositive] = useState(false);
    const [copiedNegative, setCopiedNegative] = useState(false);

    const handleCopy = (text: string, isPositive: boolean) => {
        navigator.clipboard.writeText(text);
        if (isPositive) {
            setCopiedPositive(true);
            setTimeout(() => setCopiedPositive(false), 2000);
        } else {
            setCopiedNegative(true);
            setTimeout(() => setCopiedNegative(false), 2000);
        }
    };

    if (isLocked) {
        return (
            <div className="relative rounded-2xl glass border border-border overflow-hidden h-full min-h-[400px] flex items-center justify-center">
                <div className="absolute inset-0 bg-background/50 backdrop-blur-md z-10" />
                <div className="relative z-20 text-center p-6">
                    <div className="w-16 h-16 rounded-full bg-violet-500/20 flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-8 h-8 text-violet-400" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">Premium Prompt Style</h3>
                    <p className="text-muted-foreground mb-6 max-w-xs mx-auto">
                        Upgrade to Pro to unlock this {prompt.category} prompt and 6 other premium styles.
                    </p>
                    <button className="px-6 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-medium transition-colors">
                        Upgrade to Pro
                    </button>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl glass border border-border overflow-hidden h-full"
        >
            <div className="p-5 border-b border-white/5 bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-violet-500/20 text-violet-300 font-bold text-sm">
                        #{index + 1}
                    </span>
                    <div>
                        <h3 className="font-bold text-lg text-foreground leading-none mb-1">{prompt.category}</h3>
                        <span className="text-xs text-muted-foreground">Optimized for AI Generation</span>
                    </div>
                </div>
                <div className="text-xs px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {prompt.modelRecommendation || "Stable Diffusion XL"}
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* Positive Prompt */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                            Positive Prompt
                        </label>
                        <button
                            onClick={() => handleCopy(prompt.positive, true)}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-muted-foreground hover:text-foreground transition-all"
                        >
                            {copiedPositive ? (
                                <>
                                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                                    <span className="text-emerald-500">Copied</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>Copy</span>
                                </>
                            )}
                        </button>
                    </div>
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-sm text-gray-300 leading-relaxed font-mono h-32 overflow-y-auto custom-scrollbar">
                        {prompt.positive}
                    </div>
                </div>

                {/* Negative Prompt */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                            Negative Prompt
                        </label>
                        <button
                            onClick={() => handleCopy(prompt.negative, false)}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-muted-foreground hover:text-foreground transition-all"
                        >
                            {copiedNegative ? (
                                <>
                                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                                    <span className="text-emerald-500">Copied</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>Copy</span>
                                </>
                            )}
                        </button>
                    </div>
                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 text-sm text-gray-400 leading-relaxed font-mono h-24 overflow-y-auto custom-scrollbar">
                        {prompt.negative}
                    </div>
                </div>

                {/* External Links */}
                <div className="pt-2 border-t border-white/5">
                    <p className="text-xs text-muted-foreground mb-3">One-click try with:</p>
                    <div className="flex flex-wrap gap-3">
                        <a
                            href="https://tensor.art"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-medium text-foreground transition-colors"
                        >
                            Tensor.art <ExternalLink className="w-3 h-3 opacity-50" />
                        </a>
                        <a
                            href="https://stablediffusionweb.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-medium text-foreground transition-colors"
                        >
                            Stable Diffusion <ExternalLink className="w-3 h-3 opacity-50" />
                        </a>
                        <a
                            href="https://www.midjourney.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-medium text-foreground transition-colors"
                        >
                            Midjourney <ExternalLink className="w-3 h-3 opacity-50" />
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
