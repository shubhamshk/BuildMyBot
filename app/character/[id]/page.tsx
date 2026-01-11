"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, Save, Check } from "lucide-react";
import { useCharacter } from "@/context/CharacterContext";
import Link from "next/link";
import { APIKeyManager } from "@/components/api-key-manager";
import { TerminalOutput } from "@/components/terminal-output";
import { validateAPIKey, generatePersonality, generateScenario, generateBio } from "@/lib/generation/service";
import { isAPIKeyConnected, APIProvider } from "@/lib/api-key";
import { saveCharacter, getCurrentUser } from "@/lib/supabase/characters";

type SectionId = "personality" | "scenarioGreeting" | "bio";

interface SectionState {
  loading: boolean;
  error: string | null;
  content: string;
}

export default function CharacterResultPage() {
  const params = useParams();
  const router = useRouter();
  const { characters, updateCharacter } = useCharacter();
  const [showAPIKeyModal, setShowAPIKeyModal] = useState(false);
  const [scenarioInput, setScenarioInput] = useState<string>("");
  const [showScenarioModal, setShowScenarioModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const character = characters.find((char) => char.id === params?.id);

  // Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      const { user } = await getCurrentUser();
      setIsLoggedIn(!!user);
    };
    checkUser();
  }, []);

  const [sections, setSections] = useState<Record<SectionId, SectionState>>({
    personality: {
      loading: false,
      error: null,
      content: character?.generatedContent?.personality || "",
    },
    scenarioGreeting: {
      loading: false,
      error: null,
      content: character?.generatedContent?.scenario || "",
    },
    bio: {
      loading: false,
      error: null,
      content: character?.generatedContent?.bio || "",
    },
  });

  // Check API key and generate on mount
  useEffect(() => {
    if (!character) return;

    // Check if already fully generated
    if (character.generatedContent?.personality &&
      character.generatedContent?.scenario &&
      character.generatedContent?.bio) {
      setSections({
        personality: {
          loading: false,
          error: null,
          content: character.generatedContent.personality || "",
        },
        scenarioGreeting: {
          loading: false,
          error: null,
          content: character.generatedContent.scenario || "",
        },
        bio: {
          loading: false,
          error: null,
          content: character.generatedContent.bio || "",
        },
      });
      return;
    }

    // Check if background processing is enabled
    const shouldProcess = localStorage.getItem("backgroundProcessing") === "true";
    if (shouldProcess) {
      const apiKey = localStorage.getItem("processingApiKey");
      const provider = localStorage.getItem("processingProvider") as APIProvider;
      const storyIdea = localStorage.getItem("processingStoryIdea");

      if (apiKey && provider) {
        // Set sections to loading state immediately
        setSections({
          personality: { loading: true, error: null, content: "" },
          scenarioGreeting: { loading: true, error: null, content: "" },
          bio: { loading: true, error: null, content: "" },
        });
        // Start background processing
        handleBackgroundProcessing(apiKey, provider, storyIdea || undefined);
        return;
      }
    }

    // Check API key - HARD BLOCK
    if (!isAPIKeyConnected()) {
      setShowAPIKeyModal(true);
      return;
    }

    // Start generation normally
    handleGenerateAll();
  }, [character?.id]);

  // Listen for API key changes
  useEffect(() => {
    const handleStorageChange = () => {
      if (isAPIKeyConnected() && !character?.generatedContent?.personality) {
        handleGenerateAll();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [character?.id]);

  const updateSection = useCallback((sectionId: SectionId, updates: Partial<SectionState>) => {
    setSections((prev) => ({
      ...prev,
      [sectionId]: { ...prev[sectionId], ...updates },
    }));
  }, []);

  const updateCharacterContent = useCallback((sectionId: SectionId, content: string) => {
    const charIndex = characters.findIndex((c) => c.id === character?.id);
    if (charIndex !== -1) {
      const currentContent = character?.generatedContent || {};
      let key: string;
      if (sectionId === "personality") {
        key = "personality";
      } else if (sectionId === "scenarioGreeting") {
        key = "scenario";
      } else {
        key = "bio";
      }
      updateCharacter(charIndex, {
        generatedContent: {
          ...currentContent,
          [key]: content,
        },
      });
    }
  }, [character, characters, updateCharacter]);

  const handleGenerateSection = async (
    sectionId: SectionId,
    apiKey?: string,
    provider?: APIProvider
  ) => {
    if (!character) return;

    const keyCheck = apiKey && provider ? { valid: true, apiKey, provider } : validateAPIKey();
    if (!keyCheck.valid || !keyCheck.apiKey || !keyCheck.provider) {
      setShowAPIKeyModal(true);
      throw new Error(keyCheck.error || "API key required");
    }

    updateSection(sectionId, { loading: true, error: null });

    try {
      let content = "";

      if (sectionId === "personality") {
        content = await generatePersonality(character, keyCheck.apiKey, keyCheck.provider);
      } else if (sectionId === "scenarioGreeting") {
        const userScenario = scenarioInput.trim() || undefined;
        content = await generateScenario(character, userScenario, keyCheck.apiKey, keyCheck.provider);
      } else if (sectionId === "bio") {
        const scenario = sections.scenarioGreeting.content || character?.generatedContent?.scenario || "";
        if (!scenario) {
          throw new Error("Scenario must be generated before bio");
        }
        content = await generateBio(character, scenario, keyCheck.apiKey, keyCheck.provider);
      }

      // Validate content is not empty
      if (!content || content.trim() === "") {
        throw new Error("Generation returned empty content. Please try again.");
      }

      updateSection(sectionId, { loading: false, error: null, content });
      updateCharacterContent(sectionId, content);
    } catch (error: any) {
      updateSection(sectionId, {
        loading: false,
        error: error.message || "Generation failed",
        content: sections[sectionId].content,
      });
      throw error;
    }
  };

  const handleBackgroundProcessing = async (apiKey: string, provider: APIProvider, storyIdea?: string) => {
    if (!character) return;

    setIsGenerating(true);
    setSections({
      personality: { loading: true, error: null, content: "" },
      scenarioGreeting: { loading: true, error: null, content: "" },
      bio: { loading: true, error: null, content: "" },
    });

    try {
      // Process in background - don't block UI
      const response = await fetch("/api/process-characters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          characters: [character],
          apiKey,
          provider,
          storyIdea,
        }),
      });

      if (!response.ok) {
        throw new Error("Background processing failed");
      }

      const data = await response.json();
      const result = data.results?.[0];

      if (result) {
        if (result.error) {
          throw new Error(result.error);
        }

        // Update all sections
        setSections({
          personality: {
            loading: false,
            error: null,
            content: result.personality || "",
          },
          scenarioGreeting: {
            loading: false,
            error: null,
            content: result.scenario || "",
          },
          bio: {
            loading: false,
            error: null,
            content: result.bio || "",
          },
        });

        // Update character
        const charIndex = characters.findIndex((c) => c.id === character.id);
        if (charIndex !== -1) {
          updateCharacter(charIndex, {
            generatedContent: {
              personality: result.personality,
              scenario: result.scenario,
              bio: result.bio,
            },
          });
        }
      }

      // Clear background processing flag
      localStorage.removeItem("backgroundProcessing");
      localStorage.removeItem("processingApiKey");
      localStorage.removeItem("processingProvider");
      localStorage.removeItem("processingStoryIdea");
    } catch (error: any) {
      console.error("Background processing error:", error);
      setSections({
        personality: { loading: false, error: error.message, content: "" },
        scenarioGreeting: { loading: false, error: error.message, content: "" },
        bio: { loading: false, error: error.message, content: "" },
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateAll = async () => {
    if (!character || isGenerating) return;

    const keyCheck = validateAPIKey();
    if (!keyCheck.valid || !keyCheck.apiKey || !keyCheck.provider) {
      setShowAPIKeyModal(true);
      return;
    }

    setIsGenerating(true);

    try {
      // Step 1: Generate Personality (MUST succeed)
      await handleGenerateSection("personality", keyCheck.apiKey, keyCheck.provider);

      // Step 2: Show scenario modal after personality succeeds
      setShowScenarioModal(true);
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleScenarioSubmit = async () => {
    setShowScenarioModal(false);
    const keyCheck = validateAPIKey();
    if (!keyCheck.valid || !keyCheck.apiKey || !keyCheck.provider) {
      setShowAPIKeyModal(true);
      return;
    }

    setIsGenerating(true);
    try {
      // Generate combined scenario + greeting
      await handleGenerateSection("scenarioGreeting", keyCheck.apiKey, keyCheck.provider);
      // Generate bio after scenario
      await handleGenerateSection("bio", keyCheck.apiKey, keyCheck.provider);
    } catch (error) {
      console.error("Scenario/Greeting/Bio generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSkipScenario = async () => {
    setShowScenarioModal(false);
    setScenarioInput("");
    const keyCheck = validateAPIKey();
    if (!keyCheck.valid || !keyCheck.apiKey || !keyCheck.provider) {
      setShowAPIKeyModal(true);
      return;
    }

    setIsGenerating(true);
    try {
      // Generate combined scenario + greeting without user input
      await handleGenerateSection("scenarioGreeting", keyCheck.apiKey, keyCheck.provider);
      // Generate bio after scenario
      await handleGenerateSection("bio", keyCheck.apiKey, keyCheck.provider);
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRewrite = async (sectionId: SectionId) => {
    await handleGenerateSection(sectionId);
  };

  const handleSaveToProfile = async () => {
    if (!character || isSaving || isSaved) return;

    // Check if logged in
    const { user } = await getCurrentUser();
    if (!user) {
      router.push("/auth/signin");
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    try {
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
        generatedContent: character.generatedContent,
      });

      if (error) {
        setSaveError(error);
      } else {
        setIsSaved(true);
        // Reset after 3 seconds
        setTimeout(() => setIsSaved(false), 3000);
      }
    } catch (err: any) {
      setSaveError(err.message || "Failed to save character");
    } finally {
      setIsSaving(false);
    }
  };

  if (!character) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-xl font-semibold text-foreground mb-4">Character not found</p>
          <Link
            href="/create"
            className="inline-block px-6 py-3 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-medium transition-colors"
          >
            Create Character
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/wizard"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back to Wizard</span>
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-2">{character.basics.name}</h1>
          <p className="text-muted-foreground">
            {character.basics.setting} • {character.basics.age} years old
          </p>
        </div>

        {/* Character Sections */}
        <div className="space-y-6">
          {/* Personality Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
          >
            <TerminalOutput
              title="Personality Profile"
              content={sections.personality.content}
              loading={sections.personality.loading}
              error={sections.personality.error}
              onRewrite={() => handleRewrite("personality")}
              isGenerating={isGenerating}
            />
          </motion.div>

          {/* Scenario & Greeting Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <TerminalOutput
              title="Scenario & Greeting"
              content={sections.scenarioGreeting.content}
              loading={sections.scenarioGreeting.loading}
              error={sections.scenarioGreeting.error}
              onRewrite={() => handleRewrite("scenarioGreeting")}
              isGenerating={isGenerating}
            />
          </motion.div>

          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <TerminalOutput
              title="Character Bio"
              content={sections.bio.content}
              loading={sections.bio.loading}
              error={sections.bio.error}
              onRewrite={() => handleRewrite("bio")}
              isGenerating={isGenerating}
            />
          </motion.div>
        </div>

        {/* Actions */}
        <div className="mt-8 space-y-4">
          {/* Save Error */}
          {saveError && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {saveError}
            </div>
          )}

          <div className="flex gap-4">
            <Link
              href="/create"
              className="flex-1 py-4 rounded-2xl glass border border-border hover:bg-white/5 transition-colors text-center font-medium"
            >
              Create Another
            </Link>
            <button
              onClick={() => router.push("/wizard")}
              className="flex-1 py-4 rounded-2xl glass border border-border hover:bg-white/5 transition-colors font-medium"
            >
              Edit Character
            </button>
            <button
              onClick={handleSaveToProfile}
              disabled={isSaving || isSaved || !sections.personality.content}
              className={`flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold transition-colors ${isSaved
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
              {isSaving ? "Saving..." : isSaved ? "Saved!" : isLoggedIn ? "Save" : "Sign In to Save"}
            </button>
          </div>
        </div>
      </div>

      {/* API Key Manager */}
      <APIKeyManager
        isOpen={showAPIKeyModal}
        onClose={() => setShowAPIKeyModal(false)}
        onSave={() => {
          setShowAPIKeyModal(false);
          // Immediately restart generation
          if (!character.generatedContent?.personality) {
            handleGenerateAll();
          }
        }}
      />

      {/* Scenario Modal */}
      {showScenarioModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => { }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-3xl p-8 max-w-2xl w-full border border-border relative z-10"
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">Define Scenario (Optional)</h2>
            <p className="text-muted-foreground mb-6">
              You can provide a custom scenario or let AI generate one based on your character.
            </p>
            <textarea
              value={scenarioInput}
              onChange={(e) => setScenarioInput(e.target.value)}
              placeholder="e.g., The character is in a coffee shop, waiting for someone. It's raining outside..."
              className="w-full h-32 px-4 py-3 rounded-xl glass border border-border focus:border-violet-500 transition-all outline-none resize-none mb-6"
            />
            <div className="flex gap-3">
              <button
                onClick={handleSkipScenario}
                disabled={isGenerating}
                className="flex-1 py-3 rounded-xl glass border border-border hover:bg-white/5 transition-colors font-medium disabled:opacity-50"
              >
                Skip (AI Generate)
              </button>
              <button
                onClick={handleScenarioSubmit}
                disabled={isGenerating}
                className="flex-1 py-3 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-medium transition-colors disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
