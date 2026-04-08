"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Loader2, CreditCard, MessageSquare } from "lucide-react";

interface DiscordVaultPaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: {
        id: string;
        title: string;
        price: number;
    } | null;
}

export function DiscordVaultPaymentModal({ isOpen, onClose, item }: DiscordVaultPaymentModalProps) {
    const [discordUsername, setDiscordUsername] = useState("");
    const [status, setStatus] = useState<"input" | "processing" | "success">("input");
    const [error, setError] = useState("");

    // Reset state when modal opens/closes or item changes
    useEffect(() => {
        if (isOpen) {
            setDiscordUsername("");
            setStatus("input");
            setError("");
        }
    }, [isOpen, item]);

    const handlePurchase = async () => {
        if (!item) return;

        if (!discordUsername || discordUsername.trim().length < 2) {
            setError("Please enter a valid Discord username.");
            return;
        }

        setError("");
        setStatus("processing");

        try {
            // We use a specific endpoint or re-use create-pack-subscription
            const response = await fetch("/api/paypal/create-vault-subscription", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    planId: item.id,
                    discordUsername: discordUsername.trim(),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create subscription");
            }

            if (data.approvalUrl) {
                // Redirect to PayPal — on return PayPal adds ?subscription_id=I-XXXXX
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

    if (!item) return null;

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
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-neutral-900/90 backdrop-blur-xl rounded-2xl border border-indigo-500/30 shadow-[0_0_40px_-5px_rgba(99,102,241,0.2)] max-w-md w-full overflow-hidden pointer-events-auto ring-1 ring-white/10">

                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-indigo-500/20 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/10 opacity-70" />
                                <div className="relative z-10 pr-8">
                                    <h2 className="text-xl font-bold text-white leading-tight">{item.title}</h2>
                                    <p className="text-sm text-indigo-300 mt-1">
                                        Discord Vault Subscription
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="relative z-10 w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors -mr-2 -mt-2"
                                >
                                    <X className="w-5 h-5 text-neutral-400" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <AnimatePresence mode="wait">
                                    {status === "success" ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-center py-6"
                                        >
                                            <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                                                <Check className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2">Redirecting...</h3>
                                            <p className="text-neutral-300 mb-6">
                                                Sending you to PayPal to complete your purchase.
                                            </p>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="input"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="space-y-4"
                                        >
                                            {/* Price Display */}
                                            <div className="flex justify-between items-end mb-4 pb-4 border-b border-white/5">
                                                <span className="text-neutral-400 text-sm">Total due now</span>
                                                <div className="text-right">
                                                    <span className="text-3xl font-bold text-white">
                                                        ${item.price}
                                                    </span>
                                                    <span className="text-neutral-500 text-sm ml-1">/ mo</span>
                                                </div>
                                            </div>

                                            {/* Inputs */}
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                                                        <MessageSquare className="w-4 h-4 text-indigo-400" />
                                                        Discord Username <span className="text-indigo-400">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={discordUsername}
                                                        onChange={(e) => setDiscordUsername(e.target.value)}
                                                        placeholder="e.g. user123 or user#1234"
                                                        className="w-full bg-black/40 border border-indigo-500/30 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                                                        disabled={status === "processing"}
                                                    />
                                                    <p className="text-xs text-indigo-400/70 italic">
                                                        We need your exact Discord username to instantly provide channel access after payment.
                                                    </p>
                                                </div>
                                            </div>

                                            {error && (
                                                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                                                    {error}
                                                </div>
                                            )}

                                            {/* Pay Button */}
                                            <button
                                                onClick={handlePurchase}
                                                disabled={status === "processing"}
                                                className="w-full py-4 rounded-xl bg-[#0070BA] hover:bg-[#003087] text-white font-bold flex items-center justify-center gap-2 transition-all shadow-[0_4px_14px_0_rgba(0,112,186,0.39)] disabled:opacity-70 disabled:grayscale mt-2 group"
                                            >
                                                {status === "processing" ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                        Securely Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="italic font-serif font-black text-lg">Pay</span>
                                                        <span className="italic font-serif font-black text-lg text-blue-200">Pal</span>
                                                    </>
                                                )}
                                            </button>
                                            <p className="text-xs text-center text-neutral-500 mt-2 flex items-center justify-center gap-1">
                                                <CreditCard className="w-3 h-3" /> Secure payment via PayPal
                                            </p>
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
