
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import LandingPage from './pages/LandingPage';
import WizardBasicInfo from './pages/WizardBasicInfo';
import WizardPersonality from './pages/WizardPersonality';
import CharacterProfile from './pages/CharacterProfile';
import PromptGenerator from './pages/PromptGenerator';
import { AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/wizard/basics" element={<WizardBasicInfo />} />
            <Route path="/wizard/personality" element={<WizardPersonality />} />
            <Route path="/profile" element={<CharacterProfile />} />
            <Route path="/generator" element={<PromptGenerator />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </HashRouter>
    </AppProvider>
  );
};

export default App;
