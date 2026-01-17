
import { NextRequest, NextResponse } from "next/server";
import { generateWithFallback } from "@/lib/generation/service";
import { CharacterState } from "@/context/CharacterContext";
import { APIProvider } from "@/lib/api-key";
import { buildPrompt, PromptStyle } from "@/lib/imagePrompts/buildPrompt";
import { getCharacterDescriptionForPrompt } from "@/lib/imagePrompts/characterTags";
import { VARIATION_SLOTS } from "@/lib/imagePrompts/variationSlots";

export const maxDuration = 300; // 5 minutes

export async function POST(request: NextRequest) {
    try {
        const { character, storyIdea, apiKey, provider, style } = await request.json();

        if ((!character && !storyIdea) || !apiKey || !provider) {
            return NextResponse.json(
                { error: "Missing required fields (character or storyIdea)" },
                { status: 400 }
            );
        }

        const systemPrompt = `You generate ONLY comma-separated keyword tags.
No sentences.
No explanations.
No unsafe content.
No minors.
No explicit anatomy.
No sexual actions.
Only visual descriptors.

Output format:
(tag, tag, tag,)

If rules are broken, regenerate.`;

        let description = "";
        if (character) {
            description = getCharacterDescriptionForPrompt(character as CharacterState);
        } else {
            description = `STORY/IDEA CONCEPT: ${storyIdea}\n\nGenerate specific characters and scenes that fit this concept. Visuals only.`;
        }
        const slots = JSON.stringify(VARIATION_SLOTS, null, 2);

        const userPrompt = `Generate 10 UNIQUE sets of visual tags for this character.
Each set must describe: detailed appearance (hair, eyes, skin, features), pose, camera angle, environment, lighting, and mood.

${description}

STRICT VARIATION RULES:
You MUST choose varied options from these lists for each prompt:
${slots}

For each of the 10 sets, output ONLY a comma-separated list of tags in parentheses, one per line.
Example:
(blonde_hair, blue_eyes, twin_tails, school_uniform, sitting, looking_at_viewer, classroom, bright_sunlight, happy)
(blonde_hair, blue_eyes, ponytail, swimwear, stretching, side_view, beach, sunset, energetic)

Output 10 lines now:`;

        const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;

        // Call AI
        const result = await generateWithFallback(
            provider as APIProvider,
            apiKey,
            fullPrompt,
            "imagePrompts"
        );

        // Parse Response
        // We expect 10 lines, each starting with "(" or just tags.
        const lines = result.split('\n').filter(line => line.trim().length > 10);

        // Assemble Prompts
        const prompts = lines.map((line, index) => {
            return buildPrompt(character as CharacterState, line, index, style as PromptStyle);
        }).slice(0, 10); // Ensure exactly 10 or fewer

        return NextResponse.json({ prompts });

    } catch (error: any) {
        console.error("Strict Prompt Generation Error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to generate prompts" },
            { status: 500 }
        );
    }
}
