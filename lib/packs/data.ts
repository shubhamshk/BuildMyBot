
export interface Pack {
    id: string;
    title: string;
    description: string;
    price: number;
    image?: string; // For future use if we have images
}

export interface Service {
    id: string;
    title: string;
    description: string;
    price: number;
    priceLabel?: string; // For "50+" representation
    deliveryTime: string;
}

export const packs: Pack[] = [
    {
        id: "romance-prompt-pack",
        title: "Romance Image Prompt Pack",
        description: "Curated collection of romantic scenarios, couples poses, and atmospheric settings for your characters.",
        price: 5,
    },
    {
        id: "anime-character-pack",
        title: "Anime Character Prompt Pack",
        description: "High-quality anime style prompts covering various genres, outfits, and dynamic poses.",
        price: 5,
    },
    {
        id: "dark-fantasy-pack",
        title: "Dark Fantasy Prompt Pack",
        description: "Eerie, gothic, and magical prompts perfect for villains, monsters, and dark heroes.",
        price: 7,
    },
    {
        id: "nsfw-safe-pack",
        title: "NSFW-Safe Prompt Pack",
        description: "Tasteful and safe prompts designed for more mature themes without crossing boundaries.",
        price: 6,
    },
];

export const services: Service[] = [
    {
        id: "single-custom-character",
        title: "Single Custom Character",
        description: "A fully fleshed-out character based on your specifications, including backstory, personality, and appearance prompts.",
        price: 10,
        deliveryTime: "24-48 hours",
    },
    {
        id: "multi-character-story",
        title: "Multi-Character Story Setup",
        description: "A set of characters with intertwined backstories and a world setting designed interactions.",
        price: 25,
        deliveryTime: "3-5 days",
    },
    {
        id: "advanced-niche-request",
        title: "Advanced / Niche Requests",
        description: "Complex requests, specific fetishes (safe-for-work limitations apply), or highly detailed world-building.",
        price: 50,
        priceLabel: "50+",
        deliveryTime: "Agreed upon review",
    },
];
