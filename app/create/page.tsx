"use client";

import { motion } from "framer-motion";
import { Sparkles, User, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCharacter } from "@/context/CharacterContext";

export default function CreatePage() {
  const router = useRouter();
  const { initializeCharacters } = useCharacter();
  const [mode, setMode] = useState<"single" | "multiple" | null>(null);
  const [characterCount, setCharacterCount] = useState(2);

  const handleContinue = () => {
    if (mode === "single") {
      initializeCharacters(1);
      router.push("/wizard");
    } else if (mode === "multiple") {
      initializeCharacters(characterCount);
      router.push("/wizard");
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-16 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl glass border border-violet-500/30 flex items-center justify-center bg-gradient-to-br from-violet-500/20 to-blue-500/20">
              <Sparkles className="w-6 h-6 text-violet-400" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">AI Character Builder</h1>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            How many characters do you want to create?
          </h2>
          <p className="text-muted-foreground">
            Choose to create a single character or multiple characters at once
          </p>
        </motion.div>

        {/* Mode Selection */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.button
            onClick={() => setMode("single")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`glass rounded-2xl p-8 border-2 transition-all relative overflow-hidden group ${
              mode === "single"
                ? "border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/20"
                : "border-border hover:border-violet-500/50"
            }`}
          >
            {mode === "single" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-4 right-4 w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center"
              >
                <CheckCircle2 className="w-4 h-4 text-white" />
              </motion.div>
            )}
            <div className={`w-16 h-16 rounded-2xl mb-4 mx-auto flex items-center justify-center transition-all ${
              mode === "single"
                ? "bg-violet-500/20 border-2 border-violet-500/50"
                : "bg-violet-500/10 border-2 border-violet-500/20"
            }`}>
              <User className={`w-8 h-8 transition-colors ${
                mode === "single" ? "text-violet-400" : "text-violet-500/60"
              }`} />
            </div>
            <h3 className={`text-xl font-semibold mb-2 transition-colors ${
              mode === "single" ? "text-foreground" : "text-foreground/80"
            }`}>
              Single Character
            </h3>
            <p className="text-sm text-muted-foreground">
              Create one detailed character with full customization
            </p>
            {mode === "single" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 border-2 border-violet-500/30 rounded-2xl pointer-events-none"
              />
            )}
          </motion.button>

          <motion.button
            onClick={() => setMode("multiple")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`glass rounded-2xl p-8 border-2 transition-all relative overflow-hidden group ${
              mode === "multiple"
                ? "border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/20"
                : "border-border hover:border-violet-500/50"
            }`}
          >
            {mode === "multiple" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-4 right-4 w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center"
              >
                <CheckCircle2 className="w-4 h-4 text-white" />
              </motion.div>
            )}
            <div className={`w-16 h-16 rounded-2xl mb-4 mx-auto flex items-center justify-center transition-all ${
              mode === "multiple"
                ? "bg-violet-500/20 border-2 border-violet-500/50"
                : "bg-violet-500/10 border-2 border-violet-500/20"
            }`}>
              <Users className={`w-8 h-8 transition-colors ${
                mode === "multiple" ? "text-violet-400" : "text-violet-500/60"
              }`} />
            </div>
            <h3 className={`text-xl font-semibold mb-2 transition-colors ${
              mode === "multiple" ? "text-foreground" : "text-foreground/80"
            }`}>
              Multiple Characters
            </h3>
            <p className="text-sm text-muted-foreground">
              Create multiple characters in one session
            </p>
            {mode === "multiple" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 border-2 border-violet-500/30 rounded-2xl pointer-events-none"
              />
            )}
          </motion.button>
        </div>

        {/* Character Count Selector */}
        {mode === "multiple" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass rounded-2xl p-6 border border-violet-500/30 bg-violet-500/5 mb-8"
          >
            <label className="text-sm font-semibold text-foreground mb-4 block">
              Number of Characters
            </label>
            <div className="flex items-center gap-4 mb-4">
              <input
                type="range"
                min="2"
                max="5"
                value={characterCount}
                onChange={(e) => setCharacterCount(parseInt(e.target.value))}
                className="flex-1 h-2 bg-muted rounded-full appearance-none cursor-pointer accent-violet-500"
              />
              <div className="w-20 h-14 rounded-xl glass border-2 border-violet-500/50 bg-violet-500/10 flex items-center justify-center shadow-lg shadow-violet-500/20">
                <span className="text-3xl font-bold text-violet-400">{characterCount}</span>
              </div>
            </div>
            <div className="flex gap-2 justify-center">
              {[2, 3, 4, 5].map((num) => (
                <motion.button
                  key={num}
                  onClick={() => setCharacterCount(num)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-12 h-12 rounded-xl glass border-2 transition-all font-semibold ${
                    characterCount === num
                      ? "border-violet-500 bg-violet-500/20 text-violet-400 shadow-lg shadow-violet-500/20"
                      : "border-border hover:border-violet-500/50 text-muted-foreground"
                  }`}
                >
                  {num}
                </motion.button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              You can create between 2 and 5 characters at once
            </p>
          </motion.div>
        )}

        {/* Continue Button */}
        {mode && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleContinue}
            className="w-full py-4 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-semibold flex items-center justify-center gap-2 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Continue to Builder
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
