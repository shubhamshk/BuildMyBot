"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PaymentStatusModal } from "@/components/modals/PaymentSuccessModal";
import { PacksSection } from "@/components/packs-section";
import { ResponsiveNavbar } from "@/components/responsive-navbar";
import { Loader2 } from "lucide-react";

function PacksContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [modalState, setModalState] = useState<{
        open: boolean;
        status: "success" | "canceled";
    }>({ open: false, status: "success" });

    const [itemName, setItemName] = useState("");
    const [verifying, setVerifying] = useState(false);

    const verifyPurchase = useCallback(async () => {
        if (verifying) return;
        setVerifying(true);
        try {
            console.log("Starting purchase verification...");
            // Poll for verification success - 5 attempts
            for (let i = 0; i < 5; i++) {
                const res = await fetch("/api/paypal/verify-subscription", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' }
                });

                if (res.ok) {
                    const data = await res.json();
                    if (data.success) {
                        console.log("Purchase verified successfully:", data);
                        // Refresh router to update any server components if needed
                        router.refresh();
                        return; // Exit on success
                    }
                }
                // Wait 2 seconds before retry
                await new Promise(r => setTimeout(r, 2000));
            }
            console.log("Verification polling finished without confirmation (could be pending).");
        } catch (error) {
            console.error("Verification error:", error);
        } finally {
            setVerifying(false);
        }
    }, [verifying, router]);

    useEffect(() => {
        const success = searchParams.get("success");
        const canceled = searchParams.get("canceled");
        const plan = searchParams.get("plan");

        if (plan) {
            // Optional: Map common IDs to readability if needed, or just format
            const formattedName = plan.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            setItemName(formattedName);
        }

        if (success === "true") {
            setModalState({ open: true, status: "success" });
            // Verify the purchase in the background to ensure DB status is updated
            verifyPurchase();
        } else if (canceled === "true") {
            setModalState({ open: true, status: "canceled" });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, verifyPurchase]);

    const handleClose = () => {
        setModalState(prev => ({ ...prev, open: false }));
        // Clean up URL
        router.replace("/packs", { scroll: false });
    };

    return (
        <>
            <div className="pt-24">
                {/* Reuse Packs Section to keep content available */}
                <PacksSection />
            </div>

            {/* Status Modal */}
            <PaymentStatusModal
                isOpen={modalState.open}
                status={modalState.status}
                onClose={handleClose}
                itemName={itemName || "Pack"}
            />
        </>
    );
}

export default function PacksPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-amber-500/30">
            {/* Reuse Navbar */}
            <ResponsiveNavbar />

            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-amber-500" /></div>}>
                <PacksContent />
            </Suspense>
        </main>
    );
}
