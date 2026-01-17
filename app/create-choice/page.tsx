"use client";

import { motion } from "framer-motion";
import { Sparkles, Wand2, Image as ImageIcon, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateChoicePage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-black px-4 py-12 flex flex-col relative overflow-hidden">
            {/* Background FX */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
            </div>

            <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </motion.div>

                <div className="flex-1 flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                            Start Creating
                        </h1>
                        <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                            Choose your path. Generate visuals from pure imagination, or build a deep character profile first.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto w-full px-4 md:px-0">
                        {/* Option 1: Image Prompts Only */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="group relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden cursor-pointer ring-1 ring-white/10 hover:ring-violet-500/50 transition-all duration-500 shadow-2xl shadow-black/50"
                            onClick={() => router.push("/image-generator?mode=story")}
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 z-0">
                                <img
                                    src="https://res.cloudinary.com/dkwxxfewv/image/upload/v1768326700/TA-2026-01-13-14-53-32-_artist_ma-132961706_tkmwx9.png"
                                    alt="Image Generation Preview"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80" />
                                <div className="absolute inset-0 bg-violet-900/20 mix-blend-overlay group-hover:bg-violet-900/30 transition-colors" />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-10">
                                <div className="mb-auto transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-200 text-xs font-medium backdrop-blur-md">
                                        <Sparkles className="w-3 h-3" />
                                        Instant Visuals
                                    </span>
                                </div>

                                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-5 shadow-xl group-hover:scale-110 transition-transform duration-300">
                                    <ImageIcon className="w-7 h-7 text-violet-200" />
                                </div>

                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-violet-200 transition-colors">
                                    Generate Image Prompts
                                </h2>

                                <p className="text-neutral-300 mb-6 leading-relaxed max-w-md group-hover:text-white transition-colors text-sm md:text-base">
                                    Turn a story idea directly into high-quality AI image prompts. Perfect for concept art, scenes, and quick visualization.
                                </p>

                                <div className="flex items-center gap-2 text-violet-300 font-semibold group-hover:translate-x-2 transition-transform">
                                    Start Generating <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Option 2: Character -> Images */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="group relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden cursor-pointer ring-1 ring-white/10 hover:ring-blue-500/50 transition-all duration-500 shadow-2xl shadow-black/50"
                            onClick={() => router.push("/idea")}
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 z-0">
                                <img
                                    src="https://res.cloudinary.com/dkwxxfewv/image/upload/v1768197627/Screenshot_2026-01-12_112932_timgxq.png"
                                    alt="Character Creation Preview"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 blur-[2px] group-hover:blur-none"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80" />
                                <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay group-hover:bg-blue-900/30 transition-colors" />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-10">
                                <div className="mb-auto transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-200 text-xs font-medium backdrop-blur-md">
                                        <Wand2 className="w-3 h-3" />
                                        Deep Profile
                                    </span>
                                </div>

                                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-5 shadow-xl group-hover:scale-110 transition-transform duration-300">
                                    <Wand2 className="w-7 h-7 text-blue-200" />
                                </div>

                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">
                                    Create Character First
                                </h2>

                                <p className="text-neutral-300 mb-6 leading-relaxed max-w-md group-hover:text-white transition-colors text-sm md:text-base">
                                    Build a complete character with personality, backstory, and traits. Then generate consistent images based on their profile.
                                </p>

                                <div className="flex items-center gap-2 text-blue-300 font-semibold group-hover:translate-x-2 transition-transform">
                                    Start Building <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
