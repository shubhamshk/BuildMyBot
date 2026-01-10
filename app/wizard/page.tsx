"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useCharacter } from "@/context/CharacterContext";
import { useRouter } from "next/navigation";
import BasicsStep from "@/components/wizard-steps/basics";
import PersonalityStep from "@/components/wizard-steps/personality";
import BackstoryStep from "@/components/wizard-steps/backstory";
import SpeechStep from "@/components/wizard-steps/speech";
import BoundariesStep from "@/components/wizard-steps/boundaries";
import { APIKeyModal } from "@/components/api-key-modal";
import { isAPIKeyConnected } from "@/lib/api-key";

const STEPS = [
  { id: "basics", label: "Basics" },
  { id: "personality", label: "Personality" },
  { id: "backstory", label: "Backstory" },
  { id: "speech", label: "Speech & Behavior" },
  { id: "boundaries", label: "Boundaries & Tone" },
];

export default function WizardPage() {
  const router = useRouter();
  const {
    characters,
    activeCharacterIndex,
    setActiveCharacterIndex,
    updateCharacter,
    isMultiMode,
  } = useCharacter();
  const [currentStep, setCurrentStep] = useState(0);
  const [showAPIKeyModal, setShowAPIKeyModal] = useState(false);
  const [characterSteps, setCharacterSteps] = useState<Record<string, number>>({});

  // Redirect if no characters initialized
  useEffect(() => {
    if (characters.length === 0) {
      router.push("/create");
    }
  }, [characters, router]);

  // Initialize step tracking for each character
  useEffect(() => {
    const steps: Record<string, number> = {};
    characters.forEach((char) => {
      if (characterSteps[char.id] === undefined) {
        steps[char.id] = 0;
      }
    });
    if (Object.keys(steps).length > 0) {
      setCharacterSteps((prev) => ({ ...prev, ...steps }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characters.length]);

  // Update current step when character changes
  useEffect(() => {
    const currentCharId = characters[activeCharacterIndex]?.id;
    if (currentCharId) {
      const step = characterSteps[currentCharId] ?? 0;
      setCurrentStep(step);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCharacterIndex]);

  if (characters.length === 0) {
    return null;
  }

  const currentCharacter = characters[activeCharacterIndex];
  const currentStepId = STEPS[currentStep].id;

  const handleNext = () => {
    const currentCharId = currentCharacter.id;

    if (currentStep < STEPS.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setCharacterSteps((prev) => ({
        ...prev,
        [currentCharId]: nextStep,
      }));
    } else {
      // Last step - check if current character is complete
      const isComplete =
        currentCharacter.basics.name &&
        currentCharacter.basics.setting &&
        currentCharacter.backstoryStyle &&
        currentCharacter.speechRules?.tone &&
        currentCharacter.boundaries?.contentRating;

      if (isComplete) {
        // Check if all characters are complete
        const allComplete = characters.every((char) => {
          return (
            char.basics.name &&
            char.basics.setting &&
            char.backstoryStyle &&
            char.speechRules?.tone &&
            char.boundaries?.contentRating
          );
        });

        if (allComplete) {
          handleGenerate();
        } else {
          // Find next incomplete character
          const nextIncompleteIndex = characters.findIndex(
            (char, idx) =>
              idx > activeCharacterIndex &&
              (!char.basics.name ||
                !char.basics.setting ||
                !char.backstoryStyle ||
                !char.speechRules?.tone ||
                !char.boundaries?.contentRating)
          );

          if (nextIncompleteIndex !== -1) {
            setActiveCharacterIndex(nextIncompleteIndex);
            setCurrentStep(0);
            setCharacterSteps((prev) => ({
              ...prev,
              [characters[nextIncompleteIndex].id]: 0,
            }));
          }
        }
      }
    }
  };

  const handleBack = () => {
    const currentCharId = currentCharacter.id;

    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      setCharacterSteps((prev) => ({
        ...prev,
        [currentCharId]: prevStep,
      }));
    }
  };

  const handleCharacterSwitch = (index: number) => {
    setActiveCharacterIndex(index);
    const charId = characters[index].id;
    const step = characterSteps[charId] ?? 0;
    setCurrentStep(step);
  };

  const handleGenerate = () => {
    if (!isAPIKeyConnected()) {
      setShowAPIKeyModal(true);
      return;
    }

    // Navigate to results
    if (isMultiMode) {
      router.push("/characters/results");
    } else {
      router.push(`/character/${currentCharacter.id}`);
    }
  };

  const getStepProgress = (charIndex: number) => {
    const char = characters[charIndex];
    let completed = 0;
    if (char.basics.name && char.basics.setting) completed++;
    if (char.personality.warmth !== 50 || char.personality.confidence !== 50) completed++;
    if (char.backstoryStyle) completed++;
    if (char.speechRules?.tone) completed++;
    if (char.boundaries?.contentRating) completed++;
    return completed;
  };

  const renderStep = () => {
    switch (currentStepId) {
      case "basics":
        return <BasicsStep characterIndex={activeCharacterIndex} onNext={handleNext} />;
      case "personality":
        return <PersonalityStep characterIndex={activeCharacterIndex} onNext={handleNext} onBack={handleBack} />;
      case "backstory":
        return <BackstoryStep characterIndex={activeCharacterIndex} onNext={handleNext} onBack={handleBack} />;
      case "speech":
        return <SpeechStep characterIndex={activeCharacterIndex} onNext={handleNext} onBack={handleBack} />;
      case "boundaries":
        return <BoundariesStep characterIndex={activeCharacterIndex} onNext={handleGenerate} onBack={handleBack} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/create"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back</span>
          </Link>

          {/* Character Tabs (for multi-mode) */}
          {isMultiMode && (
            <div className="mb-8">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">
                Select Character to Edit
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {characters.map((char, index) => {
                  const progress = getStepProgress(index);
                  const isActive = index === activeCharacterIndex;
                  const isComplete = progress === STEPS.length;
                  const progressPercent = (progress / STEPS.length) * 100;

                  return (
                    <motion.button
                      key={char.id}
                      onClick={() => handleCharacterSwitch(index)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative glass rounded-2xl p-4 border-2 transition-all overflow-hidden group ${isActive
                          ? "border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/20"
                          : "border-border hover:border-violet-500/50"
                        }`}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2 w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center"
                        >
                          <div className="w-2 h-2 rounded-full bg-white" />
                        </motion.div>
                      )}

                      {/* Completion checkmark */}
                      {isComplete && !isActive && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        </div>
                      )}

                      {/* Character number */}
                      <div className={`w-12 h-12 rounded-xl mb-3 flex items-center justify-center font-bold text-lg transition-all ${isActive
                          ? "bg-violet-500/20 border-2 border-violet-500/50 text-violet-400"
                          : "bg-muted border-2 border-border text-muted-foreground"
                        }`}>
                        {index + 1}
                      </div>

                      {/* Character name or placeholder */}
                      <h4 className={`text-sm font-semibold mb-2 text-left transition-colors ${isActive ? "text-foreground" : "text-foreground/70"
                        }`}>
                        {char.basics.name || `Character ${index + 1}`}
                      </h4>

                      {/* Progress bar */}
                      <div className="h-1.5 rounded-full glass overflow-hidden mb-2">
                        <motion.div
                          className={`h-full rounded-full ${isComplete ? "bg-green-500" : "bg-violet-500"
                            }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercent}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>

                      {/* Progress text */}
                      <p className="text-xs text-muted-foreground text-left">
                        {progress} of {STEPS.length} steps
                      </p>

                      {/* Hover effect */}
                      {!isActive && (
                        <div className="absolute inset-0 bg-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step Progress */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              {isMultiMode && (
                <div className="px-3 py-1.5 rounded-lg glass border border-violet-500/30 bg-violet-500/10">
                  <span className="text-xs font-semibold text-violet-400">
                    Character {activeCharacterIndex + 1} of {characters.length}
                  </span>
                </div>
              )}
              <h1 className="text-2xl font-bold text-foreground">Character Wizard</h1>
            </div>
            <div className="flex justify-center gap-2 mb-4">
              {STEPS.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: index <= currentStep ? 1 : 0.8 }}
                  className={`h-2 rounded-full transition-all ${index <= currentStep
                      ? "w-10 bg-violet-500 shadow-lg shadow-violet-500/30"
                      : "w-8 bg-muted"
                    }`}
                />
              ))}
            </div>
            <div className="flex items-center justify-center gap-2">
              <p className="text-sm font-medium text-foreground">
                Step {currentStep + 1} of {STEPS.length}
              </p>
              <span className="text-muted-foreground">•</span>
              <p className="text-sm text-muted-foreground">
                {STEPS[currentStep].label}
              </p>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* API Key Modal */}
      <APIKeyModal
        isOpen={showAPIKeyModal}
        onClose={() => setShowAPIKeyModal(false)}
        onSave={() => {
          setShowAPIKeyModal(false);
          handleGenerate();
        }}
      />
    </div>
  );
}
