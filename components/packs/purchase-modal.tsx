"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Loader2, Mail, CreditCard, MessageSquare } from "lucide-react";
import { Pack, Service } from "@/lib/packs/data";

interface PurchaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: Pack | Service | null;
}

export function PurchaseModal({ isOpen, onClose, item }: PurchaseModalProps) {
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<"input" | "processing" | "success">("input");
    const [error, setError] = useState("");

    const isService = item && "deliveryTime" in item;

    // Reset state when modal opens/closes or item changes
    useEffect(() => {
        if (isOpen) {
            setEmail("");
            setDescription("");
            setStatus("input");
            setError("");
        }
    }, [isOpen, item]);

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handlePurchase = async () => {
        if (!item) return;

        if (!email || !isValidEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (isService && !description.trim()) {
            setError("Please describe what you want.");
            return;
        }

        setError("");
        setStatus("processing");

        try {
            const response = await fetch("/api/paypal/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    itemId: item.id,
                    email: email,
                    description: description
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create payment order");
            }

            if (data.approvalUrl) {
                // Redirect to PayPal
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
                        <div className="bg-neutral-900/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl max-w-md w-full overflow-hidden pointer-events-auto ring-1 ring-white/10">

                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-white/5 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 opacity-50" />
                                <div className="relative z-10 pr-8">
                                    <h2 className="text-xl font-bold text-white leading-tight">{item.title}</h2>
                                    <p className="text-sm text-neutral-400 mt-1">
                                        {isService ? 'Custom Service Request' : 'Premium Prompt Pack'}
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
                                            <h3 className="text-2xl font-bold text-white mb-2">Success!</h3>
                                            <p className="text-neutral-300 mb-6">
                                                {isService
                                                    ? "Your request has been received. We'll verify your payment and email you shortly to confirm details."
                                                    : "Your purchase was successful! Check your email for the download link and instructions."
                                                }
                                            </p>
                                            <button
                                                onClick={onClose}
                                                className="w-full py-3 rounded-xl bg-white text-black font-bold hover:bg-neutral-200 transition-colors"
                                            >
                                                Close
                                            </button>
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
                                                        ${(item as Service).priceLabel || item.price}
                                                    </span>
                                                    <span className="text-neutral-500 text-sm ml-1">USD</span>
                                                </div>
                                            </div>

                                            {/* Inputs */}
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                                                        <Mail className="w-4 h-4 text-violet-400" />
                                                        Email Address <span className="text-red-400">*</span>
                                                    </label>
                                                    <input
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="you@example.com"
                                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
                                                        disabled={status === "processing"}
                                                    />
                                                    <p className="text-xs text-neutral-500">We'll send the files to this email.</p>
                                                </div>

                                                {isService && (
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                                                            <MessageSquare className="w-4 h-4 text-fuchsia-400" />
                                                            Describe your request <span className="text-red-400">*</span>
                                                        </label>
                                                        <textarea
                                                            value={description}
                                                            onChange={(e) => setDescription(e.target.value)}
                                                            placeholder="Briefly describe what you're looking for..."
                                                            rows={3}
                                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500/50 transition-all resize-none"
                                                            disabled={status === "processing"}
                                                        />
                                                    </div>
                                                )}
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
                                                        Processing Payment...
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="italic font-serif font-black text-lg">Pay</span>
                                                        <span className="italic font-serif font-black text-lg text-blue-200">Pal</span>
                                                        <CreditCard className="w-5 h-5 ml-1 opacity-80 group-hover:translate-x-1 transition-transform" />
                                                    </>
                                                )}
                                            </button>
                                            <p className="text-xs text-center text-neutral-500 mt-2">
                                                Secure payment processing by PayPal. One-time payment.
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
