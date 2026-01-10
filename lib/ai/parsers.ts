/**
 * Parse AI-generated content based on section type
 */

export interface ParsedPersonality {
  personalitySummary: string;
  coreValues: string[];
  behavioralPatterns: string[];
}

export interface ParsedBackstory {
  title: string;
  backstory: string;
}

export interface ParsedSpeech {
  tone: string;
  vocabulary: string;
  quote: string;
}

/**
 * Parse personality section response
 */
export function parsePersonalityResponse(content: string): ParsedPersonality {
  const lines = content.split("\n").map((l) => l.trim()).filter(Boolean);

  let personalitySummary = "";
  let coreValues: string[] = [];
  let behavioralPatterns: string[] = [];

  let currentSection = "";
  for (const line of lines) {
    if (line.toUpperCase().includes("PERSONALITY SUMMARY")) {
      currentSection = "summary";
      continue;
    }
    if (line.toUpperCase().includes("CORE VALUES")) {
      currentSection = "values";
      continue;
    }
    if (line.toUpperCase().includes("BEHAVIORAL PATTERNS")) {
      currentSection = "patterns";
      continue;
    }

    if (currentSection === "summary") {
      personalitySummary += (personalitySummary ? " " : "") + line;
    } else if (currentSection === "values") {
      // Split by comma or new line
      const values = line.split(",").map((v) => v.trim()).filter(Boolean);
      coreValues.push(...values);
    } else if (currentSection === "patterns") {
      const patterns = line.split(",").map((p) => p.trim()).filter(Boolean);
      behavioralPatterns.push(...patterns);
    }
  }

  // Fallback: if parsing failed, use raw content
  if (!personalitySummary) {
    personalitySummary = content;
  }
  if (coreValues.length === 0) {
    coreValues = ["To be determined"];
  }
  if (behavioralPatterns.length === 0) {
    behavioralPatterns = ["To be determined"];
  }

  return {
    personalitySummary: personalitySummary.trim(),
    coreValues,
    behavioralPatterns,
  };
}

/**
 * Parse backstory section response
 */
export function parseBackstoryResponse(content: string): ParsedBackstory {
  const lines = content.split("\n").map((l) => l.trim()).filter(Boolean);

  let title = "";
  let backstory = "";

  let currentSection = "";
  for (const line of lines) {
    if (line.toUpperCase().includes("BACKSTORY TITLE")) {
      currentSection = "title";
      continue;
    }
    if (line.toUpperCase().includes("BACKSTORY")) {
      currentSection = "backstory";
      continue;
    }

    if (currentSection === "title") {
      title = line;
    } else if (currentSection === "backstory") {
      backstory += (backstory ? " " : "") + line;
    }
  }

  // Fallback
  if (!title) {
    title = "Untitled";
  }
  if (!backstory) {
    backstory = content;
  }

  return {
    title: title.trim(),
    backstory: backstory.trim(),
  };
}

/**
 * Parse speech mannerisms response
 */
export function parseSpeechResponse(content: string): ParsedSpeech {
  const lines = content.split("\n").map((l) => l.trim()).filter(Boolean);

  let tone = "";
  let vocabulary = "";
  let quote = "";

  let currentSection = "";
  for (const line of lines) {
    if (line.toUpperCase().startsWith("TONE:")) {
      tone = line.replace(/^TONE:\s*/i, "");
      continue;
    }
    if (line.toUpperCase().startsWith("VOCABULARY:")) {
      vocabulary = line.replace(/^VOCABULARY:\s*/i, "");
      continue;
    }
    if (line.toUpperCase().startsWith("QUOTE:")) {
      quote = line.replace(/^QUOTE:\s*/i, "").replace(/^["']|["']$/g, "");
      continue;
    }
  }

  // Fallback
  if (!tone) tone = "Neutral";
  if (!vocabulary) vocabulary = "Standard";
  if (!quote) quote = "To be determined";

  return {
    tone: tone.trim(),
    vocabulary: vocabulary.trim(),
    quote: quote.trim(),
  };
}

/**
 * Parse initial message response
 */
export function parseInitialMessageResponse(content: string): string {
  // Extract text between quotes
  const match = content.match(/"([^"]+)"/);
  if (match) {
    return match[1];
  }

  // Fallback: remove "INITIAL MESSAGE:" prefix and quotes
  return content
    .replace(/^INITIAL MESSAGE:\s*/i, "")
    .replace(/^["']|["']$/g, "")
    .trim();
}
