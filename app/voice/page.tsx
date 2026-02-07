"use client";

import { useState, Suspense, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mic, Sparkles, Wand2, PlayCircle, Fingerprint, Volume2, ArrowRight } from "lucide-react";
import { ResponsiveNavbar } from "@/components/responsive-navbar";
import Link from "next/link";
import { ExtensionPaymentModal } from "@/components/modals/ExtensionPaymentModal";
import { createClient } from "@/lib/supabase/client";
import { LoginRequiredModal } from "@/components/login-required-modal";

import { PaymentStatusModal } from "@/components/modals/PaymentSuccessModal";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

function VoiceContent() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);

    // Payment Success Logic
    const searchParams = useSearchParams();
    const router = useRouter();
    const [paymentModalState, setPaymentModalState] = useState<{
        open: boolean;
        status: "success" | "canceled";
    }>({ open: false, status: "success" });

    const [verifying, setVerifying] = useState(false);

    const verifyPurchase = useCallback(async () => {
        if (verifying) return;
        setVerifying(true);
        try {
            console.log("Starting purchase verification...");
            // Poll for verification success - 5 attempts
            for (let i = 0; i < 5; i++) {
                const res = await fetch("/api/paypal/verify-subscription", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' }
                });

                if (res.ok) {
                    const data = await res.json();
                    if (data.success) {
                        console.log("Purchase verified successfully:", data);
                        // Refresh router to update any server components if needed
                        router.refresh();
                        return; // Exit on success
                    }
                }
                // Wait 2 seconds before retry
                await new Promise(r => setTimeout(r, 2000));
            }
            console.log("Verification polling finished without confirmation (could be pending).");
        } catch (error) {
            console.error("Verification error:", error);
        } finally {
            setVerifying(false);
        }
    }, [verifying, router]);

    useEffect(() => {
        const success = searchParams.get("success");
        const canceled = searchParams.get("canceled");

        if (success === "true") {
            setPaymentModalState({ open: true, status: "success" });
            verifyPurchase();
        } else if (canceled === "true") {
            setPaymentModalState({ open: true, status: "canceled" });
        }
    }, [searchParams, verifyPurchase]);

    const handlePaymentClose = () => {
        setPaymentModalState(prev => ({ ...prev, open: false }));
        router.replace("/voice", { scroll: false });
    };

    const handleGetExtension = async () => {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            setLoginModalOpen(true);
            return;
        }
        setIsModalOpen(true);
    };
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <div className="min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-violet-500/30 font-sans">
            <ResponsiveNavbar />

            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-900/10 blur-[120px]" />
                <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[60%] rounded-full bg-indigo-900/10 blur-[150px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
            </div>

            <div className="relative z-10">
                {/* Hero Banner Background */}
                <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10" />
                    <img
                        src="https://ik.imagekit.io/tcxzbwccr/upscayl_png_upscayl-standard-4x_4x/Untitled%20design.png"
                        alt="Background"
                        className="w-full h-full object-cover opacity-50"
                    />
                </div>

                {/* Hero Content */}
                <section className="relative pt-40 pb-20 px-6">
                    <div className="max-w-7xl mx-auto relative z-30 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-violet-300 text-sm font-medium mb-10 backdrop-blur-xl shadow-[0_0_30px_-5px_rgba(139,92,246,0.3)]"
                        >
                            <Sparkles className="w-4 h-4 text-violet-400" />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-200 to-indigo-200">Next Gen AI Voice Technology</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
                            className="text-6xl md:text-8xl font-black mb-8 tracking-tighter drop-shadow-2xl"
                        >
                            Give Your Bots a <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-violet-400 via-indigo-400 to-white animate-gradient-xy pb-2">
                                Cinematic Voice
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto mb-12 leading-relaxed font-light"
                        >
                            Transform your chat experience with hyper-realistic, emotional, and cinematic AI voices.
                            <br className="hidden md:block" /> Designed specifically for Janitor AI bots.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-32"
                        >
                            <button
                                onClick={handleGetExtension}
                                className="group relative px-8 py-4 rounded-2xl bg-white text-black font-bold text-lg hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300 active:scale-95 flex items-center gap-3 overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <Mic className="w-5 h-5" /> Get The Extension
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-violet-200 to-indigo-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </button>
                            <Link
                                href="/pricing"
                                className="px-8 py-4 rounded-2xl font-bold text-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all backdrop-blur-md flex items-center gap-2 group"
                            >
                                View Pricing
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>

                        {/* Video Player Section - Lowered & Glassmorphic */}
                        <motion.div
                            initial={{ opacity: 0, y: 60, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="max-w-6xl mx-auto relative z-20"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/30 to-indigo-600/30 rounded-[2.5rem] blur-2xl opacity-50 animate-pulse-slow"></div>

                            <div className="relative p-2 rounded-[2rem] bg-gradient-to-b from-white/10 to-white/5 border border-white/10 backdrop-blur-sm shadow-2xl">
                                <div className="relative rounded-[1.8rem] overflow-hidden bg-black aspect-video shadow-inner">
                                    <video
                                        className="w-full h-full object-cover"
                                        controls
                                        preload="metadata"
                                        poster="https://ik.imagekit.io/tcxzbwccr/upscayl_png_upscayl-standard-4x_4x/Each%20Char%20Gets%20their%20own%20voice.png"
                                        src="https://ik.imagekit.io/tcxzbwccr/upscayl_png_upscayl-standard-4x_4x/Untitled%20video%20-%20Made%20with%20Clipchamp%20(3).mp4"
                                    >
                                        Your browser does not support the video tag.
                                    </video>

                                    {/* Video Decorator */}
                                    <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-2 pointer-events-none">
                                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                        <span className="text-xs font-medium text-white/90 uppercase tracking-widest">Live Demo</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex items-center justify-center gap-3 text-neutral-400">
                                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/20" />
                                <span className="text-sm font-medium tracking-widest uppercase flex items-center gap-2">
                                    <Volume2 className="w-4 h-4 text-violet-400" /> Audio Enabled
                                </span>
                                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/20" />
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>

            {/* Visual Immersion Section */}
            <section className="py-32 px-6 relative z-10 overflow-hidden">
                <div className="absolute top-1/2 left-0 w-full h-[500px] bg-gradient-to-b from-violet-900/5 to-transparent -z-10 blur-3xl" />

                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="space-y-12 order-2 lg:order-1"
                        >
                            <div>
                                <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                                    Immersive <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Experience</span>
                                </h2>
                                <p className="text-lg text-neutral-400 leading-relaxed max-w-md border-l-2 border-violet-500/30 pl-6">
                                    Experience a new level of connection. From whispered secrets to heated arguments, hear every nuance exactly as intended.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <FeatureRow
                                    number="01"
                                    title="Context-Aware Emotion"
                                    text="Our AI analyzes the conversation history to determine the perfect emotional tone for every response. It knows when to whisper, laugh, cry, or shout."
                                />
                                <FeatureRow
                                    number="02"
                                    title="Custom Voice Cloning"
                                    text="Upload a 10-second audio clip to instantly clone any voice. Or choose from our professionally curated library of 50+ cinematic voices."
                                />
                                <FeatureRow
                                    number="03"
                                    title="Seamless Integration"
                                    text="No complex setups or API keys. The extension overlays naturally on your existing Janitor AI chats, working straight out of the box."
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="order-1 lg:order-2 grid grid-cols-2 gap-4 h-fit items-start"
                        >
                            <div className="space-y-4 pt-12">
                                <GlassImage
                                    src="https://ik.imagekit.io/tcxzbwccr/upscayl_png_upscayl-standard-4x_4x/Screenshot%202026-01-31%20231127.png"
                                    alt="Voice Interface"
                                    label="Interface"
                                />
                                <GlassImage
                                    src="https://ik.imagekit.io/tcxzbwccr/upscayl_png_upscayl-standard-4x_4x/Screenshot%202026-01-31%20202036.png"
                                    alt="Waveform Visualization"
                                />
                            </div>
                            <div className="space-y-4">
                                <GlassImage
                                    src="https://ik.imagekit.io/tcxzbwccr/upscayl_png_upscayl-standard-4x_4x/Screenshot%202026-01-31%20194215.png"
                                    alt="Extension Settings"
                                />
                                <GlassImage
                                    src="https://ik.imagekit.io/tcxzbwccr/upscayl_png_upscayl-standard-4x_4x/Screenshot%202026-01-31%20213724.png"
                                    alt="Character Selection"
                                    label="Library"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-violet-400 mb-3">Capabilities</h2>
                        <h3 className="text-3xl md:text-5xl font-bold">Why Choose Cinematic Voice?</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FeatureCard
                            icon={<Volume2 className="w-8 h-8 text-violet-300" />}
                            title="Hyper-Realistic Audio"
                            description="Proprietary audio synthesis models that capture subtle breath, micro-tremors, tonality, and deep emotional resonance."
                        />
                        <FeatureCard
                            icon={<Fingerprint className="w-8 h-8 text-pink-300" />}
                            title="Unique Voice Prints"
                            description="Generate a completely unique voice fingerprint for every single character. No two bots will ever sound exactly the same."
                        />
                        <FeatureCard
                            icon={<Wand2 className="w-8 h-8 text-blue-300" />}
                            title="One-Click Install"
                            description="Works seamlessly with Janitor AI directly in your browser. Install the extension, sign in, and start chatting in seconds."
                        />
                    </div>
                </div>
            </section>

            <ExtensionPaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <LoginRequiredModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />

            <PaymentStatusModal
                isOpen={paymentModalState.open}
                status={paymentModalState.status}
                onClose={handlePaymentClose}
                itemName="Cinematic Voice Extension"
            />
        </div>
    );
}

function FeatureRow({ number, title, text }: { number: string, title: string, text: string }) {
    return (
        <div className="group">
            <h3 className="text-xl font-bold text-white flex items-center gap-4 mb-3 group-hover:text-violet-300 transition-colors">
                <span className="font-mono text-sm px-2 py-1 rounded bg-white/5 text-neutral-400 border border-white/5">{number}</span>
                {title}
            </h3>
            <p className="text-neutral-400 leading-relaxed pl-[3.25rem] group-hover:text-neutral-300 transition-colors">
                {text}
            </p>
        </div>
    )
}

function GlassImage({ src, alt, label }: { src: string, alt: string, label?: string }) {
    return (
        <div className="w-full h-auto rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative group cursor-pointer shadow-lg hover:shadow-violet-900/20 transition-all duration-500">
            <div className="absolute inset-0 bg-neutral-900 animate-pulse z-0" />
            <img
                src={src}
                alt={alt}
                className="w-full h-auto object-contain relative z-10 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex items-end p-4">
                {label && <span className="text-xs font-bold text-white uppercase tracking-wider translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-100">{label}</span>}
            </div>
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl z-30 pointer-events-none group-hover:ring-white/20 transition-all" />
        </div>
    )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-white/10 hover:border-violet-500/20 transition-all duration-300 group hover:-translate-y-1">
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 w-fit border border-white/10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-violet-200 transition-colors">{title}</h3>
            <p className="text-neutral-400 leading-relaxed">{description}</p>
        </div>
    )
}


export default function VoicePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">Loading...</div>}>
            <VoiceContent />
        </Suspense>
    );
}
