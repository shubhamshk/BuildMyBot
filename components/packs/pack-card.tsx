"use client";

import { motion } from "framer-motion";
import { Pack } from "@/lib/packs/data";
import { ShoppingBag, Sparkles } from "lucide-react";

interface PackCardProps {
    pack: Pack;
    onClick: (pack: Pack) => void;
    index: number;
}

export function PackCard({ pack, onClick, index }: PackCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="h-full"
        >
            <motion.div
                className="group relative h-full flex flex-col bg-neutral-900/50 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:bg-neutral-800/50 hover:border-violet-500/30 transition-all duration-300"
                whileHover={{ y: -5 }}
            >
                {/* Subtle Gradient Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="p-6 flex flex-col h-full relative z-10">
                    <div className="flex justify-between items-start mb-5">
                        <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center border border-violet-500/20 group-hover:scale-110 transition-transform duration-300">
                            <Sparkles className="w-5 h-5 text-violet-400" />
                        </div>
                        <div className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full border border-white/5 group-hover:border-white/10 transition-colors">
                            <span className="text-sm font-bold text-white">${pack.price}</span>
                        </div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-200 transition-colors line-clamp-2">
                        {pack.title}
                    </h3>

                    <p className="text-neutral-400 text-sm mb-6 flex-grow leading-relaxed">
                        {pack.description}
                    </p>

                    <button
                        onClick={() => onClick(pack)}
                        className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-violet-600 text-neutral-300 hover:text-white font-medium flex items-center justify-center gap-2 transition-all border border-white/5 hover:border-violet-500 text-sm group/btn"
                    >
                        Buy Pack
                        <ShoppingBag className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
