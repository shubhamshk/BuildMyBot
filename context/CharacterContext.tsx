"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CharacterBasics {
  name: string;
  age: string;
  gender: string;
  setting: string;
  relationship: string;
}

export interface CharacterPersonality {
  warmth: number;
  confidence: number;
  calmness: number;
  reserve: number;
}

export interface CharacterState {
  id: string;
  basics: CharacterBasics;
  personality: CharacterPersonality;
  backstoryStyle?: string;
  speechRules?: {
    tone?: string;
    vocabulary?: string;
    patterns?: string;
  };
  boundaries?: {
    contentRating?: string;
    topics?: string;
    tone?: string;
  };
  generatedContent?: {
    personality?: string;
    backstory?: string;
    traits?: string;
    speech?: string;
    initialMessage?: string;
    scenario?: string;
    bio?: string;
  };
  isComplete: boolean;
}

interface CharacterContextType {
  characters: CharacterState[];
  setCharacters: React.Dispatch<React.SetStateAction<CharacterState[]>>;
  activeCharacterIndex: number;
  setActiveCharacterIndex: (index: number) => void;
  updateCharacter: (index: number, updates: Partial<CharacterState>) => void;
  resetCharacters: () => void;
  isMultiMode: boolean;
  setIsMultiMode: (isMulti: boolean) => void;
  initializeCharacters: (count: number) => void;
}

const initialCharacter: Omit<CharacterState, "id"> = {
  basics: {
    name: "",
    age: "",
    gender: "Female",
    setting: "",
    relationship: "",
  },
  personality: {
    warmth: 50,
    confidence: 50,
    calmness: 50,
    reserve: 50,
  },
  isComplete: false,
};

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export function CharacterProvider({ children }: { children: React.ReactNode }) {
  const [characters, setCharacters] = useState<CharacterState[]>([]);
  const [activeCharacterIndex, setActiveCharacterIndex] = useState(0);
  const [isMultiMode, setIsMultiMode] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const saved = localStorage.getItem("characters");
    const savedIndex = localStorage.getItem("activeCharacterIndex");
    const savedMultiMode = localStorage.getItem("isMultiMode");

    if (saved) {
      try {
        setCharacters(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load characters from localStorage");
      }
    }

    if (savedIndex) {
      setActiveCharacterIndex(parseInt(savedIndex, 10));
    }

    if (savedMultiMode) {
      setIsMultiMode(savedMultiMode === "true");
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("characters", JSON.stringify(characters));
    }
  }, [characters]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("activeCharacterIndex", activeCharacterIndex.toString());
    }
  }, [activeCharacterIndex]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("isMultiMode", isMultiMode.toString());
    }
  }, [isMultiMode]);

  const updateCharacter = (index: number, updates: Partial<CharacterState>) => {
    setCharacters((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], ...updates };
      return updated;
    });
  };

  const resetCharacters = () => {
    setCharacters([]);
    setActiveCharacterIndex(0);
    setIsMultiMode(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem("characters");
      localStorage.removeItem("activeCharacterIndex");
      localStorage.removeItem("isMultiMode");
    }
  };

  const initializeCharacters = (count: number) => {
    const newCharacters: CharacterState[] = Array.from({ length: count }, (_, i) => ({
      id: `char-${Date.now()}-${i}`,
      ...initialCharacter,
    }));
    setCharacters(newCharacters);
    setIsMultiMode(count > 1);
    setActiveCharacterIndex(0);
  };

  return (
    <CharacterContext.Provider
      value={{
        characters,
        setCharacters,
        activeCharacterIndex,
        setActiveCharacterIndex,
        updateCharacter,
        resetCharacters,
        isMultiMode,
        setIsMultiMode,
        initializeCharacters,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacter() {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error("useCharacter must be used within CharacterProvider");
  }
  return context;
}
