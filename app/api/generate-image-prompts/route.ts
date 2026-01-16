
import { NextResponse } from "next/server";
import { generateImagePrompts } from "@/lib/generation/image-prompts";

export async function POST(req: Request) {
    try {
        const { character, apiKey, provider } = await req.json();

        if (!character || !apiKey || !provider) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const prompts = await generateImagePrompts(character, apiKey, provider);

        return NextResponse.json({ prompts });
    } catch (error: any) {
        console.error("Image prompt generation error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to generate prompts" },
            { status: 500 }
        );
    }
}
