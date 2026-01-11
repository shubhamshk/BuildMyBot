import { NextRequest, NextResponse } from "next/server";
import { APIProvider } from "@/lib/api-key";
import { generatePersonality, generateScenario, generateBio } from "@/lib/generation/service";
import { CharacterState } from "@/context/CharacterContext";
import { createClient } from "@/lib/supabase/server";
import { checkUsageLimitServer, incrementUsageCountServer, logCreationAttemptServer } from "@/lib/subscriptions/server";

export async function POST(request: NextRequest) {
  try {
    const { characters, apiKey, provider, storyIdea } = await request.json();

    if (!characters || !Array.isArray(characters) || !apiKey || !provider) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check authentication
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Check usage limit
    const usageCheck = await checkUsageLimitServer(user.id);
    if (!usageCheck.allowed) {
      await logCreationAttemptServer(user.id, null, false, usageCheck.reason);
      return NextResponse.json(
        {
          error: "USAGE_LIMIT_EXCEEDED",
          message: usageCheck.reason || "Daily creation limit reached",
          currentCount: usageCheck.currentCount,
          limit: usageCheck.limit,
          resetAt: usageCheck.resetAt,
        },
        { status: 403 }
      );
    }

    // Check if user is trying to create more characters than allowed
    const characterCount = characters.length;
    const remaining = usageCheck.limit - usageCheck.currentCount;
    if (characterCount > remaining) {
      await logCreationAttemptServer(
        user.id,
        null,
        false,
        `Attempted to create ${characterCount} characters but only ${remaining} remaining`
      );
      return NextResponse.json(
        {
          error: "USAGE_LIMIT_EXCEEDED",
          message: `You can only create ${remaining} more character(s) today. You attempted to create ${characterCount}.`,
          currentCount: usageCheck.currentCount,
          limit: usageCheck.limit,
          resetAt: usageCheck.resetAt,
        },
        { status: 403 }
      );
    }

    const results: Array<{
      characterId: string;
      personality?: string;
      scenario?: string;
      bio?: string;
      error?: string;
    }> = [];

    // Process all characters
    for (const character of characters as CharacterState[]) {
      const result: {
        characterId: string;
        personality?: string;
        scenario?: string;
        bio?: string;
        error?: string;
      } = {
        characterId: character.id,
      };

      try {
        // Generate personality
        result.personality = await generatePersonality(character, apiKey, provider as APIProvider);

        // Generate scenario
        result.scenario = await generateScenario(character, storyIdea, apiKey, provider as APIProvider);

        // Generate bio
        if (result.scenario) {
          result.bio = await generateBio(character, result.scenario, apiKey, provider as APIProvider);
        }
      } catch (error: any) {
        result.error = error.message || "Generation failed";
      }

      results.push(result);
    }

    // Increment usage count for each successful character creation
    const successfulCreations = results.filter(r => !r.error && r.personality).length;
    if (successfulCreations > 0) {
      // Increment once per character created
      for (let i = 0; i < successfulCreations; i++) {
        await incrementUsageCountServer(user.id);
      }
      await logCreationAttemptServer(user.id, null, true);
    } else {
      // Log failed attempt
      await logCreationAttemptServer(user.id, null, false, "All character generations failed");
    }

    return NextResponse.json({ results });
  } catch (error: any) {
    console.error("Processing error:", error);
    
    // Log error
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await logCreationAttemptServer(user.id, null, false, error.message || "Processing failed");
    }

    return NextResponse.json(
      { error: error.message || "Failed to process characters" },
      { status: 500 }
    );
  }
}
