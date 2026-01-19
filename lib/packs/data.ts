
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

export interface SpecialPack extends Pack {
    subtitle: string;
    features: string[];
    goal: string;
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
        price: 9,
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

export const specialPacks: SpecialPack[] = [
    {
        id: "viral-bot-creation-guide",
        title: "Viral Bot Creation & Growth Guide",
        description: "Perfect for beginners and intermediate creators who want to build bots that actually get noticed.",
        price: 30,
        subtitle: "Perfect for beginners and intermediate creators who want to build bots that actually get noticed.",
        features: [
            "Complete bot creation tutorial (step-by-step, beginner-friendly)",
            "How to structure personality, scenario, and starter messages",
            "Common mistakes that kill bot engagement (and how to avoid them)",
            "Viral growth insights — what makes bots trend",
            "Guidance for creating short viral reels & promos for bots",
            "Tips on bio optimization, tags, and presentation",
            "Basic lorebook creation guide"
        ],
        goal: "Help you create bots that attract users and keep them chatting."
    },
    {
        id: "pro-bot-image-mastery",
        title: "Professional Bot Image Creation Mastery",
        description: "Made for creators who want high-quality, eye-catching bot images without constantly hitting filters or limits.",
        price: 30,
        subtitle: "Made for creators who want high-quality, eye-catching bot images without constantly hitting filters or limits.",
        features: [
            "Full guide on professional bot image creation",
            "How to find image ideas that fit your character & story",
            "Advanced prompt engineering for character images",
            "Deep guidance on LoRAs, embeddings, and styles",
            "How to avoid common filters, bans, and limits",
            "Best image generation websites & models explained",
            "How to maintain visual consistency across images"
        ],
        goal: "Make your bots visually appealing, consistent, and platform-safe."
    },
    {
        id: "ultimate-creator-pack",
        title: "Ultimate Creator Pack (All-in-One)",
        description: "The complete professional package for serious creators.",
        price: 60,
        subtitle: "The complete professional package for serious creators.",
        features: [
            "Everything from Pack 1 + Pack 2",
            "3 fully built, premium bots (professionally structured)",
            "Bots are fully customizable to your needs",
            "Image packs tailored to each bot",
            "Prompt packs for chat + image generation",
            "Advanced personalization tips",
            "Priority guidance for setup & usage",
            "Fully fledged detailed lorebook creation guide"
        ],
        goal: "Give you a ready-to-use, high-quality foundation with professional-level polish."
    }
];
