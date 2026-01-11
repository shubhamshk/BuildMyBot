import { NextRequest, NextResponse } from "next/server";
import { getAIProvider } from "@/lib/ai/providers";
import { APIProvider } from "@/lib/api-key";

export async function POST(request: NextRequest) {
  try {
    const { idea, apiKey, provider } = await request.json();

    if (!idea || !apiKey || !provider) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const prompt = `You are helping to refine a story idea. Your task is ONLY to improve clarity and flow striclty in human written language - NOT to change or expand the idea.

STRICT RULES (MANDATORY):
- Do NOT make it sound poetic or dramatic
- Do NOT make it a different story - stick to the basic idea only
- Try to add human emotions and feelings within it wherever possible but don't overdo it
- Do NOT make it sound robotic - make it sound normal, like human tone
- Do NOT add new lore, themes, or details
- Do NOT expand the idea
- Do NOT use complex words or metaphors
- Keep it clear, natural, and casual
- Write like a normal person explaining an idea
- Short sentences are preferred
- Preserve the original meaning exactly
- Only clean up clarity and flow
- Do NOT "improve" creatively

CRITICAL: Keep it to ONLY 3-4 lines maximum (rough idea, not detailed). This is just a brief concept - full details will be created later.

Original idea: ${idea}

Enhanced idea (3-4 lines only, brief and rough, natural human tone, preserve original meaning):`;

    const aiProvider = getAIProvider(provider as APIProvider);
    const model = provider === "openai" || provider === "openrouter" 
      ? "gpt-4o-mini" 
      : provider === "gemini" 
      ? "gemini-2.0-flash" 
      : "gpt-4o-mini";

    const enhancedIdea = await aiProvider.generate(prompt, apiKey, model, 150);
    
    // Ensure it's 1-2 lines max - take first 2 lines if longer
    const lines = enhancedIdea.trim().split('\n').filter(line => line.trim());
    const finalIdea = lines.slice(0, 2).join(' ').trim();

    return NextResponse.json({ enhancedIdea: finalIdea });
  } catch (error: any) {
    console.error("Enhancement error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to enhance idea" },
      { status: 500 }
    );
  }
}
