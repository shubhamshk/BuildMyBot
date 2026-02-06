"use client";

import { Suspense, useEffect, useState } from "react";
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

    useEffect(() => {
        const success = searchParams.get("success");
        const canceled = searchParams.get("canceled");
        const plan = searchParams.get("plan");

        // Simple mapping or decoding if plan ID is passed. 
        // For better UX, we could map ID to Name, but for now we fallback to "Pack".
        // The URL params might contain the Plan ID or Plan Name depending on how we construct redirect.
        // Assuming we might want to pass name in URL or just generic.
        // Let's rely on backend redirect to possibly include name, or just generic.
        // Actually, let's try to map generic IDs if possible or just use what we have.
        if (plan) {
            // Optional: Map common IDs to readability if needed, or just format
            const formattedName = plan.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            setItemName(formattedName);
        }

        if (success === "true") {
            setModalState({ open: true, status: "success" });
        } else if (canceled === "true") {
            setModalState({ open: true, status: "canceled" });
        }
    }, [searchParams]);

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
