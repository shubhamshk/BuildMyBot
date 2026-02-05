
export interface VaultPack {
    id: string;
    name: string;
    originalBotName: string;
    previewImage: string; // URL string
    features: string[];
    price: number;
}

export const vaultPacks: VaultPack[] = [
    {
        id: "pack-1",
        name: "Who killed him part 2 ",
        originalBotName: "who killed him part-2",
        previewImage: "https://ik.imagekit.io/tcxzbwccr/TA-2026-01-31-22-56-24-(artist_ma-2122214158.png", // Placeholder or generic image
        features: [
            "Expanded personality",
            "New scenario route",
            "Alternate dialogue styles",
            "Image prompt pack",
            "Unlocked memory files"
        ],
        price: 9
    },
    {
        id: "pack-2",
        name: "Rika ,Your Little Sister Bully - Part-2",
        originalBotName: "Rika ,Your Little Sister Bully - Part-2",
        previewImage: "https://ik.imagekit.io/tcxzbwccr/TA-2026-02-01-19-01-12-animestyle-442315157.png",
        features: [
            "Expanded personality",
            "New scenario route",
            "Alternate dialogue styles",
            "Image prompt pack",
            "Unlocked memory files"
        ],
        price: 9
    },
    {
        id: "pack-3",
        name: "Sis And Dad part-2",
        originalBotName: "Sis And Dad part-2",
        previewImage: "https://ik.imagekit.io/tcxzbwccr/TA-2026-02-01-18-57-45-animestyle-1988660763.png",
        features: [
            "Expanded personality",
            "New scenario route",
            "Alternate dialogue styles",
            "Image prompt pack",
            "Unlocked memory files"
        ],
        price: 9
    },
    {
        id: "pack-4",
        name: "Mom and bro part-2",
        originalBotName: "Mom and bro part-2",
        previewImage: "https://ik.imagekit.io/tcxzbwccr/TA-2026-02-02-00-12-51-matureMILF-841614612_upscayl_4x_upscayl-standard-4x.png",
        features: [
            "Expanded personality",
            "New scenario route",
            "Alternate dialogue styles",
            "Image prompt pack",
            "Unlocked memory files"
        ],
        price: 9
    },
    {
        id: "pack-5",
        name: "Any other pack you want",
        originalBotName: "Any other pack you want",
        previewImage: "https://ik.imagekit.io/tcxzbwccr/TA-2026-01-29-16-03-18-(artist_ma-1599522622.png",
        features: [
            "Expanded personality",
            "New scenario route",
            "Alternate dialogue styles",
            "Image prompt pack",
            "Unlocked memory files"
        ],
        price: 9
    }
];

export const creatorVaultPack = {
    id: "creator-vault",
    title: "Creator Vault — 10 Premium Bots",
    features: [
        "10 exclusive characters",
        "All versions",
        "Exclusive images",
        "Bonus prompt packs",
        "Priority updates"
    ],
    price: 79,
    badge: "BEST VALUE"
};
