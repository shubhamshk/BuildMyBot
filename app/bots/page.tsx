"use client";

import { motion } from "framer-motion";
import { ResponsiveNavbar } from "@/components/responsive-navbar";
import { useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { Sparkles, Crown, ArrowLeft, Zap, Bot, Star, ShieldCheck } from "lucide-react";
import { EmailBeforePaymentModal } from "@/components/modals/EmailBeforePaymentModal";
import Link from "next/link";

export default function BotsPage() {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPack, setSelectedPack] = useState<any>(null);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 20);
    });

    const handleBuy = (pack: any) => {
        setSelectedPack({
            id: pack.id,
            title: pack.title,
            price: pack.price,
            subtitle: pack.subtitle,
            features: pack.features,
            goal: pack.goal,
        });
        setModalOpen(true);
    };

    const packs = [
        {
            id: "janitor-ai-special",
            title: "Janitor AI Special Version",
            subtitle: "The Ultimate 10-Bot Collection",
            price: 79,
            features: [
                "10 Exclusive Janitor AI Bots",
                "Enhanced 8K Resolution Images",
                "Fully Updated Scenarios",
                "Advanced Personality Sections",
                "Ready for Immediate Use"
            ],
            goal: "Unlock the Janitor AI Special Edition Pack",
            icon: Crown,
            color: "from-amber-400 to-orange-600",
            bgGlow: "bg-amber-500/10",
            borderColor: "border-amber-500/20",
            hoverBorder: "group-hover:border-amber-500/50",
            iconColor: "text-amber-500",
            iconColorFill: "fill-amber-500/20",
            badge: "Most Popular"
        },
        {
            id: "custom-bot-request",
            title: "Custom Bot Creator Pack",
            subtitle: "Ask for Any 5 Custom Bots",
            price: 59,
            features: [
                "Request Any 5 Custom Bots",
                "Tailored Personalities & Lore",
                "Custom Scenarios Built for You",
                "Exclusive Ownership & Prompt",
                "Priority Delivery Time"
            ],
            goal: "Purchase the 5 Custom Bots Request Pack",
            icon: Sparkles,
            color: "from-violet-400 to-fuchsia-600",
            bgGlow: "bg-violet-500/10",
            borderColor: "border-violet-500/20",
            hoverBorder: "group-hover:border-violet-500/50",
            iconColor: "text-violet-400",
            iconColorFill: "fill-violet-400/20",
            badge: "Highly Requested"
        }
    ];

    return (
        <div className="min-h-screen bg-[#030303] text-foreground font-sans selection:bg-violet-500/30">
            <ResponsiveNavbar scrolled={scrolled} />

            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900/30 via-[#030303] to-[#030303]">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-violet-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-amber-600/10 blur-[120px] rounded-full" />
                {/* Optional noise overlay for texture */}
                <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
            </div>

            <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto relative z-10">
                {/* Back to Home Button */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 flex justify-start"
                >
                    <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-md group shadow-lg shadow-black/50">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-semibold tracking-wide">Return to Homepage</span>
                    </Link>
                </motion.div>

                {/* Header Section */}
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-xs font-bold uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                    >
                        <Bot className="w-3.5 h-3.5" />
                        Exclusive Bot Offers
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]"
                    >
                        Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-400">Collections</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-neutral-400 leading-relaxed font-medium"
                    >
                        Elevate your experience with our carefully curated packs. Choose the ultimate Janitor AI bundle or bring your own ideas to life with custom bots.
                    </motion.p>
                </div>

                {/* Bundle Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                    {packs.map((pack, idx) => (
                        <motion.div
                            key={pack.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 + (idx * 0.1) }}
                            className={`group relative rounded-[2rem] border ${pack.borderColor} ${pack.hoverBorder} bg-[#0a0a0a]/80 backdrop-blur-xl p-8 lg:p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl shadow-black/80 overflow-hidden flex flex-col h-full`}
                        >
                            {/* Card Hover Glow Effect */}
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b ${pack.bgGlow} to-transparent pointer-events-none`} />
                            
                            {/* Top Badge */}
                            {pack.badge && (
                                <div className="absolute top-0 right-8 transform -translate-y-0 relative z-20">
                                    <div className={`px-4 py-1.5 rounded-b-lg bg-gradient-to-r ${pack.color} text-white text-[11px] font-bold uppercase tracking-widest shadow-lg absolute right-0 -top-8 lg:-top-10`}>
                                        {pack.badge}
                                    </div>
                                </div>
                            )}

                            <div className="relative z-10 flex-grow">
                                {/* Icon and Title */}
                                <div className="flex items-center gap-4 mb-8">
                                    <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${pack.color} bg-opacity-20 backdrop-blur-md shadow-inner border border-white/10`}>
                                        <pack.icon className="w-8 h-8 text-white drop-shadow-md" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:-translate-y-0.5 transition-transform">{pack.title}</h3>
                                        <p className="text-sm font-medium text-neutral-500">{pack.subtitle}</p>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="mb-8 pb-8 border-b border-white/5">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-black text-white tracking-tight">${pack.price}</span>
                                        <span className="text-neutral-500 font-medium">USD / one-time</span>
                                    </div>
                                </div>

                                {/* Features List */}
                                <ul className="space-y-4 mb-10">
                                    {pack.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="mt-0.5">
                                                <Star className={`w-5 h-5 ${pack.iconColor} ${pack.iconColorFill}`} />
                                            </div>
                                            <span className="text-neutral-300 font-medium leading-relaxed">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA Action */}
                            <div className="relative z-10 mt-auto">
                                <button
                                    onClick={() => handleBuy(pack)}
                                    className={`w-full py-4.5 rounded-xl font-bold text-lg text-white bg-gradient-to-r ${pack.color} hover:opacity-90 transition-all hover:scale-[1.02] shadow-[0_4px_20px_rgba(0,0,0,0.3)] active:scale-[0.98] flex items-center justify-center gap-2`}
                                    style={{ padding: "1.125rem 1rem" }}
                                >
                                    <Zap className="w-5 h-5" />
                                    Buy This Pack
                                </button>
                                <p className="text-center text-xs text-neutral-500 mt-5 font-medium flex items-center justify-center gap-1.5 tracking-wide">
                                    <ShieldCheck className="w-3.5 h-3.5" /> 100% Secure Checkout Delivery
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>

            {/* Email Modal Component Integration */}
            {modalOpen && selectedPack && (
                <EmailBeforePaymentModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    item={selectedPack}
                />
            )}
        </div>
    );
}
