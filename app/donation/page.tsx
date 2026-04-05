"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ResponsiveNavbar } from "@/components/responsive-navbar";
import { ExternalLink, CircleDollarSign, CheckCircle2, X, Check, Loader2, Mail, CreditCard, Sparkles, Crown, HeartHandshake, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- DONATION MODAL ---
function DonationModal({ 
  isOpen, 
  onClose, 
  mode 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  mode: "tiers" | "custom" 
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"input" | "processing" | "success">("input");
  const [error, setError] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmountStr, setCustomAmountStr] = useState<string>("10");

  const amounts = [50, 100, 250, 450];

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setStatus("input");
      setError("");
      setSelectedAmount(mode === "tiers" ? 50 : 10);
      setCustomAmountStr("10");
    }
  }, [isOpen, mode]);

  const effectiveAmount = mode === "tiers" ? selectedAmount : Math.max(10, parseInt(customAmountStr) || 10);

  const getTheme = (amount: number, isCustom: boolean) => {
    if (isCustom) {
      return {
        gradient: "from-cyan-500 to-blue-600",
        border: "border-cyan-500/40",
        shadow: "shadow-[0_0_40px_-5px_rgba(6,182,212,0.5)]",
        text: "text-cyan-100",
        icon: <HeartHandshake className="w-8 h-8 text-cyan-200" />
      };
    }
    if (amount === 50) {
      return {
        gradient: "from-neutral-600 to-neutral-800",
        border: "border-neutral-500/30",
        shadow: "",
        text: "text-neutral-200",
        icon: <Sparkles className="w-7 h-7 text-neutral-400" />
      };
    } else if (amount === 100 || amount === 250) {
      return {
        gradient: "from-violet-600 to-fuchsia-700",
        border: "border-violet-500/40",
        shadow: "shadow-[0_0_40px_-5px_rgba(139,92,246,0.4)]",
        text: "text-violet-200",
        icon: <Sparkles className="w-7 h-7 text-violet-300" />
      };
    } else {
      return {
        gradient: "from-amber-400 via-orange-500 to-rose-600",
        border: "border-amber-400/50",
        shadow: "shadow-[0_0_50px_-5px_rgba(251,191,36,0.6)]",
        text: "text-amber-100 font-extrabold",
        icon: <Crown className="w-8 h-8 text-amber-200" />
      };
    }
  };

  const currentTheme = getTheme(effectiveAmount, mode === "custom");

  const handlePurchase = async () => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!email || !isValidEmail) {
      setError("Please enter a valid email address.");
      return;
    }

    if (mode === "custom" && effectiveAmount < 10) {
      setError("Minimum custom donation is $10.");
      return;
    }

    setError("");
    setStatus("processing");

    try {
      const response = await fetch("/api/paypal/create-donation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: effectiveAmount,
          planName: mode === "custom" ? `Custom Support ($${effectiveAmount})` : effectiveAmount === 450 ? "Premium VIP" : `Donation Tier $${effectiveAmount}`,
          email
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create order");
      }

      if (data.approvalUrl) {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[60]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className={`bg-[#0f0f12]/90 backdrop-blur-3xl rounded-[2.5rem] border ${currentTheme.border} ${currentTheme.shadow} max-w-lg w-full overflow-hidden pointer-events-auto relative transition-all duration-500 shadow-2xl`}>
              
              {/* Dynamic Header */}
              <div className={`h-40 bg-gradient-to-br ${currentTheme.gradient} relative overflow-hidden flex flex-col items-center justify-center transition-all duration-500`}>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 transition-opacity"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="z-10 flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl mb-3 shadow-[0_8px_30px_rgba(0,0,0,0.2)] border border-white/30 transform hover:scale-110 transition-transform">
                  {currentTheme.icon}
                </div>
                <h2 className={`text-2xl sm:text-3xl tracking-tight font-black shadow-lg flex items-center gap-2 text-white z-10`}>
                  {mode === "tiers" ? "Support Jerry Chef" : "Fund AI Tools"}
                </h2>
                
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 hover:bg-black/50 flex items-center justify-center transition-colors border border-white/20 z-20"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="p-8">
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
                      <div className="w-20 h-20 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-6">
                        <Check className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-black text-white mb-2">Redirecting to Secure Checkout...</h3>
                    </motion.div>
                  ) : (
                    <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-7">
                      
                      {/* Amount Selection */}
                      {mode === "tiers" ? (
                        <div>
                          <label className="text-xs font-black text-neutral-400 uppercase tracking-widest pl-1 mb-3 block">
                            Select Contribution Amount
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {amounts.map((amt) => (
                              <button
                                key={amt}
                                onClick={() => setSelectedAmount(amt)}
                                className={`py-4 rounded-2xl text-xl font-black transition-all ${
                                  selectedAmount === amt 
                                  ? `bg-gradient-to-br ${currentTheme.gradient} text-white shadow-xl scale-[1.05] border border-white/30` 
                                  : "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20"
                                }`}
                              >
                                ${amt}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div>
                           <label className="text-xs font-black text-neutral-400 uppercase tracking-widest pl-1 mb-3 block">
                            Custom Amount (Min $10)
                          </label>
                          <div className="relative group">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-3xl font-black text-cyan-400 group-focus-within:text-cyan-300 transition-colors">$</span>
                            <input 
                               type="number"
                               min="10"
                               value={customAmountStr}
                               onChange={(e) => setCustomAmountStr(e.target.value)}
                               className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-5 text-3xl font-black text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all font-sans"
                            />
                          </div>
                        </div>
                      )}

                      {/* Premium Perks Section */}
                      <AnimatePresence>
                        {mode === "tiers" && selectedAmount === 450 && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }} 
                            animate={{ opacity: 1, height: "auto" }} 
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-gradient-to-r from-amber-500/10 to-orange-600/20 border border-amber-500/40 rounded-2xl p-5 overflow-hidden shadow-inner"
                          >
                            <h4 className="text-amber-400 font-black text-sm mb-2 flex items-center gap-2">
                              <Crown className="w-5 h-5 drop-shadow-md" /> VIP BENEFITS UNLOCKED:
                            </h4>
                            <p className="text-sm text-amber-100/90 leading-relaxed font-bold">
                              Gain lifetime access to premium content, exclusive NSbots, and direct priority support for bots and images.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="space-y-2 pt-2">
                        <label className="text-xs font-black text-neutral-400 uppercase tracking-widest ml-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your.email@example.com"
                            className="w-full bg-black/40 border border-white/10 rounded-2xl pl-14 pr-5 py-4 text-lg font-bold text-white placeholder:text-neutral-600 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/30 transition-all shadow-inner"
                            disabled={status === "processing"}
                          />
                        </div>
                      </div>

                      {error && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm text-center font-bold">
                          {error}
                        </div>
                      )}

                      <button
                        onClick={handlePurchase}
                        disabled={status === "processing"}
                        className="w-full py-5 rounded-2xl bg-gradient-to-r from-[#0070BA] to-[#005ea6] hover:from-[#005ea6] hover:to-[#004b87] text-white font-black flex items-center justify-center gap-3 transition-all shadow-[0_10px_25px_-5px_rgba(0,112,186,0.6)] hover:shadow-[0_15px_30px_-5px_rgba(0,112,186,0.8)] active:scale-95 disabled:opacity-70 disabled:scale-100 h-16 text-lg"
                      >
                        {status === "processing" ? (
                          <div className="flex items-center gap-3">
                            <Loader2 className="w-6 h-6 animate-spin" />
                            <span>Processing...</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span>Proceed securely via</span>
                            <span className="font-black italic tracking-tight text-2xl">PayPal</span>
                            <ArrowRight className="w-6 h-6 ml-1" />
                          </div>
                        )}
                      </button>

                      <div className="flex items-center justify-center gap-2 text-xs text-neutral-500 uppercase tracking-widest font-black">
                        <CreditCard className="w-4 h-4" />
                        <span>SSL Secure Checkout</span>
                      </div>

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


// --- MAIN PAGE ---
export default function DonationPage() {
  const [scrolled, setScrolled] = useState(false);
  const [modalState, setModalState] = useState<{isOpen: boolean; mode: "tiers" | "custom"}>({ isOpen: false, mode: "tiers" });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("success") === "true") {
        setShowSuccessModal(true);
      }
    }
  }, []);

  const clearSuccessParams = () => {
    setShowSuccessModal(false);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("success");
      url.searchParams.delete("token");
      url.searchParams.delete("PayerID");
      window.history.replaceState({}, document.title, url.toString());
    }
  };

  const goals = [
    {
      id: 1,
      title: "General Donations",
      description: "Support my continuous work, regular updates, and new features.",
      mode: "tiers" as const,
      color: "from-orange-400 via-red-500 to-rose-600",
      bgBlur: "bg-rose-500/30",
      icon: <Sparkles className="w-8 h-8 text-white" />
    },
    {
      id: 2,
      title: "AI Tools & Infrastructure",
      description: "Help fund expensive API keys, hardware, servers, and accessories.",
      mode: "custom" as const,
      color: "from-cyan-400 via-blue-500 to-indigo-600",
      bgBlur: "bg-blue-500/30",
      icon: <HeartHandshake className="w-8 h-8 text-white" />
    }
  ];

  return (
    <div className="min-h-screen font-sans text-neutral-900 dark:text-neutral-100 pt-28 pb-20 relative overflow-hidden transition-colors duration-700">
      
      {/* Super Premium Glassmorphic Background Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-neutral-50 dark:bg-[#08080a] transition-colors duration-700"></div>
        {/* Animated Orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-violet-600/20 dark:bg-violet-900/40 blur-[130px] mix-blend-multiply dark:mix-blend-screen animate-pulse duration-10000"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-cyan-500/20 dark:bg-cyan-900/30 blur-[120px] mix-blend-multiply dark:mix-blend-screen" style={{ animation: "pulse 12s infinite alternate" }}></div>
        <div className="absolute top-[20%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-rose-500/20 dark:bg-rose-900/30 blur-[100px] mix-blend-multiply dark:mix-blend-screen" style={{ animation: "pulse 15s infinite alternate" }}></div>
        <div className="absolute top-[50%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-amber-500/10 dark:bg-amber-900/20 blur-[90px] mix-blend-multiply dark:mix-blend-screen" style={{ animation: "pulse 8s infinite alternate-reverse" }}></div>
        <div className="absolute inset-0 bg-white/30 dark:bg-black/50 backdrop-blur-[80px]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 dark:opacity-20 mix-blend-overlay"></div>
      </div>

      <ResponsiveNavbar scrolled={scrolled} />
      
      {/* Premium Thank You Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="bg-gradient-to-br from-[#111116] to-[#0a0a0c] border border-green-500/40 rounded-[3rem] p-10 max-w-lg w-full shadow-[0_0_80px_-10px_rgba(34,197,94,0.5)] relative text-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent pointer-events-none" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[80px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />

              <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(52,211,153,0.6)] mb-8 text-white text-5xl transform hover:scale-110 transition-transform relative z-10">
                <HeartHandshake className="w-12 h-12" />
              </div>

              <h2 className="text-4xl font-black text-white mb-3 tracking-tight drop-shadow-lg relative z-10">Thank You!</h2>
              <p className="text-neutral-300 text-lg font-medium mb-8 leading-relaxed relative z-10">
                Your generous donation means the world to us. Your incredible support fuels our journey to build and maintain better AI tools for everyone. 
              </p>

              <button 
                onClick={clearSuccessParams}
                className="w-full py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-lg font-black transition-all border border-white/20 hover:border-white/40 active:scale-95 relative z-10"
              >
                Return to Dashboard
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <DonationModal 
        isOpen={modalState.isOpen} 
        onClose={() => setModalState({ ...modalState, isOpen: false })} 
        mode={modalState.mode}
      />

      <main className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-center justify-between mb-16 bg-white/70 dark:bg-[#111116]/80 backdrop-blur-3xl p-8 sm:p-10 rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-white/80 dark:border-white/10 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-orange-500/20 transition-colors" />

          <div className="flex items-center gap-6 w-full md:w-auto z-10">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[1.5rem] bg-gradient-to-tr from-[#f25c32] via-[#ff7142] to-[#ffa585] flex items-center justify-center text-white text-3xl sm:text-4xl font-black shadow-[0_0_40px_rgba(242,92,50,0.4)] shrink-0 transform -rotate-3 hover:rotate-0 transition-transform">
              J
            </div>
            <div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tighter drop-shadow-sm text-neutral-900 dark:text-white">@jerry_chef</h1>
              <p className="text-neutral-500 dark:text-neutral-400 text-lg sm:text-xl mt-1 font-bold tracking-wide">Support the creative journey</p>
            </div>
          </div>
          <Link 
            href="https://janitorai.com/profiles/835ea548-92d4-4b53-a1b3-9d07a486c2be_profile-of-jerry-chef" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto mt-8 md:mt-0 flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all shadow-xl hover:shadow-2xl text-lg sm:text-xl z-10"
          >
            Visit Janitor AI
            <ExternalLink className="w-5 h-5" />
          </Link>
        </motion.div>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-8 px-2">
            <h2 className="text-sm sm:text-base font-black text-neutral-500 dark:text-neutral-400 tracking-[0.25em] uppercase flex items-center gap-3">
              Support Methods 
              <span className="bg-neutral-200 dark:bg-[#1a1a24] text-neutral-700 dark:text-neutral-300 px-3 py-1 rounded-lg text-xs shadow-inner">
                {goals.length} OPTIONS
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {goals.map((goal, idx) => {
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.15 }}
                  key={goal.id} 
                  className="relative overflow-hidden bg-white/80 dark:bg-[#111116]/80 backdrop-blur-3xl rounded-[2.5rem] p-8 sm:p-10 shadow-2xl dark:shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-white/80 dark:border-white/10 transition-all hover:-translate-y-2 hover:shadow-3xl group flex flex-col h-full"
                >
                  <div className={`absolute -right-12 -top-12 w-48 h-48 rounded-full ${goal.bgBlur} blur-[60px] group-hover:opacity-100 opacity-50 transition-opacity duration-700`}></div>
                  <div className={`absolute -left-12 -bottom-12 w-48 h-48 rounded-full ${goal.bgBlur} blur-[60px] group-hover:opacity-100 opacity-50 transition-opacity duration-700`}></div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-8">
                      <div className={`w-16 h-16 rounded-[1.2rem] mb-6 flex items-center justify-center shadow-xl bg-gradient-to-br ${goal.color} transform group-hover:scale-110 transition-transform duration-500`}>
                        {goal.icon}
                      </div>
                      <h3 className="font-black text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight mb-3">
                        {goal.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg font-semibold leading-relaxed">
                        {goal.description}
                      </p>
                    </div>

                    <div className="mt-auto pt-6 border-t border-black/5 dark:border-white/10 w-full">
                      <button 
                        onClick={() => setModalState({ isOpen: true, mode: goal.mode })}
                        className={`w-full py-4 sm:py-5 font-black rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all active:scale-[0.98] ${
                          goal.mode === "tiers" 
                          ? "bg-neutral-900 hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-neutral-100"
                          : "bg-white dark:bg-[#1a1a24] border-2 border-neutral-200 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/20 text-neutral-900 dark:text-white"
                        } text-base sm:text-lg tracking-wide`}
                      >
                        <CircleDollarSign className="w-5 h-5 sm:w-6 sm:h-6" /> 
                        {goal.mode === "tiers" ? "VIEW DONATION TIERS" : "ENTER CUSTOM AMOUNT"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
