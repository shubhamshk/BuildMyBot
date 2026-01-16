
import { CharacterState } from "@/context/CharacterContext";
import { APIProvider } from "@/lib/api-key";
import { generateWithFallback } from "./service";
import { IMAGE_PROMPT_SYSTEM_PROMPT, buildImagePromptUserPrompt } from "@/lib/prompts/image-prompts";

export interface ImagePrompt {
    category: string;
    positive: string;
    negative: string;
    modelRecommendation: string;
}

export interface ImagePromptsResponse {
    prompts: ImagePrompt[];
}

function extractJSONFromText(text: string): any {
    try {
        // 1. Try parsing strictly
        return JSON.parse(text);
    } catch (e) {
        // 2. Try extracting from code blocks ```json ... ```
        const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
        if (codeBlockMatch) {
            try {
                return JSON.parse(codeBlockMatch[1]);
            } catch (e2) {
                // continue
            }
        }

        // 3. Try finding the first { or [ and the last } or ]
        const start = text.search(/[{[]/);
        const end = text.search(/[}\]]$/); // This regex might be wrong, need to find LAST closing
        // simpler:
        const firstOpen = text.indexOf('{');
        const lastClose = text.lastIndexOf('}');
        if (firstOpen !== -1 && lastClose !== -1 && lastClose > firstOpen) {
            try {
                return JSON.parse(text.substring(firstOpen, lastClose + 1));
            } catch (e3) { }
        }

        return null;
    }
}

export async function generateImagePrompts(
    character: CharacterState,
    apiKey: string,
    provider: APIProvider
): Promise<ImagePrompt[]> {
    const systemPrompt = IMAGE_PROMPT_SYSTEM_PROMPT;
    const userPrompt = buildImagePromptUserPrompt(character);
    const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;

    const result = await generateWithFallback(provider, apiKey, fullPrompt, "imagePrompts");

    const json = extractJSONFromText(result);

    if (json && (json.prompts || Array.isArray(json))) {
        const prompts = json.prompts || json;
        if (Array.isArray(prompts)) {
            return prompts as ImagePrompt[];
        }
    }

    throw new Error(`Failed to parse AI response. Raw output: ${result.substring(0, 100)}...`);
}
