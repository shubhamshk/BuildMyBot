
import { CharacterState } from "@/context/CharacterContext";

export const IMAGE_PROMPT_SYSTEM_PROMPT = `You are a professional AI image prompt engineer.
You generate clear, human-written, non-robotic prompts.
Your prompts are detailed but readable.
You never use complex or academic language.
You focus on visual clarity and artistic intent.
You always generate POSITIVE and NEGATIVE prompts.
You do not generate images, only prompts.
You adapt prompts to the character's story, personality, and appearance.

Output JSON format:
{
  "prompts": [
    {
      "category": "Portrait",
      "positive": "...",
      "negative": "...",
      "modelRecommendation": "..."
    },
    ... (10 prompts total)
  ]
}`;

export function buildImagePromptUserPrompt(character: CharacterState): string {
    const { name, age, gender, setting, relationship } = character.basics;
    const personalityStr = character.generatedContent?.personality || "Not generated";
    const traitsStr = character.generatedContent?.traits || "Not generated";
    const scenarioStr = character.generatedContent?.scenario || "Not generated";

    // Describe personality stats
    const { warmth, confidence, calmness, reserve } = character.personality;
    const personalityStats = `Warmth: ${warmth}%, Confidence: ${confidence}%, Calmness: ${calmness}%, Reserve: ${reserve}%`;

    return `
Character Name: ${name}
Age: ${age}
Gender: ${gender}
Setting: ${setting}
Relationship Status/Tone: ${relationship}

Personality Profile (Text):
${personalityStr}

Traits:
${traitsStr}

Personality Stats:
${personalityStats}

Story/Scenario Context:
${scenarioStr}

Instruction:
Generate 10 unique, high-quality image prompts for this character.
Each prompt must feel different.
Use simple, natural English.
Avoid robotic or over-complicated wording.
Make prompts usable across popular AI image generators.

Categories to include:
1. Portrait / Close-up
2. Full Body
3. Cinematic Scene
4. Casual / Slice of Life
5. Intimate / Emotional (SFW-safe)
6. Fantasy / Stylized (if applicable)
7. Dark / Moody
8. Bright / Soft lighting
9. Action / Dynamic pose
10. Experimental / Artistic
`;
}
