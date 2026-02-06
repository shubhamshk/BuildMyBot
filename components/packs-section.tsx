"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Sparkles, Star, Zap, Crown } from "lucide-react";
import { EmailBeforePaymentModal } from "@/components/modals/EmailBeforePaymentModal";
import { createClient } from "@/lib/supabase/client";
import { LoginRequiredModal } from "@/components/login-required-modal";

// Define Pack Interface
interface PackItem {
    id: string;
    title: string;
    description: string;
    price: number;
    features: string[];
    tag?: string;
    highlight?: boolean;
    images?: string[];
}

interface PackCategory {
    title: string;
    packs: PackItem[];
}

// Data
const packCategories: PackCategory[] = [
    {
        title: "Family Packs",
        packs: [
            {
                id: "mom/milf-pack",
                title: "Mom Bot Pack + Images",
                description: "5 caring, strict, and loving mother figures.",
                price: 5,
                features: ["5 Unique Personalities", "Full Backstories", "Image Collection", "Voice Clone Ready"],
                images: [
                    "https://ik.imagekit.io/tcxzbwccr/TA-2026-02-02-01-53-38-POVfrombed-1411758745(1)_upscayl_2x_upscayl-standard-4x.png",
                    "https://ik.imagekit.io/tcxzbwccr/TA-2026-02-02-00-12-51-matureMILF-841614612_upscayl_4x_upscayl-standard-4x.png",
                    "https://res.cloudinary.com/dkwxxfewv/image/upload/v1770133984/t_eUbzWr7C349v92sr_eodvfp.webp",
                    "https://res.cloudinary.com/dkwxxfewv/image/upload/v1770134164/TA-2026-01-21-18-22-52-score_9_sc-2449781985_bl9aos.png",
                    "https://res.cloudinary.com/dkwxxfewv/image/upload/v1770135024/t_EQXTRWTmUgqGwyUF_upscayl_2x_upscayl-standard-4x_kagwpz.png",
                    "https://res.cloudinary.com/dkwxxfewv/image/upload/v1770135054/TA-2026-01-11-22-49-23-masterpiec-2368326371_yqxt8i.png"
                ]
            },
            {
                id: "sister-pack",
                title: "Sister Bot Pack + Images",
                description: "5 dynamic sister archetypes for roleplay.",
                price: 5,
                features: ["5 Character Variations", "Anime & Realistic Styles", "Image Collection", "Voice Cloning Data"],
                images: [
                    "https://ik.imagekit.io/tcxzbwccr/TA-2026-02-01-19-01-12-animestyle-442315157.png",
                    "https://ik.imagekit.io/tcxzbwccr/TA-2026-02-02-00-35-01-highlydeta-2134375126.png",
                    "https://ik.imagekit.io/tcxzbwccr/TA-2026-02-01-18-57-45-animestyle-1988660763.png",
                    "https://res.cloudinary.com/dkwxxfewv/image/upload/v1770133937/TA-2026-01-29-09-35-53-animestyle-4228064067_frxmko.png",
                    "https://res.cloudinary.com/dkwxxfewv/image/upload/v1770133983/t_XPLx9iigGee7M9rB_1_bxwcd3.webp"
                ]
            },
            {
                id: "family-roleplay",
                title: "Family Roleplay Bot Pack + Images",
                description: "Complete household dynamic with 10 bots.",
                price: 10,
                features: ["10 Interactive Bots", "Interconnected Lore", "Image Collection", "Exclusive Images"],
                tag: "Best Value",
                highlight: true,
                images: [
                    "https://ik.imagekit.io/tcxzbwccr/TA-2026-01-29-16-03-18-(artist_ma-1599522622.png",
                    "https://ik.imagekit.io/tcxzbwccr/t_eUbzWr7C349v92sr.webp",
                    "https://ik.imagekit.io/tcxzbwccr/t_XWuBYzKyGT9kDy3D.webp",
                    "https://ik.imagekit.io/tcxzbwccr/TA-2026-02-03-22-07-48-first-pers-2939673392_upscayl_4x_upscayl-standard-4x.png",
                    "https://ik.imagekit.io/tcxzbwccr/TA-2026-01-27-10-22-12-(artist_ma-2812263224.png",
                    "https://ik.imagekit.io/tcxzbwccr/TA-2026-01-31-22-56-24-(artist_ma-2122214158.png",
                    "https://ik.imagekit.io/tcxzbwccr/TA-2026-02-02-03-11-41-1girl,solo-521248144.png",
                    "https://res.cloudinary.com/dkwxxfewv/image/upload/v1770135958/TA-2026-02-02-00-12-45-matureMILF-1334124762_ckrzn4.png",
                    "https://res.cloudinary.com/dkwxxfewv/image/upload/v1770135899/TA-2026-02-02-01-53-38-POVfrombed-1411758745_1__upscayl_2x_upscayl-standard-4x_dredzv.png",
                    "https://res.cloudinary.com/dkwxxfewv/image/upload/v1770134156/t_GkCnTjunfZ3Hwcu2_upscayl_2x_upscayl-standard-4x_z5jxry.png",
                    "https://res.cloudinary.com/dkwxxfewv/image/upload/v1770134131/t_DtuRNjTSZ5Fp96D3_lvlwu4.webp",
                    "https://res.cloudinary.com/dkwxxfewv/image/upload/v1770133984/t_eUbzWr7C349v92sr_eodvfp.webp"
                ]
            },
        ],
    },
    {
        title: "NSFW Free Image Packs",
        packs: [
            {
                id: "mom-safe-images",
                title: "Mom NSFW Free Images",
                description: "High-quality, safe-for-work images of Mom characters.",
                price: 9,
                features: ["best Images collection", "High Resolution", "Variety of Poses", "No Explicit Content"],
                images: [
                    "https://ik.imagekit.io/tcxzbwccr/TA-2026-02-02-01-53-38-POVfrombed-1411758745(1)_upscayl_2x_upscayl-standard-4x.png",
                    "https://ik.imagekit.io/tcxzbwccr/TA-2026-02-02-00-12-51-matureMILF-841614612_upscayl_4x_upscayl-standard-4x.png",
                    "https://res.cloudinary.com/dkwxxfewv/image/upload/v1770133984/t_eUbzWr7C349v92sr_eodvfp.webp",
                    "https://res.cloudinary.com/dkwxxfewv/image/upload/v1770134164/TA-2026-01-21-18-22-52-score_9_sc-2449781985_bl9aos.png"
                ]
            },
            {
                id: "sister-safe-images",
                title: "Sister NSFW Free Images",
                description: "High-quality, safe-for-work images of Sister characters.",
                price: 9,
                features: ["best Images collection", "High Resolution", "Anime & Realistic", "No Explicit Content"],
                images: [
                    "https://ik.imagekit.io/tcxzbwccr/TA-2026-02-01-19-01-12-animestyle-442315157.png",
                    "https://ik.imagekit.io/tcxzbwccr/TA-2026-02-02-00-35-01-highlydeta-2134375126.png",
                    "https://ik.imagekit.io/tcxzbwccr/TA-2026-02-01-18-57-45-animestyle-1988660763.png",
                    "https://ik.imagekit.io/tcxzbwccr/t_XWuBYzKyGT9kDy3D.webp"
                ]
            },
            {
                id: "family-safe-images",
                title: "Family NSFW Free Images",
                description: "Complete family collection in a safe, wholesome format.",
                price: 9,
                features: ["best Images collection", "Group Scenes", "High Resolution", "Wholesome Themes"],
                images: [
                    "https://ik.imagekit.io/tcxzbwccr/TA-2026-01-29-16-03-18-(artist_ma-1599522622.png",
                    "https://ik.imagekit.io/tcxzbwccr/t_eUbzWr7C349v92sr.webp",
                    "https://ik.imagekit.io/tcxzbwccr/TA-2026-02-03-22-07-48-first-pers-2939673392_upscayl_4x_upscayl-standard-4x.png",
                    "https://ik.imagekit.io/tcxzbwccr/TA-2026-01-27-10-22-12-(artist_ma-2812263224.png",
                    "https://ik.imagekit.io/tcxzbwccr/TA-2026-01-31-22-56-24-(artist_ma-2122214158.png"
                ]
            },
            {
                id: "nsfw-safe-prompt-pack",
                title: "NSFW-Safe Image + Prompt Pack",
                description: "Tasteful and safe prompts designed for more mature themes without crossing boundaries.",
                price: 9,
                features: ["Tasteful Prompts", "Mature Themes (Safe)", "Artistic Guidance", "Avoid Filters"],
                images: [
                    "https://ik.imagekit.io/tcxzbwccr/TA-2026-02-02-03-11-41-1girl,solo-521248144.png",
                    "https://ik.imagekit.io/tcxzbwccr/t_XPLx9iigGee7M9rB_1_bxwcd3.webp",
                    "https://ik.imagekit.io/tcxzbwccr/TA-2026-01-29-09-35-53-animestyle-4228064067_frxmko.png",
                    "https://res.cloudinary.com/dkwxxfewv/image/upload/v1770134043/TA-2026-01-26-19-50-40-masterpiec-3871801966_gvkv6e.png"
                ]
            },
        ],
    },

    {
        title: "Special Combo Packs",
        packs: [
            {
                id: "bot-image",
                title: "Full Bot + Image Pack",
                description: "Characters with 50+ images each.",
                price: 29,
                features: ["5 Premium Bots", "250+ HD Images", "Consistent Faces", "Gallery Mode Access"],
            },
            {
                id: "bot-prompt",
                title: "Full Bot + Prompt Pack",
                description: "Bots + The prompts to render them.",
                price: 29,
                features: ["Source Prompts Included", "Midjourney Guide", "Stable Diffusion LoRAs", "Commercial Use"],
                tag: "For Creators",
            },
            {
                id: "world-pack",
                title: "Full Roleplay World",
                description: "An entire universe in a box.",
                price: 59,
                features: ["20+ Linked Characters", "World Lore Bible", "Map Descriptions", "Campaign System"],
                highlight: true,
                tag: "Ultimate",
            },
        ],
    },
    {
        title: "Custom Request Packs",
        packs: [
            {
                id: "custom-bot-pack",
                title: "5 Custom Bot Creation Pack",
                description: "Request any 5 bots you want. No limitations on personality or images.",
                price: 29,
                features: ["5 Custom Bots Request", "Any User Defined Personality", "Custom Image Generation", "Priority Creation Support"],
            },
            {
                id: "custom-image-pack",
                title: "1 Custom Image Pack",
                description: "1 Custom image of any character or type you want.",
                price: 19,
                features: ["1 Custom Image Request", "Any Character / Style", "High Resolution Generations", "No Content Limitations"],
            },
        ],
    },
];

export function PacksSection() {
    const [selectedPack, setSelectedPack] = useState<PackItem | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);

    const handleBuy = async (pack: PackItem) => {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            setLoginModalOpen(true);
            return;
        }

        const modalItem = {
            id: pack.id,
            title: pack.title,
            price: pack.price,
            subtitle: pack.description,
            features: pack.features,
            goal: "Unlock content",
        };

        // @ts-ignore
        setSelectedPack(modalItem);
        setModalOpen(true);
    };

    return (
        <section className="py-12 md:py-24 px-4 md:px-6 relative z-10">
            {/* Golden Glow Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-0 right-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-amber-500/10 rounded-full blur-[80px] md:blur-[120px] opacity-40" />
                <div className="absolute bottom-0 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-violet-600/10 rounded-full blur-[80px] md:blur-[120px] opacity-40" />
            </div>

            <div className="container max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-4 inline-flex"
                    >
                        <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                            <Crown className="w-3 h-3" />
                            The Vault Collection
                        </span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-extrabold text-white mb-4"
                    >
                        Premium Bot <span className="text-amber-400 drop-shadow-[0_2px_12px_rgba(245,158,11,0.5)]">Packs</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto"
                    >
                        Unlock entire collections of high-quality AI characters, expertly crafted backstories, and immersive worlds.
                    </motion.p>
                </div>

                <div className="space-y-16 md:space-y-24">
                    {packCategories.map((category, catIndex) => {
                        if (category.title === "Custom Request Packs") {
                            return (
                                <div key={category.title} id="custom-requests" className="relative py-8">
                                    <div className="flex items-center justify-center gap-4 mb-12">
                                        <div className="h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-16 md:w-48" />
                                        <h3 className="text-2xl md:text-4xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200 uppercase tracking-wider">
                                            Custom Requests
                                        </h3>
                                        <div className="h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-16 md:w-48" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                                        {category.packs.map((pack, index) => (
                                            <motion.div
                                                key={pack.id}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.15 }}
                                                className="group relative"
                                            >
                                                {/* Animated Border Gradient */}
                                                <div className="absolute -inset-[2px] bg-gradient-to-r from-amber-500 via-purple-500 to-amber-500 rounded-[2rem] opacity-40 group-hover:opacity-100 blur-md transition-opacity duration-500 animate-gradient-xy" />

                                                <div className="relative h-full bg-[#080808] rounded-[1.8rem] p-8 md:p-10 border border-white/10 overflow-hidden flex flex-col">
                                                    {/* Background Pattern */}
                                                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                                                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />

                                                    <div className="relative z-10 flex flex-col h-full">
                                                        <div className="mb-6 flex justify-between items-start">
                                                            <div className="bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-amber-500/30 px-4 py-1.5 rounded-full">
                                                                <span className="text-amber-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                                                    <Zap className="w-3 h-3 text-amber-500" />
                                                                    Custom Order
                                                                </span>
                                                            </div>
                                                            <div className="text-right">
                                                                <span className="block text-3xl font-black text-white">${pack.price}</span>
                                                            </div>
                                                        </div>

                                                        <h4 className="text-2xl md:text-3xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                                                            {pack.title}
                                                        </h4>
                                                        <p className="text-neutral-400 mb-8 text-sm md:text-base leading-relaxed">
                                                            {pack.description}
                                                        </p>

                                                        <div className="space-y-4 mb-10 flex-grow">
                                                            {pack.features.map((feature, i) => (
                                                                <div key={i} className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/5 group-hover:border-amber-500/20 transition-colors">
                                                                    <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                                                                        <Star className="w-4 h-4 text-amber-500 fill-amber-500/20" />
                                                                    </div>
                                                                    <span className="text-neutral-300 text-sm font-medium">{feature}</span>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        <button
                                                            onClick={() => handleBuy(pack)}
                                                            className="w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black shadow-lg shadow-amber-900/20 hover:shadow-amber-500/30 transition-all transform hover:scale-[1.02]"
                                                        >
                                                            Start Custom Request
                                                            <ArrowRight className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            );
                        }

                        // Default Render for other categories
                        return (
                            <div key={category.title} id={category.title === "Family Packs" ? "family-packs" : undefined}>
                                <motion.h3
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8 border-l-4 border-amber-500 pl-4"
                                >
                                    {category.title}
                                </motion.h3>
                                <div className={`grid grid-cols-1 md:grid-cols-2 ${category.packs.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6 md:gap-8`}>
                                    {category.packs.map((pack, index) => (
                                        <PackCard
                                            key={pack.id}
                                            pack={pack}
                                            index={index + (catIndex * 3)}
                                            onBuy={() => handleBuy(pack)}
                                            isCompact={category.packs.length >= 4}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>


            </div>

            {modalOpen && selectedPack && (
                <EmailBeforePaymentModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    // @ts-ignore
                    item={selectedPack}
                />
            )}

            <LoginRequiredModal
                isOpen={loginModalOpen}
                onClose={() => setLoginModalOpen(false)}
            />
        </section>
    );
}

function PackCard({ pack, index, onBuy, isCompact }: { pack: PackItem; index: number; onBuy: () => void, isCompact?: boolean }) {
    const isHighlight = pack.highlight;
    const backgroundImage = pack.images && pack.images.length > 0 ? pack.images[0] : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="h-full"
        >
            <motion.div
                className={`
          group relative h-full flex flex-col
          rounded-2xl md:rounded-3xl overflow-hidden
          transition-all duration-500
          ${isHighlight
                        ? 'border border-amber-500/50 shadow-[0_0_40px_-10px_rgba(245,158,11,0.3)]'
                        : 'border border-white/10 hover:border-amber-500/30'
                    }
        `}
                whileHover={{
                    y: -8,
                    transition: { duration: 0.3 }
                }}
            >
                {/* Background Image */}
                {backgroundImage ? (
                    <div className="absolute inset-0 z-0">
                        <img
                            src={backgroundImage}
                            alt={pack.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-sm group-hover:bg-[#0a0a0a]/70 transition-colors duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent opacity-90" />
                    </div>
                ) : (
                    <div className="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-xl z-0" />
                )}

                {/* Glow Effects (on top of background but behind text) */}
                <div className={`absolute inset-0 z-0 bg-gradient-to-br ${isHighlight ? 'from-amber-500/10 via-transparent to-violet-500/10' : 'from-white/5 via-transparent to-white/5'} opacity-100 transition-opacity duration-500 mix-blend-overlay pointer-events-none`} />

                {isHighlight && (
                    <div className="absolute top-0 right-0 p-4 z-20">
                        <div className="bg-amber-500 text-black text-[10px] md:text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                            <Sparkles className="w-3 h-3" />
                            {pack.tag}
                        </div>
                    </div>
                )}

                <div className={`${isCompact ? 'p-5' : 'p-6 md:p-8'} flex flex-col h-full relative z-10`}>
                    <div className="mb-4 md:mb-6">
                        <h3 className={`text-xl ${isCompact ? 'md:text-xl' : 'md:text-2xl'} font-bold text-white mb-2 group-hover:text-amber-400 transition-colors drop-shadow-md`}>
                            {pack.title}
                        </h3>
                        <p className={`text-neutral-300 text-xs ${isCompact ? 'md:text-xs' : 'md:text-sm'} leading-relaxed min-h-[40px] drop-shadow-sm`}>
                            {pack.description}
                        </p>
                    </div>

                    <div className="mb-6">
                        <div className="flex items-baseline gap-1">
                            <span className={`text-2xl ${isCompact ? 'md:text-2xl' : 'md:text-3xl'} font-bold text-white drop-shadow-md`}>${pack.price}</span>
                            <span className="text-neutral-400 text-xs md:text-sm">/ pack</span>
                        </div>
                    </div>

                    <div className="flex-grow space-y-2 md:space-y-3 mb-6 md:mb-8">
                        {pack.features.map((feature, i) => (
                            <div key={i} className="flex items-start gap-3 text-xs md:text-sm">
                                <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isHighlight ? 'text-amber-500' : 'text-neutral-400 group-hover:text-amber-500/70 transition-colors'}`} />
                                <span className="text-neutral-200">{feature}</span>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={onBuy}
                        className={`
              w-full py-3 md:py-3.5 rounded-xl font-bold text-sm md:text-base flex items-center justify-center gap-2 transition-all duration-300 relative z-20
              ${isHighlight
                                ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/20'
                                : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10'
                            }
            `}
                    >
                        Unlock Now
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
