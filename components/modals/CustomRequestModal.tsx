"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, MessageSquare, Send } from "lucide-react";
import { SpecialPack } from "@/lib/packs/data";

interface CustomRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    item: SpecialPack | null;
}

export function CustomRequestModal({ isOpen, onClose, onConfirm, item }: CustomRequestModalProps) {
    const [requestText, setRequestText] = useState("");
    const [status, setStatus] = useState<"input" | "sending" | "sent">("input");

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setRequestText("");
            setStatus("input");
        }
    }, [isOpen]);

    const handleSubmit = async () => {
        if (!requestText.trim()) return;

        setStatus("sending");

        // Fake delay to simulate sending
        await new Promise(resolve => setTimeout(resolve, 1500));

        setStatus("sent");

        // Wait a moment then proceed to payment
        setTimeout(() => {
            onConfirm();
        }, 1000);
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
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[80]"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden pointer-events-auto flex flex-col"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-gradient-to-r from-amber-900/20 to-transparent">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
                                        <MessageSquare className="w-5 h-5 text-amber-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white">Describe Your Request</h2>
                                        <p className="text-sm text-neutral-400">Tell us what you want in your pack</p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                                >
                                    <X className="w-5 h-5 text-neutral-400" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <AnimatePresence mode="wait">
                                    {status === "sent" ? (
                                        <motion.div
                                            key="sent"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="py-12 flex flex-col items-center text-center"
                                        >
                                            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4 border border-green-500/30 animate-pulse">
                                                <Send className="w-8 h-8 text-green-500" />
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2">Request Received!</h3>
                                            <p className="text-neutral-400">Proceeding to payment...</p>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="input"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="space-y-4"
                                        >
                                            <div className="space-y-2">
                                                <p className="text-sm text-neutral-300">
                                                    Please provide details about the characters, themes, or specific scenarios you'd like included in your custom pack.
                                                </p>
                                                <textarea
                                                    value={requestText}
                                                    onChange={(e) => setRequestText(e.target.value)}
                                                    placeholder="e.g. I want a fantasy themed pack with elf characters..."
                                                    className="w-full h-40 bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 resize-none transition-all"
                                                    disabled={status === "sending"}
                                                />
                                            </div>

                                            <button
                                                onClick={handleSubmit}
                                                disabled={!requestText.trim() || status === "sending"}
                                                className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:grayscale mt-2"
                                            >
                                                {status === "sending" ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                        Sending Request...
                                                    </>
                                                ) : (
                                                    <>
                                                        Submit Request
                                                        <Send className="w-4 h-4 opacity-80" />
                                                    </>
                                                )}
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
