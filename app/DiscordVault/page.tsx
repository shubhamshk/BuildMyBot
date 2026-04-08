"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ResponsiveNavbar } from "@/components/responsive-navbar";
import { PaymentStatusModal } from "@/components/modals/PaymentSuccessModal";
import { DiscordVaultPaymentModal } from "@/components/modals/DiscordVaultPaymentModal";
import { LoginRequiredModal } from "@/components/login-required-modal";
import { Loader2, ArrowRight, ShieldCheck, CheckCircle2, MessageSquare, Star, Zap, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

const plans = [
    {
        id: "discord-vault-basic",
        title: "BASIC",
        price: 9,
        features: [
            "Access to Basic Vault Channels",
            "Vote on Upcoming Content",
            "Access to General Chat",
            "Standard Role in Server",
        ]
    },
    {
        id: "discord-vault-premium",
        title: "PREMIUM",
        price: 19,
        highlight: true,
        features: [
            "Everything in Basic",
            "Access to Premium Vaults",
            "Download High-Res Media",
            "Special Premium Role",
            "Early Access to Announcements",
            "Priority Support Channel"
        ]
    },
    {
        id: "discord-vault-vip",
        title: "VIP",
        price: 49,
        features: [
            "Everything in Premium",
            "All Custom Vaults Access",
            "Direct VIP Support",
            "Exclusive VIP Role",
            "Private 1-on-1 Requests",
            "Behind The Scenes Access"
        ]
    }
];

function DiscordVaultContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [modalState, setModalState] = useState<{ open: boolean; status: "success" | "canceled" }>({ open: false, status: "success" });
    const [itemName, setItemName] = useState("");
    const [verifying, setVerifying] = useState(false);
    
    // Auth & Payment Modal States
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<{ id: string; title: string; price: number } | null>(null);

    const verifySubscription = useCallback(async (subscriptionId: string) => {
        if (verifying) return;
        setVerifying(true);
        try {
            const res = await fetch("/api/paypal/verify-pack-subscription", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subscriptionId }),
            });
            const data = await res.json();
            if (data.success) {
                router.refresh();
            }
        } catch (error) {
            console.error("Verification error:", error);
        } finally {
            setVerifying(false);
        }
    }, [verifying, router]);

    useEffect(() => {
        const success = searchParams.get("success");
        const canceled = searchParams.get("canceled");
        const pack = searchParams.get("pack") || "";
        const subscriptionId = searchParams.get("subscription_id");

        if (pack) {
            const formattedName = pack.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
            setItemName(formattedName);
        }

        if (success === "true") {
            setModalState({ open: true, status: "success" });
            if (subscriptionId) {
                verifySubscription(subscriptionId);
            }
        } else if (canceled === "true") {
            setModalState({ open: true, status: "canceled" });
        }
    }, [searchParams, verifySubscription]);

    const handleCloseStatusModal = () => {
        setModalState(prev => ({ ...prev, open: false }));
        router.replace("/DiscordVault", { scroll: false });
    };

    const handleSubscribeClick = async (plan: typeof plans[0]) => {
        setSelectedPlan({ id: plan.id, title: plan.title, price: plan.price });
        setPaymentModalOpen(true);
    };

    return (
        <main className="min-h-screen bg-[#05050a] text-white selection:bg-indigo-500/30 overflow-hidden relative">
            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[40vw] h-[40vw] max-w-[800px] max-h-[800px] bg-indigo-600/10 rounded-full blur-[120px] opacity-60" />
                <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] max-w-[800px] max-h-[800px] bg-purple-600/10 rounded-full blur-[120px] opacity-60" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] min-w-[500px] min-h-[500px] bg-violet-600/10 rounded-full blur-[100px] opacity-30" />
                <div className="absolute inset-0 opacity-[0.04] bg-cover bg-center mix-blend-overlay" style={{ backgroundImage: "url('https://res.cloudinary.com/drdd0gfrc/image/upload/v1772128439/TA-2026-02-26-19-56-55-Intimatepa-1328197427_asi3q7.png')" }} />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
            </div>

            <ResponsiveNavbar />

            <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
                
                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto mb-20 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-medium text-sm mb-6"
                    >
                        <MessageSquare className="w-4 h-4" /> Exclusive Discord Community
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight drop-shadow-xl"
                    >
                        Get access to all Characteria <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">Discord Vaults</span> from here.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-lg md:text-xl text-indigo-100/70 mb-10 max-w-2xl mx-auto"
                    >
                        Immerse yourself in our premium bot collections, exclusive high-resolution media, and private chat rooms alongside top creators. Get seamless and fast direct access to channels immediately after payment.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="flex flex-col sm:flex-row justify-center items-center gap-4"
                    >
                        <button
                            onClick={() => {
                                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)] hover:shadow-[0_0_60px_-10px_rgba(99,102,241,0.7)] transition-all transform hover:scale-105"
                        >
                            Join Now
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                </div>

                {/* Pricing / Subscriptions */}
                <div id="pricing" className="text-center mb-10">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Choose Your Vault Tier</h2>
                    <p className="text-indigo-200/60 font-medium">Select the subscription that fits your needs. Cancel anytime.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className={`relative group rounded-3xl ${plan.highlight ? 'md:-mt-6 md:mb-6 z-20' : 'z-10'}`}
                        >
                            {/* Highlight glow */}
                            {plan.highlight && (
                                <div className="absolute -inset-[2px] bg-gradient-to-b from-indigo-500 via-purple-500 to-indigo-500 rounded-3xl opacity-50 group-hover:opacity-100 blur-md transition-opacity duration-500 animate-pulse pointer-events-none" />
                            )}

                            <div className={`relative h-full flex flex-col bg-[#0b0b14] backdrop-blur-xl rounded-[1.4rem] p-8 box-border transition-transform duration-300 hover:-translate-y-2 ${
                                plan.highlight 
                                    ? 'border-2 border-indigo-500 shadow-[0_0_40px_-10px_rgba(99,102,241,0.4)]' 
                                    : 'border border-white/10 hover:border-indigo-500/50'
                            }`}>
                                {plan.highlight && (
                                    <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl flex items-center gap-1 shadow-lg pointer-events-none">
                                        <Crown className="w-3 h-3" /> MOST POPULAR
                                    </div>
                                )}
                                
                                <div className="mb-6">
                                    <h3 className={`text-2xl font-bold tracking-tight mb-2 ${plan.highlight ? 'text-indigo-400' : 'text-white'}`}>{plan.title}</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-5xl font-extrabold text-white">${plan.price}</span>
                                        <span className="text-neutral-500 font-medium">/month</span>
                                    </div>
                                </div>

                                <div className="flex-grow">
                                    <ul className="space-y-4 mb-8">
                                        {plan.features.map((feat, j) => (
                                            <li key={j} className="flex items-start gap-3">
                                                <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${plan.highlight ? 'text-indigo-400' : 'text-neutral-500'}`} />
                                                <span className="text-neutral-200 text-sm font-medium">{feat}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-auto">
                                    <button
                                        onClick={() => handleSubscribeClick(plan)}
                                        className={`w-full py-4 rounded-xl font-bold text-base flex justify-center items-center gap-2 transition-all shadow-md group ${
                                            plan.highlight 
                                                ? 'bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)]' 
                                                : 'bg-white/10 hover:bg-indigo-600/80 text-white border border-white/10 hover:border-indigo-500/50'
                                        }`}
                                    >
                                        Subscribe with PayPal
                                    </button>
                                    <p className="text-xs text-center text-neutral-500 mt-4 flex items-center justify-center gap-1.5 opacity-80">
                                        <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                                        Secure payment via PayPal
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>

            <PaymentStatusModal
                isOpen={modalState.open}
                status={modalState.status}
                onClose={handleCloseStatusModal}
                itemName={itemName || "Discord Vault Access"}
                successMessage="Your subscription has been processed! You will get access to the channel instantly. Please wait a moment while we set up your roles."
            />

            <DiscordVaultPaymentModal
                isOpen={paymentModalOpen}
                onClose={() => setPaymentModalOpen(false)}
                item={selectedPlan}
            />

            <LoginRequiredModal
                isOpen={loginModalOpen}
                onClose={() => setLoginModalOpen(false)}
            />
        </main>
    );
}

export default function DiscordVaultPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#05050a] flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>}>
            <DiscordVaultContent />
        </Suspense>
    );
}
