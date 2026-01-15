"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, Save, Check, Sparkles, RefreshCw } from "lucide-react";
import { useCharacter } from "@/context/CharacterContext";
import Link from "next/link";
import { TerminalOutput } from "@/components/terminal-output";
import { validateAPIKey } from "@/lib/generation/service";
import { isAPIKeyConnected, APIProvider } from "@/lib/api-key";
import { saveCharacter, getCurrentUser } from "@/lib/supabase/characters";
import { UpgradeModal } from "@/components/upgrade-modal";

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
  const [scenarioInput, setScenarioInput] = useState<string>("");
  const [showScenarioModal, setShowScenarioModal] = useState(false);
  const [showAPIKeyModal, setShowAPIKeyModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [usageLimitError, setUsageLimitError] = useState<{
    currentCount: number;
    limit: number;
    resetAt: string;
    message: string;
  } | null>(null);

  const character = characters.find((char) => char.id === params?.id);

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

  // Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      const { user } = await getCurrentUser();
      setIsLoggedIn(!!user);
    };
    checkUser();
  }, []);

  // Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      const { user } = await getCurrentUser();
      setIsLoggedIn(!!user);
    };
    checkUser();
  }, []);

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
      router.push("/api-keys");
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
      router.push("/api-keys");
      throw new Error(keyCheck.error || "API key required");
    }

    updateSection(sectionId, { loading: true, error: null });

    try {
      // Get scenario context for bio generation
      const scenarioContext = sectionId === "bio"
        ? (sections.scenarioGreeting.content || character?.generatedContent?.scenario || "")
        : sectionId === "scenarioGreeting"
          ? (scenarioInput.trim() || undefined)
          : undefined;

      if (sectionId === "bio" && !scenarioContext) {
        throw new Error("Scenario must be generated before bio");
      }

      // Call server-side API to avoid CORS issues with LM Studio
      const response = await fetch("/api/generate-section", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          character,
          section: sectionId,
          apiKey: keyCheck.apiKey,
          provider: keyCheck.provider,
          scenario: scenarioContext,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || `Failed to generate ${sectionId}`);
      }

      const data = await response.json();
      const content = data.content;

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

    // Start with only personality loading, others not started yet
    setSections({
      personality: { loading: true, error: null, content: "" },
      scenarioGreeting: { loading: false, error: null, content: "" },
      bio: { loading: false, error: null, content: "" },
    });

    let personalityContent = "";
    let scenarioContent = "";
    let bioContent = "";

    try {
      // Step 1: Generate Personality
      const personalityResponse = await fetch("/api/generate-section", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          character,
          section: "personality",
          apiKey,
          provider,
        }),
      });

      if (!personalityResponse.ok) {
        const errorData = await personalityResponse.json().catch(() => ({ error: "Unknown error" }));

        // Check for usage limit error
        if (errorData.error === "USAGE_LIMIT_EXCEEDED") {
          setUsageLimitError({
            currentCount: errorData.currentCount || 0,
            limit: errorData.limit || 2,
            resetAt: errorData.resetAt || new Date().toISOString(),
            message: errorData.message || "Daily creation limit reached",
          });
          setShowUpgradeModal(true);
          setIsGenerating(false);
          return;
        }

        throw new Error(errorData.error || "Failed to generate personality");
      }

      const personalityData = await personalityResponse.json();
      personalityContent = personalityData.content;

      // Update UI - Personality complete, Scenario starting
      setSections(prev => ({
        ...prev,
        personality: { loading: false, error: null, content: personalityContent },
        scenarioGreeting: { loading: true, error: null, content: "" },
      }));
      updateCharacterContent("personality", personalityContent);

      // Step 2: Generate Scenario
      const scenarioResponse = await fetch("/api/generate-section", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          character,
          section: "scenarioGreeting",
          apiKey,
          provider,
          scenario: storyIdea,
        }),
      });

      if (!scenarioResponse.ok) {
        const errorData = await scenarioResponse.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || "Failed to generate scenario");
      }

      const scenarioData = await scenarioResponse.json();
      scenarioContent = scenarioData.content;

      // Update UI - Scenario complete, Bio starting
      setSections(prev => ({
        ...prev,
        scenarioGreeting: { loading: false, error: null, content: scenarioContent },
        bio: { loading: true, error: null, content: "" },
      }));
      updateCharacterContent("scenarioGreeting", scenarioContent);

      // Step 3: Generate Bio
      const bioResponse = await fetch("/api/generate-section", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          character,
          section: "bio",
          apiKey,
          provider,
          scenario: scenarioContent,
        }),
      });

      if (!bioResponse.ok) {
        const errorData = await bioResponse.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || "Failed to generate bio");
      }

      const bioData = await bioResponse.json();
      bioContent = bioData.content;

      // Update UI - Bio complete
      setSections(prev => ({
        ...prev,
        bio: { loading: false, error: null, content: bioContent },
      }));
      updateCharacterContent("bio", bioContent);

      // Update character context with all content
      const charIndex = characters.findIndex((c) => c.id === character.id);
      if (charIndex !== -1) {
        updateCharacter(charIndex, {
          generatedContent: {
            personality: personalityContent,
            scenario: scenarioContent,
            bio: bioContent,
          },
        });
      }

      // Clear background processing flag
      localStorage.removeItem("backgroundProcessing");
      localStorage.removeItem("processingApiKey");
      localStorage.removeItem("processingProvider");
      localStorage.removeItem("processingStoryIdea");
    } catch (error: any) {
      console.error("Background processing error:", error);

      // Update only the sections that are still loading with the error
      setSections(prev => ({
        personality: prev.personality.loading
          ? { loading: false, error: error.message, content: "" }
          : prev.personality,
        scenarioGreeting: prev.scenarioGreeting.loading
          ? { loading: false, error: error.message, content: "" }
          : prev.scenarioGreeting,
        bio: prev.bio.loading
          ? { loading: false, error: error.message, content: "" }
          : prev.bio,
      }));
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

    // Start with only personality loading
    setSections({
      personality: { loading: true, error: null, content: "" },
      scenarioGreeting: { loading: false, error: null, content: "" },
      bio: { loading: false, error: null, content: "" },
    });

    try {
      // Step 1: Generate Personality
      await handleGenerateSection("personality", keyCheck.apiKey, keyCheck.provider);

      // Step 2: Automatically generate Scenario (no modal)
      setSections(prev => ({
        ...prev,
        scenarioGreeting: { loading: true, error: null, content: "" },
      }));
      await handleGenerateSection("scenarioGreeting", keyCheck.apiKey, keyCheck.provider);

      // Step 3: Automatically generate Bio
      setSections(prev => ({
        ...prev,
        bio: { loading: true, error: null, content: "" },
      }));
      await handleGenerateSection("bio", keyCheck.apiKey, keyCheck.provider);
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
      router.push("/api-keys");
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
      router.push("/api-keys");
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
          {/* Note for users */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-violet-400" />
            </div>
            <p className="text-sm text-violet-300">
              <span className="font-semibold text-violet-200">Pro Tip:</span> If the character data isn&apos;t generating automatically, just click the <span className="inline-flex items-center gap-1 font-mono bg-violet-500/20 px-1.5 py-0.5 rounded text-xs text-violet-200"><RefreshCw className="w-3 h-3" /> regenerate </span> button in each section to trigger it manually.
            </p>
          </motion.div>
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

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => {
          setShowUpgradeModal(false);
          setUsageLimitError(null);
        }}
        currentCount={usageLimitError?.currentCount}
        limit={usageLimitError?.limit}
        resetAt={usageLimitError?.resetAt}
        reason={usageLimitError?.message}
      />
    </div>
  );
}
