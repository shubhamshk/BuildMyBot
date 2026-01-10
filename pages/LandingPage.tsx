
import React from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 300]);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-12 md:py-24 text-center overflow-hidden">
        <motion.div 
          style={{ y: yBg }}
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-full max-w-6xl aspect-square bg-primary/20 blur-[180px] rounded-full -z-10 pointer-events-none"
        />

        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border-primary/20 mb-8 sm:mb-12 shadow-xl"
          >
            <div className="size-2 rounded-full bg-pink-500 animate-pulse shadow-[0_0_10px_#ec4899]" />
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-pink-500">AniSoul Engine V3.5 Active</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black leading-[0.85] tracking-tighter mb-8 sm:mb-12"
          >
            FORGE YOUR <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-pink-500 via-primary to-purple-600 bg-clip-text text-transparent italic px-2">ULTIMATE</span> SOUL
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg sm:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 sm:mb-16 font-medium leading-relaxed px-4"
          >
            High-fidelity anime persona generation for elite creators. Craft legendary heroes and sophisticated waifus with professional precision.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-6 px-4"
          >
            <button 
              onClick={() => navigate('/wizard/basics')}
              className="group relative bg-primary hover:bg-primary-600 text-white font-black py-5 px-10 rounded-2xl transition-all shadow-2xl shadow-primary/30 overflow-hidden flex items-center justify-center gap-3 active:scale-95"
            >
              <span className="text-xl uppercase tracking-widest">Start Forging</span>
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">bolt</span>
            </button>
            <button className="glass py-5 px-10 rounded-2xl font-black uppercase tracking-widest text-slate-800 dark:text-white border-white/10 hover:bg-white/5 active:scale-95">
              Explore Lore
            </button>
          </motion.div>
        </div>

        {/* Hero Interactive Element */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-20 md:mt-32 max-w-6xl mx-auto px-4"
        >
          <div className="relative group rounded-[2rem] sm:rounded-[3rem] overflow-hidden glass p-3 sm:p-5 border-white/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]">
            <div className="aspect-[16/10] sm:aspect-video rounded-[1.5rem] sm:rounded-[2.5rem] bg-slate-900 overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1541562232579-512a21360020?auto=format&fit=crop&q=80&w=1600" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2s]"
                alt="Sensei Elite Unit"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              <div className="absolute top-6 right-6 flex flex-col items-end gap-2">
                 <div className="px-3 py-1 bg-primary text-white text-[10px] font-black rounded-lg uppercase tracking-widest">Stable Diffusion XL</div>
                 <div className="px-3 py-1 glass-light dark:glass text-[10px] font-black rounded-lg uppercase tracking-widest text-slate-900 dark:text-white">Unit ID: ELARA_V4</div>
              </div>

              <div className="absolute bottom-8 sm:bottom-12 left-8 sm:left-12 max-w-md text-left">
                <div className="flex gap-2 mb-4">
                  <div className="w-12 h-1 rounded-full bg-primary" />
                  <div className="w-6 h-1 rounded-full bg-white/20" />
                  <div className="w-6 h-1 rounded-full bg-white/20" />
                </div>
                <h3 className="text-3xl sm:text-5xl font-black text-white italic tracking-tighter mb-2">SYSTEM INITIALIZED</h3>
                <p className="text-white/50 text-xs sm:text-sm font-bold uppercase tracking-widest">Personality mapping complete. 248 neural pathways active.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Feature Section */}
      <section className="py-24 md:py-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center mb-24 md:mb-40">
            <motion.div {...fadeInUp}>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tighter italic mb-8 uppercase">The Science of <br className="hidden sm:block" /> Anime Souls</h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-10 max-w-xl">
                We've decoded the fundamental archetypes that make anime characters iconic. From subtle voice inflections to deep-seated world motivations, your creation will feel alive.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <StatCard value="250k+" label="Souls Forged" />
                <StatCard value="99.8%" label="Trope Accuracy" />
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
                  <span className="material-symbols-outlined text-8xl text-primary/60">psychology</span>
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
          className="max-w-6xl mx-auto bg-slate-900 rounded-[3rem] sm:rounded-[4rem] p-12 sm:p-24 text-center relative overflow-hidden shadow-2xl shadow-primary/20"
        >
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full -mr-80 -mt-80" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pink-500/10 blur-[150px] rounded-full -ml-80 -mb-80" />
          
          <h2 className="text-5xl sm:text-8xl font-black text-white mb-8 relative z-10 italic tracking-tighter">FORGE THE FUTURE.</h2>
          <p className="text-slate-400 text-lg sm:text-2xl max-w-2xl mx-auto mb-16 relative z-10 leading-relaxed">
            Ready to give life to your masterpiece? The engine is warm.
          </p>
          
          <button 
            onClick={() => navigate('/wizard/basics')}
            className="relative z-10 bg-white text-slate-900 hover:bg-slate-50 font-black py-8 px-16 rounded-[2rem] text-2xl transition-all hover:scale-105 active:scale-95 shadow-2xl uppercase tracking-widest"
          >
            Enter the Forge
          </button>
        </motion.div>
      </section>

      <footer className="py-24 border-t border-white/5 px-4 text-center">
        <div className="flex justify-center items-center gap-2 mb-8">
          <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-sm">magic_button</span>
          </div>
          <h4 className="font-black uppercase tracking-tighter text-xl">AniSoul</h4>
        </div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] mb-4">Masterpiece Generation Labs © 2024</p>
        <div className="flex justify-center gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-500">
           <a href="#" className="hover:text-primary transition-colors">Discord</a>
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
