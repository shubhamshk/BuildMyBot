
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';

const WizardBasicInfo: React.FC = () => {
  const navigate = useNavigate();
  const { character, setCharacter } = useApp();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!character.name.trim()) newErrors.name = "Name is required";
    if (!character.age) newErrors.age = "Age is required";
    if (!character.setting.trim()) newErrors.setting = "Setting is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      navigate('/wizard/personality');
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Header */}
        <div className="flex flex-col items-center mb-16">
          <div className="flex gap-2 mb-6">
            <div className="w-16 h-1.5 rounded-full bg-primary shadow-[0_0_15px_rgba(127,19,236,0.5)]" />
            <div className="w-16 h-1.5 rounded-full bg-slate-200 dark:bg-white/10" />
            <div className="w-16 h-1.5 rounded-full bg-slate-200 dark:bg-white/10" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-center">Basic Matrix</h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-2">Step 01: Core Identification</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <FormInput
                label="Character Name"
                placeholder="e.g., Elara Vance"
                value={character.name}
                error={errors.name}
                onChange={(v: string) => setCharacter({ ...character, name: v })}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="Age"
                  type="number"
                  placeholder="24"
                  value={character.age}
                  error={errors.age}
                  onChange={(v: string) => setCharacter({ ...character, age: v })}
                />
                <FormSelect
                  label="Gender Identity"
                  value={character.gender}
                  options={['Female', 'Male', 'Non-binary', 'Mystical']}
                  onChange={(v: string) => setCharacter({ ...character, gender: v })}
                />
              </div>

              <FormInput
                label="World Setting"
                placeholder="e.g., Cyberpunk Neo-Tokyo"
                value={character.setting}
                error={errors.setting}
                onChange={(v: string) => setCharacter({ ...character, setting: v })}
              />

              <FormInput
                label="User Relationship"
                placeholder="e.g., Master, Rival, Trusted Ally"
                value={character.relationship}
                onChange={(v: string) => setCharacter({ ...character, relationship: v })}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => navigate('/')}
                className="flex-1 py-5 rounded-2xl border border-slate-200 dark:border-white/10 font-bold uppercase tracking-widest text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleNext}
                className="flex-[2] py-5 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20 hover:bg-primary-600 transition-all flex items-center justify-center gap-2"
              >
                <span>Continue</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </motion.div>

          {/* Visual Side (Hidden on Mobile) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden lg:block sticky top-32"
          >
            <div className="glass rounded-[3rem] p-8 border-white/5 relative overflow-hidden group">
              <div className="aspect-[4/5] rounded-[2rem] bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
                  <span className="material-symbols-outlined text-9xl text-primary/10">face</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-8 glass-light dark:glass backdrop-blur-xl border-t border-white/5">
                  <h4 className="text-2xl font-black italic uppercase mb-1">{character.name || "UNNAMED"}</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">{character.setting || "UNDISCOVERED WORLD"}</p>
                  <div className="flex gap-2">
                    <div className="px-3 py-1 bg-white/10 rounded-lg text-[10px] font-bold uppercase">{character.age || "??"} YRS</div>
                    <div className="px-3 py-1 bg-white/10 rounded-lg text-[10px] font-bold uppercase">{character.gender}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

interface FormInputProps {
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
}

const FormInput = ({ label, placeholder, value, error, onChange, type = "text" }: FormInputProps) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full h-16 px-6 rounded-2xl bg-white dark:bg-white/5 border-2 transition-all outline-none text-base font-bold ${error ? 'border-pink-500/50 focus:border-pink-500' : 'border-slate-100 dark:border-white/5 focus:border-primary'
        }`}
    />
    {error && <p className="text-pink-500 text-[10px] font-black uppercase tracking-widest ml-1">{error}</p>}
  </div>
);

interface FormSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

const FormSelect = ({ label, value, options, onChange }: FormSelectProps) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-16 px-6 rounded-2xl bg-white dark:bg-white/5 border-2 border-slate-100 dark:border-white/5 focus:border-primary transition-all outline-none text-base font-bold appearance-none cursor-pointer"
    >
      {options.map((o: string) => <option key={o} value={o} className="dark:bg-slate-900">{o}</option>)}
    </select>
  </div>
);

export default WizardBasicInfo;
