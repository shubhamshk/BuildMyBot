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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            animate={{
                y: [0, -8, 0],
            }}
        // Randomize floating slightly so they don't all move in perfect unison
        // We use a duration range between 4 and 6 seconds
        // transition is handled in the animate prop differently for keyframes, 
        // but for 'animate' prop with keyframes, we can pass transition options.
        // Using a separate effect or just simple variant might be cleaner but inline is fine for this.
        >
            <motion.div
                className="group relative h-full bg-white/5 dark:bg-neutral-900/40 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-2xl overflow-hidden hover:border-violet-500/50 transition-colors"
                whileHover={{ scale: 1.02 }}
                transition={{
                    y: {
                        duration: 4 + (index % 3),
                        repeat: Infinity,
                        ease: "easeInOut"
                    },
                    scale: { duration: 0.2 }
                }}
                style={{
                    // Floating animation via style/css or separate animate prop
                    // To do continuous floating cleanly with framer motion while allowing interactions:
                }}
            >
                {/* Floating Animation Container - handled by parent motion.div actually, but 'animate' overrides 'whileInView' if not careful.
                    Let's use a wrapper for entry and inner for float, or just keep it simple.
                 */}

                {/* Gradient Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="p-6 flex flex-col h-full relative z-10">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20 group-hover:bg-violet-500/20 transition-colors">
                            <Sparkles className="w-6 h-6 text-violet-400" />
                        </div>
                        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-white">
                            ${pack.price}
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">{pack.title}</h3>
                    <p className="text-neutral-400 text-sm mb-6 flex-grow">{pack.description}</p>

                    <button
                        onClick={() => onClick(pack)}
                        className="w-full py-2.5 rounded-lg bg-white/10 hover:bg-violet-600 text-white font-semibold flex items-center justify-center gap-2 transition-all border border-white/5 hover:border-violet-500"
                    >
                        Buy Pack <ShoppingBag className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
