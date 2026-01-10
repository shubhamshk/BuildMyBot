"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useCharacter } from "@/context/CharacterContext";
import { motion } from "framer-motion";

interface BasicsStepProps {
  characterIndex: number;
  onNext: () => void;
}

export default function BasicsStep({ characterIndex, onNext }: BasicsStepProps) {
  const { characters, updateCharacter } = useCharacter();
  const character = characters[characterIndex];
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!character.basics.name.trim()) newErrors.name = "Name is required";
    if (!character.basics.age) newErrors.age = "Age is required";
    if (!character.basics.setting.trim()) newErrors.setting = "Setting is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-4xl font-bold text-foreground mb-3">Basic Info</h2>
      <p className="text-muted-foreground mb-8">
        Let&apos;s start with the fundamentals of your character.
      </p>

      <div className="glass rounded-3xl p-6 md:p-8 space-y-6 border border-border">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Character Name
          </label>
          <input
            type="text"
            placeholder="e.g., Elara Vance"
            value={character.basics.name}
            onChange={(e) =>
              updateCharacter(characterIndex, {
                basics: { ...character.basics, name: e.target.value },
              })
            }
            className={`w-full h-12 px-4 rounded-xl glass border transition-all outline-none ${
              errors.name
                ? "border-red-500/50 focus:border-red-500"
                : "border-border focus:border-violet-500"
            }`}
          />
          {errors.name && <p className="text-sm text-red-400 mt-1">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Age</label>
            <input
              type="number"
              placeholder="24"
              value={character.basics.age}
              onChange={(e) =>
                updateCharacter(characterIndex, {
                  basics: { ...character.basics, age: e.target.value },
                })
              }
              className={`w-full h-12 px-4 rounded-xl glass border transition-all outline-none ${
                errors.age
                  ? "border-red-500/50 focus:border-red-500"
                  : "border-border focus:border-violet-500"
              }`}
            />
            {errors.age && <p className="text-sm text-red-400 mt-1">{errors.age}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Gender</label>
            <select
              value={character.basics.gender}
              onChange={(e) =>
                updateCharacter(characterIndex, {
                  basics: { ...character.basics, gender: e.target.value },
                })
              }
              className="w-full h-12 px-4 rounded-xl glass border border-border focus:border-violet-500 transition-all outline-none appearance-none cursor-pointer [&>option]:bg-zinc-900 [&>option]:text-white"
            >
              <option value="Female" className="bg-zinc-900 text-white">Female</option>
              <option value="Male" className="bg-zinc-900 text-white">Male</option>
              <option value="Non-binary" className="bg-zinc-900 text-white">Non-binary</option>
              <option value="Other" className="bg-zinc-900 text-white">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Story Setting
          </label>
          <input
            type="text"
            placeholder="e.g., Cyberpunk Neo-Tokyo, Medieval Fantasy Kingdom"
            value={character.basics.setting}
            onChange={(e) =>
              updateCharacter(characterIndex, {
                basics: { ...character.basics, setting: e.target.value },
              })
            }
            className={`w-full h-12 px-4 rounded-xl glass border transition-all outline-none ${
              errors.setting
                ? "border-red-500/50 focus:border-red-500"
                : "border-border focus:border-violet-500"
            }`}
          />
          {errors.setting && <p className="text-sm text-red-400 mt-1">{errors.setting}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Relationship to User
          </label>
          <input
            type="text"
            placeholder="e.g., Mentor, Arch-rival, Ally"
            value={character.basics.relationship}
            onChange={(e) =>
              updateCharacter(characterIndex, {
                basics: { ...character.basics, relationship: e.target.value },
              })
            }
            className="w-full h-12 px-4 rounded-xl glass border border-border focus:border-violet-500 transition-all outline-none"
          />
        </div>
      </div>

      <motion.button
        onClick={handleNext}
        className="w-full mt-8 py-4 rounded-2xl bg-violet-500 hover:bg-violet-600 text-white font-semibold flex items-center justify-center gap-2 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Next Step
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
