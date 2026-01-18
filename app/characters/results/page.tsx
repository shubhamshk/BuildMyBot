"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowLeft, Loader2, Users, Save, Check } from "lucide-react";
import { useCharacter } from "@/context/CharacterContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TerminalOutput } from "@/components/terminal-output";
import { validateAPIKey, generatePersonality, generateCombinedScenario } from "@/lib/generation/service";
import { isAPIKeyConnected, APIProvider } from "@/lib/api-key";
import { saveCharacter, getCurrentUser } from "@/lib/supabase/characters";

type SectionId = "personality";

interface SectionState {
  loading: boolean;
  error: string | null;
  content: string;
}

interface CombinedScenarioState {
  loading: boolean;
  error: string | null;
  content: string;
}

export default function MultipleCharactersResultPage() {
  const router = useRouter();
  const { characters, updateCharacter } = useCharacter();
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set(characters.map(c => c.id)));
  const [scenarioInput, setScenarioInput] = useState("");
  const [showScenarioModal, setShowScenarioModal] = useState(false);
  const [generationStates, setGenerationStates] = useState<Record<string, Record<SectionId, SectionState>>>({});
  const [generatingCharacters, setGeneratingCharacters] = useState<Set<string>>(new Set());
  
  // Combined scenario state (one for all characters)
  const [combinedScenario, setCombinedScenario] = useState<CombinedScenarioState>({
    loading: false,
    error: null,
    content: "",
  });
  const [isGeneratingScenario, setIsGeneratingScenario] = useState(false);
  const [allPersonalitiesGenerated, setAllPersonalitiesGenerated] = useState(false);
  
  // Save states
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      const { user } = await getCurrentUser();
      setIsLoggedIn(!!user);
    };
    checkUser();
  }, []);

  // Check if background processing is needed
  useEffect(() => {
    const shouldProcess = localStorage.getItem("backgroundProcessing") === "true";
    if (shouldProcess && characters.length > 0) {
      const apiKey = localStorage.getItem("processingApiKey");
      const provider = localStorage.getItem("processingProvider") as APIProvider;
      const storyIdea = localStorage.getItem("processingStoryIdea");

      if (apiKey && provider) {
        setIsProcessing(true);
        // Set all characters to loading state immediately
        characters.forEach((char) => {
          updateGenerationState(char.id, "personality", { loading: true, error: null, content: "" });
        });
        setCombinedScenario({ loading: true, error: null, content: "" });
        handleBackgroundProcessing(apiKey, provider, storyIdea || undefined);
      }
    }
  }, [characters.length]);

  // Initialize generation states from character data
  useEffect(() => {
    const states: Record<string, Record<SectionId, SectionState>> = {};
    characters.forEach((char) => {
      states[char.id] = {
        personality: {
          loading: false,
          error: null,
          content: char.generatedContent?.personality || "",
        },
      };
    });
    setGenerationStates(states);
    
    // Check if there's already a combined scenario stored
    const firstCharWithScenario = characters.find(c => c.generatedContent?.scenario);
    if (firstCharWithScenario?.generatedContent?.scenario) {
      setCombinedScenario({
        loading: false,
        error: null,
        content: firstCharWithScenario.generatedContent.scenario,
      });
    }
  }, [characters.length]);

  // Check API key and generate for characters that need it
  useEffect(() => {
    if (characters.length === 0) return;

    // HARD BLOCK: Check API key
    if (!isAPIKeyConnected()) {
      router.push("/api-keys");
      return;
    }

    // Generate personalities for characters that don't have content yet
    characters.forEach((char) => {
      if (!char.generatedContent?.personality && !generatingCharacters.has(char.id)) {
        handleGeneratePersonality(char.id);
      }
    });
  }, [characters.length]);

  // Check if all personalities are generated
  useEffect(() => {
    const allGenerated = characters.every(
      (char) => char.generatedContent?.personality || generationStates[char.id]?.personality?.content
    );
    setAllPersonalitiesGenerated(allGenerated);
    
    // Show scenario modal when all personalities are done
    if (allGenerated && !combinedScenario.content && !showScenarioModal && characters.length > 0) {
      const anyGenerating = Array.from(generatingCharacters).length > 0;
      if (!anyGenerating) {
        setShowScenarioModal(true);
      }
    }
  }, [characters, generationStates, generatingCharacters, combinedScenario.content]);

  // Listen for API key changes
  useEffect(() => {
    const handleStorageChange = () => {
      if (isAPIKeyConnected()) {
        characters.forEach((char) => {
          if (!char.generatedContent?.personality && !generatingCharacters.has(char.id)) {
            handleGeneratePersonality(char.id);
          }
        });
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [characters.length]);

  const updateGenerationState = useCallback((characterId: string, sectionId: SectionId, updates: Partial<SectionState>) => {
    setGenerationStates((prev) => ({
      ...prev,
      [characterId]: {
        ...prev[characterId],
        [sectionId]: { ...prev[characterId]?.[sectionId], ...updates },
      },
    }));
  }, []);

  const updateCharacterContent = useCallback((characterId: string, content: string, type: "personality" | "scenario") => {
    const charIndex = characters.findIndex((c) => c.id === characterId);
    if (charIndex !== -1) {
      const character = characters[charIndex];
      const currentContent = character.generatedContent || {};
      updateCharacter(charIndex, {
        generatedContent: {
          ...currentContent,
          [type]: content,
        },
      });
    }
  }, [characters, updateCharacter]);

  const handleGeneratePersonality = async (characterId: string, apiKey?: string, provider?: APIProvider) => {
    const character = characters.find((c) => c.id === characterId);
    if (!character) return;

    const keyCheck = apiKey && provider 
      ? { valid: true, apiKey, provider, error: undefined as string | undefined } 
      : validateAPIKey();
    if (!keyCheck.valid || !keyCheck.apiKey || !keyCheck.provider) {
      router.push("/api-keys");
      return;
    }

    setGeneratingCharacters((prev) => new Set(prev).add(characterId));
    updateGenerationState(characterId, "personality", { loading: true, error: null });

    try {
      const content = await generatePersonality(character, keyCheck.apiKey, keyCheck.provider);

      if (!content || content.trim() === "") {
        throw new Error("Generation returned empty content. Please try again.");
      }

      updateGenerationState(characterId, "personality", { loading: false, error: null, content });
      updateCharacterContent(characterId, content, "personality");
    } catch (error: any) {
      updateGenerationState(characterId, "personality", {
        loading: false,
        error: error.message || "Generation failed",
        content: generationStates[characterId]?.personality?.content || "",
      });
    } finally {
      setGeneratingCharacters((prev) => {
        const next = new Set(prev);
        next.delete(characterId);
        return next;
      });
    }
  };

  const handleBackgroundProcessing = async (apiKey: string, provider: APIProvider, storyIdea?: string) => {
    setIsProcessing(true);
    
    // Set all states to loading
    characters.forEach((char) => {
      updateGenerationState(char.id, "personality", { loading: true, error: null, content: "" });
    });
    setCombinedScenario({ loading: true, error: null, content: "" });

    try {
      // Get proxy config if using custom provider
      let proxyConfig = null;
      if (provider === "custom") {
        const savedConfig = localStorage.getItem("custom_proxy_config");
        if (savedConfig) {
          try {
            proxyConfig = JSON.parse(savedConfig);
          } catch (e) {
            console.error("Failed to parse proxy config", e);
          }
        }
      }
      
      // Process all characters in background
      const response = await fetch("/api/process-characters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          characters,
          apiKey,
          provider,
          storyIdea,
          proxyConfig,
        }),
      });

      if (!response.ok) {
        throw new Error("Background processing failed");
      }

      const data = await response.json();
      
      // Update all characters with results
      data.results?.forEach((result: any) => {
        if (result.error) {
          updateGenerationState(result.characterId, "personality", {
            loading: false,
            error: result.error,
            content: "",
          });
        } else {
          updateGenerationState(result.characterId, "personality", {
            loading: false,
            error: null,
            content: result.personality || "",
          });
          updateCharacterContent(result.characterId, result.personality || "", "personality");
        }
      });

      // Use first character's scenario for combined scenario
      const firstResult = data.results?.[0];
      if (firstResult?.scenario) {
        setCombinedScenario({ loading: false, error: null, content: firstResult.scenario });
        characters.forEach((char) => {
          updateCharacterContent(char.id, firstResult.scenario, "scenario");
        });
      }

      // Clear background processing flag
      localStorage.removeItem("backgroundProcessing");
      localStorage.removeItem("processingApiKey");
      localStorage.removeItem("processingProvider");
      localStorage.removeItem("processingStoryIdea");
    } catch (error: any) {
      console.error("Background processing error:", error);
      characters.forEach((char) => {
        updateGenerationState(char.id, "personality", {
          loading: false,
          error: error.message,
          content: "",
        });
      });
      setCombinedScenario({ loading: false, error: error.message, content: "" });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGenerateCombinedScenario = async (userScenario?: string) => {
    const keyCheck = validateAPIKey();
    if (!keyCheck.valid || !keyCheck.apiKey || !keyCheck.provider) {
      router.push("/api-keys");
      return;
    }

    setIsGeneratingScenario(true);
    setCombinedScenario((prev) => ({ ...prev, loading: true, error: null }));

    try {
      // Generate combined scenario for all characters
      const content = await generateCombinedScenario(characters, userScenario, keyCheck.apiKey, keyCheck.provider);

      if (!content || content.trim() === "") {
        throw new Error("Generation returned empty content. Please try again.");
      }

      setCombinedScenario({ loading: false, error: null, content });
      
      // Store the combined scenario in all characters
      characters.forEach((char) => {
        updateCharacterContent(char.id, content, "scenario");
      });
    } catch (error: any) {
      setCombinedScenario((prev) => ({
        ...prev,
        loading: false,
        error: error.message || "Generation failed",
      }));
    } finally {
      setIsGeneratingScenario(false);
    }
  };

  const handleScenarioSubmit = async () => {
    setShowScenarioModal(false);
    await handleGenerateCombinedScenario(scenarioInput.trim() || undefined);
  };

  const handleSkipScenario = async () => {
    setShowScenarioModal(false);
    setScenarioInput("");
    await handleGenerateCombinedScenario();
  };

  const handleRewritePersonality = async (characterId: string) => {
    await handleGeneratePersonality(characterId);
  };

  const handleRewriteScenario = async () => {
    await handleGenerateCombinedScenario();
  };

  const handleSaveAllToProfile = async () => {
    if (isSaving || isSaved) return;
    
    const { user } = await getCurrentUser();
    if (!user) {
      router.push("/auth/signin");
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    try {
      for (const character of characters) {
        const { error } = await saveCharacter({
          name: character.basics.name,
          age: character.basics.age,
          gender: character.basics.gender,
          setting: character.basics.setting,
          relationship: character.basics.relationship,
          personality: character.personality,
          backstoryStyle: character.backstoryStyle,
          speechRules: character.speechRules,
          boundaries: character.boundaries,
          generatedContent: {
            ...character.generatedContent,
            scenario: combinedScenario.content,
          },
        });

        if (error) {
          throw new Error(error);
        }
      }

      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err: any) {
      setSaveError(err.message || "Failed to save characters");
    } finally {
      setIsSaving(false);
    }
  };

  const toggleCard = (characterId: string) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(characterId)) {
        next.delete(characterId);
      } else {
        next.add(characterId);
      }
      return next;
    });
  };

  // Character names for display
  const characterNames = useMemo(() => 
    characters.map(c => c.basics.name).filter(Boolean).join(" & "),
    [characters]
  );

  if (characters.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-xl font-semibold text-foreground mb-4">No characters found</p>
          <Link
            href="/create"
            className="inline-block px-6 py-3 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-medium transition-colors"
          >
            Create Characters
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/wizard"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back to Wizard</span>
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-violet-400" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">
              {characters.length} Characters
            </h1>
          </div>
          <p className="text-muted-foreground">
            {characterNames || "Your characters"} — One shared story
          </p>
        </div>

        {/* Individual Character Personality Sections */}
        <div className="space-y-4 mb-8">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-500" />
            Individual Personalities
          </h2>
          
          {characters.map((character, index) => {
            const isExpanded = expandedCards.has(character.id);
            const isGenerating = generatingCharacters.has(character.id);
            const states = generationStates[character.id] || {
              personality: { loading: false, error: null, content: "" },
            };

            return (
              <motion.div
                key={character.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl border border-border overflow-hidden"
              >
                {/* Card Header */}
                <button
                  onClick={() => toggleCard(character.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/30 to-blue-500/30 flex items-center justify-center">
                      <span className="text-xl font-bold text-foreground">{index + 1}</span>
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-semibold text-foreground">
                        {character.basics.name || `Character ${index + 1}`}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {character.basics.gender} • {character.basics.age} • {character.basics.relationship}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {states.personality.content && (
                      <span className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-medium">
                        Generated
                      </span>
                    )}
                    {isGenerating && (
                      <Loader2 className="w-5 h-5 text-violet-400 animate-spin" />
                    )}
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>

                {/* Card Content - Personality Only */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0">
                        <TerminalOutput
                          title={`${character.basics.name}'s Personality`}
                          content={states.personality.content}
                          loading={states.personality.loading}
                          error={states.personality.error}
                          onRewrite={() => handleRewritePersonality(character.id)}
                          isGenerating={isGenerating}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Combined Scenario & Greeting Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            Shared Scenario & Greeting
            <span className="text-sm font-normal text-muted-foreground ml-2">
              (All characters in one story)
            </span>
          </h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <TerminalOutput
              title={`Combined Scenario — ${characterNames}`}
              content={combinedScenario.content}
              loading={combinedScenario.loading}
              error={combinedScenario.error}
              onRewrite={handleRewriteScenario}
              isGenerating={isGeneratingScenario}
            />
          </motion.div>
        </div>

        {/* Save Error */}
        {saveError && (
          <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {saveError}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4">
          <Link
            href="/create"
            className="flex-1 py-4 rounded-2xl glass border border-border hover:bg-white/5 transition-colors text-center font-medium"
          >
            Create More
          </Link>
          <Link
            href="/wizard"
            className="flex-1 py-4 rounded-2xl glass border border-border hover:bg-white/5 transition-colors text-center font-medium"
          >
            Edit Characters
          </Link>
          <button
            onClick={handleSaveAllToProfile}
            disabled={isSaving || isSaved || !allPersonalitiesGenerated || !combinedScenario.content}
            className={`flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold transition-colors ${
              isSaved
                ? "bg-emerald-500 text-white"
                : "bg-violet-500 hover:bg-violet-600 text-white"
            } disabled:opacity-50`}
          >
            {isSaving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : isSaved ? (
              <Check className="w-5 h-5" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            {isSaving ? "Saving..." : isSaved ? "Saved!" : isLoggedIn ? "Save All" : "Sign In to Save"}
          </button>
        </div>
      </div>

      {/* Combined Scenario Modal */}
      {showScenarioModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => {}}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-3xl p-8 max-w-2xl w-full border border-border relative z-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Shared Scenario
                </h2>
                <p className="text-sm text-muted-foreground">
                  For {characterNames}
                </p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Define a scenario where <strong className="text-foreground">{characters.length} characters</strong> interact together. 
              The AI will generate a combined opening scene featuring all of them.
            </p>
            
            <textarea
              value={scenarioInput}
              onChange={(e) => setScenarioInput(e.target.value)}
              placeholder={`e.g., ${characters[0]?.basics.name || "Character 1"} and ${characters[1]?.basics.name || "Character 2"} meet at a coffee shop during a thunderstorm...`}
              className="w-full h-32 px-4 py-3 rounded-xl glass border border-border focus:border-violet-500 transition-all outline-none resize-none mb-6"
            />
            
            <div className="flex gap-3">
              <button
                onClick={handleSkipScenario}
                disabled={isGeneratingScenario}
                className="flex-1 py-3 rounded-xl glass border border-border hover:bg-white/5 transition-colors font-medium disabled:opacity-50"
              >
                Skip (AI Generate)
              </button>
              <button
                onClick={handleScenarioSubmit}
                disabled={isGeneratingScenario}
                className="flex-1 py-3 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isGeneratingScenario && <Loader2 className="w-4 h-4 animate-spin" />}
                Generate Combined Scenario
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
