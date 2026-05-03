"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, Video, Download, Users, 
  Star, PlayCircle, Lock, Shield, Terminal, 
  ChevronDown, Sparkles, Package, TrendingUp 
} from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Stars, Float } from "@react-three/drei";

function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#d4af37" /> {/* Gold */}
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#4c1d95" /> {/* Deep Janitor Purple */}
        <Stars radius={100} depth={50} count={1500} factor={3} saturation={0} fade speed={0.5} />
        
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
          <Sphere visible args={[1, 100, 100]} scale={1.8} position={[3, 1, -2]}>
            <MeshDistortMaterial color="#1e1b4b" attach="material" distort={0.3} speed={1} roughness={0.4} metalness={0.7} opacity={0.8} transparent />
          </Sphere>
        </Float>

        <Float speed={1} rotationIntensity={0.5} floatIntensity={1.2}>
          <Sphere visible args={[1, 100, 100]} scale={1.2} position={[-3, -1, -3]}>
            <MeshDistortMaterial color="#854d0e" attach="material" distort={0.4} speed={1.2} roughness={0.3} metalness={0.8} opacity={0.7} transparent />
          </Sphere>
        </Float>
      </Canvas>
    </div>
  );
}

export default function CharacteriaLabsPage() {
  const [activeModule, setActiveModule] = useState<number | null>(0);

  const toggleModule = (index: number) => {
    setActiveModule(activeModule === index ? null : index);
  };

  const curriculum = [
    { title: "Module 1: The Foundations of Unrestricted AI", lessons: ["Welcome to the Course", "Understanding Uncensored Models", "Hardware Requirements & Optimization"] },
    { title: "Module 2: Mastering Custom Image Generation", lessons: ["Setting up Local Image Generators (ComfyUI)", "Prompting for High-Quality, Realistic Art", "Advanced ControlNet & Posing", "Creating Consistent Characters"] },
    { title: "Module 3: Cloud Generation Secrets", lessons: ["Top Cloud Platforms for Unrestricted Art", "API Integrations (RunPod, Modal)", "Cost Optimization & Scaling"] },
    { title: "Module 4: Bot Integration & Workflows", lessons: ["Connecting APIs to Frontends", "Character Persona Creation", "Context Window Management"] },
    { title: "Module 5: Monetization & The $200/mo Blueprint", lessons: ["How to package and sell your creations", "Finding your niche audience", "The step-by-step $200/mo framework"] }
  ];

  return (
    <div className="min-h-screen bg-[#0A0B10] text-[#E4E4E7] selection:bg-amber-500/30 font-sans pb-24 text-sm md:text-base relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24">
        
        {/* Main Selling Point Alert - Top */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto mb-8 bg-[#12141A]/80 backdrop-blur-xl border border-amber-500/20 rounded-xl p-3 md:p-4 shadow-[0_8px_30px_rgba(0,0,0,0.4)] relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 w-32 h-32 bg-amber-600/5 blur-[60px] rounded-full pointer-events-none" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-amber-500/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(217,119,6,0.15)]">
              <TrendingUp className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-[#F3F4F6] font-serif italic text-lg md:text-xl tracking-tight mb-1">Earn $200/month after this course as your second income</h3>
              <p className="text-[#A1A1AA] text-xs md:text-sm leading-snug max-w-2xl font-light">
                Turn your new AI skills into a reliable income stream. We'll show you exactly how to package, market, and monetize your custom AI creations.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 relative">
          {/* Left Content Area */}
          <div className="flex-1 lg:max-w-[60%] space-y-8">
            
            {/* 1. Hero Section */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 text-[11px] font-bold tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/20 rounded-full uppercase">
                  Premium Course
                </span>
                <span className="flex items-center gap-1 text-xs text-amber-400 font-medium ml-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                </span>
                <span className="text-xs text-[#71717A] flex items-center gap-1 ml-2">
                  <Users className="w-3.5 h-3.5" />
                  5 early adopters
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tighter">
                Master Custom <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">AI Imagery</span> & Unrestricted Bots
              </h1>
              
              <p className="text-sm md:text-base text-[#A1A1AA] leading-relaxed max-w-2xl font-light">
                A highly focused, step-by-step masterclass on generating stunning custom artwork and building unrestricted AI pipelines. Take full control of your creations today.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-1.5 text-xs text-[#D4D4D8] font-medium bg-white/[0.02] px-3 py-1.5 rounded-lg border border-white/[0.05] backdrop-blur-sm">
                  <Shield className="w-4 h-4 text-amber-400" /> Beginner Friendly
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#D4D4D8] font-medium bg-white/[0.02] px-3 py-1.5 rounded-lg border border-white/[0.05] backdrop-blur-sm">
                  <Terminal className="w-4 h-4 text-amber-400" /> Advanced Image Gen
                </div>
              </div>
            </motion.div>

            {/* 3. What You'll Learn */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}>
              <h2 className="text-2xl font-serif text-[#F3F4F6] mb-5 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" /> What we will cover
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Generate high-quality custom images locally & on cloud",
                  "Master ComfyUI, ControlNet, and complex posing",
                  "Build and deploy your own unrestricted AI bots",
                  "Optimize prompts for incredibly nuanced results",
                  "Create a full, private working pipeline",
                  "The exact blueprint to earn $200+/mo with these skills"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-[#12141A]/50 p-4 rounded-xl border border-white/[0.05] hover:border-amber-500/20 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 opacity-80" />
                    <span className="text-[#D4D4D8] text-sm font-light">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 5. Curriculum (Locked style) */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-serif text-[#F3F4F6]">Course Curriculum</h2>
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-900/20 border border-amber-500/20 px-3 py-1.5 rounded-full">
                  <Lock className="w-3.5 h-3.5" /> Members Only Area
                </div>
              </div>
              <div className="space-y-3">
                {curriculum.map((module, i) => (
                  <div key={i} className="bg-[#12141A]/50 backdrop-blur-md rounded-xl overflow-hidden transition-all border border-white/[0.05] hover:border-amber-500/30">
                    <button 
                      onClick={() => toggleModule(i)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${activeModule === i ? 'bg-amber-500/10 text-amber-400' : 'bg-white/[0.03] text-[#71717A] group-hover:bg-white/[0.05]'}`}>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeModule === i ? 'rotate-180' : ''}`} />
                        </div>
                        <span className="text-sm font-medium text-[#E4E4E7] group-hover:text-amber-100 transition-colors">{module.title}</span>
                      </div>
                    </button>
                    <AnimatePresence>
                      {activeModule === i && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-6 pb-5 pt-0"
                        >
                          <ul className="space-y-3 mt-2 ml-12">
                            {module.lessons.map((lesson, idx) => (
                              <li key={idx} className="flex items-center gap-3 text-sm text-[#A1A1AA] group">
                                <PlayCircle className="w-4 h-4 text-amber-500/40 group-hover:text-amber-400 transition-colors" />
                                <span className="blur-[3px] select-none hover:blur-none transition-all duration-500 group-hover:text-[#F3F4F6] font-light">{lesson}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Content Area (Sticky Card) */}
          <div className="lg:w-[40%] relative">
            <div className="sticky top-24 relative z-20">
              
              {/* Floating 3D Tag */}
              <motion.div 
                animate={{ y: [0, -6, 0], rotate: [2, 4, 2] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-5 -right-3 z-30"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-600 rounded-xl blur-lg opacity-40" />
                  <div className="bg-[#18181B] text-amber-300 text-[10px] font-black uppercase tracking-widest py-2 px-4 rounded-xl shadow-2xl border border-amber-500/20 whitespace-nowrap">
                    Only 10 spots left!
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-[#12141A]/80 backdrop-blur-2xl border border-white/[0.05] rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative"
              >
                {/* Highlight Glow */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 opacity-80" />
                
                {/* Card Image Area */}
                <div className="h-52 bg-[#0A0B10] relative overflow-hidden flex items-center justify-center group cursor-pointer border-b border-white/[0.02]">
                  <div className="absolute inset-0 opacity-40 mix-blend-screen transition-transform duration-1000 group-hover:scale-110" style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(217, 119, 6, 0.3) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(76, 29, 149, 0.2) 0%, transparent 50%)`
                  }} />
                  
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPjxwb2x5Z29uIHBvaW50cz0iMCwwIDQwLDAgNDAsNDAgMCw0MCIvPjwvZz48L3N2Zz4=')] opacity-10" />
                  
                  <div className="relative z-10 w-20 h-20 bg-[#18181B]/80 backdrop-blur-xl rounded-full border border-white/[0.05] flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-[0_0_20px_rgba(217,119,6,0.2)] group-hover:shadow-[0_0_30px_rgba(217,119,6,0.3)]">
                    <PlayCircle className="w-10 h-10 text-amber-200 translate-x-0.5" />
                  </div>
                </div>

                <div className="p-8">
                  <div className="mb-6">
                    <div className="flex items-end gap-2 mb-2">
                      <span className="text-4xl font-serif text-white">$59</span>
                      <span className="text-sm font-medium text-[#71717A] mb-1.5">/ month</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm text-[#71717A] line-through decoration-slate-600">$99/mo</span>
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded border border-amber-400/20">First 10 users only!</span>
                    </div>
                  </div>

                  <button className="w-full py-4 bg-[#E4E4E7] hover:bg-white text-[#0A0B10] font-semibold rounded-xl text-sm transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] active:scale-[0.98] mb-4 relative overflow-hidden group">
                    <span className="relative z-10">Subscribe Now</span>
                  </button>

                  <p className="text-center text-xs text-[#71717A] mb-6 flex items-center justify-center gap-1.5 font-light">
                    <Shield className="w-3.5 h-3.5 text-amber-500/70" /> Cancel anytime. Secure payment.
                  </p>

                  <div className="space-y-4">
                    <h4 className="font-medium text-[#D4D4D8] text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                      Membership Includes:
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-sm text-[#A1A1AA] font-light">
                        <div className="w-6 h-6 rounded-full bg-white/[0.03] flex items-center justify-center shrink-0">
                          <Video className="w-3.5 h-3.5 text-amber-200/70" />
                        </div>
                        Full Video Masterclass
                      </li>
                      <li className="flex items-center gap-3 text-sm text-amber-200 font-medium bg-amber-900/10 p-2 -mx-2 rounded-lg border border-amber-500/10">
                        <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                          <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                        </div>
                        The $200/mo Blueprint
                      </li>
                      <li className="flex items-center gap-3 text-sm text-[#A1A1AA] font-light">
                        <div className="w-6 h-6 rounded-full bg-white/[0.03] flex items-center justify-center shrink-0">
                          <Download className="w-3.5 h-3.5 text-amber-200/70" />
                        </div>
                        Downloadable Workflows
                      </li>
                      <li className="flex items-center gap-3 text-sm text-[#A1A1AA] font-light">
                        <div className="w-6 h-6 rounded-full bg-white/[0.03] flex items-center justify-center shrink-0">
                          <Users className="w-3.5 h-3.5 text-amber-200/70" />
                        </div>
                        Private Insider Community
                      </li>
                    </ul>
                  </div>
                </div>

              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
