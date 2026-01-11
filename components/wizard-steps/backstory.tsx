"use client";

import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { useCharacter } from "@/context/CharacterContext";
import { motion } from "framer-motion";
import { useState } from "react";
import { AIAutoFillButton } from "@/components/ai-auto-fill-button";

interface BackstoryStepProps {
  characterIndex: number;
  onNext: () => void;
  onBack: () => void;
}

const BACKSTORY_STYLES = [
  "Mysterious Past",
  "Tragic Origin",
  "Heroic Journey",
  "Villain Arc",
  "Rise to Power",
  "Fall from Grace",
  "Redemption Story",
  "Coming of Age",
  "Forbidden Love",
  "Revenge Quest",
];

export default function BackstoryStep({ characterIndex, onNext, onBack }: BackstoryStepProps) {
  const { characters, updateCharacter } = useCharacter();
  const character = characters[characterIndex];
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customStyle, setCustomStyle] = useState("");

  const handleStyleSelect = (style: string) => {
    updateCharacter(characterIndex, { backstoryStyle: style });
    setShowCustomInput(false);
    setCustomStyle("");
  };

  const handleCustomSubmit = () => {
    if (customStyle.trim()) {
      handleStyleSelect(customStyle.trim());
    }
  };

  const isCustomSelected = character.backstoryStyle && !BACKSTORY_STYLES.includes(character.backstoryStyle);

  const handleAutoFill = (data: string) => {
    if (BACKSTORY_STYLES.includes(data)) {
      handleStyleSelect(data);
    } else {
      setCustomStyle(data);
      handleCustomSubmit();
    }
  };

  const storyIdea = typeof window !== "undefined" ? localStorage.getItem("storyIdea") : null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-4xl font-bold text-foreground">Backstory Style</h2>
        {storyIdea && (
          <AIAutoFillButton
            onAutoFill={handleAutoFill}
            step="backstory"
            characterIndex={characterIndex}
            existingData={character}
            storyIdea={storyIdea}
          />
        )}
      </div>
      <p className="text-muted-foreground mb-8">
        Choose the narrative style for your character&apos;s backstory.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {BACKSTORY_STYLES.map((style) => (
          <motion.button
            key={style}
            onClick={() => handleStyleSelect(style)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-4 rounded-xl glass border-2 transition-all text-left relative overflow-hidden group ${
              character.backstoryStyle === style
                ? "border-violet-500 bg-violet-500/20 shadow-lg shadow-violet-500/20"
                : "border-border hover:border-violet-500/50"
            }`}
          >
            {character.backstoryStyle === style && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center"
              >
                <div className="w-2 h-2 rounded-full bg-white" />
              </motion.div>
            )}
            <span className={`text-sm font-medium transition-colors ${
              character.backstoryStyle === style ? "text-violet-400" : "text-foreground"
            }`}>
              {style}
            </span>
            {character.backstoryStyle === style && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 border-2 border-violet-500/30 rounded-xl pointer-events-none"
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Custom Input */}
      {showCustomInput ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-4"
        >
          <div className="glass rounded-xl p-4 border-2 border-violet-500/50 bg-violet-500/10">
            <label className="text-sm font-medium text-foreground mb-2 block">
              Custom Backstory Style
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customStyle}
                onChange={(e) => setCustomStyle(e.target.value)}
                placeholder="e.g., Time Traveler, Immortal Being..."
                className="flex-1 h-12 px-4 rounded-xl glass border border-violet-500/50 focus:border-violet-500 transition-all outline-none"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCustomSubmit();
                  }
                  if (e.key === "Escape") {
                    setShowCustomInput(false);
                    setCustomStyle("");
                  }
                }}
              />
              <button
                onClick={handleCustomSubmit}
                className="px-4 py-2 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-medium transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setShowCustomInput(false);
                  setCustomStyle("");
                }}
                className="px-4 py-2 rounded-xl glass border border-border hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.button
          onClick={() => setShowCustomInput(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mb-4 py-3 rounded-xl glass border-2 border-dashed border-border hover:border-violet-500/50 transition-all flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Custom Style</span>
        </motion.button>
      )}

      {/* Show selected custom style */}
      {isCustomSelected && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-4 rounded-xl glass border-2 border-violet-500 bg-violet-500/20 shadow-lg shadow-violet-500/20 relative"
        >
          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
          <p className="text-sm font-medium text-violet-400 mb-1">Selected Custom Style</p>
          <p className="text-foreground font-semibold">{character.backstoryStyle}</p>
          <button
            onClick={() => {
              updateCharacter(characterIndex, { backstoryStyle: "" });
              setShowCustomInput(true);
            }}
            className="mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Change
          </button>
        </motion.div>
      )}

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
          disabled={!character.backstoryStyle}
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
