import { NextRequest, NextResponse } from "next/server";
import { APIProvider } from "@/lib/api-key";
import { generatePersonality, generateScenario, generateBio } from "@/lib/generation/service";
import { CharacterState } from "@/context/CharacterContext";

// Extend timeout for slow local AI models (LM Studio)
// Note: Vercel Hobby plan max is 300 seconds (5 minutes)
export const maxDuration = 300; // 5 minutes (max for Hobby plan)
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
    try {
        const { character, section, apiKey, provider, scenario } = await request.json();

        if (!character || !section || !apiKey || !provider) {
            return NextResponse.json(
                { error: "Missing required fields: character, section, apiKey, provider" },
                { status: 400 }
            );
        }

        const validSections = ["personality", "scenarioGreeting", "bio"];
        if (!validSections.includes(section)) {
            return NextResponse.json(
                { error: `Invalid section: ${section}. Must be one of: ${validSections.join(", ")}` },
                { status: 400 }
            );
        }

        let content = "";

        try {
            if (section === "personality") {
                content = await generatePersonality(character as CharacterState, apiKey, provider as APIProvider);
            } else if (section === "scenarioGreeting") {
                content = await generateScenario(character as CharacterState, scenario, apiKey, provider as APIProvider);
            } else if (section === "bio") {
                if (!scenario) {
                    return NextResponse.json(
                        { error: "Scenario is required for bio generation" },
                        { status: 400 }
                    );
                }
                content = await generateBio(character as CharacterState, scenario, apiKey, provider as APIProvider);
            }

            // Validate content is not empty
            if (!content || content.trim() === "") {
                return NextResponse.json(
                    { error: "Generation returned empty content" },
                    { status: 500 }
                );
            }

            return NextResponse.json({ content, section });
        } catch (error: any) {
            console.error(`Generation error for ${section}:`, error);
            return NextResponse.json(
                { error: error.message || `Failed to generate ${section}` },
                { status: 500 }
            );
        }
    } catch (error: any) {
        console.error("Request parsing error:", error);
        return NextResponse.json(
            { error: error.message || "Invalid request" },
            { status: 400 }
        );
    }
}
