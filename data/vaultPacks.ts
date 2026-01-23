
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
        name: "Dont tell Your sis Part -2",
        originalBotName: "Dont tell Your sis Part -2",
        previewImage: "https://res.cloudinary.com/dkwxxfewv/image/upload/v1706644059/bot-preview-1_gqys8b.jpg", // Placeholder or generic image
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
        previewImage: "https://res.cloudinary.com/dkwxxfewv/image/upload/v1706644059/bot-preview-2_fhr32a.jpg",
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
        previewImage: "https://res.cloudinary.com/dkwxxfewv/image/upload/v1706644059/bot-preview-3_kj239s.jpg",
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
        previewImage: "https://res.cloudinary.com/dkwxxfewv/image/upload/v1706644059/bot-preview-4_m329s.jpg",
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
        previewImage: "https://res.cloudinary.com/dkwxxfewv/image/upload/v1706644059/bot-preview-5_nm29s.jpg",
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
