export interface ModelResource {
    type: "model" | "lora" | "embedding";
    name: string;
    trigger?: string;
}

export const MODELS: ModelResource[] = [
    { type: "model", name: "Pony Diffusion V6 XL", trigger: "score_9, score_8_up, score_7_up, source_anime" },
    { type: "model", name: "Animagine XL 3.1", trigger: "animagine, anime style" },
    { type: "model", name: "DreamShaper XL", trigger: "" }
];

export const LORAS: ModelResource[] = [
    { type: "lora", name: "Detailed Eyes", trigger: "detailed_eyes" },
    { type: "lora", name: "Vibrant Colors", trigger: "vibrant_colors" },
    { type: "lora", name: "Flat Color", trigger: "flat_color" }
];

export const EMBEDDINGS: ModelResource[] = [
    { type: "embedding", name: "EasyNegative", trigger: "easynegative" },
    { type: "embedding", name: "BadHandv4", trigger: "badhandv4" }
];

export function getRandomEnhancer(): ModelResource {
    const all = [...MODELS, ...LORAS, ...EMBEDDINGS];
    return all[Math.floor(Math.random() * all.length)];
}

export function getEnhancerForIndex(index: number): ModelResource {
    // Rotate through: Model -> LoRA -> Embedding
    const types = ["model", "lora", "embedding"];
    const type = types[index % types.length];

    if (type === "model") return MODELS[index % MODELS.length];
    if (type === "lora") return LORAS[index % LORAS.length];
    return EMBEDDINGS[index % EMBEDDINGS.length];
}
