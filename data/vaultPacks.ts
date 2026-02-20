
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
        previewImage: "https://res.cloudinary.com/drdd0gfrc/image/upload/v1771611118/TA-2026-01-26-19-28-45-masterpiec-566171666_i7kkyt.png", // Placeholder or generic image
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
        previewImage: "https://res.cloudinary.com/drdd0gfrc/image/upload/v1771610925/t_eUbzWr7C349v92sr_cjxacx.webp",
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
        previewImage: "https://res.cloudinary.com/drdd0gfrc/image/upload/v1771340544/TA-2026-01-13-14-42-27-_artist_ma-1635821493_dx8vyz.png",
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
        previewImage: "https://res.cloudinary.com/drdd0gfrc/image/upload/v1771610827/TA-2026-02-02-00-12-51-matureMILF-841614612_lpn8ar.png",
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
        previewImage: "https://res.cloudinary.com/drdd0gfrc/image/upload/v1771610828/TA-2026-02-03-23-54-55-first-pers-1393994759_tnuc8j.png",
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
