"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Loader2, Mail, CreditCard, Sparkles } from "lucide-react";

interface ExtensionPaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ExtensionPaymentModal({ isOpen, onClose }: ExtensionPaymentModalProps) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"input" | "processing" | "success">("input");
    const [error, setError] = useState("");

    const ITEM_PRICE = 9;
    const ITEM_TITLE = "Cinematic Voice Extension";

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setEmail("");
            setStatus("input");
            setError("");
        }
    }, [isOpen]);

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handlePurchase = async () => {
        if (!email || !isValidEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setError("");
        setStatus("processing");

        try {
            // Reusing the existing API endpoint logic
            const response = await fetch("/api/paypal/create-subscription", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    planType: "voice-extension-v1"
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    // Redirect to login if unauthorized
                    window.location.href = `/auth/signin?redirect=${encodeURIComponent(window.location.pathname)}`;
                    return;
                }
                throw new Error(data.error || "Failed to create subscription");
            }

            if (data.approvalUrl) {
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

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-[#0f0f12] rounded-3xl border border-white/10 shadow-2xl max-w-sm w-full overflow-hidden pointer-events-auto relative">

                            {/* Top Right Price Tag */}
                            <div className="absolute top-0 right-0 bg-gradient-to-bl from-violet-600 to-indigo-600 px-4 py-2 rounded-bl-2xl shadow-lg z-20">
                                <span className="text-xl font-black text-white">${ITEM_PRICE}</span>
                            </div>

                            {/* Header Image/Gradient */}
                            <div className="h-32 bg-gradient-to-br from-violet-900/40 via-purple-900/20 to-black relative overflow-hidden flex items-center justify-center">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                                <div className="text-center z-10 p-4 mt-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm border border-white/20">
                                        <Sparkles className="w-6 h-6 text-violet-300" />
                                    </div>
                                    <h2 className="text-xl font-bold text-white shadow-sm">Get The Extension</h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 left-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center transition-colors border border-white/5"
                                >
                                    <X className="w-4 h-4 text-neutral-400" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 pt-2">
                                <AnimatePresence mode="wait">
                                    {status === "success" ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-center py-8"
                                        >
                                            <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                                                <Check className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2">Redirecting...</h3>
                                            <p className="text-sm text-neutral-400">
                                                Please complete your payment on PayPal.
                                            </p>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="input"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="space-y-5"
                                        >
                                            <p className="text-sm text-neutral-400 text-center">
                                                Unlock cinematic voice capabilities for your Janitor AI bots instantly.
                                            </p>

                                            {/* Inputs */}
                                            <div className="space-y-3">
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wide ml-1">
                                                        Where should we send access?
                                                    </label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                                                        <input
                                                            type="email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            placeholder="your.email@example.com"
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all"
                                                            disabled={status === "processing"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {error && (
                                                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-xs text-center">
                                                    {error}
                                                </div>
                                            )}

                                            {/* Pay Button */}
                                            <button
                                                onClick={handlePurchase}
                                                disabled={status === "processing"}
                                                className="w-full py-3.5 rounded-xl bg-[#0070BA] hover:bg-[#005ea6] text-white font-bold flex items-center justify-center gap-2 transition-all shadow-[0_4px_20px_-4px_rgba(0,112,186,0.5)] disabled:opacity-70 disabled:grayscale group relative overflow-hidden"
                                            >
                                                {status === "processing" ? (
                                                    <div className="flex items-center gap-2">
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                        <span>Processing...</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 z-10">
                                                        <span>Pay with</span>
                                                        <span className="font-extrabold italic">PayPal</span>
                                                    </div>
                                                )}
                                            </button>

                                            <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-600">
                                                <CreditCard className="w-3 h-3" />
                                                <span>Secure SSL Payment</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
