"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { specialPacks, SpecialPack } from "@/lib/packs/data";
import { Zap, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { EmailBeforePaymentModal } from "@/components/modals/EmailBeforePaymentModal";

export function SpecialServicePacks() {
    const [selectedPack, setSelectedPack] = useState<SpecialPack | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleBuy = (pack: SpecialPack) => {
        setSelectedPack(pack);
        setModalOpen(true);
    };

    return (
        <section className="py-32 px-6 relative z-10 overflow-hidden">
            {/* Background Gradients/Glows to distinguish section */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] opacity-50" />
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] opacity-50" />
            </div>

            <div className="container max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md shadow-lg shadow-blue-500/5">
                            <Zap className="w-4 h-4 text-blue-400 fill-blue-400/20" />
                            <span className="text-sm font-bold text-blue-200 uppercase tracking-widest text-[11px]">For Serious Creators</span>
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="relative mb-8"
                    >
                        <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
                            Special Creator <br className="hidden md:block" />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400">
                                Service Packs
                            </span>
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Professional guidance, premium bots, and hands-on creator support — <br className="hidden md:block" />
                        built for those who want to build a serious presence.
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {specialPacks.map((pack, index) => (
                        <SpecialPackCard key={pack.id} pack={pack} index={index} onBuy={() => handleBuy(pack)} />
                    ))}
                </div>
            </div>

            <EmailBeforePaymentModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                item={selectedPack}
            />
        </section>
    );
}

function SpecialPackCard({ pack, index, onBuy }: { pack: SpecialPack; index: number; onBuy: () => void }) {
    const isPremium = pack.price >= 60; // Highlight the premium pack

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            className="h-full"
        >
            <motion.div
                className={`
                    group relative h-full flex flex-col
                    bg-[#0f0f0f] backdrop-blur-2xl
                    border rounded-[2rem] overflow-hidden
                    transition-all duration-500
                    ${isPremium
                        ? 'border-blue-500/40 shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)]'
                        : 'border-white/5 hover:border-white/10'
                    }
                `}
                whileHover={{
                    y: -12,
                    transition: { duration: 0.4, ease: "backOut" }
                }}
            >
                {/* Glow Effects */}
                <div className={`absolute inset-0 bg-gradient-to-br ${isPremium ? 'from-blue-500/10 via-transparent to-violet-500/10' : 'from-white/5 via-transparent to-white/5'} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Subtle noise texture simulation or clear glass */}
                <div className="absolute inset-0 bg-white/[0.02] mix-blend-overlay pointer-events-none" />

                {isPremium && (
                    <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
                )}

                <div className="p-8 flex flex-col h-full relative z-10">
                    {isPremium && (
                        <div className="mb-6 inline-flex self-start">
                            <span className="bg-gradient-to-r from-blue-600 to-violet-600 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 tracking-wider">
                                <Sparkles className="w-3 h-3 text-blue-200" /> Best Value
                            </span>
                        </div>
                    )}

                    {/* Title & Price */}
                    <div className="mb-8">
                        <div className="flex items-baseline gap-2 mb-3">
                            <span className="text-4xl font-extrabold text-white tracking-tight">${pack.price}</span>
                            <span className="text-neutral-500 text-sm font-medium">One-Time</span>
                        </div>
                        <h3 className={`text-2xl font-bold mb-3 leading-tight ${isPremium ? 'text-white' : 'text-neutral-100'}`}>
                            {pack.title}
                        </h3>
                        <p className="text-neutral-400 text-sm leading-relaxed">
                            {pack.subtitle}
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="h-px w-full bg-white/5 mb-8" />

                    {/* Features List */}
                    <div className="flex-grow space-y-4 mb-10">
                        {pack.features.map((feature, i) => (
                            <div key={i} className="flex items-start gap-3.5 text-sm group/feature">
                                <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 transition-colors ${isPremium ? 'text-blue-500 group-hover/feature:text-blue-400' : 'text-neutral-600 group-hover/feature:text-neutral-400'}`} />
                                <span className="text-neutral-300 group-hover/feature:text-white transition-colors leading-relaxed">{feature}</span>
                            </div>
                        ))}
                    </div>

                    {/* Goal Footer - Now cleaner */}
                    <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/5">
                        <p className="text-xs text-neutral-400 italic text-center">
                            <span className="block not-italic font-bold text-neutral-200 mb-1 text-[10px] uppercase tracking-wider">Goal</span>
                            "{pack.goal}"
                        </p>
                    </div>

                    {/* Button */}
                    <button
                        onClick={onBuy}
                        className={`
                            w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300
                            ${isPremium
                                ? 'bg-[#0070F3] hover:bg-[#0051b3] text-white shadow-lg shadow-blue-500/25 ring-1 ring-blue-400/50'
                                : 'bg-white text-black hover:bg-neutral-200'
                            }
                        `}
                    >
                        Buy Now
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
