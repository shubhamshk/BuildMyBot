
export interface Pack {
    id: string;
    title: string;
    description: string;
    price: number;
    image?: string; // For future use if we have images
    images?: string[]; // Support for multiple images
    features?: string[]; // Support for feature lists
    tag?: string;
    highlight?: boolean;
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
    features: string[]; // Required for SpecialPack
    goal: string;
}

export const packs: Pack[] = [
    // Existing packs
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
        // aka nsfw-safe-prompt-pack in UI, checking ID match... UI uses 'nsfw-safe-prompt-pack'. 
        // We will add the UI version below to be safe, or rename this one if unused. 
        // Keeping this for safety, but UI uses 'nsfw-safe-prompt-pack'.
        id: "nsfw-safe-pack",
        title: "NSFW-Safe Image + Prompt Pack",
        description: "Tasteful and safe prompts designed for more mature themes without crossing boundaries.",
        price: 9,
    },

    // Family Packs
    {
        id: "mom/milf-pack",
        title: "Mom Bot Pack + Images",
        description: "5 caring, strict, and loving mother figures.",
        price: 5,
        features: ["5 Unique Personalities", "Full Backstories", "Image Collection", "Voice Clone Ready"]
    },
    {
        id: "sister-pack",
        title: "Sister Bot Pack + Images",
        description: "5 dynamic sister archetypes for roleplay.",
        price: 5,
        features: ["5 Character Variations", "Anime & Realistic Styles", "Image Collection", "Voice Cloning Data"]
    },
    {
        id: "family-roleplay",
        title: "Family Roleplay Bot Pack + Images",
        description: "Complete household dynamic with 10 bots.",
        price: 10,
        features: ["10 Interactive Bots", "Interconnected Lore", "Image Collection", "Exclusive Images"],
        tag: "Best Value",
        highlight: true
    },

    // NSFW Free Image Packs
    {
        id: "mom-safe-images",
        title: "Mom NSFW Free Images",
        description: "High-quality, safe-for-work images of Mom characters.",
        price: 9,
        features: ["50+ Safe Images", "High Resolution", "Variety of Poses", "No Explicit Content"]
    },
    {
        id: "sister-safe-images",
        title: "Sister NSFW Free Images",
        description: "High-quality, safe-for-work images of Sister characters.",
        price: 9,
        features: ["50+ Safe Images", "High Resolution", "Anime & Realistic", "No Explicit Content"]
    },
    {
        id: "family-safe-images",
        title: "Family NSFW Free Images",
        description: "Complete family collection in a safe, wholesome format.",
        price: 9,
        features: ["100+ Safe Images", "Group Scenes", "High Resolution", "Wholesome Themes"]
    },
    {
        id: "nsfw-safe-prompt-pack", // Matching the UI ID
        title: "NSFW-Safe Image + Prompt Pack",
        description: "Tasteful and safe prompts designed for more mature themes without crossing boundaries.",
        price: 9,
        features: ["Tasteful Prompts", "Mature Themes (Safe)", "Artistic Guidance", "Avoid Filters"]
    },

    // Special Combo Packs
    {
        id: "bot-image",
        title: "Full Bot + Image Pack",
        description: "Characters with 50+ images each.",
        price: 29,
        features: ["5 Premium Bots", "250+ HD Images", "Consistent Faces", "Gallery Mode Access"]
    },
    {
        id: "bot-prompt",
        title: "Full Bot + Prompt Pack",
        description: "Bots + The prompts to render them.",
        price: 29,
        features: ["Source Prompts Included", "Midjourney Guide", "Stable Diffusion LoRAs", "Commercial Use"],
        tag: "For Creators"
    },
    {
        id: "world-pack",
        title: "Full Roleplay World",
        description: "An entire universe in a box.",
        price: 59,
        features: ["20+ Linked Characters", "World Lore Bible", "Map Descriptions", "Campaign System"],
        highlight: true,
        tag: "Ultimate"
    },


    {
        id: "stepsisters-part-2",
        title: "stepsisters part 2",
        description: "Fully detailed bot personality with wide range scenarios.",
        price: 9,
        features: ["Fully Detailed Personality", "5 Wide Range Scenarios", "Open Starting", "Full Image Collection"]
    },

    // Custom Request Packs
    {
        id: "custom-bot-pack",
        title: "5 Custom Bot Creation Pack",
        description: "Request any 5 bots you want. No limitations on personality or images.",
        price: 29,
        features: ["5 Custom Bots Request", "Any User Defined Personality", "Custom Image Generation", "Priority Creation Support"]
    },
    {
        id: "custom-image-pack",
        title: "1 Custom Image Pack",
        description: "1 Custom image of any character or type you want.",
        price: 19,
        features: ["1 Custom Image Request", "Any Character / Style", "High Resolution Generations", "No Content Limitations"]
    },
];

export const services: Service[] = [
    {
        id: "single-custom-character",
        title: "Single Custom Character",
        description: "A fully fleshed-out character based on your specifications. Includes backstory, personality, appearance prompts, and a custom generated character image.",
        price: 10,
        deliveryTime: "24-48 hours",
        image: "https://ik.imagekit.io/tcxzbwccr/t_eUbzWr7C349v92sr.webp",
    },
    {
        id: "multi-character-story",
        title: "Multi-Character Story Setup",
        description: "A set of characters with intertwined backstories and a world setting. Includes custom images for each character and designed interactions.",
        price: 25,
        deliveryTime: "3-5 days",
        image: "https://ik.imagekit.io/tcxzbwccr/TA-2026-02-03-22-07-48-first-pers-2939673392_upscayl_4x_upscayl-standard-4x.png",
    },
    {
        id: "advanced-niche-request",
        title: "Advanced / Niche Requests",
        description: "Complex requests, specific fetishes (safe-for-work limitations apply), or highly detailed world-building. Includes premium custom imagery.",
        price: 50,
        priceLabel: "50+",
        deliveryTime: "Agreed upon review",
        image: "https://ik.imagekit.io/tcxzbwccr/TA-2026-02-02-03-11-41-1girl,solo-521248144.png",
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
    },
    {
        id: "voice-extension-v1",
        title: "Cinematic Voice Extension",
        description: "Unlock cinematic voice capabilities for your Janitor AI bots instantly.",
        price: 9,
        subtitle: "Unlock cinematic voice capabilities for your Janitor AI bots instantly.",
        features: ["Cinematic Voice", "Instant Unlock"],
        goal: "Enhance your bot experience with voice."
    }
];
