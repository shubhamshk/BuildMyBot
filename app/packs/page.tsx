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

    /**
     * Capture a one-time PayPal order after redirect.
     * PayPal appends ?token=ORDER_ID&PayerID=XXX to the return URL.
     * We must call /api/paypal/capture-order to actually debit the buyer.
     */
    const captureOrder = useCallback(async (orderId: string, plan: string) => {
        if (verifying) return;
        setVerifying(true);
        try {
            console.log("Capturing PayPal order:", orderId);
            const res = await fetch("/api/paypal/capture-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId, itemId: plan }),
            });

            const data = await res.json();
            if (data.status === "COMPLETED" || data.captureId) {
                console.log("✅ Pack purchase captured & saved to DB:", data);
                router.refresh();
            } else {
                console.warn("⚠️ Capture returned unexpected status:", data);
            }
        } catch (error) {
            console.error("❌ Capture error:", error);
        } finally {
            setVerifying(false);
        }
    }, [verifying, router]);

    useEffect(() => {
        const success = searchParams.get("success");
        const canceled = searchParams.get("canceled");
        const plan = searchParams.get("plan") || "";
        // PayPal appends token (order ID) and PayerID on redirect
        const token = searchParams.get("token");

        if (plan) {
            const formattedName = plan.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
            setItemName(formattedName);
        }

        if (success === "true") {
            setModalState({ open: true, status: "success" });
            // Capture the order to actually debit the buyer and record in DB
            if (token) {
                captureOrder(token, plan);
            }
        } else if (canceled === "true") {
            setModalState({ open: true, status: "canceled" });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    const handleClose = () => {
        setModalState(prev => ({ ...prev, open: false }));
        router.replace("/packs", { scroll: false });
    };

    return (
        <>
            <div className="pt-24">
                <PacksSection />
            </div>

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
            <ResponsiveNavbar />

            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-amber-500" /></div>}>
                <PacksContent />
            </Suspense>
        </main>
    );
}
