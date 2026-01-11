"use client";

import { ArrowLeft, Sparkles } from "lucide-react";
import { useCharacter } from "@/context/CharacterContext";
import { motion } from "framer-motion";
import { AIAutoFillButton } from "@/components/ai-auto-fill-button";

interface BoundariesStepProps {
  characterIndex: number;
  onNext: () => void;
  onBack: () => void;
}

const CONTENT_RATINGS = ["SFW", "PG-13", "Mature", "Explicit"];

export default function BoundariesStep({ characterIndex, onNext, onBack }: BoundariesStepProps) {
  const { characters, updateCharacter } = useCharacter();
  const character = characters[characterIndex];

  const boundaries = character.boundaries || {};

  const handleAutoFill = (data: any) => {
    updateCharacter(characterIndex, {
      boundaries: {
        contentRating: data.contentRating || boundaries.contentRating,
        topics: data.topics || boundaries.topics,
        tone: data.tone || boundaries.tone,
      },
    });
  };

  const storyIdea = typeof window !== "undefined" ? localStorage.getItem("storyIdea") : null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-4xl font-bold text-foreground">Boundaries & Tone</h2>
        {storyIdea && (
          <AIAutoFillButton
            onAutoFill={handleAutoFill}
            step="boundaries"
            characterIndex={characterIndex}
            existingData={character}
            storyIdea={storyIdea}
          />
        )}
      </div>
      <p className="text-muted-foreground mb-8">
        Set the content boundaries and overall tone for your character.
      </p>

      <div className="space-y-6 mb-8">
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">
            Content Rating
          </label>
          <div className="grid grid-cols-4 gap-3">
            {CONTENT_RATINGS.map((rating) => (
              <motion.button
                key={rating}
                onClick={() =>
                  updateCharacter(characterIndex, {
                    boundaries: { ...boundaries, contentRating: rating },
                  })
                }
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-3 rounded-xl glass border-2 transition-all text-sm font-medium relative overflow-hidden group ${
                  boundaries.contentRating === rating
                    ? "border-violet-500 bg-violet-500/20 shadow-lg shadow-violet-500/20"
                    : "border-border hover:border-violet-500/50"
                }`}
              >
                {boundaries.contentRating === rating && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-1 w-4 h-4 rounded-full bg-violet-500 flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </motion.div>
                )}
                <span className={`transition-colors ${
                  boundaries.contentRating === rating ? "text-violet-400 font-bold" : "text-foreground"
                }`}>
                  {rating}
                </span>
                {boundaries.contentRating === rating && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 border-2 border-violet-500/30 rounded-xl pointer-events-none"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Topics to Avoid (Optional)
          </label>
          <textarea
            placeholder="e.g., Violence, Politics, Religion..."
            value={boundaries.topics || ""}
            onChange={(e) =>
              updateCharacter(characterIndex, {
                boundaries: { ...boundaries, topics: e.target.value },
              })
            }
            className="w-full h-24 px-4 py-3 rounded-xl glass border border-border focus:border-violet-500 transition-all outline-none resize-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Overall Tone (Optional)
          </label>
          <textarea
            placeholder="e.g., Light-hearted, Serious, Dark..."
            value={boundaries.tone || ""}
            onChange={(e) =>
              updateCharacter(characterIndex, {
                boundaries: { ...boundaries, tone: e.target.value },
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
          disabled={!boundaries.contentRating}
          className="flex-[2] py-4 rounded-2xl bg-violet-500 hover:bg-violet-600 text-white font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Sparkles className="w-5 h-5" />
          Generate Character{characterIndex === 0 && characters.length > 1 ? "s" : ""}
        </motion.button>
      </div>
    </div>
  );
}
