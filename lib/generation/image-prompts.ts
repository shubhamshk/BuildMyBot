
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
    if (!text) return null;

    // 1. Try parsing strictly
    try {
        return JSON.parse(text);
    } catch (e) {
        // Continue
    }

    // 2. Try extracting from code blocks (matches ```json ... ``` or just ``` ... ```)
    // using [\s\S]*? to match distinct lines across the block
    const codeBlockMatch = text.match(/```(?:\w+)?\s*([\s\S]*?)\s*```/);
    if (codeBlockMatch && codeBlockMatch[1]) {
        try {
            return JSON.parse(codeBlockMatch[1]);
        } catch (e2) {
            // If strict parse of block fails, let's try to remove trailing commas or artifacts
            // Or try finding braces inside the block
            const innerText = codeBlockMatch[1].trim();
            const innerOpen = innerText.indexOf('{');
            const innerClose = innerText.lastIndexOf('}');
            if (innerOpen !== -1 && innerClose !== -1) {
                try {
                    return JSON.parse(innerText.substring(innerOpen, innerClose + 1));
                } catch (e3) { }
            }
        }
    }

    // 3. Fallback: Find the *first* '{' and the *last* '}' in the entire text
    const firstOpen = text.indexOf('{');
    const lastClose = text.lastIndexOf('}');
    if (firstOpen !== -1 && lastClose !== -1 && lastClose > firstOpen) {
        try {
            return JSON.parse(text.substring(firstOpen, lastClose + 1));
        } catch (e4) {
            // Continue
        }
    }

    // 4. Try array format just in case
    const firstArr = text.indexOf('[');
    const lastArr = text.lastIndexOf(']');
    if (firstArr !== -1 && lastArr !== -1 && lastArr > firstArr) {
        try {
            return JSON.parse(text.substring(firstArr, lastArr + 1));
        } catch (e5) { }
    }

    return null;
}

export async function generateImagePrompts(
    character: CharacterState,
    apiKey: string,
    provider: APIProvider
): Promise<ImagePrompt[]> {
    const systemPrompt = IMAGE_PROMPT_SYSTEM_PROMPT;
    const userPrompt = buildImagePromptUserPrompt(character);
    const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;

    // Use "imagePrompts" type to ensure sufficient token limit (~2000)
    const result = await generateWithFallback(provider, apiKey, fullPrompt, "imagePrompts");

    const json = extractJSONFromText(result);

    if (json && (json.prompts || Array.isArray(json))) {
        const prompts = json.prompts || json;
        if (Array.isArray(prompts)) {
            return prompts as ImagePrompt[];
        }
    }

    throw new Error(`Failed to parse AI response. Raw output: ${result.substring(0, 500)}...`);
}
