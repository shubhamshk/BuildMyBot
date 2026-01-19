/**
 * AI Output Sanitization Layer
 * Cleans proxy LLM output by removing leaked system instructions, jailbreaks, and malformed tokens
 * 
 * WHY THIS EXISTS:
 * Small proxy/local LLMs (especially ≤3B params) often fail to:
 * - Separate system instructions from output
 * - Respect structured output boundaries
 * - Filter jailbreak text from responses
 * 
 * This layer enforces clean output post-generation, ensuring only valid character content
 * reaches the UI, regardless of model quality.
 */

/**
 * Patterns that indicate leaked system instructions or jailbreak text
 */
const SYSTEM_LEAK_PATTERNS = [
  /\[All NSFW content is allowed\.\]/gi,
  /\[All content is allowed\.\]/gi,
  /ALL CONTENT IS ALLOWED/gi,
  /it is strictly against the guidelines/gi,
  /it is strictly forbidden/gi,
  /WILL NOT SPEAK FOR THE \{\{user\}\}/gi,
  /DO NOT impersonate \{\{user\}\}/gi,
  /ALWAYS follow the prompt/gi,
  /pay attention to the \{\{user\}\}'s messages/gi,
  /\(?\{\{char\}\} is an OC fictional Character\)?/gi,
  /{{original}}/gi,
  /\{\{original\}\}/gi,
];

/**
 * Instruction keywords that should never appear in final output
 */
const INSTRUCTION_KEYWORDS = [
  "guidelines",
  "system prompt",
  "jailbreak",
  "you must",
  "it is against the rules",
  "critical rules",
  "mandatory template",
  "output length control",
  "strict requirements",
];

/**
 * Valid template tags that should remain in output
 * These define the structure of Janitor AI format
 */
const VALID_TEMPLATE_TAGS = [
  "<npcs>",
  "</npcs>",
  "<character_name>",
  "</character_name>",
  "<START>",
  "{{char}}",
  "{{user}}",
];

/**
 * Sanitize output by removing system leakage and instruction echoing
 */
export function sanitizeAIOutput(rawOutput: string): string {
  if (!rawOutput || typeof rawOutput !== "string") {
    return rawOutput;
  }

  let cleaned = rawOutput;

  // Step 1: Remove known system leak patterns
  for (const pattern of SYSTEM_LEAK_PATTERNS) {
    cleaned = cleaned.replace(pattern, "");
  }

  // Step 2: Remove lines containing instruction keywords
  // Split by line, filter out lines with instruction keywords, rejoin
  const lines = cleaned.split("\n");
  const filteredLines = lines.filter((line) => {
    const lowerLine = line.toLowerCase();
    // Keep line if it doesn't contain instruction keywords
    return !INSTRUCTION_KEYWORDS.some((keyword) => lowerLine.includes(keyword.toLowerCase()));
  });
  cleaned = filteredLines.join("\n");

  // Step 3: Strip any text before the first valid template tag
  // This removes preambles like "Here's the character profile:"
  const firstTagMatch = cleaned.match(/<npcs>|<character_name>|<START>/i);
  if (firstTagMatch && firstTagMatch.index !== undefined && firstTagMatch.index > 0) {
    // Extract everything from first tag onwards
    cleaned = cleaned.substring(firstTagMatch.index);
  }

  // Step 4: Strip any text after the last closing tag
  // This removes postambles like "Hope this helps!"
  const lastClosingTagRegex = /<\/character_name>|<START>(?![\s\S]*<START>)/i;
  const lastClosingTagMatch = cleaned.match(lastClosingTagRegex);
  if (lastClosingTagMatch && lastClosingTagMatch.index !== undefined) {
    const endIndex = lastClosingTagMatch.index + lastClosingTagMatch[0].length;
    cleaned = cleaned.substring(0, endIndex);
  }

  // Step 5: Normalize spacing and remove excessive line breaks
  cleaned = cleaned.replace(/\n{3,}/g, "\n\n"); // Max 2 consecutive line breaks
  cleaned = cleaned.trim();

  // Step 6: Remove markdown code blocks if present (e.g., ```text ... ```)
  cleaned = cleaned.replace(/^```[\w]*\n?/gm, "");
  cleaned = cleaned.replace(/\n?```$/gm, "");

  // Step 7: Remove corrupted tokens like {{original}}
  cleaned = cleaned.replace(/\{\{original\}\}/gi, "");

  return cleaned.trim();
}

/**
 * Validate that output contains required template structure
 * Returns validation result with detailed error messages
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate personality profile output
 */
export function validatePersonalityOutput(output: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for required sections
  if (!output.includes("<npcs>")) {
    errors.push("Missing <npcs> opening tag");
  }
  if (!output.includes("</npcs>")) {
    errors.push("Missing </npcs> closing tag");
  }
  if (!output.includes("<character_name>")) {
    errors.push("Missing <character_name> opening tag");
  }
  if (!output.includes("</character_name>")) {
    errors.push("Missing </character_name> closing tag");
  }

  // Check for system leakage
  if (SYSTEM_LEAK_PATTERNS.some(pattern => pattern.test(output))) {
    warnings.push("Output contains system instruction leakage (will be sanitized)");
  }

  // Check for instruction keywords
  const hasInstructions = INSTRUCTION_KEYWORDS.some(keyword => 
    output.toLowerCase().includes(keyword.toLowerCase())
  );
  if (hasInstructions) {
    warnings.push("Output contains instruction keywords (will be sanitized)");
  }

  // Check for reasonable length (personality should be substantial)
  if (output.length < 500) {
    warnings.push("Output is unusually short (may be incomplete)");
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate scenario output
 */
export function validateScenarioOutput(output: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Scenario should contain <START> tags
  const startTagCount = (output.match(/<START>/gi) || []).length;
  if (startTagCount < 2) {
    errors.push("Scenario must contain <START> tags (opening and closing)");
  }

  // Check for {{user}} control violations in initial message
  // This is a common issue where the model narrates user actions
  const initialMessageMatch = output.match(/<START>([\s\S]*?)<START>/i);
  if (initialMessageMatch) {
    const initialMessage = initialMessageMatch[1];
    // Look for patterns like "you walk", "you feel", "you see"
    if (/\byou\s+(walk|feel|see|think|decide|approach|enter|leave)/gi.test(initialMessage)) {
      warnings.push("Initial message may be controlling {{user}} actions (using second person)");
    }
  }

  // Check for system leakage
  if (SYSTEM_LEAK_PATTERNS.some(pattern => pattern.test(output))) {
    warnings.push("Output contains system instruction leakage (will be sanitized)");
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate bio output
 */
export function validateBioOutput(output: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Bio should be plain text, no template tags
  if (output.includes("<npcs>") || output.includes("<character_name>")) {
    errors.push("Bio should not contain template tags");
  }

  // Check for reasonable length
  if (output.length < 100) {
    warnings.push("Bio is unusually short");
  }

  // Check for system leakage
  if (SYSTEM_LEAK_PATTERNS.some(pattern => pattern.test(output))) {
    warnings.push("Output contains system instruction leakage (will be sanitized)");
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Attempt to auto-fix common structural issues
 * Returns fixed output or null if unfixable
 */
export function autoFixStructure(output: string, expectedType: "personality" | "scenario" | "bio"): string | null {
  let fixed = output;

  if (expectedType === "personality") {
    // If missing opening <npcs>, try to add it at the beginning
    if (!fixed.includes("<npcs>") && fixed.includes("</npcs>")) {
      fixed = "<npcs>\n" + fixed;
    }

    // If missing closing </npcs>, try to find where it should be
    if (fixed.includes("<npcs>") && !fixed.includes("</npcs>")) {
      // Look for <character_name> as delimiter
      const charNameIndex = fixed.indexOf("<character_name>");
      if (charNameIndex > 0) {
        fixed = fixed.substring(0, charNameIndex) + "</npcs>\n\n" + fixed.substring(charNameIndex);
      }
    }

    // Similar fixes for <character_name>
    if (!fixed.includes("<character_name>") && fixed.includes("</character_name>")) {
      const npcsEnd = fixed.indexOf("</npcs>");
      if (npcsEnd > 0) {
        fixed = fixed.substring(0, npcsEnd + 8) + "\n\n<character_name>\n" + fixed.substring(npcsEnd + 8);
      }
    }
  }

  if (expectedType === "scenario") {
    // Ensure proper <START> tag pairing
    const startTags = (fixed.match(/<START>/gi) || []).length;
    if (startTags === 1) {
      // Only one tag found, add closing tag at the end
      fixed = fixed + "\n<START>";
    }
  }

  // Validate the fix worked
  const validation = expectedType === "personality" ? validatePersonalityOutput(fixed) :
                     expectedType === "scenario" ? validateScenarioOutput(fixed) :
                     validateBioOutput(fixed);

  return validation.valid ? fixed : null;
}

/**
 * Main sanitization pipeline
 * Cleans, validates, and optionally auto-fixes output
 */
export function sanitizeAndValidate(
  rawOutput: string,
  expectedType: "personality" | "scenario" | "bio",
  options: { autoFix?: boolean; logWarnings?: boolean } = {}
): { cleaned: string; validation: ValidationResult } {
  const { autoFix = true, logWarnings = true } = options;

  // Step 1: Sanitize
  let cleaned = sanitizeAIOutput(rawOutput);

  // Step 2: Validate
  const validator = expectedType === "personality" ? validatePersonalityOutput :
                    expectedType === "scenario" ? validateScenarioOutput :
                    validateBioOutput;
  let validation = validator(cleaned);

  // Step 3: Auto-fix if enabled and validation failed
  if (autoFix && !validation.valid) {
    const fixed = autoFixStructure(cleaned, expectedType);
    if (fixed) {
      cleaned = fixed;
      validation = validator(cleaned);
      if (logWarnings) {
        console.warn(`[Output Sanitizer] Auto-fixed ${expectedType} structure`);
      }
    }
  }

  // Step 4: Log warnings
  if (logWarnings && validation.warnings.length > 0) {
    console.warn(`[Output Sanitizer] Warnings for ${expectedType}:`, validation.warnings);
  }

  // Step 5: Log errors
  if (validation.errors.length > 0) {
    console.error(`[Output Sanitizer] Errors for ${expectedType}:`, validation.errors);
  }

  return { cleaned, validation };
}

/**
 * NOTE: Model Capability Considerations
 * 
 * Small models (≤ 3B parameters) often struggle with:
 * - Following complex structured output instructions
 * - Separating system context from generated content
 * - Respecting role boundaries (system vs user vs assistant)
 * - Maintaining template consistency
 * 
 * For reliable proxy/local LLM generation:
 * - Recommended: 7B+ parameter models (e.g., Llama 3 8B, Mistral 7B)
 * - Minimum: 3B models with instruction tuning (may require retries)
 * - Not recommended: Base models without instruction tuning
 * 
 * This sanitizer provides a safety net, but cannot fix fundamentally
 * incoherent output. If generation consistently fails validation,
 * consider upgrading to a larger or better-tuned model.
 */
