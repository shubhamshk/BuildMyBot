
import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';

const PromptGenerator: React.FC = () => {
  const { character } = useApp();
  const [prompt, setPrompt] = useState('');
  const [settings, setSettings] = useState({
    composition: 'Portrait',
    isSfw: true,
    artStyle: 'High-End Anime (Ufotable)',
    lighting: 'Cinematic Volumetric',
    lens: '85mm Prime, f/1.8'
  });

  const compositions = ['Portrait', 'Half-body', 'Full-body', 'Dynamic Action'];
  const styles = ['High-End Anime (Ufotable)', 'Modern MAPPA style', '90s Retro Anime', 'Detailed Manga Art', 'Semi-Realistic 2D'];

  useEffect(() => {
    if (character.generatedProfile) {
      updatePrompt();
    }
  }, [character, settings]);

  const updatePrompt = () => {
    const maturityTag = character.age && parseInt(character.age) > 22 ? 'mature, elegant, sophisticated features,' : '';
    const p = `"Masterpiece, best quality, ultra-detailed anime ${settings.composition.toLowerCase()} of ${character.name}, ${character.generatedProfile?.title}, ${maturityTag} ${character.setting}, ${settings.artStyle.toLowerCase()}, ${settings.lighting.toLowerCase()}, ${settings.lens}, intricate eyes, glowing highlights, high fidelity --ar 3:4 --v 6.0"`;
    setPrompt(p);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt);
    alert("Anime prompt copied!");
  };

  return (
    <Layout>
      <div className="px-6 py-8 max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-black uppercase tracking-tighter italic mb-2">Visual Core Link</h1>
          <p className="text-slate-500 dark:text-[#ad92c9] text-sm font-medium">Synchronizing character data for visual materialization.</p>
        </div>

        {/* Selected Character Mini Card */}
        <div className="glass rounded-[2rem] p-6 flex items-center gap-6 border border-primary/20 bg-primary/5">
          <div className="size-20 rounded-2xl bg-cover bg-center overflow-hidden border-2 border-primary/30 shrink-0 shadow-lg" style={{ backgroundImage: `url('https://picsum.photos/seed/anime-${character.name}/200/200')` }}></div>
          <div className="flex-1 min-w-0">
            <h4 className="font-black text-xl italic uppercase truncate">{character.name || 'Anonymous Soul'}</h4>
            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{character.generatedProfile?.title || 'Waiting for forge...'}</p>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-primary text-[10px] font-black text-white shadow-lg shadow-primary/30 uppercase tracking-widest">LINKED</div>
        </div>

        {/* Settings */}
        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 block">Visual Composition</label>
            <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
              {compositions.map(c => (
                <button
                  key={c}
                  onClick={() => setSettings({ ...settings, composition: c })}
                  className={`px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border whitespace-nowrap ${settings.composition === c ? 'bg-primary text-white border-primary shadow-xl shadow-primary/30 scale-105' : 'bg-white dark:bg-white/5 text-slate-500 dark:text-white/50 border-white/5 hover:border-white/20'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass rounded-3xl p-6 space-y-4 border border-white/5">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Safety Filter</label>
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm">{settings.isSfw ? 'SFW' : 'NSFW'}</span>
                <button
                  onClick={() => setSettings({ ...settings, isSfw: !settings.isSfw })}
                  className={`w-14 h-7 rounded-full relative transition-all shadow-inner ${settings.isSfw ? 'bg-primary' : 'bg-pink-600'}`}
                >
                  <div className={`absolute top-1 size-5 bg-white rounded-full transition-all shadow-md ${settings.isSfw ? 'right-1' : 'left-1'}`}></div>
                </button>
              </div>
            </div>
            <div className="glass rounded-3xl p-6 space-y-4 border border-white/5">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Anime Art Style</label>
              <select
                value={settings.artStyle}
                onChange={(e) => setSettings({ ...settings, artStyle: e.target.value })}
                className="w-full bg-transparent border-none text-sm font-bold p-0 focus:ring-0 outline-none cursor-pointer text-primary"
              >
                {styles.map(s => <option key={s} className="bg-slate-900">{s}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <div className="glass rounded-3xl p-6 flex items-center justify-between border border-white/5 hover:border-primary/30 transition-all cursor-pointer group">
              <div className="flex items-center gap-5">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined">photo_camera</span>
                </div>
                <div>
                  <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.2em]">Lens Simulation</p>
                  <p className="text-sm font-bold italic">{settings.lens}</p>
                </div>
              </div>
              <span className="material-symbols-outlined opacity-30 group-hover:opacity-100 transition-opacity">tune</span>
            </div>
            <div className="glass rounded-3xl p-6 flex items-center justify-between border border-white/5 hover:border-primary/30 transition-all cursor-pointer group">
              <div className="flex items-center gap-5">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined">light_mode</span>
                </div>
                <div>
                  <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.2em]">Anime Lighting</p>
                  <p className="text-sm font-bold italic">{settings.lighting}</p>
                </div>
              </div>
              <span className="material-symbols-outlined opacity-30 group-hover:opacity-100 transition-opacity">tune</span>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="pt-8 pb-32">
          <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 block text-center">Final Masterpiece Prompt</label>
          <div className="relative p-10 glass bg-slate-900/80 rounded-[3rem] border-primary/30 shadow-2xl shadow-primary/10">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
            <p className="relative text-base font-mono leading-relaxed italic text-slate-200 text-center">
              {prompt || '"Forge a character first to generate the visual seed..."'}
            </p>
            <div className="mt-10 flex gap-4">
              <button
                onClick={copyToClipboard}
                disabled={!prompt}
                className="flex-[3] bg-primary hover:brightness-110 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-primary/30 disabled:opacity-50 uppercase tracking-widest text-sm"
              >
                <span className="material-symbols-outlined">content_copy</span>
                Copy Visual Seed
              </button>
              <button
                onClick={updatePrompt}
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
              >
                <span className="material-symbols-outlined">refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PromptGenerator;
