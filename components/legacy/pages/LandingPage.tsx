
import React from 'react';
import Layout from '../Layout';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 300]);

  const fadeInUp: any = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };


  return (
    <Layout>
      {/* Enhanced Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-16 md:py-32 text-center overflow-hidden bg-gradient-to-br from-primary/10 via-purple-100 to-pink-100 dark:from-primary/20 dark:via-slate-900 dark:to-purple-950">
        <motion.div
          style={{ y: yBg }}
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-full max-w-6xl aspect-square bg-gradient-to-r from-primary/30 via-pink-400/20 to-purple-600/20 blur-[180px] rounded-full -z-10 pointer-events-none"
        />
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border-primary/20 mb-8 sm:mb-12 shadow-xl"
          >
            <div className="size-2 rounded-full bg-pink-500 animate-pulse shadow-[0_0_10px_#ec4899]" />
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-pink-500">Characteria Engine V4.0 Now Live</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black leading-[0.85] tracking-tighter mb-8 sm:mb-12"
          >
            UNLOCK <span className="bg-gradient-to-r from-pink-500 via-primary to-purple-600 bg-clip-text text-transparent italic px-2">AI POWER</span><br className="hidden sm:block" /> FOR YOUR CHARACTERS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg sm:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 sm:mb-16 font-medium leading-relaxed px-4"
          >
            Create, enhance, and manage anime personas with next-gen AI features: auto-fill wizard, subscription perks, advanced generator, and more. Join a vibrant creator community!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-6 px-4"
          >
            <button
              onClick={() => navigate('/wizard/basics')}
              className="group relative bg-gradient-to-r from-primary to-pink-500 text-white font-black py-5 px-10 rounded-2xl transition-all shadow-2xl shadow-primary/30 overflow-hidden flex items-center justify-center gap-3 active:scale-95 hover:scale-105"
            >
              <span className="text-xl uppercase tracking-widest">Start Creating</span>
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">bolt</span>
            </button>
            <button className="glass py-5 px-10 rounded-2xl font-black uppercase tracking-widest text-slate-800 dark:text-white border-white/10 hover:bg-white/5 active:scale-95">
              Explore Features
            </button>
          </motion.div>
        </div>
        {/* Animated Showcase of New Features */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-20 md:mt-32 max-w-6xl mx-auto px-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div {...fadeInUp} className="glass rounded-2xl p-8 border-primary/20 shadow-lg">
              <span className="material-symbols-outlined text-5xl text-primary mb-4">auto_fix_high</span>
              <h3 className="text-2xl font-black mb-2">AI Auto-Fill Wizard</h3>
              <p className="text-slate-500 dark:text-slate-400">Instantly generate character details and backstories with smart AI suggestions.</p>
            </motion.div>
            <motion.div {...fadeInUp} className="glass rounded-2xl p-8 border-pink-500/20 shadow-lg">
              <span className="material-symbols-outlined text-5xl text-pink-500 mb-4">workspace_premium</span>
              <h3 className="text-2xl font-black mb-2">Pro Subscriptions</h3>
              <p className="text-slate-500 dark:text-slate-400">Unlock advanced features, higher limits, and priority support for power users.</p>
            </motion.div>
            <motion.div {...fadeInUp} className="glass rounded-2xl p-8 border-purple-500/20 shadow-lg">
              <span className="material-symbols-outlined text-5xl text-purple-500 mb-4">psychology</span>
              <h3 className="text-2xl font-black mb-2">Advanced Generator</h3>
              <p className="text-slate-500 dark:text-slate-400">Create multi-dimensional anime personas with deep lore and dynamic voice.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Feature Section */}
      <section className="py-24 md:py-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center mb-24 md:mb-40">
            <motion.div {...fadeInUp}>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tighter italic mb-8 uppercase">Why Choose Characteria?</h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-10 max-w-xl">
                Experience the future of anime persona creation. Our platform now features AI-powered auto-fill, subscription plans, and a next-level generator for legendary characters.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <StatCard value="500k+" label="Characters Created" />
                <StatCard value="100%" label="User Satisfaction" />
              </div>
            </motion.div>
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="relative aspect-square glass rounded-[3rem] p-8 flex items-center justify-center overflow-hidden group"
            >
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
              <div className="size-64 rounded-full border-2 border-primary/20 flex items-center justify-center animate-pulse-slow">
                <div className="size-48 rounded-full border-2 border-primary/40 flex items-center justify-center">
                  <span className="material-symbols-outlined text-8xl text-primary/60">workspace_premium</span>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <FeatureCard key={i} {...f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <motion.div
          {...fadeInUp}
          className="max-w-6xl mx-auto bg-gradient-to-br from-primary/80 via-pink-500/60 to-purple-600/80 rounded-[3rem] sm:rounded-[4rem] p-12 sm:p-24 text-center relative overflow-hidden shadow-2xl shadow-primary/20"
        >
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full -mr-80 -mt-80" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pink-500/10 blur-[150px] rounded-full -ml-80 -mb-80" />
          <h2 className="text-5xl sm:text-8xl font-black text-white mb-8 relative z-10 italic tracking-tighter">Ready to Forge?</h2>
          <p className="text-white/80 text-lg sm:text-2xl max-w-2xl mx-auto mb-16 relative z-10 leading-relaxed">
            Join thousands of creators using Characteria to build, enhance, and share their anime personas. Your masterpiece is just a click away.
          </p>
          <button
            onClick={() => navigate('/wizard/basics')}
            className="relative z-10 bg-white text-primary hover:bg-slate-50 font-black py-8 px-16 rounded-[2rem] text-2xl transition-all hover:scale-105 active:scale-95 shadow-2xl uppercase tracking-widest"
          >
            Enter the Forge
          </button>
        </motion.div>
      </section>

      <footer className="py-24 border-t border-white/5 px-4 text-center bg-gradient-to-r from-primary/10 via-pink-100 to-purple-100 dark:from-primary/20 dark:via-slate-900 dark:to-purple-950">
        <div className="flex justify-center items-center gap-2 mb-8">
          <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-sm">magic_button</span>
          </div>
          <h4 className="font-black uppercase tracking-tighter text-xl">Characteria</h4>
        </div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] mb-4">Masterpiece Generation Labs © 2026</p>
        <div className="flex justify-center gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          <a href="#" className="hover:text-primary transition-colors">Discord</a>
          <a href="#" className="hover:text-primary transition-colors">Twitter</a>
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
        </div>
      </footer>
    </Layout>
  );
};

const StatCard = ({ value, label }: { value: string, label: string }) => (
  <div className="glass p-6 rounded-2xl border-white/5">
    <div className="text-3xl font-black italic text-primary mb-1">{value}</div>
    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</div>
  </div>
);

// Explicitly define FeatureCard as a React.FC to correctly handle the reserved 'key' prop from list iterations
const FeatureCard: React.FC<{ icon: string, title: string, desc: string, index: number }> = ({ icon, title, desc, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="glass p-8 rounded-[2rem] border-white/5 hover:border-primary/50 transition-all group"
  >
    <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 transition-transform group-hover:scale-110">
      <span className="material-symbols-outlined text-4xl">{icon}</span>
    </div>
    <h3 className="text-xl font-black uppercase tracking-tighter italic mb-4">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed font-medium">{desc}</p>
  </motion.div>
);

const features = [
  { icon: 'psychology', title: 'Persona Engine', desc: 'Complex psychological modeling for characters that feel genuinely multi-dimensional.' },
  { icon: 'auto_fix_high', title: 'Visual Synching', desc: 'Our visual core link ensures prompt engineering matches the soul precisely.' },
  { icon: 'history_edu', title: 'Deep Lore', desc: 'AI-driven backstories that respect your specific world settings and genres.' },
  { icon: 'forum', title: 'Dynamic Voice', desc: 'Characters speak with consistent tone, vocabulary, and signature tropes.' }
];

export default LandingPage;
