"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PaymentStatusModal } from "@/components/modals/PaymentSuccessModal";
import { vaultPacks } from "@/data/vaultPacks";
import { ResponsiveNavbar } from "@/components/responsive-navbar";
import { motion } from "framer-motion";
import { Zap, ArrowRight, Loader2 } from "lucide-react";
import { EmailBeforePaymentModal } from "@/components/modals/EmailBeforePaymentModal";

function VaultContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [modalState, setModalState] = useState<{
        open: boolean;
        status: "success" | "canceled";
    }>({ open: false, status: "success" });

    const [buyModalOpen, setBuyModalOpen] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedPack, setSelectedPack] = useState<any>(null);

    useEffect(() => {
        const success = searchParams.get("success");
        const canceled = searchParams.get("canceled");

        if (success === "true") {
            setModalState({ open: true, status: "success" });
        } else if (canceled === "true") {
            setModalState({ open: true, status: "canceled" });
        }
    }, [searchParams]);

    const handleClose = () => {
        setModalState(prev => ({ ...prev, open: false }));
        router.replace("/vault", { scroll: false });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleBuy = (pack: any) => {
        const modalItem = {
            id: pack.id,
            title: pack.name,
            price: pack.price,
            subtitle: pack.name, // Using name as subtitle fallback
            features: pack.features,
            goal: "Unlock content",
        };
        setSelectedPack(modalItem);
        setBuyModalOpen(true);
    }

    return (
        <>
            <div className="pt-32 px-6 pb-20">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.2)] mb-6">
                            <Zap className="w-3 h-3" />
                            Premium Archive
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black mb-6">
                            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">Vault</span>
                        </h1>
                        <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                            Exclusive, limited-edition character packs and extended storylines available for individual purchase.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {vaultPacks.map((pack, index) => (
                            <motion.div
                                key={pack.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden hover:border-amber-500/30 transition-all duration-300"
                            >
                                <div className="aspect-[4/3] bg-neutral-900 relative overflow-hidden">
                                    <img
                                        src={pack.previewImage}
                                        alt={pack.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                                </div>

                                <div className="p-6 relative z-10 -mt-10">
                                    <div className="bg-[#0a0a0a]/80 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl">
                                        <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                                            {pack.name}
                                        </h3>

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {pack.features.slice(0, 3).map((feature, i) => (
                                                <span key={i} className="text-[10px] font-medium px-2 py-1 rounded-full bg-white/5 text-neutral-300 border border-white/5">
                                                    {feature}
                                                </span>
                                            ))}
                                            {pack.features.length > 3 && (
                                                <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-white/5 text-neutral-300 border border-white/5">
                                                    +{pack.features.length - 3} more
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between mt-auto">
                                            <span className="text-2xl font-bold text-white">
                                                ${pack.price}
                                            </span>
                                            <button
                                                onClick={() => handleBuy(pack)}
                                                className="px-6 py-2.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-amber-400 transition-colors flex items-center gap-2"
                                            >
                                                Unlock
                                                <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <PaymentStatusModal
                isOpen={modalState.open}
                status={modalState.status}
                onClose={handleClose}
            />

            {buyModalOpen && selectedPack && (
                <EmailBeforePaymentModal
                    isOpen={buyModalOpen}
                    onClose={() => setBuyModalOpen(false)}
                    item={selectedPack}
                />
            )}
        </>
    );
}

export default function VaultPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-amber-500/30">
            <ResponsiveNavbar />
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-amber-500" /></div>}>
                <VaultContent />
            </Suspense>
        </main>
    );
}
