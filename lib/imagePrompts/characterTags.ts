import { CharacterState } from "@/context/CharacterContext";

export function getCoreCharacterTags(character: CharacterState | undefined | null): string {
    if (!character) {
        return `(character, solo`; // Fallback for Story Mode (no specific character object)
    }
    const name = character.basics.name.toLowerCase().replace(/\s+/g, "_");
    const genderTag = character.basics.gender.toLowerCase() === "female" ? "1girl" :
        character.basics.gender.toLowerCase() === "male" ? "1boy" : "1person";

    // Clean name tag to be prompt-friendly
    const cleanName = name.replace(/[^a-z0-9_]/g, "");

    return `(${cleanName}, ${genderTag}`; // Open parenthesis, will be closed by AI tags or Assembler
}

export function getCharacterDescriptionForPrompt(character: CharacterState): string {
    // Construct a description to help AI generate accurate visual tags
    const { name, age, gender, setting } = character.basics;
    const personality = character.generatedContent?.personality || "";
    const bio = character.generatedContent?.bio || "";

    return `Character: ${name}, ${age} years old ${gender}.
Setting: ${setting}.
Description: ${personality.substring(0, 200)}...
Visual traits: ${bio.substring(0, 200)}...`;
}
