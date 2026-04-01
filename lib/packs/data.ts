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
    originalPrice?: number;
    discountTimer?: boolean;
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
        features: ["5 Unique Personalities", "Full Backstories", "Image Collection", "Voice Clone Ready"],
        images: [
            "https://res.cloudinary.com/drdd0gfrc/image/upload/v1771610827/TA-2026-02-02-00-12-51-matureMILF-841614612_lpn8ar.png",
            "https://res.cloudinary.com/drdd0gfrc/image/upload/v1771611117/TA-2026-01-26-19-52-26-masterpiec-3063664377_gopkx6.png"
        ]
    },
    {
        id: "sister-pack",
        title: "Sister Bot Pack + Images",
        description: "5 dynamic sister archetypes for roleplay.",
        price: 5,
        features: ["5 Character Variations", "Anime & Realistic Styles", "Image Collection", "Voice Cloning Data"],
        images: [
            "https://res.cloudinary.com/drdd0gfrc/image/upload/v1771610925/t_eUbzWr7C349v92sr_cjxacx.webp",
            "https://res.cloudinary.com/drdd0gfrc/image/upload/v1771610899/TA-2026-01-24-13-36-38-1womenhots-406331419_ckqv1l.png"
        ]
    },
    {
        id: "family-roleplay",
        title: "Family Roleplay Bot Pack + Images",
        description: "Complete household dynamic with 10 bots.",
        price: 10,
        features: ["10 Interactive Bots", "Interconnected Lore", "Image Collection", "Exclusive Images"],
        tag: "Best Selling",
        highlight: true,
        images: [
            "https://res.cloudinary.com/drdd0gfrc/image/upload/v1771610828/TA-2026-02-03-23-54-55-first-pers-1393994759_tnuc8j.png",
            "https://res.cloudinary.com/drdd0gfrc/image/upload/v1771340544/TA-2026-01-13-14-42-27-_artist_ma-1635821493_dx8vyz.png"
        ]
    },

    // New 24hr Premium Offer Pack
    {
        id: "premium-family-roleplay-discount",
        title: "Family Roleplay Bot Pack + Images Premium Edition",
        description: "Premium 8k images block with nice images and complete bot setups.",
        price: 39,
        originalPrice: 59,
        discountTimer: true,
        features: ["Premium 8k Images (150+ images)", "Nice images", "10 Premium bots with images + personality", "Demand 1 bot creation"],
        tag: "Best Value",
        highlight: true,
        images: [
            "https://res.cloudinary.com/drdd0gfrc/image/upload/v1771610828/TA-2026-02-03-23-54-55-first-pers-1393994759_tnuc8j.png",
            "https://res.cloudinary.com/drdd0gfrc/image/upload/v1771340544/TA-2026-01-13-14-42-27-_artist_ma-1635821493_dx8vyz.png",
            "https://res.cloudinary.com/drdd0gfrc/image/upload/v1771611118/TA-2026-01-26-19-28-45-masterpiec-566171666_i7kkyt.png"
        ]
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
        id: "nsfw-safe-prompt-pack", // Matching the UI ID
        title: "NSFW-Safe Image + Prompt Pack",
        description: "Tasteful and safe prompts designed for more mature themes without crossing boundaries.",
        price: 9,
        features: ["Tasteful Prompts", "Mature Themes (Safe)", "Artistic Guidance", "Avoid Filters"]
    },
    {
        id: "affair-bot-pack",
        title: "full NSFW-Safe Image + Prompt Pack",
        description: "A comprehensive collection of high-quality NSFW-safe images paired with detailed rendering prompts.",
        price: 15,
        originalPrice: 25,
        discountTimer: true,
        features: ["NSFW-Safe Images", "High-Quality Images", "Access to full Private Discord Server", "priority Access to new Updates"],
        tag: "Today's Special Pack",
        highlight: true,
        images: [
            "https://res.cloudinary.com/drdd0gfrc/image/upload/v1772128439/TA-2026-02-26-19-56-55-Intimatepa-1328197427_asi3q7.png"
        ]
    },

    // Super Saver Pack
    {
        id: "world-pack",
        title: "Ultimate Collection Pack",
        description: "The ultimate all-in-one mega bundle — get instant lifetime access to everything the platform has to offer. Includes 10,000+ high-resolution 8K images, all assets from every other pack combined, Janitor AI voice-enabled extension, private Discord channel access, custom image generation support, AI bot generation tools, and personal priority support. One pack. Everything. Forever.",
        price: 99,
        originalPrice: 149,
        discountTimer: true,
        features: ["10K+ High-Resolution 8K Images", "All Pack Assets Combined in One Bundle", "Private Discord Channels Access", "Janitor AI Voice-Enabled Extension", "Personal Priority Support for Any Bots", "Custom Image Generation Support", "AI Bot Generation Tools Included", "Lifetime Access to All Resources"],
        highlight: true,
        tag: "🔥 Limited Offer",
        images: [
            "https://res.cloudinary.com/drdd0gfrc/image/upload/v1773594134/TA-2026-03-08-22-36-56-rawsensual-2523615903_gdxpnw.png",
            "https://res.cloudinary.com/drdd0gfrc/image/upload/v1772128439/TA-2026-02-26-19-56-55-Intimatepa-1328197427_asi3q7.png"
        ]
    },


    {
        id: "stepsisters-part-2",
        title: "Sisters having an affair part-2",
        description: "A fully detailed bot personality section with 5 wide-range scenarios and open starting. Includes a full collection of images of all types.",
        price: 9,
        features: ["Fully Detailed Personality", "5 Wide Range Scenarios", "Open Starting", "Full Image Collection"]
    },
    {
        id: "mom-friend-part-2",
        title: "Mom Friends Pool Party Part-2",
        description: "A fully detailed bot personality section with 5 wide-range scenarios and open starting. Includes a full detailed lorebook and 8k images of all types.",
        price: 9,
        features: ["Detailed Personality", "5 Wide Context Scenarios", "Full Detailed Lorebook", "8k Images Collection"]
    },
    {
        id: "caring-stepsister-part-2",
        title: "Caring Stepsister Part-2",
        description: "A fully detailed bot personality section with 5 wide-range scenarios and open starting. Includes a full detailed lorebook and 8k images of all types.",
        price: 9,
        features: ["Detailed Personality", "5 Wide Context Scenarios", "Full Detailed Lorebook", "8k Images Collection"]
    },
    {
        id: "custom-pack-collection-request",
        title: "Ask for Custom Pack Collection",
        description: "Request a custom pack collection. Type your request and we will make it.",
        price: 9,
        features: ["Custom Collection Request", "Any Theme/Genre", "Priority Support", "Satisfaction Guaranteed"]
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

    // New Bots Page Packs
    {
        id: "janitor-ai-special",
        title: "Janitor AI Special Version",
        description: "The Ultimate 10-Bot Collection. Includes 10 Exclusive Janitor AI Bots, Enhanced 8K Resolution Images, Fully Updated Scenarios, and Advanced Personality Sections.",
        price: 79,
        features: ["10 Exclusive Janitor AI Bots", "Enhanced 8K Resolution Images", "Fully Updated Scenarios", "Advanced Personality Sections", "Ready for Immediate Use"]
    },
    {
        id: "custom-bot-request",
        title: "Custom Bot Creator Pack",
        description: "Ask for Any 5 Custom Bots. Tailored Personalities & Lore, Custom Scenarios Built for You, Exclusive Ownership.",
        price: 59,
        features: ["Request Any 5 Custom Bots", "Tailored Personalities & Lore", "Custom Scenarios Built for You", "Exclusive Ownership & Prompt", "Priority Delivery Time"]
    },
];

export const services: Service[] = [
    {
        id: "single-custom-character",
        title: "Single Custom Character",
        description: "A fully fleshed-out character based on your specifications. Includes backstory, personality, appearance prompts, and a custom generated character image.",
        price: 10,
        deliveryTime: "24-48 hours",
        image: "https://res.cloudinary.com/drdd0gfrc/image/upload/v1771610925/t_eUbzWr7C349v92sr_cjxacx.webp",
    },
    {
        id: "multi-character-story",
        title: "Multi-Character Story Setup",
        description: "A set of characters with intertwined backstories and a world setting. Includes custom images for each character and designed interactions.",
        price: 25,
        deliveryTime: "3-5 days",
        image: "https://res.cloudinary.com/drdd0gfrc/image/upload/v1771610828/TA-2026-02-03-23-54-55-first-pers-1393994759_tnuc8j.png",
    },
    {
        id: "advanced-niche-request",
        title: "Advanced / Niche Requests",
        description: "Complex requests, specific fetishes (safe-for-work limitations apply), or highly detailed world-building. Includes premium custom imagery.",
        price: 50,
        priceLabel: "50+",
        deliveryTime: "Agreed upon review",
        image: "https://res.cloudinary.com/drdd0gfrc/image/upload/v1771610827/TA-2026-02-02-00-12-51-matureMILF-841614612_lpn8ar.png",
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
