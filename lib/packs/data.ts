
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
    image?: string; // Optional image URL
}

export const packs: Pack[] = [
    {
        id: "romance-prompt-pack",
        title: "Romance Image + Prompt Pack",
        description: "Curated collection of romantic scenarios, couples poses, and atmospheric settings for your characters.",
        price: 5,
    },
    {
        id: "anime-character-pack",
        title: "Anime Character Image + Prompt Pack",
        description: "High-quality anime style prompts covering various genres, outfits, and dynamic poses.",
        price: 5,
    },
    {
        id: "dark-fantasy-pack",
        title: "Dark Fantasy Image + Prompt Pack",
        description: "Eerie, gothic, and magical prompts perfect for villains, monsters, and dark heroes.",
        price: 7,
    },
    {
        id: "nsfw-safe-pack",
        title: "NSFW-Safe Image + Prompt Pack",
        description: "Tasteful and safe prompts designed for more mature themes without crossing boundaries.",
        price: 6,
    },
];

export const services: Service[] = [
    {
        id: "single-custom-character",
        title: "Single Custom Character",
        description: "A fully fleshed-out character based on your specifications. Includes backstory, personality, appearance prompts, and a custom generated character image.",
        price: 10,
        deliveryTime: "24-48 hours",
        image: "https://res.cloudinary.com/dkwxxfewv/image/upload/v1768326742/TA-2026-01-13-14-46-25-_artist_ma-735908093_gafs9j.png",
    },
    {
        id: "multi-character-story",
        title: "Multi-Character Story Setup",
        description: "A set of characters with intertwined backstories and a world setting. Includes custom images for each character and designed interactions.",
        price: 25,
        deliveryTime: "3-5 days",
        image: "https://res.cloudinary.com/dkwxxfewv/image/upload/v1768326739/TA-2026-01-13-15-07-52-_artist_ma-2968179715_zxkzfi.png",
    },
    {
        id: "advanced-niche-request",
        title: "Advanced / Niche Requests",
        description: "Complex requests, specific fetishes (safe-for-work limitations apply), or highly detailed world-building. Includes premium custom imagery.",
        price: 50,
        priceLabel: "50+",
        deliveryTime: "Agreed upon review",
        image: "https://res.cloudinary.com/dkwxxfewv/image/upload/v1768326698/TA-2026-01-13-12-54-27-_artist_ma-1728647033_cho5ek.png",
    },
];
