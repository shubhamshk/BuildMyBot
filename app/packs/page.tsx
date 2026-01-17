"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ResponsiveNavbar } from "@/components/responsive-navbar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Pack, Service, packs, services } from "@/lib/packs/data";
import { PackCard } from "@/components/packs/pack-card";
import { ServiceCard } from "@/components/packs/service-card";
import { PurchaseModal } from "@/components/packs/purchase-modal";

export default function PacksPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
            <PacksPageContent />
        </Suspense>
    );
}

function PacksPageContent() {
    const { scrollY } = useScroll();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [scrolled, setScrolled] = useState(false);
    const [isCapturing, setIsCapturing] = useState(false);
    const [captureSuccess, setCaptureSuccess] = useState(false);

    useEffect(() => {
        const checkPayment = async () => {
            const token = searchParams.get("token");
            const success = searchParams.get("success");
            // PayPal returns 'token' which is the order ID in standard checkout

            if (success === "true" && token && !isCapturing) {
                setIsCapturing(true);
                try {
                    const response = await fetch("/api/paypal/capture-order", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ orderId: token }),
                    });

                    if (response.ok) {
                        setCaptureSuccess(true);
                        // Clean URL
                        router.replace("/packs", { scroll: false });
                    } else {
                        console.error("Failed to capture payment");
                        // Optionally show error toast
                    }
                } catch (err) {
                    console.error("Capture error:", err);
                } finally {
                    setIsCapturing(false);
                }
            }
        };

        checkPayment();
    }, [searchParams, router, isCapturing]);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 20);
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Pack | Service | null>(null);

    const handleOpenModal = (item: Pack | Service) => {
        setSelectedItem(item);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedItem(null);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-violet-500/30">
            <ResponsiveNavbar scrolled={scrolled} />

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] z-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[100px] animate-pulse-slow" />
                    <div className="absolute top-20 right-1/4 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
                </div>

                <div className="container max-w-6xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                            <Sparkles className="w-4 h-4 text-violet-300" />
                            <span className="text-sm font-medium text-violet-200">Premium Collection</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 drop-shadow-sm">
                            Premium Prompt Packs<br />& Custom Creations
                        </h1>

                        <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Upgrade your character creation with curated prompt collections and bespoke services.
                            One-time purchases. No subscriptions. Built for creators.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* PROMPT PACKS SECTION */}
            <section className="py-20 px-6 relative z-10">
                <div className="container max-w-6xl mx-auto">
                    <div className="mb-12 flex items-end justify-between border-b border-white/10 pb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">Prompt Packs</h2>
                            <p className="text-neutral-400">Instant access to high-quality curated prompts.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {packs.map((pack, index) => (
                            <PackCard
                                key={pack.id}
                                pack={pack}
                                index={index}
                                onClick={handleOpenModal}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CUSTOM SERVICES SECTION */}
            <section className="py-20 px-6 relative z-10 bg-gradient-to-b from-transparent to-black/40">
                <div className="container max-w-6xl mx-auto">
                    <div className="mb-12 flex items-end justify-between border-b border-white/10 pb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">Custom Services</h2>
                            <p className="text-neutral-400">Let us bring your specific ideas to life.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                index={index}
                                onClick={handleOpenModal}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-12 px-6 border-t border-white/10 bg-neutral-900/50">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-sm font-medium text-white">Characteria</span>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-neutral-400">
                            <Link href="/pricing" className="hover:text-white transition-colors">
                                Pricing
                            </Link>
                            <Link href="#" className="hover:text-white transition-colors">
                                Privacy
                            </Link>
                            <Link href="#" className="hover:text-white transition-colors">
                                Contact
                            </Link>
                            <ThemeToggle />
                        </div>
                    </div>
                    <div className="mt-8 text-center text-xs text-neutral-500">
                        © 2024 Characteria. Built for creators.
                    </div>
                </div>
            </footer>

            {/* PURCHASE MODAL */}
            <PurchaseModal
                isOpen={modalOpen}
                onClose={handleCloseModal}
                item={selectedItem}
            />
            {/* CAPTURE SUCCESS MODAL */}
            {captureSuccess && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-neutral-900 border border-green-500/30 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
                        <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                            <Sparkles className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Payment Successful!</h3>
                        <p className="text-neutral-400 mb-6">
                            Thank you for your purchase. We have received your order.
                        </p>
                        <button
                            onClick={() => setCaptureSuccess(false)}
                            className="w-full py-3 rounded-xl bg-white text-black font-bold hover:bg-neutral-200 transition-colors"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            )}

            {/* CAPTURING LOADING OVERLAY */}
            {isCapturing && (
                <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 backdrop-blur-md">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-white font-medium">Verifying Payment...</p>
                    </div>
                </div>
            )}
        </div>
    );
}
