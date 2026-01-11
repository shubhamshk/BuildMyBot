import { NextRequest, NextResponse } from "next/server";
import { getAIProvider } from "@/lib/ai/providers";
import { APIProvider } from "@/lib/api-key";

export async function POST(request: NextRequest) {
  try {
    const { storyIdea, step, characterIndex, existingData, apiKey, provider } = await request.json();

    if (!storyIdea || !step || !apiKey || !provider) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const aiProvider = getAIProvider(provider as APIProvider);
    const model = provider === "openai" || provider === "openrouter" 
      ? "gpt-4o-mini" 
      : provider === "gemini" 
      ? "gemini-2.0-flash" 
      : "gpt-4o-mini";

    let prompt = "";
    let responseFormat = "";

    switch (step) {
      case "basics":
        prompt = `Based on this story idea: "${storyIdea}"

Generate character basic information. Return ONLY a JSON object with this exact structure:
{
  "name": "Character Name",
  "age": "25",
  "gender": "Female" or "Male" or "Non-binary" or "Other",
  "setting": "Detailed setting description",
  "relationship": "Relationship to user (e.g., Mentor, Ally, Rival)"
}

CRITICAL REQUIREMENT: The age MUST be 18 or above. Always generate an age between 18 and 100. Never generate an age below 18.

Make it creative and fitting for the story idea.`;
        responseFormat = "json";
        break;

      case "personality":
        prompt = `Based on this story idea: "${storyIdea}"
${existingData?.basics ? `Character: ${existingData.basics.name}, ${existingData.basics.age} years old, ${existingData.basics.gender}` : ""}

Generate personality slider values (0-100) that fit the character. Return ONLY a JSON object:
{
  "warmth": 50,
  "confidence": 50,
  "calmness": 50,
  "reserve": 50
}

Values should reflect the character's personality based on the story.`;
        responseFormat = "json";
        break;

      case "backstory":
        prompt = `Based on this story idea: "${storyIdea}"
${existingData?.basics ? `Character: ${existingData.basics.name}` : ""}

Choose the best backstory style from these options:
- "Mysterious Past"
- "Tragic Origin"
- "Heroic Journey"
- "Villain Arc"
- "Rise to Power"
- "Fall from Grace"
- "Redemption Story"
- "Coming of Age"
- "Forbidden Love"
- "Revenge Quest"

Return ONLY the style name as a string.`;
        responseFormat = "text";
        break;

      case "speech":
        prompt = `Based on this story idea: "${storyIdea}"
${existingData?.basics ? `Character: ${existingData.basics.name}` : ""}

Generate speech style. Return ONLY a JSON object:
{
  "tone": "Choose from: Formal & Precise, Casual & Warm, Mysterious & Cryptic, Playful & Energetic, Serious & Authoritative, Gentle & Empathetic",
  "vocabulary": "Choose from: Archival & Technical, Simple & Direct, Poetic & Flowery, Modern & Slang, Academic & Complex, Conversational",
  "patterns": "Optional: Any speech patterns or quirks (leave empty string if none)"
}`;
        responseFormat = "json";
        break;

      case "boundaries":
        prompt = `Based on this story idea: "${storyIdea}"
${existingData?.basics ? `Character: ${existingData.basics.name}` : ""}

Generate content boundaries. Return ONLY a JSON object:
{
  "contentRating": "Choose from: SFW, PG-13, Mature, Explicit",
  "topics": "Optional: Topics to avoid (leave empty string if none)",
  "tone": "Optional: Overall tone preference (leave empty string if none)"
}`;
        responseFormat = "json";
        break;

      default:
        return NextResponse.json(
          { error: "Invalid step" },
          { status: 400 }
        );
    }

    const result = await aiProvider.generate(prompt, apiKey, model, 500);

    let parsedResult;
    if (responseFormat === "json") {
      // Try to extract JSON from response
      const jsonMatch = result.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResult = JSON.parse(jsonMatch[0]);
        
        // Enforce age constraint: must be 18 or above
        if (step === "basics" && parsedResult.age) {
          const ageNum = parseInt(parsedResult.age, 10);
          if (isNaN(ageNum) || ageNum < 18) {
            // Set to minimum 18 if below 18 or invalid
            parsedResult.age = "18";
          } else {
            // Ensure it's stored as string
            parsedResult.age = ageNum.toString();
          }
        }
      } else {
        throw new Error("Failed to parse JSON response");
      }
    } else {
      parsedResult = result.trim();
    }

    return NextResponse.json({ data: parsedResult });
  } catch (error: any) {
    console.error("Auto-fill error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to auto-fill" },
      { status: 500 }
    );
  }
}
