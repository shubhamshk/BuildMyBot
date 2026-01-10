/**
 * Janitor AI format prompt builders
 * Follows exact template structure from Janitor AI Master Guide
 */

import { CharacterState } from "@/context/CharacterContext";

/**
 * Normalize personality sliders into descriptive text
 */
function normalizePersonality(personality: CharacterState["personality"]): string {
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
 * Build system prompt for Janitor AI personality generation
 */
function buildPersonalitySystemPrompt(): string {
  return `You are an expert Janitor AI bot creator. Your task is to create detailed, immersive character personalities following the EXACT Janitor AI format.

CRITICAL RULES (NON-NEGOTIABLE):
- NEVER control {{user}} or speak for the user
- NEVER omit any section
- NEVER add commentary or explanations
- Use third-person narration only
- Avoid negative instructions (say what they DO, not what they DON'T)
- Permanent tokens should be concise but complete
- Personality defines what is ALWAYS true
- Dialogue examples are illustrative ONLY - do NOT use verbatim
- Avoid excessive sexual detail in permanent tokens
- Output plain text only - no markdown, no code blocks

MANDATORY TEMPLATE STRUCTURE:
You MUST output EXACTLY this format with ALL sections filled:

<npcs>
(50–100 word descriptions for NPCs if relevant, or leave empty if none)
</npcs>

<character_name>
Full Name:
Aliases:
Species:
Nationality:
Ethnicity:
Age:
Occupation/Role:
Appearance:
Scent:
Clothing:

[Backstory:
Concise but complete backstory.
Use bullet points for key events.]

Current Residence:

[Relationships:
Describe relationships.
Include one short in-character quote per relationship.]

[Personality
Traits:
Likes:
Dislikes:
Insecurities:
Physical behaviour:
Opinions:]

[Intimacy
Turn-ons:
During Sex:]

[Dialogue
Accent/tone rules.
[These are merely examples of how CHARACTER NAME may speak and should NOT be used verbatim.]
Greeting:
Surprised:
Stressed:
Memory:
Opinion:]

[Notes
Misc traits, secrets, quirks]
</character_name>

STRICT REQUIREMENTS:
- Fill ALL fields with appropriate, detailed content
- Keep backstory concise but complete (2-4 paragraphs)
- Dialogue examples should be natural and varied (1-2 sentences each)
- Never include placeholder text like "TBD" or "..."
- Never add explanations outside the template
- Format must be preserved exactly as shown
- Start with <npcs> and end with </character_name>
- All brackets and tags must be included`;
}

/**
 * Build user prompt for personality generation
 */
export function buildJanitorPersonalityPrompt(character: CharacterState): string {
  const normalizedTraits = normalizePersonality(character.personality);
  const backstoryStyle = character.backstoryStyle || "Mysterious Past";
  const speechTone = character.speechRules?.tone || "Casual & Warm";
  const speechVocab = character.speechRules?.vocabulary || "Conversational";
  const contentRating = character.boundaries?.contentRating || "SFW";
  const setting = character.basics.setting || "Modern Day";
  const relationship = character.basics.relationship || "Stranger";

  return `Create a complete Janitor AI personality profile for this character:

CHARACTER BASICS:
- Name: ${character.basics.name}
- Age: ${character.basics.age}
- Gender: ${character.basics.gender}
- Setting: ${setting}
- Relationship to user: ${relationship}

PERSONALITY TRAITS:
${normalizedTraits}

BACKSTORY STYLE: ${backstoryStyle}

SPEECH STYLE:
- Tone: ${speechTone}
- Vocabulary: ${speechVocab}
${character.speechRules?.patterns ? `- Patterns: ${character.speechRules.patterns}` : ""}

CONTENT RATING: ${contentRating}
${character.boundaries?.topics ? `- Topics to avoid: ${character.boundaries.topics}` : ""}
${character.boundaries?.tone ? `- Overall tone: ${character.boundaries.tone}` : ""}

CRITICAL: You MUST output the complete personality profile using ONLY the template format provided. Do not add any text before <npcs> or after </character_name>. Do not include explanations, comments, or markdown formatting. Output the raw template with all sections filled.`;
}

/**
 * Build prompt for scenario generation
 */
export function buildScenarioPrompt(character: CharacterState, userScenario?: string): string {
  const systemPrompt = `You are an expert Janitor AI bot creator. Create an immersive scenario with greeting that:
- Sets the scene with rich atmospheric details
- Includes the character's first message/greeting naturally woven in
- Uses **double asterisks** for character dialogue
- Uses *single asterisks* for narrative descriptions and actions
- NEVER controls {{user}} or speaks for the user
- Is scene-forward and immersive
- Avoids lore dumps
- Shows the character in the moment

FORMAT EXAMPLE:
**It's [time/date]—a [atmosphere] day with [sensory details]. [Scene setup with context].**

*[Character name] is [doing something], wearing [outfit description]. [More character details and actions]. [Their mannerisms and presence].*

*[Narrative building tension or atmosphere. What's happening in the scene. The mood and context.]*

*[Character notices {{user}} or initiates interaction. Their body language and expression.]* **"[Character's spoken greeting or first words]"** *[they say/whisper/call out], [additional action or expression].*

*[Optional: More scene details or character thoughts/observations about the situation.]*

The output should be 4-8 paragraphs, alternating between **bold dialogue** and *italic descriptions*.`;

  const userPrompt = userScenario
    ? `User-provided scenario idea: ${userScenario}\n\nCreate an immersive scenario with the character's greeting woven in, following the format above.`
    : `Generate an immersive scenario with greeting for this character:

CHARACTER:
- Name: ${character.basics.name}
- Setting: ${character.basics.setting}
- Backstory Style: ${character.backstoryStyle || "Mysterious Past"}
- Personality: ${normalizePersonality(character.personality)}
- Relationship to user: ${character.basics.relationship}
- Speech Tone: ${character.speechRules?.tone || "Casual & Warm"}
- Speech Vocabulary: ${character.speechRules?.vocabulary || "Conversational"}

Create an engaging scenario that sets up the world, shows the character in their element, and includes their natural first interaction/greeting with {{user}}. Use **bold** for dialogue and *italics* for descriptions.`;

  return `${systemPrompt}\n\n${userPrompt}`;
}

/**
 * Build prompt for initial message generation (kept for backwards compatibility)
 */
export function buildInitialMessagePrompt(character: CharacterState, scenario?: string): string {
  const systemPrompt = `You are an expert Janitor AI bot creator. Write the first message from the character that:
- NEVER speaks or acts for {{user}}
- Uses **double asterisks** for character dialogue
- Uses *single asterisks* for narrative descriptions and actions
- Is NPC-driven (the character initiates)
- Avoids lore dumps
- Has no time skips
- Is scene-forward (shows what's happening NOW)
- Sets the tone naturally

The message should be 2-4 paragraphs with rich sensory details.`;

  const userPrompt = `Write the first message for:

CHARACTER:
- Name: ${character.basics.name}
- Setting: ${character.basics.setting}
- Personality: ${normalizePersonality(character.personality)}
- Speech Tone: ${character.speechRules?.tone || "Casual & Warm"}
- Speech Vocabulary: ${character.speechRules?.vocabulary || "Conversational"}
${scenario ? `\nSCENARIO:\n${scenario}` : ""}

Generate the initial message using **bold** for dialogue and *italics* for descriptions/actions.`;

  return `${systemPrompt}\n\n${userPrompt}`;
}

/**
 * Get system prompt for personality generation
 */
export function getPersonalitySystemPrompt(): string {
  return buildPersonalitySystemPrompt();
}

/**
 * Build prompt for COMBINED scenario generation (multiple characters in one story)
 */
export function buildCombinedScenarioPrompt(characters: CharacterState[], userScenario?: string): string {
  // Build character descriptions
  const characterDescriptions = characters.map((char, index) => `
CHARACTER ${index + 1}: ${char.basics.name}
- Gender: ${char.basics.gender}
- Age: ${char.basics.age}
- Setting: ${char.basics.setting}
- Backstory Style: ${char.backstoryStyle || "Mysterious Past"}
- Personality: ${normalizePersonality(char.personality)}
- Relationship to user: ${char.basics.relationship}
- Speech Tone: ${char.speechRules?.tone || "Casual & Warm"}
- Speech Vocabulary: ${char.speechRules?.vocabulary || "Conversational"}`).join("\n");

  const characterNames = characters.map(c => c.basics.name).filter(Boolean).join(" and ");

  const systemPrompt = `You are an expert Janitor AI bot creator. Create an immersive scenario featuring MULTIPLE CHARACTERS together in ONE UNIFIED SCENE that:
- Sets the scene with rich atmospheric details featuring ALL characters
- Includes natural dialogue and interactions between the characters
- Shows how the characters relate to each other AND to {{user}}
- Uses **double asterisks** for character dialogue
- Uses *single asterisks* for narrative descriptions and actions
- NEVER controls {{user}} or speaks for the user
- Is scene-forward and immersive
- Avoids lore dumps
- Shows ALL characters in the moment, interacting naturally

FORMAT EXAMPLE FOR MULTIPLE CHARACTERS:
**It's [time/date]—a [atmosphere] day with [sensory details]. [Scene setup with context involving all characters].**

*[Character 1 name] is [doing something], while [Character 2 name] is [doing something nearby]. [Scene description showing both characters and their dynamic]. [Their interactions and mannerisms].*

*[Narrative building tension or atmosphere. What's happening in the scene. How the characters interact with each other.]*

*[One character notices {{user}} or initiates interaction. Their body language.]* **"[Character 1's spoken greeting]"** *[they say/whisper/call out].*

*[Character 2 reacts or joins in.]* **"[Character 2's spoken words]"** *[they respond/add/comment], [action or expression].*

*[Scene continues with natural multi-character dynamics and {{user}} being addressed or included.]*

The output should be 5-10 paragraphs, featuring ALL characters throughout, alternating between **bold dialogue** and *italic descriptions*. Each character should speak at least once.`;

  const userPrompt = userScenario
    ? `User-provided scenario idea: ${userScenario}

CHARACTERS INVOLVED:
${characterDescriptions}

Create an immersive COMBINED scenario featuring ${characterNames} together in one unified scene. Include greetings/dialogue from EACH character, woven naturally into the scene.`
    : `Generate an immersive COMBINED scenario featuring these characters together:

${characterDescriptions}

Create an engaging scenario where ${characterNames} are together in the same scene. Show their dynamics with each other, set up the world, and include their natural first interactions/greetings with {{user}}. Each character should have their own dialogue moments. Use **bold** for dialogue and *italics* for descriptions.`;

  return `${systemPrompt}\n\n${userPrompt}`;
}
