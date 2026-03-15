"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Shield, CreditCard, Sparkles, Loader2 } from "lucide-react";

export function PremiumPaymentModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [promoCode, setPromoCode] = useState("");
    const [price, setPrice] = useState(99);
    const [promoApplied, setPromoApplied] = useState(false);
    const [status, setStatus] = useState<"input" | "processing" | "success">("input");
    const [error, setError] = useState("");

    const handleApplyPromo = () => {
        if (promoCode.toUpperCase() === "ERROR206") {
            setPrice(89);
            setPromoApplied(true);
            setError("");
        } else {
            setError("Invalid Promo Code");
        }
    };

    const handlePayment = async () => {
        setStatus("processing");
        setError("");

        try {
            const response = await fetch("/api/paypal/create-subscription", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    planType: "world-pack", // Specific ID for Ultimate Pack
                    customAmount: price
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = `/auth/signin?redirect=${encodeURIComponent(window.location.pathname)}`;
                    return;
                }
                throw new Error(data.error || "Failed to create subscription");
            }

            if (data.approvalUrl) {
                setStatus("success");
                window.location.href = data.approvalUrl;
            } else {
                throw new Error("No approval URL received");
            }

        } catch (err: any) {
            console.error("Payment error:", err);
            setError(err.message || "An unexpected error occurred. Please try again.");
            setStatus("input");
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="relative w-full max-w-lg bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden shadow-2xl p-6 md:p-8"
                >
                    {/* Background glow */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[80px] pointer-events-none -z-10" />

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white bg-white/5 rounded-full transition-colors z-10"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <AnimatePresence mode="wait">
                        {status === "success" ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-10"
                            >
                                <div className="w-20 h-20 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-6 border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                                    <CheckCircle className="w-10 h-10" />
                                </div>
                                <h3 className="text-3xl font-black text-white mb-3">Redirecting...</h3>
                                <p className="text-neutral-300 text-lg max-w-sm mx-auto">
                                    Setting up your Ultimate Pack. Sending you to PayPal to safely complete your purchase.
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="input"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <div className="text-center mb-8 pt-2">
                                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                                        <Sparkles className="w-8 h-8 text-black" />
                                    </div>
                                    <h2 className="text-2xl font-black text-white mb-2">Ultimate collection Pack</h2>
                                    <p className="text-neutral-400 text-sm">Unlock the definitive toolkit for creators.</p>
                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 space-y-4">
                                    <div className="flex justify-between items-center text-lg">
                                        <span className="text-neutral-300">Total Price</span>
                                        <span className="text-3xl font-black text-white flex items-center">
                                            ${price}
                                            {promoApplied && (
                                                <span className="text-xs text-neutral-500 line-through ml-2 font-normal">$99</span>
                                            )}
                                        </span>
                                    </div>

                                    {!promoApplied ? (
                                        <div className="pt-2">
                                            <label className="block text-xs text-neutral-400 mb-2 uppercase tracking-wider font-bold">Promo Code</label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={promoCode}
                                                    onChange={(e) => setPromoCode(e.target.value)}
                                                    placeholder="Enter code..."
                                                    className="flex-grow bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 uppercase"
                                                    disabled={status === "processing"}
                                                />
                                                <button
                                                    onClick={handleApplyPromo}
                                                    className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-colors text-sm"
                                                    disabled={status === "processing"}
                                                >
                                                    Apply
                                                </button>
                                            </div>
                                            {error && <p className="text-red-400 text-xs mt-2 text-center bg-red-500/10 p-2 rounded-lg border border-red-500/20">{error}</p>}
                                        </div>
                                    ) : (
                                        <div className="pt-2 flex items-center justify-center gap-2 text-green-400 bg-green-500/10 p-3 rounded-xl border border-green-500/20">
                                            <CheckCircle className="w-4 h-4" />
                                            <span className="text-sm font-medium">Promo code applied — $10 discount unlocked!</span>
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={handlePayment}
                                    disabled={status === "processing"}
                                    className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(245,158,11,0.4)] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                                >
                                    {status === "processing" ? (
                                        <>
                                            <Loader2 className="w-6 h-6 animate-spin text-black" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <span className="italic font-serif font-black text-xl">Pay</span>
                                            <span className="italic font-serif font-black text-xl text-amber-900">Pal</span>
                                            <CreditCard className="w-5 h-5 ml-1" />
                                        </>
                                    )}
                                </button>

                                <div className="mt-4 flex items-center justify-center gap-2 text-neutral-500 text-xs">
                                    <Shield className="w-3 h-3" />
                                    <span>Secure encrypted payment</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
