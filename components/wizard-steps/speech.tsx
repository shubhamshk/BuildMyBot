"use client";

import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { useCharacter } from "@/context/CharacterContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface SpeechStepProps {
  characterIndex: number;
  onNext: () => void;
  onBack: () => void;
}

const TONE_OPTIONS = [
  "Formal & Precise",
  "Casual & Warm",
  "Mysterious & Cryptic",
  "Playful & Energetic",
  "Serious & Authoritative",
  "Gentle & Empathetic",
];

const VOCABULARY_OPTIONS = [
  "Archival & Technical",
  "Simple & Direct",
  "Poetic & Flowery",
  "Modern & Slang",
  "Academic & Complex",
  "Conversational",
];

export default function SpeechStep({ characterIndex, onNext, onBack }: SpeechStepProps) {
  const { characters, updateCharacter } = useCharacter();
  const character = characters[characterIndex];
  const [showCustomTone, setShowCustomTone] = useState(false);
  const [showCustomVocab, setShowCustomVocab] = useState(false);
  const [customTone, setCustomTone] = useState("");
  const [customVocab, setCustomVocab] = useState("");

  const speechRules = character.speechRules || {};

  const handleToneSelect = (tone: string) => {
    updateCharacter(characterIndex, {
      speechRules: { ...speechRules, tone },
    });
    setShowCustomTone(false);
    setCustomTone("");
  };

  const handleVocabSelect = (vocab: string) => {
    updateCharacter(characterIndex, {
      speechRules: { ...speechRules, vocabulary: vocab },
    });
    setShowCustomVocab(false);
    setCustomVocab("");
  };

  const isCustomTone = speechRules.tone && !TONE_OPTIONS.includes(speechRules.tone);
  const isCustomVocab = speechRules.vocabulary && !VOCABULARY_OPTIONS.includes(speechRules.vocabulary);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-4xl font-bold text-foreground mb-3">Speech & Behavior</h2>
      <p className="text-muted-foreground mb-8">
        Define how your character speaks and behaves.
      </p>

      <div className="space-y-6 mb-8">
        {/* Tone Selection */}
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">Tone</label>
          <div className="grid grid-cols-2 gap-3 mb-3">
            {TONE_OPTIONS.map((tone) => (
              <motion.button
                key={tone}
                onClick={() => handleToneSelect(tone)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-3 rounded-xl glass border-2 transition-all text-sm relative overflow-hidden group ${
                  speechRules.tone === tone
                    ? "border-violet-500 bg-violet-500/20 shadow-lg shadow-violet-500/20"
                    : "border-border hover:border-violet-500/50"
                }`}
              >
                {speechRules.tone === tone && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-4 h-4 rounded-full bg-violet-500 flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </motion.div>
                )}
                <span className={`transition-colors ${
                  speechRules.tone === tone ? "text-violet-400 font-semibold" : "text-foreground"
                }`}>
                  {tone}
                </span>
                {speechRules.tone === tone && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 border-2 border-violet-500/30 rounded-xl pointer-events-none"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Custom Tone Input */}
          <AnimatePresence>
            {showCustomTone ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-3"
              >
                <div className="glass rounded-xl p-3 border-2 border-violet-500/50 bg-violet-500/10">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customTone}
                      onChange={(e) => setCustomTone(e.target.value)}
                      placeholder="e.g., Sarcastic & Witty..."
                      className="flex-1 h-10 px-3 rounded-lg glass border border-violet-500/50 focus:border-violet-500 transition-all outline-none text-sm"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && customTone.trim()) {
                          handleToneSelect(customTone.trim());
                        }
                        if (e.key === "Escape") {
                          setShowCustomTone(false);
                          setCustomTone("");
                        }
                      }}
                    />
                    <button
                      onClick={() => customTone.trim() && handleToneSelect(customTone.trim())}
                      className="px-3 py-2 rounded-lg bg-violet-500 hover:bg-violet-600 text-white text-sm font-medium transition-colors"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setShowCustomTone(false);
                        setCustomTone("");
                      }}
                      className="px-3 py-2 rounded-lg glass border border-border hover:bg-white/5 text-sm transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              !isCustomTone && (
                <motion.button
                  onClick={() => setShowCustomTone(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2 rounded-xl glass border-2 border-dashed border-border hover:border-violet-500/50 transition-all flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground text-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Custom Tone</span>
                </motion.button>
              )
            )}
          </AnimatePresence>

          {/* Show selected custom tone */}
          {isCustomTone && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-3 p-3 rounded-xl glass border-2 border-violet-500 bg-violet-500/20 shadow-lg shadow-violet-500/20 relative"
            >
              <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-violet-500 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
              <p className="text-xs font-medium text-violet-400 mb-1">Selected Custom Tone</p>
              <p className="text-sm font-semibold text-foreground">{speechRules.tone}</p>
              <button
                onClick={() => {
                  updateCharacter(characterIndex, {
                    speechRules: { ...speechRules, tone: "" },
                  });
                  setShowCustomTone(true);
                }}
                className="mt-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Change
              </button>
            </motion.div>
          )}
        </div>

        {/* Vocabulary Selection */}
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">Vocabulary</label>
          <div className="grid grid-cols-2 gap-3 mb-3">
            {VOCABULARY_OPTIONS.map((vocab) => (
              <motion.button
                key={vocab}
                onClick={() => handleVocabSelect(vocab)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-3 rounded-xl glass border-2 transition-all text-sm relative overflow-hidden group ${
                  speechRules.vocabulary === vocab
                    ? "border-violet-500 bg-violet-500/20 shadow-lg shadow-violet-500/20"
                    : "border-border hover:border-violet-500/50"
                }`}
              >
                {speechRules.vocabulary === vocab && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-4 h-4 rounded-full bg-violet-500 flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </motion.div>
                )}
                <span className={`transition-colors ${
                  speechRules.vocabulary === vocab ? "text-violet-400 font-semibold" : "text-foreground"
                }`}>
                  {vocab}
                </span>
                {speechRules.vocabulary === vocab && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 border-2 border-violet-500/30 rounded-xl pointer-events-none"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Custom Vocabulary Input */}
          <AnimatePresence>
            {showCustomVocab ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-3"
              >
                <div className="glass rounded-xl p-3 border-2 border-violet-500/50 bg-violet-500/10">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customVocab}
                      onChange={(e) => setCustomVocab(e.target.value)}
                      placeholder="e.g., Ancient & Mystical..."
                      className="flex-1 h-10 px-3 rounded-lg glass border border-violet-500/50 focus:border-violet-500 transition-all outline-none text-sm"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && customVocab.trim()) {
                          handleVocabSelect(customVocab.trim());
                        }
                        if (e.key === "Escape") {
                          setShowCustomVocab(false);
                          setCustomVocab("");
                        }
                      }}
                    />
                    <button
                      onClick={() => customVocab.trim() && handleVocabSelect(customVocab.trim())}
                      className="px-3 py-2 rounded-lg bg-violet-500 hover:bg-violet-600 text-white text-sm font-medium transition-colors"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setShowCustomVocab(false);
                        setCustomVocab("");
                      }}
                      className="px-3 py-2 rounded-lg glass border border-border hover:bg-white/5 text-sm transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              !isCustomVocab && (
                <motion.button
                  onClick={() => setShowCustomVocab(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2 rounded-xl glass border-2 border-dashed border-border hover:border-violet-500/50 transition-all flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground text-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Custom Vocabulary</span>
                </motion.button>
              )
            )}
          </AnimatePresence>

          {/* Show selected custom vocabulary */}
          {isCustomVocab && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-3 p-3 rounded-xl glass border-2 border-violet-500 bg-violet-500/20 shadow-lg shadow-violet-500/20 relative"
            >
              <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-violet-500 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
              <p className="text-xs font-medium text-violet-400 mb-1">Selected Custom Vocabulary</p>
              <p className="text-sm font-semibold text-foreground">{speechRules.vocabulary}</p>
              <button
                onClick={() => {
                  updateCharacter(characterIndex, {
                    speechRules: { ...speechRules, vocabulary: "" },
                  });
                  setShowCustomVocab(true);
                }}
                className="mt-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Change
              </button>
            </motion.div>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Speech Patterns (Optional)
          </label>
          <textarea
            placeholder="e.g., Uses 'hmm' frequently, speaks in questions..."
            value={speechRules.patterns || ""}
            onChange={(e) =>
              updateCharacter(characterIndex, {
                speechRules: { ...speechRules, patterns: e.target.value },
              })
            }
            className="w-full h-24 px-4 py-3 rounded-xl glass border border-border focus:border-violet-500 transition-all outline-none resize-none"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 py-4 rounded-2xl glass border border-border hover:bg-white/5 transition-colors text-center font-medium"
        >
          <ArrowLeft className="w-5 h-5 inline mr-2" />
          Back
        </button>
        <motion.button
          onClick={onNext}
          disabled={!speechRules.tone || !speechRules.vocabulary}
          className="flex-[2] py-4 rounded-2xl bg-violet-500 hover:bg-violet-600 text-white font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Next Step
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
