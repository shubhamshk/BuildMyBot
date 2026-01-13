"use client";

import { useState } from "react";
import { Wand2, Loader2 } from "lucide-react";
import { validateAPIKey } from "@/lib/generation/service";
import { isAPIKeyConnected } from "@/lib/api-key";
import { useRouter } from "next/navigation";

interface AIAutoFillButtonProps {
  onAutoFill: (data: any) => void;
  step: string;
  characterIndex: number;
  existingData?: any;
  storyIdea?: string;
  className?: string;
}

export function AIAutoFillButton({
  onAutoFill,
  step,
  characterIndex,
  existingData,
  storyIdea,
  className = "",
}: AIAutoFillButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleAutoFill = async () => {
    const idea = storyIdea || localStorage.getItem("storyIdea") || "";
    
    if (!idea) {
      alert("Please provide a story idea first. Go back to the idea page.");
      return;
    }

    if (!isAPIKeyConnected()) {
      router.push("/api-keys");
      return;
    }

    const keyCheck = validateAPIKey();
    if (!keyCheck.valid || !keyCheck.apiKey || !keyCheck.provider) {
      router.push("/api-keys");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auto-fill-wizard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          storyIdea: idea,
          step,
          characterIndex,
          existingData,
          apiKey: keyCheck.apiKey,
          provider: keyCheck.provider,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to auto-fill");
      }

      const result = await response.json();
      onAutoFill(result.data);
    } catch (error) {
      console.error("Auto-fill error:", error);
      alert("Failed to auto-fill. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleAutoFill}
        disabled={isLoading}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-500/20 border border-violet-500/50 hover:bg-violet-500/30 text-violet-400 transition-colors disabled:opacity-50 ${className}`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            AI Thinking...
          </>
        ) : (
          <>
            <Wand2 className="w-4 h-4" />
            Auto-Fill with AI
          </>
        )}
      </button>
    </>
  );
}
