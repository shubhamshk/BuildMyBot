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
