"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Shield, Sparkles, Crown, Image as ImageIcon, MessageSquare, Headphones, FileCode2 } from "lucide-react";
import { ParticleBackground } from "@/components/ultimate-pack/ParticleBackground";
import { PremiumPaymentModal } from "@/components/ultimate-pack/PremiumPaymentModal";
import Link from "next/link";
import { ResponsiveNavbar } from "@/components/responsive-navbar";

function UltimatePackContent() {
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<"monthly" | "lifetime">("monthly");
    const price = selectedPlan === "monthly" ? 69 : 550;
    const period = selectedPlan === "monthly" ? "month" : "forever";

    const features = [
        { icon: <ImageIcon className="w-5 h-5 text-amber-500" />, text: "Full image collection (8000+ high-resolution 8K images)" },
        { icon: <Sparkles className="w-5 h-5 text-amber-500" />, text: "All assets from the other packs combined into one complete bundle" },
        { icon: <MessageSquare className="w-5 h-5 text-amber-500" />, text: "Private Discord channel access" },
        { icon: <Shield className="w-5 h-5 text-amber-500" />, text: "Personal priority support for any bots required" },
        { icon: <FileCode2 className="w-5 h-5 text-amber-500" />, text: "Custom image generation support" },
        { icon: <Crown className="w-5 h-5 text-amber-500" />, text: "AI bot generation tools included" },
        { icon: <Headphones className="w-5 h-5 text-amber-500" />, text: "Janitor AI voice-enabled extension included" },
        { icon: <CheckCircle2 className="w-5 h-5 text-amber-500" />, text: "Lifetime access to all resources in the pack" },
    ];

    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-amber-500/30 overflow-hidden relative">
            <ResponsiveNavbar />
            
            {/* 3D Particle Background */}
            <ParticleBackground />

            {/* Ambient Gradients for Depth */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none z-0" />

            {/* Main Content */}
            <div className="relative z-10 container max-w-7xl mx-auto px-4 pt-32 pb-20 flex flex-col items-center justify-center min-h-screen">
                
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-12"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold uppercase tracking-widest text-xs mb-6 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                        <Crown className="w-4 h-4" /> The Definitive Collection
                    </span>
                    <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/40 drop-shadow-lg">
                        Ultimate collection Pack
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto">
                        Elevate your creative potential with the most comprehensive bundle ever crafted for AI bot developers and creators.
                    </p>
                </motion.div>

                {/* Main Premium Card */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="w-full max-w-3xl relative"
                >
                    {/* Glowing outer border wrapper */}
                    <div className="absolute -inset-[3px] bg-gradient-to-br from-amber-500/50 via-purple-500/50 to-orange-500/50 rounded-[2.5rem] opacity-70 blur-xl animate-pulse" />
                    <div className="absolute -inset-[1px] bg-gradient-to-br from-amber-400 via-white/10 to-orange-600 rounded-[2.5rem] opacity-50" />

                    <div className="relative bg-[#0a0a0a]/90 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 p-8 md:p-12 overflow-hidden shadow-2xl">
                        {/* Decorative internal elements */}
                        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                            <Sparkles className="w-32 h-32 text-amber-500" />
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
                            <div className="text-center w-full md:w-auto">
                                <h2 className="text-3xl md:text-5xl font-black text-white mb-2 text-center md:text-left">Ultimate Edition</h2>
                                <p className="text-amber-400 font-medium tracking-wide text-center md:text-left">Everything you need, in one place.</p>
                            </div>
                        </div>

                        {/* Centered Big Selection UI */}
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-12">
                            {/* Monthly Option */}
                            <button
                                onClick={() => setSelectedPlan("monthly")}
                                className={`relative w-full md:w-64 p-6 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-2 ${
                                    selectedPlan === "monthly"
                                        ? "bg-white/10 border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.3)] scale-105 z-10"
                                        : "bg-black/40 border-white/10 hover:border-white/30 text-neutral-400 hover:bg-white/5"
                                }`}
                            >
                                <span className={`text-sm font-bold uppercase tracking-wider ${selectedPlan === "monthly" ? "text-amber-400" : ""}`}>Monthly Subscription</span>
                                <div className="flex items-baseline gap-1">
                                    <span className={`text-4xl font-black ${selectedPlan === "monthly" ? "text-white" : ""}`}>$69</span>
                                    <span className="text-sm font-medium">/month</span>
                                </div>
                            </button>

                            {/* Lifetime Option */}
                            <button
                                onClick={() => setSelectedPlan("lifetime")}
                                className={`relative w-full md:w-64 p-6 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-2 ${
                                    selectedPlan === "lifetime"
                                        ? "bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-amber-400 shadow-[0_0_40px_rgba(245,158,11,0.4)] scale-105 z-10"
                                        : "bg-black/40 border-white/10 hover:border-amber-500/30 text-neutral-400 hover:bg-white/5"
                                }`}
                            >
                                {selectedPlan === "lifetime" && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg border border-pink-400/30 whitespace-nowrap">
                                        SAVE $278
                                    </div>
                                )}
                                <span className={`text-sm font-bold uppercase tracking-wider ${selectedPlan === "lifetime" ? "text-amber-400" : ""}`}>One-Time Payment</span>
                                <div className="flex items-baseline gap-1">
                                    <span className={`text-4xl font-black ${selectedPlan === "lifetime" ? "text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" : ""}`}>$550</span>
                                    <span className="text-sm font-medium">/forever</span>
                                </div>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-10">
                            {features.map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                                    className="flex items-start gap-3 group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 group-hover:border-amber-500/30 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
                                        {feature.icon}
                                    </div>
                                    <p className="text-sm md:text-base text-neutral-300 leading-tight mt-2">{feature.text}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 mt-8 pt-8 border-t border-white/10">
                            <button
                                onClick={() => setIsPaymentOpen(true)}
                                className="flex-1 py-4 px-8 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-black text-lg rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 shadow-[0_10px_30px_rgba(245,158,11,0.4)]"
                            >
                                Get the Pack <ArrowRight className="w-6 h-6" />
                            </button>
                            
                            <Link href="/ultimate-pack/details" className="flex-1">
                                <button className="w-full py-4 px-8 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-3 transition-all backdrop-blur-md hover:-translate-y-1">
                                    What's inside this pack?
                                </button>
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* Footer hints */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="mt-12 text-center text-neutral-500 text-sm flex items-center justify-center gap-2"
                >
                    <Shield className="w-4 h-4" /> Secure checkout powered by industry leaders.
                </motion.div>
            </div>

            {/* Payment Modal */}
            {isPaymentOpen && (
                <PremiumPaymentModal isOpen={isPaymentOpen} onClose={() => setIsPaymentOpen(false)} plan={selectedPlan} />
            )}
        </main>
    );
}

export default function UltimatePackPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#050505] flex items-center justify-center text-amber-500">Loading...</div>}>
            <UltimatePackContent />
        </Suspense>
    );
}
