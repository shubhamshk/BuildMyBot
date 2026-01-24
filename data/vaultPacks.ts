
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
        previewImage: "https://res.cloudinary.com/dkwxxfewv/image/upload/v1769276505/3_xr1o1t.png", // Placeholder or generic image
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
        previewImage: "https://res.cloudinary.com/dkwxxfewv/image/upload/v1769186156/TA-2026-01-22-22-04-49-_artist_ma-3986721967_upscayl_2x_upscayl-standard-4x_n5hzp9.png",
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
        previewImage: "https://res.cloudinary.com/dkwxxfewv/image/upload/v1769186235/TA-2026-01-23-14-32-14-1girl_solo-4049177660_yxffve.png",
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
        previewImage: "https://res.cloudinary.com/dkwxxfewv/image/upload/v1769186337/TA-2026-01-02-21-39-34-_masterpie-2441467277_ozu8mv.png",
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
        previewImage: "https://res.cloudinary.com/dkwxxfewv/image/upload/v1768326694/TA-2026-01-13-02-59-04-_artist_ma-526226082_ubrlun.png",
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
