"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowRight, Sparkles, Mic } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { ThemeToggle } from "@/components/theme-toggle";
import { ResponsiveNavbar } from "@/components/responsive-navbar";
import { SocialProof } from "@/components/social-proof";
import { PacksSection } from "@/components/packs-section";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Floating Discord Button */}
      <a
        href="https://discord.gg/6dSpxjSkfG"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Join us on Discord"
        className="fixed top-20 right-6 z-50 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-full shadow-lg p-3 flex items-center justify-center transition-all duration-200 group"
        style={{ boxShadow: '0 4px 24px 0 rgba(88,101,242,0.15)' }}
      >
        <span className="absolute inset-0 rounded-full pointer-events-none bg-[#5865F2]/40 blur-[8px] opacity-60 group-hover:opacity-80 transition" />
        <FaDiscord
          className="relative w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform z-10"
          style={{
            filter:
              'drop-shadow(0 0 4px #5865F2) drop-shadow(0 0 2px #fff)',
          }}
        />
      </a>

      {/* Floating Discount Logo */}
      <a
        href="#premium-family-roleplay-discount"
        onClick={(e) => {
          e.preventDefault();
          const target = document.getElementById("premium-family-roleplay-discount");
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 xl:bottom-12 xl:right-12 z-[100] group flex items-center gap-3 bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 hover:from-red-500 hover:to-amber-400 transition-all p-3 md:px-5 md:py-3 rounded-full shadow-[0_0_30px_rgba(245,158,11,0.6)] border border-amber-300/50 cursor-pointer transform hover:-translate-y-1 hover:scale-105"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 rounded-full animate-ping opacity-20 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
        <div className="relative z-10 flex items-center justify-center bg-white/20 rounded-full p-1.5 backdrop-blur-sm">
          <span className="text-xl leading-none drop-shadow-md">🎁</span>
        </div>
        <div className="relative z-10 hidden sm:flex flex-col">
          <span className="font-black text-[10px] md:text-xs uppercase tracking-widest text-red-100 drop-shadow-md leading-none mb-0.5">
            Limited Time
          </span>
          <span className="font-extrabold text-white text-xs md:text-sm drop-shadow-lg leading-none">
            Special Offer!
          </span>
        </div>
      </a>

      {/* Responsive Navigation */}
      <ResponsiveNavbar scrolled={scrolled} />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 pt-32 pb-16 overflow-hidden">
        {/* Animated Background Slideshow */}
        <div className="absolute left-0 right-0 top-16 bottom-0 z-0 overflow-hidden opacity-80 mask-image-gradient">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background z-10" />
          <div className="hero-slideshow-track flex h-full items-start" style={{ width: '200%' }}>
            {(() => {
              const images = [
                "https://res.cloudinary.com/drdd0gfrc/image/upload/v1771340551/TA-2026-01-13-03-07-26-_artist_ma-307256307_lcqyy6.png",
                "https://res.cloudinary.com/drdd0gfrc/image/upload/v1771340550/TA-2026-01-13-11-54-14-_artist_ma-3018215985_xd3p7k.png",
                "https://res.cloudinary.com/drdd0gfrc/image/upload/v1771340545/TA-2026-01-13-02-59-04-_artist_ma-526226082_gmmhye.png",
                "https://res.cloudinary.com/drdd0gfrc/image/upload/v1771340549/TA-2026-01-13-15-07-52-_artist_ma-2968179715_imyzm1.png",
                "https://res.cloudinary.com/drdd0gfrc/image/upload/v1771340548/TA-2026-01-13-14-53-32-_artist_ma-132961706_o7j9dq.png",
                "https://res.cloudinary.com/drdd0gfrc/image/upload/v1771340549/TA-2026-01-13-02-57-58-_artist_ma-1970745954_onbuu1.png",
                "https://res.cloudinary.com/drdd0gfrc/image/upload/v1771340546/TA-2026-01-13-14-46-25-_artist_ma-735908093_n32wlf.png",
                "https://res.cloudinary.com/drdd0gfrc/image/upload/v1771340548/TA-2026-01-13-14-58-30-_artist_ma-271327577_v7ucn8.png",
                "https://res.cloudinary.com/drdd0gfrc/image/upload/v1771340547/TA-2026-01-13-14-50-21-_artist_ma-3351602457_1_z19wh5.png",
                "https://res.cloudinary.com/drdd0gfrc/image/upload/v1771340544/TA-2026-01-13-14-42-27-_artist_ma-1635821493_dx8vyz.png",
                "https://res.cloudinary.com/drdd0gfrc/image/upload/v1771340545/TA-2026-01-13-02-48-24-_artist_ma-3268805038_nwnjwv.png",
              ];
              const allImages = [...images, ...images];
              return (
                <div className="flex h-[500px]" style={{ width: '100%' }}>
                  {allImages.map((url, idx) => (
                    <div
                      key={`img-gallery-${idx}`}
                      className="flex-shrink-0 h-full px-2"
                      style={{ width: `${100 / images.length}%` }}
                    >
                      <img
                        src={url}
                        alt="Slideshow"
                        className="w-full h-full object-cover rounded-2xl"
                        style={{
                          filter: 'grayscale(20%) brightness(0.8)',
                        }}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 font-semibold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(245,158,11,0.2)] flex items-center gap-2 mx-auto justify-center w-fit">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Premium AI Marketplace
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight"
          >
            <span className="text-white drop-shadow-xl">
              The Ultimate
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-500 to-amber-600 drop-shadow-[0_2px_24px_rgba(245,158,11,0.5)]">
              Images + Bot Packs
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed text-neutral-300"
          >
            Discover, buy, and collect premium  personas.
            <br className="hidden md:block" />
            <span className="text-white font-medium">Bots, Image Packs, Prompts & Creation Systems.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/bots"
              className="px-8 py-4 rounded-xl font-bold flex items-center gap-2 group bg-amber-500 hover:bg-amber-400 text-black shadow-[0_0_40px_rgba(245,158,11,0.4)] transition-all transform hover:scale-105"
            >
              Explore Bot Packs
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/vault"
              className="px-8 py-4 rounded-xl font-bold flex items-center gap-2 group bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all backdrop-blur-sm"
            >
              Open The Vault
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center mt-6"
          >
            <a
              href="#affair-bot-pack"
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById("affair-bot-pack");
                if (target) {
                  target.scrollIntoView({ behavior: "smooth", block: "center" });
                }
              }}
              className="px-10 py-3 rounded-full font-bold text-sm md:text-base flex items-center gap-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white shadow-[0_0_30px_rgba(225,29,72,0.4)] transition-all transform hover:scale-105 border border-white/10"
            >
              <Sparkles className="w-5 h-5" />
              Today's Special Bot Packs
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex justify-center opacity-80"
          >
            <SocialProof />
          </motion.div>
        </div>
      </section>



      {/* Packs Section - Replaces old features */}
      <PacksSection />

      {/* Final CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-amber-500/5 blur-[100px] -z-10" />
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="glass-dark rounded-[3rem] p-12 md:p-20 text-center border border-amber-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent opacity-50 pointer-events-none" />

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 relative z-10">
              Ready to unlock the full vault?
            </h2>
            <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto relative z-10">
              Join thousands of creators who use Characteria to find their perfect AI companions.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-bold shadow-xl shadow-amber-900/20 transition-all transform hover:scale-105"
              >
                Get Full Access
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 flex items-center justify-center border border-amber-500/20">
                <Sparkles className="w-5 h-5 text-amber-500" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">Characteria</span>
            </div>
            <div className="flex items-center gap-8 text-sm font-medium text-neutral-400">
              <Link href="/pricing" className="hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <ThemeToggle />
            </div>
          </div>
          <div className="mt-8 text-center text-xs text-neutral-600">
            © 2024 Characteria. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
