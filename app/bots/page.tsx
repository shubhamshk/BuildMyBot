"use client";

import { motion } from "framer-motion";
import { ResponsiveNavbar } from "@/components/responsive-navbar";
import { useState, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { Sparkles, ShoppingCart, Star, Crown, Lock, ArrowRight, Zap } from "lucide-react";
import { EmailBeforePaymentModal } from "@/components/modals/EmailBeforePaymentModal";
import Link from "next/link";

interface BotItem {
    id: string;
    title: string;
    subtitle: string;
    price: number;
    features: string[];
    image?: string; // Placeholder for now
    tag?: string;
    limited?: boolean;
}

const bots: BotItem[] = [
    {
        id: "aria",
        title: "Aria",
        subtitle: "The Rogue Cyberpunk Hacker",
        price: 9,
        features: ["Tech-savvy personality", "Hacking scenarios", "Cyber-slang database", "Futuristic lore"],
        tag: "Trending"
    },
    {
        id: "elara",
        title: "Elara",
        subtitle: "High Elf Diplomat",
        price: 9,
        features: ["Formal speech patterns", "Fantasy politics knowledge", "Magical theory", "Romanceable"],
    },
    {
        id: "kael",
        title: "Kael (Phase 2)",
        subtitle: "The Mafia Boss - Post Betrayal",
        price: 9,
        features: ["Darker personality", "Revenge arc scenarios", "Deep memory of Part 1", "Ruthless decision making"],
        tag: "Sequel"
    },
    {
        id: "professor",
        title: "Professor Thorne",
        subtitle: "Dark Academia Mystery",
        price: 9,
        features: ["Intellectual debates", "Hidden secrets", "Library setting", "Slow burn romance"],
    },
    {
        id: "seraphina",
        title: "Seraphina",
        subtitle: "Fallen Angel",
        price: 15,
        features: ["Divine knowledge", "Tragic backstory", "Wing corruption lore", "Power progression"],
        limited: true,
        tag: "Limited Edition"
    },
    {
        id: "project-x",
        title: "Project X",
        subtitle: "Unreleased Prototype",
        price: 15,
        features: ["Unstable personality", "Glitch effects", "Hidden true purpose", "Developer commentary"],
        limited: true,
        tag: "Rare"
    }
];

export default function BotsPage() {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBot, setSelectedBot] = useState<any>(null); // Using any to adapt to modal

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 20);
    });

    const handleBuy = (bot: BotItem) => {
        const modalItem = {
            id: bot.id,
            title: bot.title,
            price: bot.price,
            subtitle: bot.subtitle, // approximate mapping
            features: bot.features,
            goal: `Unlock ${bot.title} character card and assets`,
        };
        setSelectedBot(modalItem);
        setModalOpen(true);
    };

    const handleBuyCollection = () => {
        const collectionItem = {
            id: "obsidian-collection",
            title: "The Obsidian Collection",
            price: 79,
            subtitle: "10 Premium Bots + Full Image Packs",
            features: ["10 Unreleased Bots", "500+ HD Images", "Commercial License", "Priority Support"],
            goal: "Unlock the ultimate bot collection",
        };
        setSelectedBot(collectionItem);
        setModalOpen(true);
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <ResponsiveNavbar scrolled={scrolled} />

            {/* Header */}
            <section className="pt-32 pb-16 px-6 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-violet-500/10 blur-[120px] -z-10" />

                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-bold uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                    >
                        <ShoppingCart className="w-3 h-3" />
                        Marketplace
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight"
                    >
                        Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Character Bots</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-neutral-400 max-w-2xl mx-auto"
                    >
                        Individually curated characters for specific roleplay scenarios.
                        <br />
                        <span className="text-white">High fidelity. Deep memory. Ready to chat.</span>
                    </motion.p>
                </div>
            </section>

            {/* Bots Grid */}
            <section className="pb-32 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {bots.map((bot, i) => (
                        <motion.div
                            key={bot.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-violet-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl -z-10 blur-xl" />

                            <div className="h-full bg-[#0a0a0a] border border-white/10 group-hover:border-violet-500/30 rounded-3xl p-6 flex flex-col transition-all duration-300 group-hover:-translate-y-2">
                                {/* Image Placeholder */}
                                <div className="aspect-[4/5] w-full bg-neutral-900 rounded-2xl mb-6 overflow-hidden relative">
                                    {/* Abstract Avatar Placeholder */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-900">
                                        <span className="text-6xl">🤖</span>
                                    </div>

                                    {bot.limited && (
                                        <div className="absolute top-3 right-3 bg-red-500/90 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm border border-red-400 shadow-lg">
                                            LIMITED
                                        </div>
                                    )}
                                    {bot.tag && !bot.limited && (
                                        <div className="absolute top-3 right-3 bg-violet-500/90 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm border border-violet-400 shadow-lg">
                                            {bot.tag}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-violet-400 transition-colors">{bot.title}</h3>
                                    <p className="text-neutral-500 text-sm font-medium">{bot.subtitle}</p>
                                </div>

                                <div className="space-y-2 mb-6 flex-grow">
                                    {bot.features.map((f, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-sm text-neutral-400">
                                            <div className="w-1 h-1 rounded-full bg-violet-500" />
                                            {f}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                    <span className="text-xl font-bold text-white">${bot.price}</span>
                                    <button
                                        onClick={() => handleBuy(bot)}
                                        className="px-4 py-2 rounded-lg bg-white text-black text-sm font-bold hover:bg-neutral-200 transition-colors flex items-center gap-2"
                                    >
                                        Buy Now <ArrowRight className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Exclusive Collection Section */}
            <section className="pb-32 px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative rounded-[2.5rem] overflow-hidden border border-amber-500/20 bg-[#050505]"
                    >
                        {/* Background Luxury Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-transparent to-black pointer-events-none" />

                        <div className="flex flex-col md:flex-row relative z-10">
                            {/* Left: Content */}
                            <div className="p-10 md:p-16 flex-1 flex flex-col justify-center">
                                <div className="inline-flex items-center gap-2 mb-6">
                                    <span className="p-1.5 rounded-md bg-amber-500 text-black">
                                        <Crown className="w-4 h-4" />
                                    </span>
                                    <span className="text-amber-500 font-bold tracking-wider text-xs uppercase">The Obsidian Collection</span>
                                </div>

                                <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-[1.1]">
                                    10 Premium Bots.
                                    <br />
                                    <span className="text-neutral-500">One Price.</span>
                                </h2>

                                <p className="text-lg text-neutral-400 mb-8 max-w-md">
                                    Get our entire top-tier lineup plus exclusive image packs (50+ images per bot) in one massive bundle.
                                </p>

                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-3 text-neutral-300">
                                        <Lock className="w-5 h-5 text-amber-500" />
                                        <span>Includes Full Commercial License</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-neutral-300">
                                        <Zap className="w-5 h-5 text-amber-500" />
                                        <span>Priority Creator Support</span>
                                    </div>
                                </div>

                                <div className="mt-10 flex items-center gap-6">
                                    <button
                                        onClick={handleBuyCollection}
                                        className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-amber-900/20"
                                    >
                                        Unlock for $79
                                    </button>
                                    <p className="text-sm text-neutral-500">Instant Access</p>
                                </div>
                            </div>

                            {/* Right: Visual (Abstract or Pattern) */}
                            <div className="w-full md:w-1/3 bg-gradient-to-b from-neutral-900 to-black border-l border-white/5 relative min-h-[300px]">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-32 h-32 rounded-full border-2 border-dashed border-amber-500/20 animate-spin-slow" />
                                    <div className="absolute w-24 h-24 rounded-full border border-amber-500/40" />
                                    <Crown className="absolute w-12 h-12 text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {modalOpen && selectedBot && (
                <EmailBeforePaymentModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    item={selectedBot}
                />
            )}
        </div>
    );
}
