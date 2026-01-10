
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CharacterState } from '../types';

interface AppContextType {
  character: CharacterState;
  setCharacter: React.Dispatch<React.SetStateAction<CharacterState>>;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  resetCharacter: () => void;
}

const initialCharacter: CharacterState = {
  name: '',
  age: '',
  gender: 'Female',
  setting: '',
  relationship: '',
  personality: {
    warmth: 50,
    confidence: 50,
    calmness: 50,
    reserve: 50,
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [character, setCharacter] = useState<CharacterState>(initialCharacter);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      document.documentElement.classList.toggle('dark', next === 'dark');
      return next;
    });
  }, []);

  const resetCharacter = useCallback(() => {
    setCharacter(initialCharacter);
  }, []);

  return (
    <AppContext.Provider value={{ character, setCharacter, theme, toggleTheme, resetCharacter }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
