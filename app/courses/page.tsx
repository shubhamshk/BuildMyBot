"use client";

import { motion } from "framer-motion";
import { ResponsiveNavbar } from "@/components/responsive-navbar";
import { useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { GraduationCap, BookOpen, Play, CheckCircle2, Crown, Clock, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

const courses = [
    {
        id: "prompt-engineering",
        title: "Advanced Prompt Engineering",
        description: "Learn how to craft the perfect system prompts for any AI model.",
        level: "Advanced",
        duration: "4h 20m",
        lessons: 12,
        rating: 4.9,
        image: "https://res.cloudinary.com/dkwxxfewv/image/upload/v1768326742/TA-2026-01-13-14-46-25-_artist_ma-735908093_gafs9j.png",
        tags: ["Prompting", "LLMs"],
        isNew: true
    },
    {
        id: "character-psychology",
        title: "Character Psychology & Depth",
        description: "Create bots that feel alive by applying psychological archetypes.",
        level: "Intermediate",
        duration: "3h 15m",
        lessons: 8,
        rating: 4.8,
        image: "https://res.cloudinary.com/dkwxxfewv/image/upload/v1768326741/TA-2026-01-13-14-58-30-_artist_ma-271327577_efkpoq.png",
        tags: ["Writing", "Psychology"]
    },
    {
        id: "world-building",
        title: "Immersive World Building",
        description: "Design rich, interactive lorebooks for your roleplay scenarios.",
        level: "Beginner",
        duration: "2h 45m",
        lessons: 10,
        rating: 4.7,
        image: "https://res.cloudinary.com/dkwxxfewv/image/upload/v1768326698/TA-2026-01-13-12-54-27-_artist_ma-1728647033_cho5ek.png",
        tags: ["Lore", "World"]
    },
    {
        id: "voice-cloning",
        title: "Voice Cloning Mastery",
        description: "How to select, process, and train high-quality character voices.",
        level: "Advanced",
        duration: "1h 30m",
        lessons: 5,
        rating: 4.9,
        image: "https://res.cloudinary.com/dkwxxfewv/image/upload/v1768326739/TA-2026-01-13-15-07-52-_artist_ma-2968179715_zxkzfi.png",
        tags: ["Audio", "TTS"]
    },
];

export default function CoursesPage() {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 20);
    });

    return (
        <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-blue-500/30">
            <ResponsiveNavbar scrolled={scrolled} />

            {/* Hero */}
            <section className="pt-32 pb-16 px-6 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-30">
                    <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-violet-600/20 blur-[120px] rounded-full" />
                </div>

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-widest mb-6"
                    >
                        <GraduationCap className="w-3.5 h-3.5" />
                        Characteria Academy
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight"
                    >
                        Master the Art of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">AI Creation</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-neutral-400 max-w-2xl mx-auto mb-10"
                    >
                        Professional courses designed to help you build better bots, deeper stories, and more immersive worlds.
                    </motion.p>
                </div>
            </section>

            {/* Courses Grid */}
            <section className="py-12 px-6 pb-24">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {courses.map((course, i) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all hover:shadow-2xl hover:shadow-blue-900/10 flex flex-col md:flex-row"
                        >
                            {/* Thumbnail */}
                            <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden">
                                <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-blue-500 group-hover:scale-110 transition-all cursor-pointer">
                                        <Play className="w-6 h-6 fill-white text-white ml-1" />
                                    </div>
                                </div>
                                {course.isNew && (
                                    <div className="absolute top-4 left-4 px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded shadow-lg">
                                        NEW
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="md:w-3/5 p-8 flex flex-col">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-medium text-neutral-300">
                                        {course.level}
                                    </span>
                                    <div className="flex items-center gap-1 text-xs text-neutral-400">
                                        <Clock className="w-3.5 h-3.5" />
                                        {course.duration}
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-amber-400 ml-auto">
                                        <Star className="w-3.5 h-3.5 fill-current" />
                                        {course.rating}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                    {course.title}
                                </h3>
                                <p className="text-neutral-400 text-sm mb-6 line-clamp-2">
                                    {course.description}
                                </p>

                                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                                        <BookOpen className="w-4 h-4" />
                                        <span>{course.lessons} Lessons</span>
                                    </div>
                                    <Link href="/pricing" className="flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors">
                                        Start Learning <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 bg-gradient-to-t from-blue-900/20 to-transparent">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">Unlock Full Access with Premium</h2>
                    <p className="text-lg text-neutral-400 mb-8">
                        Get unlimited access to all courses, certification, and community perks.
                    </p>
                    <Link href="/pricing" className="px-8 py-4 rounded-xl bg-white text-black font-bold hover:bg-neutral-200 transition-colors shadow-lg shadow-white/10">
                        Upgrade Now
                    </Link>
                </div>
            </section>
        </div>
    );
}
