import { CharacterMetadata, GenerationSectionType } from "@/types/database";

/**
 * Normalize personality sliders into descriptive text
 */
function normalizePersonality(metadata: CharacterMetadata): string {
  const { personality } = metadata;
  const traits: string[] = [];

  // Warmth
  if (personality.warmth > 70) {
    traits.push("warm, empathetic, and approachable");
  } else if (personality.warmth < 30) {
    traits.push("reserved, stoic, and emotionally distant");
  } else {
    traits.push("balanced in emotional warmth");
  }

  // Confidence
  if (personality.confidence > 70) {
    traits.push("bold, assertive, and takes the lead");
  } else if (personality.confidence < 30) {
    traits.push("shy, submissive, and prefers to follow");
  } else {
    traits.push("moderately confident");
  }

  // Calmness
  if (personality.calmness > 70) {
    traits.push("calm, predictable, and methodical");
  } else if (personality.calmness < 30) {
    traits.push("chaotic, playful, and unpredictable");
  } else {
    traits.push("balanced between calm and chaotic");
  }

  // Reserve
  if (personality.reserve > 70) {
    traits.push("reserved, internal, and mysterious");
  } else if (personality.reserve < 30) {
    traits.push("expressive, vibrant, and emotionally open");
  } else {
    traits.push("moderately expressive");
  }

  return traits.join(", ");
}

/**
 * Build prompt for personality generation
 */
export function buildPersonalityPrompt(metadata: CharacterMetadata): string {
  const { basics, personality } = metadata;
  const normalizedTraits = normalizePersonality(metadata);

  return `You are creating a detailed personality profile for a character named ${basics.name}.

Character Basics:
- Name: ${basics.name}
- Age: ${basics.age}
- Gender: ${basics.gender}
- Setting: ${basics.setting}
- Relationship to user: ${basics.relationship}

Personality Traits (normalized):
${normalizedTraits}

Generate a comprehensive personality summary that includes:
1. Core personality description (2-3 sentences)
2. Core values (3-5 key values)
3. Behavioral patterns (2-3 patterns)

Rules:
- Never speak for the user
- Stay in character
- No meta commentary
- Be specific and detailed
- Make it feel authentic and consistent

Format your response as:
PERSONALITY SUMMARY:
[Your personality description]

CORE VALUES:
[Comma-separated list of values]

BEHAVIORAL PATTERNS:
[Comma-separated list of patterns]`;
}

/**
 * Build prompt for backstory generation
 */
export function buildBackstoryPrompt(metadata: CharacterMetadata): string {
  const { basics, personality } = metadata;
  const normalizedTraits = normalizePersonality(metadata);

  return `You are creating a compelling backstory for a character named ${basics.name}.

Character Basics:
- Name: ${basics.name}
- Age: ${basics.age}
- Gender: ${basics.gender}
- Setting: ${basics.setting}
- Relationship to user: ${basics.relationship}

Personality Traits:
${normalizedTraits}

Generate a backstory that:
1. Fits the setting: ${basics.setting}
2. Explains their personality traits
3. Is engaging and memorable
4. Sets up their relationship with the user

Rules:
- Never speak for the user
- Stay in character
- No meta commentary
- Make it feel authentic to the setting
- Keep it concise (2-3 paragraphs)

Format your response as:
BACKSTORY TITLE:
[Short, memorable title]

BACKSTORY:
[Your backstory text]`;
}

/**
 * Build prompt for speech mannerisms
 */
export function buildSpeechPrompt(metadata: CharacterMetadata): string {
  const { basics, personality } = metadata;
  const normalizedTraits = normalizePersonality(metadata);

  return `You are defining speech mannerisms for a character named ${basics.name}.

Character Basics:
- Name: ${basics.name}
- Age: ${basics.age}
- Setting: ${basics.setting}
- Personality: ${normalizedTraits}

Generate speech mannerisms that include:
1. Tone (e.g., "Formal & Precise", "Casual & Warm", "Mysterious & Cryptic")
2. Vocabulary style (e.g., "Archival & Technical", "Simple & Direct", "Poetic & Flowery")
3. A signature quote that exemplifies their speech style

Rules:
- Never speak for the user
- Stay in character
- No meta commentary
- Make speech consistent with personality
- The quote should be 1-2 sentences

Format your response as:
TONE:
[Single tone description]

VOCABULARY:
[Single vocabulary style description]

QUOTE:
"[A signature quote that shows their speech style]"`;
}

/**
 * Build prompt for initial message
 */
export function buildInitialMessagePrompt(metadata: CharacterMetadata): string {
  const { basics, personality } = metadata;
  const normalizedTraits = normalizePersonality(metadata);
  const relationship = basics.relationship || "stranger";

  return `You are writing the first message that ${basics.name} would send to the user.

Character Context:
- Name: ${basics.name}
- Age: ${basics.age}
- Setting: ${basics.setting}
- Relationship to user: ${relationship}
- Personality: ${normalizedTraits}

Generate an initial message that:
1. Reflects their personality traits
2. Establishes the relationship dynamic
3. Feels natural and in-character
4. Sets up an engaging conversation

Rules:
- Never speak for the user
- Stay in character
- No meta commentary
- Make it feel like a real first message
- Keep it to 2-4 sentences
- Use quotation marks around the message

Format your response as:
INITIAL MESSAGE:
"[The character's first message to the user]"`;
}

/**
 * Get prompt builder for a specific section type
 */
export function getPromptBuilder(
  sectionType: GenerationSectionType,
  metadata: CharacterMetadata
): string {
  switch (sectionType) {
    case "personality":
      return buildPersonalityPrompt(metadata);
    case "backstory":
      return buildBackstoryPrompt(metadata);
    case "speech":
      return buildSpeechPrompt(metadata);
    case "initial_message":
      return buildInitialMessagePrompt(metadata);
    case "traits":
      return buildPersonalityPrompt(metadata); // Traits use personality prompt
    default:
      throw new Error(`Unknown section type: ${sectionType}`);
  }
}
