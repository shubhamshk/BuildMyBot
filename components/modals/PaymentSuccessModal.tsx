"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Sparkles, Mail, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface PaymentStatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    status: "success" | "canceled";
    itemName?: string;
}

export function PaymentStatusModal({ isOpen, onClose, status, itemName }: PaymentStatusModalProps) {
    const router = useRouter();

    if (!isOpen) return null;

    const isSuccess = status === "success";

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
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-0 z-[110] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className={`bg-[#0a0a0a] border ${isSuccess ? 'border-amber-500/30' : 'border-red-500/30'} rounded-3xl p-8 max-w-md w-full relative overflow-hidden pointer-events-auto shadow-[0_0_50px_${isSuccess ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)'}]`}>
                            {/* Background Effects */}
                            <div className={`absolute -top-24 -right-24 w-48 h-48 ${isSuccess ? 'bg-amber-500/20' : 'bg-red-500/20'} rounded-full blur-[60px]`} />
                            <div className={`absolute -bottom-24 -left-24 w-48 h-48 ${isSuccess ? 'bg-purple-500/20' : 'bg-red-500/20'} rounded-full blur-[60px]`} />

                            <div className="relative z-10 flex flex-col items-center text-center">
                                {/* Icon */}
                                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${isSuccess ? 'from-green-500/20 to-emerald-500/20 border-green-500/30' : 'from-red-500/20 to-orange-500/20 border-red-500/30'} flex items-center justify-center mb-6 border shadow-[0_0_20px_${isSuccess ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}]`}>
                                    {isSuccess ? (
                                        <Check className="w-10 h-10 text-green-400" />
                                    ) : (
                                        <X className="w-10 h-10 text-red-400" />
                                    )}
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h2 className="text-3xl font-black text-white mb-2">
                                        {isSuccess ? "Payment Successful!" : "Payment Canceled"}
                                    </h2>
                                    <div className={`h-1 w-16 bg-gradient-to-r ${isSuccess ? 'from-transparent via-amber-500 to-transparent' : 'from-transparent via-red-500 to-transparent'} mx-auto mb-6`} />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-neutral-300 mb-8 leading-relaxed"
                                >
                                    {isSuccess
                                        ? (
                                            <>
                                                Thanks for purchasing <span className="text-white font-bold">{itemName || "your pack"}</span>!
                                                <div className="mt-4 text-sm text-neutral-400">
                                                    The pack will be delivered to your email address within a few hours.
                                                </div>
                                            </>
                                        )
                                        : "The payment process was canceled. No charges were made. You can try again whenever you're ready."
                                    }
                                </motion.div>

                                {isSuccess ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 mb-8 space-y-3"
                                    >
                                        <div className="flex items-start gap-3">
                                            <Mail className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                                            <p className="text-xs text-left text-neutral-400">
                                                If you have any queries, join our <a href="#" className="text-amber-400 hover:text-amber-300 underline">Discord server</a> or mail us at <a href="mailto:designbyshk@gmail.com" className="text-white hover:text-neutral-200 underline">designbyshk@gmail.com</a>.
                                            </p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 mb-8 flex items-start gap-3"
                                    >
                                        <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                                        <p className="text-xs text-left text-neutral-400">
                                            If you experienced an issue during checkout, please contact our support or try a different payment method.
                                        </p>
                                    </motion.div>
                                )}

                                <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    onClick={() => {
                                        onClose();
                                        router.replace("/packs"); // Clear params by replacing
                                    }}
                                    className={`w-full py-4 rounded-xl bg-gradient-to-r ${isSuccess ? 'from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500' : 'from-neutral-700 to-neutral-800 hover:from-neutral-600 hover:to-neutral-700'} text-white font-bold text-lg shadow-lg shadow-black/20 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2`}
                                >
                                    {isSuccess ? <Sparkles className="w-5 h-5" /> : null}
                                    {isSuccess ? "Continue Exploring" : "Close & Continue"}
                                </motion.button>
                            </div>

                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-white transition-colors rounded-full hover:bg-white/10"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
