import { Star } from "lucide-react";
import { motion } from "framer-motion";

export function SocialProof({ className = "" }: { className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-12 md:mt-16 ${className}`}
        >
            <div
                className="flex items-center -space-x-4 p-1.5 bg-neutral-900/40 border border-white/5 rounded-full backdrop-blur-sm shadow-xl"
            >
                {[
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
                    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces",
                ].map((src, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                        whileHover={{ scale: 1.15, zIndex: 20 }}
                        className="w-12 h-12 rounded-full border-2 border-[#121212] overflow-hidden relative z-10 first:z-0 shadow-lg cursor-pointer grayscale-[30%] hover:grayscale-0 transition-all duration-300"
                        style={{ zIndex: 5 - i }}
                    >
                        <img
                            src={src}
                            alt={`User ${i + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                ))}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className="w-12 h-12 rounded-full bg-neutral-800 border-2 border-[#121212] flex items-center justify-center relative z-20 shadow-lg"
                >
                    <span className="text-[10px] font-bold text-white">+100</span>
                </motion.div>
            </div>

            <div className="flex flex-col items-center sm:items-start gap-1">
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star, i) => (
                        <motion.div
                            key={star}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + (i * 0.1), type: "spring" }}
                        >
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                        </motion.div>
                    ))}
                </div>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-sm font-medium text-neutral-400"
                >
                    Trusted by <span className="text-white font-bold tracking-wide">100+ Creators</span>
                </motion.p>
            </div>
        </motion.div>
    );
}

