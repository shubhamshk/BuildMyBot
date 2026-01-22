import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
    checkUsageLimitServer,
    logCharacterCreation,
    hasCharacterBeenLogged
} from "@/lib/subscriptions/server";
import { APIProvider } from "@/lib/api-key";
import { getAIProvider } from "@/lib/ai/providers";
import { CharacterState } from "@/context/CharacterContext";
import {
    buildJanitorPersonalityPrompt,
    getPersonalitySystemPrompt,
    buildScenarioPrompt,
    buildBioPrompt,
} from "@/lib/prompts/janitor-ai";
import {
    getModelForGeneration,
    GenerationType,
} from "@/lib/ai/provider-detection";

// Extend timeout for slow local AI models (LM Studio)
// Note: Vercel Hobby plan max is 300 seconds (5 minutes)
export const maxDuration = 300; // 5 minutes (max for Hobby plan)
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
    try {
        const { character, section, apiKey, provider, scenario, proxyConfig, stream } = await request.json();

        if (!character || !section || !apiKey || !provider) {
            return new Response(
                JSON.stringify({ error: "Missing required fields: character, section, apiKey, provider" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Authenticate user
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        // Check Usage Limit (if user is authenticated)
        let shouldLogCreation = false;
        let userId: string | null = null;

        if (user) {
            userId = user.id;

            // Check if this specific character was already logged
            // If it was, we consider this a re-generation which is free
            const alreadyLogged = await hasCharacterBeenLogged(userId, character.id);

            if (!alreadyLogged) {
                // This is a NEW character - check limits
                const usageCheck = await checkUsageLimitServer(userId);

                if (!usageCheck.allowed) {
                    // Log the blocked attempt
                    await logCharacterCreation(userId, character.id, false, usageCheck.reason);
                    return new Response(
                        JSON.stringify({
                            error: "USAGE_LIMIT_EXCEEDED",
                            message: usageCheck.reason || "Daily creation limit reached",
                            currentCount: usageCheck.currentCount,
                            limit: usageCheck.limit,
                            resetAt: usageCheck.resetAt
                        }),
                        { status: 403, headers: { "Content-Type": "application/json" } }
                    );
                }

                // Allowed - mark to log upon successful generation
                shouldLogCreation = true;
            } else {
                console.log(`[generate-section] Character ${character.id} already logged - free regeneration`);
            }
        }

        // For custom provider, use proxyConfig if provided
        const effectiveApiKey = (provider === "custom" && proxyConfig)
            ? JSON.stringify(proxyConfig)
            : apiKey;

        const validSections = ["personality", "scenarioGreeting", "bio"];
        if (!validSections.includes(section)) {
            return new Response(
                JSON.stringify({ error: `Invalid section: ${section}. Must be one of: ${validSections.join(", ")}` }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Build the prompt based on section
        let prompt = "";
        let generationType: GenerationType = "personality";

        if (section === "personality") {
            const systemPrompt = getPersonalitySystemPrompt();
            const userPrompt = buildJanitorPersonalityPrompt(character as CharacterState);
            prompt = `${systemPrompt}\n\n${userPrompt}`;
            generationType = "personality";
        } else if (section === "scenarioGreeting") {
            prompt = buildScenarioPrompt(character as CharacterState, scenario);
            generationType = "scenario";
        } else if (section === "bio") {
            if (!scenario) {
                return new Response(
                    JSON.stringify({ error: "Scenario is required for bio generation" }),
                    { status: 400, headers: { "Content-Type": "application/json" } }
                );
            }
            prompt = buildBioPrompt(character as CharacterState, scenario);
            generationType = "bio";
        }

        // Get model and max tokens
        const model = getModelForGeneration(provider as APIProvider, generationType);
        const maxTokens = generationType === "personality" ? 800 : generationType === "scenario" ? 300 : 300;

        // If streaming is not requested, use the old non-streaming approach
        if (!stream) {
            try {
                const aiProvider = getAIProvider(provider as APIProvider);
                const content = await aiProvider.generate(prompt, effectiveApiKey, model, maxTokens);

                if (!content || content.trim() === "") {
                    return new Response(
                        JSON.stringify({ error: "Generation returned empty content" }),
                        { status: 500, headers: { "Content-Type": "application/json" } }
                    );
                }

                // Log successful creation for NEW characters only
                if (shouldLogCreation && userId) {
                    const logResult = await logCharacterCreation(userId, character.id, true);
                    if (logResult.success) {
                        console.log(`[generate-section] ✓ Logged creation for character ${character.id}`);
                    } else {
                        console.error(`[generate-section] ✗ Failed to log creation:`, logResult.error);
                    }
                    shouldLogCreation = false; // Prevent double logging
                }

                return new Response(
                    JSON.stringify({ content, section }),
                    { status: 200, headers: { "Content-Type": "application/json" } }
                );
            } catch (error: any) {
                console.error(`Generation error for ${section}:`, error);
                return new Response(
                    JSON.stringify({ error: error.message || `Failed to generate ${section}` }),
                    { status: 500, headers: { "Content-Type": "application/json" } }
                );
            }
        }

        // STREAMING MODE: Call the proxy with stream=true
        const proxyUrl = proxyConfig?.proxyUrl || process.env.AI_PROXY_URL || "";
        const proxyKey = proxyConfig?.apiKey || process.env.AI_PROXY_KEY || "";
        const proxyModel = proxyConfig?.model || model;

        if (!proxyUrl) {
            return new Response(
                JSON.stringify({ error: "Streaming requires a custom proxy URL. Please configure in API Keys settings." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Ensure URL ends with /v1/chat/completions
        let finalProxyUrl = proxyUrl;
        if (!finalProxyUrl.endsWith("/v1/chat/completions")) {
            finalProxyUrl = finalProxyUrl.replace(/\/+$/, "") + "/v1/chat/completions";
        }

        // Build messages
        let messages: Array<{ role: string; content: string }> = [];
        const marker = "\n\nCHARACTER";
        if (prompt.includes(marker)) {
            const parts = prompt.split(marker);
            messages.push({ role: "system", content: parts[0].trim() });
            messages.push({ role: "user", content: "CHARACTER" + parts.slice(1).join(marker).trim() });
        } else if (prompt.includes("CRITICAL RULES:") || prompt.includes("You are an expert")) {
            const systemMatch = prompt.match(/^([\s\S]+?)(?=\n\nCHARACTER|CHARACTER BASICS|User-provided|Generate|Write|Create)/);
            const systemPrompt = systemMatch ? systemMatch[1].trim() : "";
            const userPrompt = systemMatch ? prompt.replace(systemMatch[1], "").trim() : prompt;
            if (systemPrompt) {
                messages.push({ role: "system", content: systemPrompt });
            }
            messages.push({ role: "user", content: userPrompt });
        } else {
            messages.push({ role: "user", content: prompt });
        }

        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        if (proxyKey) {
            headers["Authorization"] = `Bearer ${proxyKey}`;
        }

        try {
            const proxyResponse = await fetch(finalProxyUrl, {
                method: "POST",
                headers,
                body: JSON.stringify({
                    model: proxyModel,
                    messages,
                    temperature: 0.7,
                    max_tokens: maxTokens,
                    stream: true,
                }),
            });

            if (!proxyResponse.ok) {
                const errorText = await proxyResponse.text();
                console.error("Proxy Streaming Error:", errorText);

                // Check if it's HTML error (Cloudflare 524)
                const isHtmlError = errorText.trim().startsWith('<!DOCTYPE') || errorText.trim().startsWith('<html');
                let errorMessage = `Proxy error (${proxyResponse.status})`;

                if (isHtmlError && (proxyResponse.status === 524 || errorText.includes('524: A timeout occurred') || errorText.includes('Error code 524'))) {
                    // Extract title from HTML
                    const titleMatch = errorText.match(/<title>([^<]+)<\/title>/i);
                    const title = titleMatch ? titleMatch[1] : 'Cloudflare Timeout';
                    errorMessage = `⚠️ ${title}\n\nYour proxy took too long to respond. This error occurred even with streaming enabled, which suggests:\n\n1. Your proxy may not support streaming (stream=true)\n2. The AI model is extremely slow\n3. Network issues between Cloudflare and your proxy\n\nTry: Use a faster model, or bypass Cloudflare by using the direct proxy URL.`;
                } else if (isHtmlError) {
                    const titleMatch = errorText.match(/<title>([^<]+)<\/title>/i);
                    errorMessage = titleMatch ? titleMatch[1] : errorText.substring(0, 200);
                } else {
                    errorMessage = errorText.substring(0, 500);
                }

                return new Response(
                    JSON.stringify({ error: errorMessage }),
                    { status: proxyResponse.status, headers: { "Content-Type": "application/json" } }
                );
            }

            // Check if response is actually streaming (has body stream)
            if (!proxyResponse.body) {
                console.error("Proxy returned no body for streaming request");
                return new Response(
                    JSON.stringify({ error: "Proxy did not return a streaming response. Your proxy may not support streaming." }),
                    { status: 500, headers: { "Content-Type": "application/json" } }
                );
            }

            // Log successful creation before streaming (as we committed to the request)
            if (shouldLogCreation && userId) {
                const logResult = await logCharacterCreation(userId, character.id, true);
                if (logResult.success) {
                    console.log(`[generate-section] ✓ Logged streaming creation for character ${character.id}`);
                } else {
                    console.error(`[generate-section] ✗ Failed to log streaming creation:`, logResult.error);
                }
            }

            // Pipe the streaming response to the client
            return new Response(proxyResponse.body, {
                status: 200,
                headers: {
                    "Content-Type": "text/event-stream",
                    "Cache-Control": "no-cache",
                    "Connection": "keep-alive",
                },
            });
        } catch (error: any) {
            console.error("Streaming error:", error);
            return new Response(
                JSON.stringify({ error: error.message || "Streaming failed" }),
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        }
    } catch (error: any) {
        console.error("Request parsing error:", error);
        return new Response(
            JSON.stringify({ error: error.message || "Invalid request" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }
}
