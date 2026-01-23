"use client";

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { vaultPacks, creatorVaultPack, VaultPack } from "@/data/vaultPacks";
import { Sparkles, ShoppingBag, CheckCircle2, Lock, Star, ChevronRight, Zap, Bot, X, CreditCard, Loader2, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ResponsiveNavbar } from "@/components/responsive-navbar";

export default function VaultPage() {
    const [selectedItem, setSelectedItem] = useState<{ name: string; price: number; id: string } | null>(null);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    // Navbar scroll logic
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);
    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 20);
    });

    const handleUnlock = (item: { name: string; price: number; id: string }) => {
        setSelectedItem(item);
        setIsPaymentModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-white selection:bg-amber-500/30 font-sans pb-20 pt-24 overflow-x-hidden flex flex-col">
            <ResponsiveNavbar scrolled={scrolled} />

            {/* Background Ambience */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
                <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[100px] mix-blend-screen animate-pulse delay-1000" />
                <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[130px] mix-blend-screen" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 flex-grow w-full">

                {/* HERO SECTION */}
                <div className="flex flex-col items-center text-center mb-20 mt-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-sm font-bold uppercase tracking-wider mb-8 backdrop-blur-md shadow-lg shadow-amber-900/20"
                    >
                        <Lock className="w-3.5 h-3.5" />
                        My Bots Exclusive Versions
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 leading-tight"
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600">Unrestricted</span> <br />
                        & Fully Customizable
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="max-w-3xl mx-auto bg-neutral-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 mb-10 text-left"
                    >
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-amber-400" />
                            What you get with every pack:
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                "Full Personality & Scenario + Initial Message & Description",
                                "Instant Access: Paste into Janitor AI & Chat Privately",
                                "Fully Customizable & Unrestricted Logic",
                                "No Moderation Drama — Experience a True Story",
                                "Exclusive High-Quality Bot Images Included",
                                "Bonus: Guide on How to Retain Interaction Memory"
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                    <span className="text-neutral-300 text-sm font-medium leading-relaxed">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => document.getElementById("packs")?.scrollIntoView({ behavior: "smooth" })}
                        className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-xl font-bold text-white shadow-xl shadow-amber-900/20 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        <span className="relative flex items-center gap-2">
                            Browse Exclusive Packs
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </motion.button>
                </div>

                {/* SECTION: PREMIUM BOT PACKS GRID */}
                <div id="packs" className="scroll-mt-32 mb-24">
                    <div className="flex items-end justify-between mb-10 border-b border-white/10 pb-4">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">Exclusive Packs</h2>
                            <p className="text-neutral-400">Individual premium character expansions ready for Janitor AI.</p>
                        </div>
                        <div className="hidden sm:block text-sm text-neutral-500 font-mono">
                            {vaultPacks.length} packs available
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {vaultPacks.map((pack) => (
                            <PackCard key={pack.id} pack={pack} onUnlock={() => handleUnlock({ name: pack.name, price: pack.price, id: pack.id })} />
                        ))}
                    </div>
                </div>

                {/* SECTION: CREATOR VAULT PACK (Highlighted) */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-12"
                >
                    <div className="relative group rounded-3xl p-[1px] bg-gradient-to-b from-amber-300 via-amber-600 to-transparent">
                        <div className="absolute inset-0 bg-amber-500/20 blur-3xl rounded-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-700" />
                        <div className="relative bg-neutral-900/90 backdrop-blur-xl rounded-[23px] overflow-hidden p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center border border-white/5">
                            <div className="flex-1 space-y-6 text-left">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold text-sm shadow-lg shadow-amber-500/40">
                                    <Star className="w-4 h-4 fill-black" />
                                    {creatorVaultPack.badge}
                                </div>
                                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
                                    {creatorVaultPack.title}
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {creatorVaultPack.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-neutral-300">
                                            <div className="p-1 rounded-full bg-amber-500/20 text-amber-400">
                                                <CheckCircle2 className="w-4 h-4" />
                                            </div>
                                            <span className="font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex-shrink-0 w-full md:w-80 bg-neutral-950/50 rounded-2xl p-6 border border-white/10 flex flex-col items-center justify-center text-center gap-6 group-hover:bg-neutral-950/80 transition-colors">
                                <div className="space-y-1">
                                    <p className="text-neutral-400 text-sm font-medium uppercase tracking-widest">Bundle Price</p>
                                    <div className="text-6xl font-black text-white tracking-tighter">${creatorVaultPack.price}</div>
                                    <p className="text-green-400 text-sm font-bold">Save $21 instantly</p>
                                </div>
                                <button
                                    onClick={() => handleUnlock({ name: creatorVaultPack.title, price: creatorVaultPack.price, id: creatorVaultPack.id })}
                                    className="w-full py-4 rounded-xl bg-white text-black font-bold text-lg hover:scale-105 active:scale-95 transition-transform flex items-center justify-center gap-2 shadow-lg shadow-white/10"
                                >
                                    <Lock className="w-5 h-5 text-amber-600" />
                                    Unlock Vault
                                </button>
                                <div className="flex items-center gap-2 text-xs text-neutral-500">
                                    <Zap className="w-3 h-3 text-yellow-500" />
                                    Instant Email Delivery
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* Custom Footer Bar */}
            <div className="relative z-20 mt-auto border-t border-white/10 bg-neutral-900/50 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-lg font-bold text-white mb-1">Ready to create your own?</h3>
                        <p className="text-neutral-400 text-sm">Build fully custom AI characters from scratch with our powerful tools.</p>
                    </div>
                    <Link
                        href="/"
                        className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all font-medium text-white shadow-lg hover:shadow-white/5"
                    >
                        <Sparkles className="w-4 h-4 text-violet-400 group-hover:text-violet-300 transition-colors" />
                        Build Your AI Characters
                        <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                item={selectedItem}
            />
        </div>
    );
}

function PackCard({ pack, onUnlock }: { pack: VaultPack; onUnlock: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, rotateX: 2, rotateY: 2 }}
            className="group relative flex flex-col bg-neutral-900/60 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-900/20 transition-all duration-300"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-fuchsia-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Image Preview Area */}
            <div className="relative h-56 w-full bg-neutral-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-950" />
                <div className="absolute inset-0 flex items-center justify-center text-neutral-700 group-hover:text-violet-500/50 transition-colors">
                    <Bot className="w-20 h-20 opacity-20" />
                </div>
                {pack.previewImage && !pack.previewImage.includes("placeholder") && (
                    <div className="absolute inset-0">
                        {/* Using img for direct external URLs without next.config setup if needed, otherwise Image */}
                        <img src={pack.previewImage} alt={pack.name} className="w-full h-full object-cover object-top opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-neutral-950 to-transparent">
                    <span className="inline-block px-2.5 py-1 rounded text-[10px] font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30 backdrop-blur-sm">
                        PART 2: {pack.originalBotName}
                    </span>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow relative z-10">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors">
                    {pack.name}
                </h3>

                <ul className="space-y-2.5 mb-6 flex-grow">
                    {pack.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-400">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-500 flex-shrink-0" />
                            {feat}
                        </li>
                    ))}
                </ul>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-3xl font-bold text-white tracking-tight">${pack.price}</span>
                    <button
                        onClick={onUnlock}
                        className="px-6 py-2.5 rounded-xl bg-neutral-100 text-neutral-900 font-bold text-sm hover:bg-white hover:scale-105 transition-all shadow-lg hover:shadow-white/20 active:scale-95"
                    >
                        Unlock
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

function PaymentModal({ isOpen, onClose, item }: { isOpen: boolean; onClose: () => void; item: { name: string; price: number; id: string } | null }) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handlePay = async () => {
        if (!email || !email.includes("@")) {
            setError("Please enter a valid email address");
            return;
        }
        if (!item) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/paypal/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    itemId: item.id,
                    email,
                    description: `Purchase of ${item.name}`
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to create order");
            }

            const data = await response.json();
            if (data.approvalUrl) {
                window.location.href = data.approvalUrl;
            } else {
                throw new Error("No approval URL received");
            }

        } catch (err: any) {
            setError(err.message || "Payment initiation failed");
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && item && (
                <div className="fixed inset-0 z-50 flex items-center justify-center -top-20 md:top-0">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md mx-4 bg-neutral-900 border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden"
                    >
                        {/* Glow */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-violet-500/20 blur-3xl rounded-full pointer-events-none" />
                        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

                        <div className="relative z-10">
                            <button
                                onClick={onClose}
                                className="absolute top-0 right-0 p-2 text-neutral-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="text-center mb-6">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-violet-500/10 text-violet-400 mb-4 border border-violet-500/20">
                                    <ShoppingBag className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Unlock {item.name}</h3>
                                <p className="text-neutral-400 text-sm">
                                    Enter your email to receive your purchase receipt and download link instantly.
                                </p>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                                    />
                                </div>

                                <div className="bg-neutral-800/50 rounded-xl p-4 border border-white/5 flex items-center justify-between">
                                    <span className="text-neutral-300 font-medium">Total</span>
                                    <span className="text-2xl font-bold text-white">${item.price}</span>
                                </div>
                            </div>

                            {error && (
                                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
                                    {error}
                                </div>
                            )}

                            <button
                                onClick={handlePay}
                                disabled={loading}
                                className="w-full py-4 bg-[#FFC439] hover:bg-[#F4BB2E] text-black font-bold rounded-xl shadow-lg shadow-amber-900/10 transition-all flex items-center justify-center gap-2 group relative overflow-hidden"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <span className="italic font-serif font-black text-blue-900 text-lg">Pay</span>
                                        <span className="italic font-serif font-black text-blue-400 text-lg mr-1">Pal</span>
                                        <span className="text-blue-900 absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ChevronRight className="w-5 h-5" />
                                        </span>
                                    </>
                                )}
                            </button>
                            <p className="text-center text-xs text-neutral-600 mt-4">
                                Secure payment via PayPal. No account required.
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
