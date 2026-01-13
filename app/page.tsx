"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowRight, Sparkles, Sliders, Download, Wand2, Image as ImageIcon, BookOpen, CheckCircle2, Play, Pause } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuthButton } from "@/components/auth-button";
import { APIKeyIndicator } from "@/components/api-key-indicator";
import { SubscriptionStatusCard } from "@/components/subscription-status-card";
import { ResponsiveNavbar } from "@/components/responsive-navbar";
import Link from "next/link";
import { useState, useRef } from "react";

export default function Home() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Floating Discord Button */}
      <a
        href="https://discord.gg/VTYuMkdX"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Join us on Discord"
        className="fixed top-20 right-6 z-50 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-full shadow-lg p-3 flex items-center justify-center transition-all duration-200 group"
        style={{ boxShadow: '0 4px 24px 0 rgba(88,101,242,0.15)' }}
      >
        {/* Subtle Glow Effect */}
        <span className="absolute inset-0 rounded-full pointer-events-none bg-[#5865F2]/40 blur-[8px] opacity-60 group-hover:opacity-80 transition" />
        <FaDiscord
          className="relative w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform z-10"
          style={{
            filter:
              'drop-shadow(0 0 4px #5865F2) drop-shadow(0 0 2px #fff)',
          }}
        />
      </a>
      {/* Responsive Navigation */}
      <ResponsiveNavbar scrolled={scrolled} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-start justify-center px-6 pt-24 pb-16 overflow-hidden">
        {/* Animated Background Slideshow */}
        <div className="absolute left-0 right-0 z-0 overflow-hidden" style={{ top: '68px', height: '460px' }}>
          <div className="hero-slideshow-track flex h-full" style={{ width: '350%' }}>
            {/* Use provided gallery images for both sets */}
            {(() => {
              const images = [
                "https://res.cloudinary.com/dkwxxfewv/image/upload/v1768326742/TA-2026-01-13-14-46-25-_artist_ma-735908093_gafs9j.png",
                "https://res.cloudinary.com/dkwxxfewv/image/upload/v1768326741/TA-2026-01-13-14-58-30-_artist_ma-271327577_efkpoq.png",
                "https://res.cloudinary.com/dkwxxfewv/image/upload/v1768326698/TA-2026-01-13-12-54-27-_artist_ma-1728647033_cho5ek.png",
                "https://res.cloudinary.com/dkwxxfewv/image/upload/v1768326739/TA-2026-01-13-15-07-52-_artist_ma-2968179715_zxkzfi.png",
                "https://res.cloudinary.com/dkwxxfewv/image/upload/v1768326738/TA-2026-01-13-03-07-26-_artist_ma-307256307_jrcumn.png",
                "https://res.cloudinary.com/dkwxxfewv/image/upload/v1768326738/TA-2026-01-13-11-55-06-_artist_ma-1864865991_zdfzoq.png",
                "https://res.cloudinary.com/dkwxxfewv/image/upload/v1768326694/TA-2026-01-13-03-07-23-_artist_ma-1647098690_i8ocnz.png",
                "https://res.cloudinary.com/dkwxxfewv/image/upload/v1768326700/TA-2026-01-13-14-54-16-_artist_ma-4111183455_bgdw7w.png",
                "https://res.cloudinary.com/dkwxxfewv/image/upload/v1768326694/TA-2026-01-13-02-46-01-_artist_ma-2239987079_xf5jyh.png",
                "https://res.cloudinary.com/dkwxxfewv/image/upload/v1768326737/TA-2026-01-13-11-58-10-_artist_ma-1420471242_pwkrpx.png",
                "https://res.cloudinary.com/dkwxxfewv/image/upload/v1768326737/TA-2026-01-13-02-48-24-_artist_ma-3268805038_n9ztvj.png",
                "https://res.cloudinary.com/dkwxxfewv/image/upload/v1768326698/TA-2026-01-13-14-50-21-_artist_ma-3351602457_1_nmshjr.png",
                "https://res.cloudinary.com/dkwxxfewv/image/upload/v1768326693/TA-2026-01-13-02-38-38-_artist_ma-3962069391_v8mzt4.png",
                "https://res.cloudinary.com/dkwxxfewv/image/upload/v1768326702/TA-2026-01-13-15-06-54-_artist_ma-2605565792_wmrg4p.png",
                "https://res.cloudinary.com/dkwxxfewv/image/upload/v1768326698/TA-2026-01-13-14-35-50-_artist_ma-2060442952_dujkrv.png",
                "https://res.cloudinary.com/dkwxxfewv/image/upload/v1768326700/TA-2026-01-13-14-53-32-_artist_ma-132961706_tkmwx9.png",
                "https://res.cloudinary.com/dkwxxfewv/image/upload/v1768326698/TA-2026-01-13-12-05-07-_artist_ma-1444115690_wbekaf.png",
                "https://res.cloudinary.com/dkwxxfewv/image/upload/v1768326692/TA-2026-01-13-02-57-58-_artist_ma-1970745954_f2h9h8.png",
              ];
              // Duplicate for seamless loop
              const allImages = [...images, ...images];
              return (
                <div className="flex h-full" style={{ width: '100%' }}>
                  {allImages.map((url, idx) => (
                    <div
                      key={`img-gallery-${idx}`}
                      className="flex-shrink-0 h-full"
                      style={{ width: `${100 / images.length}%` }}
                    >
                      <img
                        src={url}
                        alt="Slideshow"
                        className="w-full h-full object-cover rounded-xl bg-neutral-800"
                        style={{
                          filter: 'blur(0.5px) brightness(0.5) contrast(1.05)',
                          background: '#222',
                        }}
                        loading="lazy"
                        decoding="async"
                        fetchPriority="high"
                      />
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>



        <div className="max-w-4xl mx-auto text-center relative z-10 mt-12 md:mt-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            style={{
              color: '#fff',
              textShadow: '0 2px 24px #101010, 0 1px 0 #181818, 0 0px 32px #06b6d4',
            }}
          >
            <span className="drop-shadow-[0_2px_16px_#a21caf] text-white">
              Create AI Characters
            </span>
            <br />
            <span className="font-extrabold drop-shadow-[0_2px_24px_#f472b6] text-blue-500">
              That Feel Real
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed text-white"
            style={{
              fontWeight: 600,
              textShadow: '0 2px 16px #212121, 0 1px 0 #1a1a1a',
            }}
          >
            Design personalities, backstories, and opening scenes using guided creation — not random AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/idea"
              className="px-8 py-4 rounded-xl font-bold flex items-center gap-2 group bg-neutral-900 border border-neutral-700 shadow-md transition-all duration-200 hover:bg-neutral-800 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)" style={{ color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.25)' }}
            >
              Start Creating
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#how-it-works"
              className="px-8 py-4 rounded-xl font-bold flex items-center gap-2 group bg-neutral-900 border border-neutral-700 shadow-md transition-all duration-200 hover:bg-neutral-800 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)" style={{ color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.25)' }}
            >
              See How It Works
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Subscription Status Section */}
      <section className="py-12 px-6">
        <SubscriptionStatusCard />
      </section>

      {/* Video Demo Section */}
      <section id="demo" className="py-24 px-6 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-border text-sm font-medium text-violet-400 mb-6">
              <Play className="w-4 h-4" />
              Watch Demo
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              See It In Action
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Watch how easy it is to create detailed, consistent AI characters in minutes
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative group"
          >
            {/* Video Container */}
            <div className="relative rounded-3xl overflow-hidden glass border border-border shadow-2xl shadow-violet-500/10">
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-violet-500/50 via-transparent to-blue-500/50 -z-10" />
              
              {/* Video Player */}
              <div className="relative aspect-video bg-[#0a0a1a]">
                {/* Replace with your actual video URL */}
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  poster="https://res.cloudinary.com/dkwxxfewv/image/upload/v1768322035/Screenshot_2026-01-13_220254_bdb7ij.png"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                >
                  <source src="https://res.cloudinary.com/dkwxxfewv/video/upload/v1768197190/Untitled_video_-_Made_with_Clipchamp_1_i4u8bm.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Play Button Overlay */}
                <motion.button
                  onClick={toggleVideo}
                  className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity ${
                    isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:bg-violet-500/20 transition-all">
                    {isPlaying ? (
                      <Pause className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    ) : (
                      <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" />
                    )}
                  </div>
                </motion.button>

                {/* Video Progress Bar Placeholder */}
                {!isPlaying && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                    <div className="h-full w-0 bg-gradient-to-r from-violet-500 to-blue-500" />
                  </div>
                )}
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-violet-500/30 blur-lg" />
              <div className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-blue-500/30 blur-lg" />
            </div>

            {/* Caption */}
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                🎬 Full walkthrough: Create a character from scratch to export
              </p>
            </div>
          </motion.div>

          {/* Video Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
          >
            {[
              { time: "0:00", label: "Getting Started" },
              { time: "0:30", label: "Character Basics" },
              { time: "1:15", label: "Personality Tuning" },
              { time: "2:00", label: "Export & Use" },
            ].map((item, i) => (
              <div
                key={i}
                className="glass rounded-xl p-4 border border-border hover:border-violet-500/50 transition-colors cursor-pointer text-center"
              >
                <span className="text-xs font-mono text-violet-400">{item.time}</span>
                <p className="text-sm font-medium text-foreground mt-1">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Product Preview Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-3xl p-8 md:p-12"
          >
            <div className="mb-6">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Example Output</span>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left: Creation Inputs */}
              <div className="space-y-6">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Character Name</label>
                  <div className="h-12 rounded-lg glass border border-border px-4 flex items-center">
                    <span className="text-foreground">Luna</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Personality Traits</label>
                  <div className="space-y-4">
                    {["Warmth", "Confidence", "Calmness"].map((trait, i) => (
                      <div key={trait}>
                        <div className="flex justify-between text-xs text-muted-foreground mb-2">
                          <span>{trait}</span>
                          <span>{[65, 45, 70][i]}%</span>
                        </div>
                        <div className="h-2 rounded-full glass overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${[65, 45, 70][i]}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Backstory Style</label>
                  <div className="h-12 rounded-lg glass border border-border px-4 flex items-center">
                    <span className="text-foreground">Mysterious Past</span>
                  </div>
                </div>
              </div>

              {/* Right: Generated Output */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Personality</h3>
                  <div className="glass rounded-lg p-4 border border-border">
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="text-sm text-foreground leading-relaxed"
                    >
                      Luna is a warm and empathetic individual who approaches others with genuine care. While she
                      maintains a calm demeanor, there&apos;s an underlying confidence that surfaces when needed. Her
                      mysterious past adds depth to her character, making her both approachable and intriguing.
                    </motion.p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Initial Message</h3>
                  <div className="glass rounded-lg p-4 border border-border">
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7, duration: 0.8 }}
                      className="text-sm text-foreground leading-relaxed italic"
                    >
                      &quot;Hello... I hope I&apos;m not bothering you. I&apos;ve been wanting to talk to someone
                      about this, but I wasn&apos;t sure where to start.&quot;
                    </motion.p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A simple, guided process to create characters with depth and consistency
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Define the Character",
                description: "Guided steps instead of blank pages",
                icon: Wand2,
              },
              {
                step: "2",
                title: "AI Builds the Personality",
                description: "Controlled rules for consistent output",
                icon: Sparkles,
              },
              {
                step: "3",
                title: "Preview & Export",
                description: "Use it anywhere — Janitor AI, roleplay, stories",
                icon: Download,
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="glass rounded-2xl p-8 hover:bg-white/5 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg glass flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-foreground" />
                </div>
                <div className="text-sm font-medium text-muted-foreground mb-2">Step {item.step}</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Tool Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Why This Tool</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for creators who want control and consistency
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Structured Creation",
                description: "Step-by-step wizard guides you through character creation, ensuring nothing is missed.",
                icon: BookOpen,
              },
              {
                title: "Personality Sliders",
                description: "Fine-tune character traits with precise controls for warmth, confidence, and more.",
                icon: Sliders,
              },
              {
                title: "Bring Your Own AI Key",
                description: "Use your own API key. Your data stays private, and you control the costs.",
                icon: Sparkles,
              },
              {
                title: "Original Characters",
                description: "No scraping, no templates. Every character is built from your specifications.",
                icon: Wand2,
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="glass rounded-2xl p-8 hover:bg-white/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg glass flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto space-y-24">
          {[
            {
              title: "AI Prompt Enhancer & Story Enhancer",
              description:
                "Enhance your character's prompts and generate the perfect story outline using advanced AI features. Get creative support for compelling, consistent narratives and dialogue.",
              image: "left",
            },
            {
              title: "Wizard-Based Character Creation",
              description:
                "No more staring at blank pages. Our guided wizard walks you through every step, from basic information to deep personality traits. Each question is designed to help you think about your character in new ways.",
              image: "left",
            },
            {
              title: "Deep Personality Control",
              description:
                "Adjust personality sliders to fine-tune how your character behaves. Want someone warm but reserved? Confident but calm? The sliders give you precise control over character traits.",
              image: "right",
            },
          ].map((feature, i) => {
            // Alternate: even index (0,2,...) image left, odd index (1,3,...) image right
            const imageLeft = i % 2 === 0;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`relative grid md:grid-cols-2 gap-10 md:gap-20 items-center py-10 md:py-20 mb-14 rounded-3xl shadow-xl overflow-hidden bg-gradient-to-br from-violet-700/30 via-blue-700/20 to-background transition-all duration-300 group hover:scale-[1.025] hover:shadow-2xl ${!imageLeft ? "md:grid-flow-dense" : ""}`}
              >
                {/* Decorative Gradient Glow */}
                <div className="absolute -top-10 -left-10 w-60 h-60 bg-violet-400/20 rounded-full blur-2xl -z-10 group-hover:bg-violet-500/30 transition-all duration-300" />
                <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-blue-400/20 rounded-full blur-2xl -z-10 group-hover:bg-blue-500/30 transition-all duration-300" />
                {/* Feature Image */}
                <div className={!imageLeft ? "md:col-start-2" : ""}>
                  <div className="relative aspect-video flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl border-4 border-white/10 group-hover:border-violet-400/30 transition-all duration-300">
                    {feature.title === "Wizard-Based Character Creation" ? (
                      <img
                        src="https://res.cloudinary.com/dkwxxfewv/image/upload/v1768197627/Screenshot_2026-01-12_112932_timgxq.png"
                        alt="Wizard-Based Character Creation Preview"
                        className="object-cover w-full h-full rounded-2xl shadow-lg"
                      />
                    ) : feature.title === "Deep Personality Control" ? (
                      <img
                        src="https://res.cloudinary.com/dkwxxfewv/image/upload/v1768197617/Screenshot_2026-01-12_112914_ytluz4.png"
                        alt="Deep Personality Control Preview"
                        className="object-cover w-full h-full rounded-2xl shadow-lg"
                      />
                    ) : feature.title === "AI Prompt Enhancer & Story Enhancer" ? (
                      <img
                        src="https://res.cloudinary.com/dkwxxfewv/image/upload/v1768197645/Screenshot_2026-01-12_015652_yepbyn.png"
                        alt="AI Prompt Enhancer & Story Enhancer Preview"
                        className="object-cover w-full h-full rounded-2xl shadow-lg"
                      />
                    ) : (
                      <div className="text-center">
                        <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-sm text-muted-foreground">Feature Preview</p>
                      </div>
                    )}
                  </div>
                </div>
                {/* Feature Content */}
                <div className={`${!imageLeft ? "md:col-start-1 md:row-start-1" : ""} px-4 md:px-8 py-2 md:py-4`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`inline-block px-4 py-1 rounded-full text-xs font-semibold shadow-md transition-all duration-300 ${i === 0 ? "bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white" : i === 1 ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white" : "bg-gradient-to-r from-amber-500 to-pink-500 text-white"} group-hover:scale-105`}>
                      {i === 0 && "AI & Story Enhancer"}
                      {i === 1 && "Wizard Creation"}
                      {i === 2 && "Personality Control"}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4 drop-shadow-lg">
                    {feature.title}
                  </h3>
                  <p className="text-lg md:text-xl text-blue-100 leading-relaxed mb-2">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Roadmap</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              What&apos;s here now, and what&apos;s coming next
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              { name: "Character Builder", status: "available" },
              { name: "Image Prompt Generator", status: "in-progress" },
              { name: "Saved Characters", status: "available" },
              { name: "Presets & Templates", status: "planned" },
            ].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="glass rounded-xl p-6 flex items-center justify-between border border-border"
              >
                <div className="flex items-center gap-4">
                  {item.status === "available" ? (
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                  )}
                  <span className="text-lg font-medium text-foreground">{item.name}</span>
                </div>
                <span className="text-sm text-muted-foreground capitalize">{item.status.replace("-", " ")}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-3xl p-12 md:p-16 text-center border border-border"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Start building characters that actually make sense.
            </h2>
            <Link
              href="/idea"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass hover:bg-white/5 transition-all font-medium mb-4"
            >
              Create Your First Character
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-sm text-muted-foreground">Free to use · Bring your own AI key</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg glass flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">Characteria</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/pricing" className="hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Contact
              </Link>
              <ThemeToggle />
            </div>
          </div>
          <div className="mt-8 text-center text-xs text-muted-foreground">
            © 2024 Characteria. Built for creators.
          </div>
        </div>
      </footer>
    </div>
  );
}
