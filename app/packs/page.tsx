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
     * Verify a recurring pack subscription after PayPal redirect.
     * PayPal adds ?subscription_id=I-XXXXX to the return URL for billing subscriptions.
     */
    const verifyPackSubscription = useCallback(async (subscriptionId: string) => {
        if (verifying) return;
        setVerifying(true);
        try {
            console.log("Verifying pack subscription:", subscriptionId);
            const res = await fetch("/api/paypal/verify-pack-subscription", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subscriptionId }),
            });

            const data = await res.json();
            if (data.success) {
                console.log("✅ Pack subscription verified & active:", data);
                router.refresh();
            } else {
                console.warn("⚠️ Subscription not yet active:", data.status);
            }
        } catch (error) {
            console.error("❌ Verification error:", error);
        } finally {
            setVerifying(false);
        }
    }, [verifying, router]);

    useEffect(() => {
        const success = searchParams.get("success");
        const canceled = searchParams.get("canceled");
        const pack = searchParams.get("pack") || "";
        // PayPal adds subscription_id for recurring billing subscriptions
        const subscriptionId = searchParams.get("subscription_id");
        // Legacy: token for one-time orders
        const token = searchParams.get("token");

        if (pack) {
            const formattedName = pack.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
            setItemName(formattedName);
        }

        if (success === "true") {
            setModalState({ open: true, status: "success" });
            if (subscriptionId) {
                // Recurring billing subscription — verify with PayPal
                verifyPackSubscription(subscriptionId);
            } else if (token) {
                // One-time order capture (legacy fallback)
                fetch("/api/paypal/capture-order", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ orderId: token, itemId: pack }),
                }).then(r => r.json()).then(d => {
                    if (d.status === "COMPLETED") {
                        console.log("✅ One-time order captured:", d);
                        router.refresh();
                    }
                }).catch(console.error);
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
