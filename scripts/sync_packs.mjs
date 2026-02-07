
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to load env
function loadEnv() {
    try {
        const envPath = path.resolve(process.cwd(), '.env.local');
        if (!fs.existsSync(envPath)) {
            console.error('.env.local not found');
            return null;
        }
        const envContent = fs.readFileSync(envPath, 'utf8');
        const envVars = {};
        envContent.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                const value = match[2].trim().replace(/^["']|["']$/g, ''); // Remove quotes
                envVars[key] = value;
            }
        });
        return envVars;
    } catch (error) {
        console.error('Error loading .env.local', error);
        return null;
    }
}

const env = loadEnv();
if (!env || !env.NEXT_PUBLIC_SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const packsToSync = [
    // Existing packs
    {
        id: "romance-prompt-pack",
        title: "Romance Image + Prompt Pack",
        description: "Curated collection of romantic scenarios, couples poses, and atmospheric settings for your characters.",
        price: 5,
        category: 'Prompt Packs'
    },
    {
        id: "anime-character-pack",
        title: "Anime Character Image + Prompt Pack",
        description: "High-quality anime style prompts covering various genres, outfits, and dynamic poses.",
        price: 5,
        category: 'Prompt Packs'
    },
    {
        id: "dark-fantasy-pack",
        title: "Dark Fantasy Image + Prompt Pack",
        description: "Eerie, gothic, and magical prompts perfect for villains, monsters, and dark heroes.",
        price: 7,
        category: 'Prompt Packs'
    },
    {
        id: "nsfw-safe-prompt-pack",
        title: "NSFW-Safe Image + Prompt Pack",
        description: "Tasteful and safe prompts designed for more mature themes without crossing boundaries.",
        price: 9,
        features: ["Tasteful Prompts", "Mature Themes (Safe)", "Artistic Guidance", "Avoid Filters"],
        category: 'NSFW Free Image Packs'
    },

    // Family Packs
    {
        id: "mom-pack",
        title: "Mom Bot Pack + Images",
        description: "5 caring, strict, and loving mother figures.",
        price: 5,
        features: ["5 Unique Personalities", "Full Backstories", "Image Collection", "Voice Clone Ready"],
        category: 'Family Packs'
    },
    {
        id: "sister-pack",
        title: "Sister Bot Pack + Images",
        description: "5 dynamic sister archetypes for roleplay.",
        price: 5,
        features: ["5 Character Variations", "Anime & Realistic Styles", "Image Collection", "Voice Cloning Data"],
        category: 'Family Packs'
    },
    {
        id: "family-roleplay",
        title: "Family Roleplay Bot Pack + Images",
        description: "Complete household dynamic with 10 bots.",
        price: 10,
        features: ["10 Interactive Bots", "Interconnected Lore", "Image Collection", "Exclusive Images"],
        category: 'Family Packs'
    },
    // The missing pack causing error
    {
        id: "stepsisters-part-2",
        title: "stepsisters part 2",
        description: "Fully detailed bot personality with wide range scenarios.",
        price: 9,
        features: ["Fully Detailed Personality", "5 Wide Range Scenarios", "Open Starting", "Full Image Collection"],
        category: 'Family Packs'
    },

    // NSFW Free Image Packs
    {
        id: "mom-safe-images",
        title: "Mom NSFW Free Images",
        description: "High-quality, safe-for-work images of Mom characters.",
        price: 9,
        features: ["50+ Safe Images", "High Resolution", "Variety of Poses", "No Explicit Content"],
        category: 'NSFW Free Image Packs'
    },
    {
        id: "sister-safe-images",
        title: "Sister NSFW Free Images",
        description: "High-quality, safe-for-work images of Sister characters.",
        price: 9,
        features: ["50+ Safe Images", "High Resolution", "Anime & Realistic", "No Explicit Content"],
        category: 'NSFW Free Image Packs'
    },
    {
        id: "family-safe-images",
        title: "Family NSFW Free Images",
        description: "Complete family collection in a safe, wholesome format.",
        price: 9,
        features: ["100+ Safe Images", "Group Scenes", "High Resolution", "Wholesome Themes"],
        category: 'NSFW Free Image Packs'
    },

    // Special Combo Packs
    {
        id: "bot-image",
        title: "Full Bot + Image Pack",
        description: "Characters with 50+ images each.",
        price: 29,
        features: ["5 Premium Bots", "250+ HD Images", "Consistent Faces", "Gallery Mode Access"],
        category: 'Special Combo Packs'
    },
    {
        id: "bot-prompt",
        title: "Full Bot + Prompt Pack",
        description: "Bots + The prompts to render them.",
        price: 29,
        features: ["Source Prompts Included", "Midjourney Guide", "Stable Diffusion LoRAs", "Commercial Use"],
        category: 'Special Combo Packs'
    },
    {
        id: "world-pack",
        title: "Full Roleplay World",
        description: "An entire universe in a box.",
        price: 59,
        features: ["20+ Linked Characters", "World Lore Bible", "Map Descriptions", "Campaign System"],
        category: 'Special Combo Packs'
    },

    // Special Packs / Courses (Missing in DB mostly)
    {
        id: "viral-bot-creation-guide",
        title: "Viral Bot Creation & Growth Guide",
        description: "Perfect for beginners and intermediate creators who want to build bots that actually get noticed.",
        price: 30,
        features: [
            "Complete bot creation tutorial (step-by-step, beginner-friendly)",
            "How to structure personality, scenario, and starter messages",
            "Common mistakes that kill bot engagement (and how to avoid them)",
            "Viral growth insights — what makes bots trend",
            "Guidance for creating short viral reels & promos for bots",
            "Tips on bio optimization, tags, and presentation",
            "Basic lorebook creation guide"
        ],
        category: 'Special Packs'
    },
    {
        id: "pro-bot-image-mastery",
        title: "Professional Bot Image Creation Mastery",
        description: "Made for creators who want high-quality, eye-catching bot images without constantly hitting filters or limits.",
        price: 30,
        features: [
            "Full guide on professional bot image creation",
            "How to find image ideas that fit your character & story",
            "Advanced prompt engineering for character images",
            "Deep guidance on LoRAs, embeddings, and styles",
            "How to avoid common filters, bans, and limits",
            "Best image generation websites & models explained",
            "How to maintain visual consistency across images"
        ],
        category: 'Special Packs'
    },
    {
        id: "ultimate-creator-pack",
        title: "Ultimate Creator Pack (All-in-One)",
        description: "The complete professional package for serious creators.",
        price: 60,
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
        category: 'Special Packs'
    },
    {
        id: "voice-extension-v1",
        title: "Cinematic Voice Extension",
        description: "Unlock cinematic voice capabilities for your Janitor AI bots instantly.",
        price: 9,
        features: ["Cinematic Voice", "Instant Unlock"],
        category: 'Special Packs'
    },

    // Custom Request Packs
    {
        id: "custom-bot-pack",
        title: "5 Custom Bot Creation Pack",
        description: "Request any 5 bots you want. No limitations on personality or images.",
        price: 29,
        features: ["5 Custom Bots Request", "Any User Defined Personality", "Custom Image Generation", "Priority Creation Support"],
        category: 'Custom Request Packs'
    },
    {
        id: "custom-image-pack",
        title: "1 Custom Image Pack",
        description: "1 Custom image of any character or type you want.",
        price: 19,
        features: ["1 Custom Image Request", "Any Character / Style", "High Resolution Generations", "No Content Limitations"],
        category: 'Custom Request Packs'
    }
];

async function syncPacks() {
    console.log(`Syncing ${packsToSync.length} packs to database...`);

    const { data, error } = await supabase
        .from('packs')
        .upsert(packsToSync, { onConflict: 'id' })
        .select();

    if (error) {
        console.error('Error syncing packs:', error);
    } else {
        console.log('Successfully synced packs!');
    }
}

syncPacks();
