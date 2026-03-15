"use client";

import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Crown, Zap, Shield, Image as ImageIcon, MessageSquare, Headphones, Code } from "lucide-react";
import Link from "next/link";
import { ResponsiveNavbar } from "@/components/responsive-navbar";
import { ParticleBackground } from "@/components/ultimate-pack/ParticleBackground";

export default function UltimatePackDetails() {
    const sections = [
        {
            title: "8000+ High-Resolution 8K Images",
            description: "Access an incredibly massive, curated library of high-quality character and environment images. Designed with precision, ensuring consistent faces, dynamic poses, and unparalleled detail.",
            icon: <ImageIcon className="w-8 h-8 text-amber-500" />
        },
        {
            title: "The Everything Bundle",
            description: "Why choose when you can have it all? Every single pack, prompt set, and asset collection we've ever released is bundled natively into this definitive collection.",
            icon: <Crown className="w-8 h-8 text-amber-500" />
        },
        {
            title: "Private VIP Discord",
            description: "Gain exclusive access to our private Discord community. Network with top creators, share strategies, get immediate assistance, and join private mastermind discussions.",
            icon: <MessageSquare className="w-8 h-8 text-amber-500" />
        },
        {
            title: "Priority Technical Support",
            description: "Skip the line. You receive dedicated priority support for any technical questions, prompt engineering help, or bot configuration needs.",
            icon: <Shield className="w-8 h-8 text-amber-500" />
        },
        {
            title: "Custom Image Generation",
            description: "Not finding exactly what you need? We provide support and advanced workflows for generating your own custom images using our proven internal frameworks.",
            icon: <Zap className="w-8 h-8 text-amber-500" />
        },
        {
            title: "Advanced Bot Generator",
            description: "Receive powerful frameworks and generation patterns to create deeply immersive, context-aware bots that never break character.",
            icon: <Code className="w-8 h-8 text-amber-500" />
        },
        {
            title: "Cinematic Voice Extension",
            description: "Unlock cinematic voice capabilities for Janitor AI. Provide your characters with emotion-rich, highly realistic voice rendering tools.",
            icon: <Headphones className="w-8 h-8 text-amber-500" />
        }
    ];

    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-amber-500/30 overflow-hidden relative">
            <ResponsiveNavbar />
            
            <ParticleBackground />

            <div className="absolute top-[20%] right-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="absolute bottom-[10%] left-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none z-0" />

            <div className="relative z-10 container max-w-6xl mx-auto px-4 pt-32 pb-24">
                <Link href="/ultimate-pack" className="inline-flex items-center gap-2 text-neutral-400 hover:text-amber-400 transition-colors mb-8 font-medium">
                    <ArrowLeft className="w-4 h-4" /> Back to Overview
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-amber-500 to-orange-400">
                        What's Inside The Pack?
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-400 max-w-3xl">
                        A detailed breakdown of everything included in the Ultimate collection Pack. Valued at over $500, but available to you for a fraction of the cost.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {sections.map((section, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="bg-white/5 backdrop-blur-3xl border border-white/10 p-8 rounded-[2rem] hover:border-amber-500/30 hover:bg-white/10 transition-all duration-300 group shadow-lg shadow-black/50"
                        >
                            <div className="w-16 h-16 bg-[#0a0a0a] border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(245,158,11,0.1)] group-hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]">
                                {section.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors">{section.title}</h3>
                            <p className="text-neutral-400 leading-relaxed text-sm md:text-base">
                                {section.description}
                            </p>
                            
                            <div className="mt-8 flex items-center gap-2 text-amber-500/80 text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                <CheckCircle2 className="w-4 h-4" /> Included
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-24 p-1 rounded-[2.5rem] bg-gradient-to-r from-amber-500 via-orange-600 to-purple-600 shadow-[0_0_50px_rgba(245,158,11,0.3)]"
                >
                    <div className="bg-[#050505] rounded-[2.4rem] p-10 md:p-16 text-center">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Ready to upgrade your creations?</h2>
                        <p className="text-lg text-neutral-400 max-w-2xl mx-auto mb-10">
                            Stop limiting yourself to standard tools. Get the ultimate creator bundle today and step into the future of AI character building.
                        </p>
                        <Link href="/ultimate-pack">
                            <button className="py-4 px-10 bg-amber-500 hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_rgba(245,158,11,0.6)] transform hover:-translate-y-1">
                                Secure Your Access Now - $99
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
