
import React from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';

const CharacterProfile: React.FC = () => {
  const navigate = useNavigate();
  const { character } = useApp();
  const profile = character.generatedProfile;

  if (!profile) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[70vh] px-4 text-center">
          <span className="material-symbols-outlined text-7xl text-primary/20 mb-6">error_outline</span>
          <p className="text-2xl font-black uppercase tracking-tighter italic mb-8">Neural link severed. No soul detected.</p>
          <button 
            onClick={() => navigate('/')} 
            className="bg-primary hover:bg-primary-600 px-12 py-5 rounded-2xl text-white font-black uppercase tracking-widest shadow-2xl shadow-primary/30 active:scale-95 transition-all"
          >
            Start Forging
          </button>
        </div>
      </Layout>
    );
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could implement a Toast component here for production
    alert("Data copied to local storage.");
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-[1fr,1.5fr] gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Profile Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-32"
          >
            <div className="glass rounded-[3rem] p-6 sm:p-10 border-white/5 relative overflow-hidden group shadow-2xl">
               <div className="absolute inset-0 bg-primary/5 -z-10 group-hover:bg-primary/10 transition-colors" />
               <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-10 relative border-2 border-white/10">
                  <img 
                    src={`https://picsum.photos/seed/anime-${character.name}-${character.age}/1000/1250`} 
                    className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" 
                    alt={character.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-10 flex flex-col justify-end">
                     <p className="text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-2">{profile.title}</p>
                     <h1 className="text-4xl sm:text-6xl font-black text-white italic tracking-tighter uppercase mb-4">{character.name}</h1>
                  </div>
               </div>
               
               <div className="flex gap-4 mb-10">
                  <InfoPill label="Age" value={`${character.age} CYC`} />
                  <InfoPill label="Class" value={character.gender} />
               </div>

               <button 
                 onClick={() => navigate('/generator')}
                 className="w-full bg-white text-slate-900 py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm shadow-xl hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-3"
               >
                 <span className="material-symbols-outlined text-xl">palette</span>
                 Visual Link Seed
               </button>
            </div>
          </motion.div>

          {/* Right Column: Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-12"
          >
            <Section 
              title="Psychological Matrix" 
              icon="psychology" 
              content={profile.personalitySummary} 
              onCopy={() => copyToClipboard(profile.personalitySummary)} 
            />
            
            <Section 
              title="World History & Lore" 
              icon="history_edu" 
              content={profile.backstory} 
              onCopy={() => copyToClipboard(profile.backstory)} 
            />

            <div className="glass p-8 sm:p-12 rounded-[3rem] border-white/5 space-y-12">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black uppercase tracking-tighter italic flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">record_voice_over</span>
                  Mannerisms
                </h3>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-8">
                <MannerismCard label="Core Tone" value={profile.speechMannerisms.tone} />
                <MannerismCard label="Vocabulary" value={profile.speechMannerisms.vocabulary} />
              </div>

              <div className="relative p-8 sm:p-10 rounded-3xl bg-primary/5 border border-primary/20 italic">
                 <div className="absolute -top-4 left-6 px-4 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full py-1">Signature Quote</div>
                 <p className="text-xl sm:text-3xl font-black leading-tight tracking-tight text-slate-800 dark:text-primary-100">
                   "{profile.speechMannerisms.quote}"
                 </p>
              </div>
            </div>

            <div className="glass p-8 sm:p-12 rounded-[3rem] bg-gradient-to-br from-primary/10 to-transparent border-primary/20 relative shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black uppercase tracking-tighter italic">First Transmission</h3>
                <div className="size-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_#22c55e]" />
              </div>
              <div className="flex flex-col sm:flex-row gap-8 items-start">
                <div className="size-20 rounded-2xl bg-primary shrink-0 flex items-center justify-center text-white shadow-xl shadow-primary/30">
                  <span className="material-symbols-outlined text-4xl">sensors</span>
                </div>
                <div className="flex-1 bg-white/5 p-8 sm:p-10 rounded-[2.5rem] rounded-tl-none border border-white/10 shadow-inner">
                  <p className="text-lg sm:text-2xl italic font-bold leading-relaxed">"{profile.sampleFirstMessage}"</p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-center pt-10 pb-24">
               <button 
                 onClick={() => navigate('/')}
                 className="flex items-center gap-3 text-slate-500 font-black uppercase tracking-widest text-xs hover:text-primary transition-colors group"
               >
                 <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">arrow_back</span>
                 Back to Control Center
               </button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

const Section = ({ title, icon, content, onCopy }: any) => (
  <div className="glass p-8 sm:p-12 rounded-[3rem] border-white/5 group hover:border-primary/20 transition-all">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
      <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter italic flex items-center gap-4">
        <span className="material-symbols-outlined text-primary text-3xl">{icon}</span>
        {title}
      </h3>
      <button 
        onClick={onCopy}
        className="self-start sm:self-center text-[10px] font-black bg-white dark:bg-white/5 px-6 py-3 rounded-2xl flex items-center gap-3 hover:bg-primary hover:text-white transition-all border border-white/10 uppercase tracking-widest"
      >
        <span className="material-symbols-outlined text-sm">content_copy</span> Export Data
      </button>
    </div>
    <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-medium whitespace-pre-wrap">{content}</p>
  </div>
);

const InfoPill = ({ label, value }: { label: string, value: string }) => (
  <div className="flex-1 glass p-4 rounded-2xl border-white/5 text-center">
    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{label}</p>
    <p className="text-sm font-black italic uppercase text-primary">{value}</p>
  </div>
);

const MannerismCard = ({ label, value }: { label: string, value: string }) => (
  <div className="space-y-2">
     <p className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">{label}</p>
     <div className="p-6 rounded-2xl bg-white/5 border border-white/5 font-black italic uppercase tracking-tight text-xl">{value}</div>
  </div>
);

export default CharacterProfile;
