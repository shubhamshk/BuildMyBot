import { CharacterMetadata } from "@/types/database";

export interface CreateCharacterInput {
  name: string;
  metadata: CharacterMetadata;
}

export interface UpdateCharacterInput {
  name?: string;
  metadata?: Partial<CharacterMetadata>;
}

/**
 * Validate character name
 */
export function validateCharacterName(name: string): void {
  if (!name || typeof name !== "string") {
    throw new Error("Character name is required");
  }
  if (name.trim().length === 0) {
    throw new Error("Character name cannot be empty");
  }
  if (name.length > 100) {
    throw new Error("Character name must be 100 characters or less");
  }
}

/**
 * Validate personality sliders
 */
export function validatePersonality(personality: CharacterMetadata["personality"]): void {
  const sliders = ["warmth", "confidence", "calmness", "reserve"] as const;

  for (const slider of sliders) {
    const value = personality[slider];
    if (typeof value !== "number") {
      throw new Error(`${slider} must be a number`);
    }
    if (value < 0 || value > 100) {
      throw new Error(`${slider} must be between 0 and 100`);
    }
  }
}

/**
 * Validate character metadata
 */
export function validateCharacterMetadata(metadata: CharacterMetadata): void {
  // Validate basics
  if (!metadata.basics) {
    throw new Error("Character basics are required");
  }

  validateCharacterName(metadata.basics.name);

  if (!metadata.basics.age || typeof metadata.basics.age !== "string") {
    throw new Error("Age is required");
  }

  if (!metadata.basics.gender || typeof metadata.basics.gender !== "string") {
    throw new Error("Gender is required");
  }

  if (!metadata.basics.setting || typeof metadata.basics.setting !== "string") {
    throw new Error("Setting is required");
  }

  // Validate personality
  if (!metadata.personality) {
    throw new Error("Personality data is required");
  }

  validatePersonality(metadata.personality);
}

/**
 * Validate create character input
 */
export function validateCreateCharacterInput(input: CreateCharacterInput): void {
  validateCharacterName(input.name);
  validateCharacterMetadata(input.metadata);
}
