
import React, { useState } from 'react';
import Layout from '../Layout';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { generateCharacterProfile } from '../../../services/geminiService';

const WizardPersonality: React.FC = () => {
  const navigate = useNavigate();
  const { character, setCharacter } = useApp();
  const [isGenerating, setIsGenerating] = useState(false);

  const sliders = [
    { key: 'warmth', label: 'Warm vs. Cold', left: 'Empathic', right: 'Stoic', desc: 'Social warmth and emotional approachability.' },
    { key: 'confidence', label: 'Shy vs. Confident', left: 'Submissive', right: 'Dominant', desc: 'Social hierarchy and self-assuredness.' },
    { key: 'calmness', label: 'Calm vs. Chaotic', left: 'Serene', right: 'Playful', desc: 'Predictability of behavioral response.' },
    { key: 'reserve', label: 'Expressive vs. Reserved', left: 'Vibrant', right: 'Mysterious', desc: 'Internal vs. External emotional state.' },
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const profile = await generateCharacterProfile(character);
      setCharacter(prev => ({ ...prev, generatedProfile: profile }));
      navigate('/profile');
    } catch (error) {
      console.error(error);
      alert("System Overload: Failed to forge soul. Check your API link.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center gap-2 mb-6">
            <div className="w-16 h-1.5 rounded-full bg-primary" />
            <div className="w-16 h-1.5 rounded-full bg-primary shadow-[0_0_15px_rgba(127,19,236,0.5)]" />
            <div className="w-16 h-1.5 rounded-full bg-slate-200 dark:bg-white/10" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase mb-4">Personality Matrix</h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Step 02: Neural Configuration</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {sliders.map((slider) => (
            <motion.div
              key={slider.key}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-[2.5rem] border-white/5 relative group hover:border-primary/20 transition-all"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="text-sm font-black uppercase tracking-widest">{slider.label}</span>
                <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-black uppercase">
                  {character.personality[slider.key as keyof typeof character.personality]}% Intensity
                </span>
              </div>

              <div className="relative pt-4 pb-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={character.personality[slider.key as keyof typeof character.personality]}
                  onChange={(e) => setCharacter({
                    ...character,
                    personality: { ...character.personality, [slider.key]: parseInt(e.target.value) }
                  })}
                  className="w-full h-1.5 bg-slate-200 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between mt-4 text-[10px] font-black uppercase tracking-widest text-slate-500 italic">
                  <span>{slider.left}</span>
                  <span>{slider.right}</span>
                </div>
              </div>
              <p className="text-[10px] mt-6 text-slate-500 font-bold leading-relaxed">{slider.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <button
            onClick={() => navigate('/wizard/basics')}
            disabled={isGenerating}
            className="flex-1 py-5 rounded-2xl border-2 border-slate-100 dark:border-white/5 font-black uppercase tracking-widest text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-all disabled:opacity-50"
          >
            Back
          </button>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex-[2] py-5 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-sm shadow-2xl shadow-primary/30 hover:bg-primary-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>FORGING SOUL...</span>
              </>
            ) : (
              <>
                <span>SYNCHRONIZE MATRIX</span>
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
              </>
            )}
          </button>
        </div>

        {/* Loading Overlay */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-3xl flex flex-col items-center justify-center p-8 text-center"
            >
              <div className="relative size-48 sm:size-64 mb-12">
                <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-[ping_3s_infinite]" />
                <div className="absolute inset-4 border-2 border-primary/40 rounded-full animate-[ping_2s_infinite]" />
                <div className="absolute inset-8 border-2 border-primary rounded-full animate-pulse flex items-center justify-center">
                  <span className="material-symbols-outlined text-6xl text-primary">magic_button</span>
                </div>
              </div>
              <h3 className="text-3xl sm:text-5xl font-black italic tracking-tighter uppercase mb-4 text-white">Generating Soul Core</h3>
              <p className="text-primary font-black uppercase tracking-[0.4em] text-xs animate-pulse">Establishing neural link with AniSoul Engine...</p>

              <div className="mt-20 max-w-sm w-full space-y-3">
                <LoadingBar progress={35} label="Trope Mapping" />
                <LoadingBar progress={62} label="History Generation" />
                <LoadingBar progress={88} label="Voice Calibration" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

const LoadingBar = ({ progress, label }: { progress: number, label: string }) => (
  <div className="w-full space-y-1">
    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40 italic">
      <span>{label}</span>
      <span>{progress}%</span>
    </div>
    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        className="h-full bg-primary"
      />
    </div>
  </div>
);

export default WizardPersonality;
