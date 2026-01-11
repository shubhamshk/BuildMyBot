import { NextRequest, NextResponse } from "next/server";
import { APIProvider } from "@/lib/api-key";
import { generatePersonality, generateScenario, generateBio } from "@/lib/generation/service";
import { CharacterState } from "@/context/CharacterContext";

export async function POST(request: NextRequest) {
  try {
    const { characters, apiKey, provider, storyIdea } = await request.json();

    if (!characters || !Array.isArray(characters) || !apiKey || !provider) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
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

    return NextResponse.json({ results });
  } catch (error: any) {
    console.error("Processing error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process characters" },
      { status: 500 }
    );
  }
}
