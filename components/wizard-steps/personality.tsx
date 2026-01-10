"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCharacter } from "@/context/CharacterContext";
import { motion } from "framer-motion";

interface PersonalityStepProps {
  characterIndex: number;
  onNext: () => void;
  onBack: () => void;
}

export default function PersonalityStep({ characterIndex, onNext, onBack }: PersonalityStepProps) {
  const { characters, updateCharacter } = useCharacter();
  const character = characters[characterIndex];

  const sliders = [
    {
      key: "warmth" as const,
      label: "Warm vs. Cold",
      left: "WARM",
      right: "COLD",
    },
    {
      key: "confidence" as const,
      label: "Shy vs. Confident",
      left: "SHY",
      right: "CONFIDENT",
    },
    {
      key: "calmness" as const,
      label: "Calm vs. Chaotic",
      left: "CALM",
      right: "CHAOTIC",
    },
    {
      key: "reserve" as const,
      label: "Emotional vs. Reserved",
      left: "EMOTIONAL",
      right: "RESERVED",
    },
  ];

  const getLabel = (key: string, value: number) => {
    if (key === "warmth") {
      if (value < 30) return "Cold";
      if (value > 70) return "Warm";
      return "Neutral";
    }
    if (key === "confidence") {
      if (value < 30) return "Shy";
      if (value > 70) return "Very Confident";
      return "Balanced";
    }
    if (key === "calmness") {
      if (value < 30) return "Chaotic";
      if (value > 70) return "Calm";
      return "Balanced";
    }
    if (key === "reserve") {
      if (value < 30) return "Emotional";
      if (value > 70) return "Reserved";
      return "Balanced";
    }
    return "Neutral";
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-foreground mb-3">Personality Profile</h2>
      <p className="text-muted-foreground mb-8">
        Define the core temperament and behavioral nuances of your AI character.
      </p>

      <div className="space-y-6 mb-8">
        {sliders.map((slider, index) => {
          const value = character.personality[slider.key];
          const label = getLabel(slider.key, value);

          return (
            <motion.div
              key={slider.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-6 border border-border"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-foreground">{slider.label}</span>
                <div className="px-3 py-1 rounded-lg bg-violet-500/20 text-violet-400 text-xs font-medium">
                  {label}
                </div>
              </div>

              <div className="relative mb-4">
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                  <span>{slider.left}</span>
                  <span>{slider.right}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={value}
                  onChange={(e) =>
                    updateCharacter(characterIndex, {
                      personality: {
                        ...character.personality,
                        [slider.key]: parseInt(e.target.value),
                      },
                    })
                  }
                  className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-violet-500"
                  style={{
                    background: `linear-gradient(to right, rgb(139, 92, 246) 0%, rgb(139, 92, 246) ${value}%, rgb(63, 63, 70) ${value}%, rgb(63, 63, 70) 100%)`,
                  }}
                />
              </div>
            </motion.div>
          );
        })}
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
          className="flex-[2] py-4 rounded-2xl bg-violet-500 hover:bg-violet-600 text-white font-semibold flex items-center justify-center gap-2 transition-colors"
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
