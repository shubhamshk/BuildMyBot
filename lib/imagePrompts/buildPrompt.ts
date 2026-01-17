import { CharacterState } from "@/context/CharacterContext";
import { BASE_PROMPTS } from "./basePrompts";
import { getCoreCharacterTags } from "./characterTags";
import { getEnhancerForIndex } from "./models";

export type PromptStyle = "Portrait" | "Dynamic" | "Cinematic" | "Pixel";

export function buildPrompt(
    character: CharacterState | null | undefined,
    aiTags: string, // Expecting comma-separated tags
    index: number,
    style: PromptStyle = "Portrait"
): string {
    // 1. Select Base Template based on Style
    let baseTemplate = BASE_PROMPTS.A; // Default to Portrait/Standard

    if (style === "Dynamic") baseTemplate = BASE_PROMPTS.C;
    if (style === "Cinematic") baseTemplate = BASE_PROMPTS.C;
    // For Pixel, use A but inject pixel tags

    // 2. Get Core Character Tags
    const coreTags = getCoreCharacterTags(character);

    // 3. Get Enhancer (only rotate if not Pixel? Or always rotate?)
    // Req says "ONE model OR ONE LoRA...".
    const enhancer = getEnhancerForIndex(index);
    const enhancerTag = enhancer.trigger ? `, ${enhancer.trigger}` : "";

    // 4. Clean AI tags
    // Remove parentheses if AI added them
    let cleanAiTags = aiTags.replace(/[()]/g, "").trim();
    if (cleanAiTags.endsWith(",")) cleanAiTags = cleanAiTags.slice(0, -1);

    // Style Modifiers
    let styleTags = "";
    if (style === "Pixel") styleTags = ", pixel art, 8-bit, lowres, retro game style, dot art";
    if (style === "Cinematic") styleTags = ", cinematic lighting, dramatic shadows, movie still, 8k, realistic textures";

    // 5. Assemble Character Block
    // output: (name, 1girl, blonde_hair, ... style_tags, enhancer_tag)
    const characterBlock = `${coreTags}, ${cleanAiTags}${styleTags}${enhancerTag})`;

    // 6. Combine
    if (baseTemplate.includes("[Subject]")) {
        return baseTemplate
            .replace("[Subject]", characterBlock)
            .replace("[Appearance]", "")
            .replace("[Clothing]", "")
            .replace("[Action]", "")
            .replace("[Environment/Background]", "")
            .replace("[Lighting/Atmosphere]", "")
            .replace(/,\s*,/g, ",")
            .replace(/\n\s*\n/g, "\n");
    }

    return `${baseTemplate},
${characterBlock}`;
}
