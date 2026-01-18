
import { NextRequest, NextResponse } from "next/server";
import { getServerProxyConfig, ProxyConfig } from "@/lib/ai/proxy-config";

export const runtime = "edge"; // fast edge api for proxying

export async function POST(req: NextRequest) {
    try {
        // 1. Parse Request Body
        const body = await req.json();
        const { messages, temperature, max_tokens, stream } = body;

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: { message: "Invalid request. 'messages' array is required." } },
                { status: 400 }
            );
        }

        // 2. Determine Proxy Configuration
        // Check for client-provided overrides (sent from Settings page logic via headers)
        const clientProxyUrl = req.headers.get("x-ai-proxy-url");
        const clientProxyKey = req.headers.get("x-ai-proxy-key");
        const clientModel = req.headers.get("x-ai-model");

        let config: ProxyConfig | null = null;

        if (clientProxyUrl) {
            // User-configured proxy (e.g. from Settings > LocalStorage)
            config = {
                name: "Custom Proxy",
                model: clientModel || "local-model",
                proxyUrl: clientProxyUrl,
                apiKey: clientProxyKey || undefined,
            };
        } else {
            // Server-side default config (Environment Variables)
            config = getServerProxyConfig();
        }

        if (!config || !config.proxyUrl) {
            return NextResponse.json(
                { error: { message: "No AI Proxy configuration found. Please configure a proxy in Settings or Environment Variables." } },
                { status: 503 }
            );
        }

        // 3. Prepare Proxy Request
        const proxyHeaders: Record<string, string> = {
            "Content-Type": "application/json",
        };

        if (config.apiKey) {
            proxyHeaders["Authorization"] = `Bearer ${config.apiKey}`;
        }

        // Forward the OpenAI-compatible body
        const proxyBody = {
            model: config.model,
            messages,
            temperature: temperature ?? 0.7,
            max_tokens: max_tokens,
            stream: stream ?? false, // Pass through stream preference if present
        };

        // 4. Call the Proxy
        try {
            const response = await fetch(config.proxyUrl, {
                method: "POST",
                headers: proxyHeaders,
                body: JSON.stringify(proxyBody),
            } as any);

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Proxy Error:", errorText);
                let errorJson;
                try {
                    errorJson = JSON.parse(errorText);
                } catch {
                    errorJson = { error: { message: `Proxy Error (${response.status}): ${errorText}` } };
                }
                return NextResponse.json(errorJson, { status: response.status });
            }

            // If streaming is requested and response is a stream, pipe it directly
            if (stream && response.body) {
                // Set headers for SSE/streaming
                return new Response(response.body, {
                    status: 200,
                    headers: {
                        "Content-Type": response.headers.get("content-type") || "text/event-stream",
                        "Cache-Control": "no-cache",
                        "Connection": "keep-alive",
                        // Allow CORS if needed
                        "Access-Control-Allow-Origin": "*",
                    },
                });
            }

            // Otherwise, return JSON as before
            const data = await response.json();
            return NextResponse.json(data);

        } catch (fetchError: any) {
            console.error("Proxy Fetch Failed:", fetchError);
            return NextResponse.json(
                {
                    error: {
                        message: `Failed to connect to AI Proxy at ${config.proxyUrl}. ${fetchError.message || ""}`,
                        code: "PROXY_CONNECTION_FAILED"
                    }
                },
                { status: 502 }
            );
        }

    } catch (error: any) {
        console.error("API Route Error:", error);
        return NextResponse.json(
            { error: { message: "Internal Server Error during AI request processing." } },
            { status: 500 }
        );
    }
}
