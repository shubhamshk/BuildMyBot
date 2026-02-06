-- Create a table for packs
CREATE TABLE IF NOT EXISTS packs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    features TEXT[],
    image_list TEXT[],
    category TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create a table for user pack subscriptions
CREATE TABLE IF NOT EXISTS user_pack_subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL, -- soft link to auth.users to avoid foreign key issues if auth is managed separately, but usually valid
    pack_id TEXT REFERENCES packs(id),
    paypal_subscription_id TEXT,
    paypal_plan_id TEXT,
    status TEXT DEFAULT 'ACTIVE', -- 'ACTIVE', 'CANCELLED', etc.
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ
);

-- Insert initial pack data (based on current frontend)
INSERT INTO packs (id, title, description, price, features, image_list, category) VALUES
('mom-pack', 'Mom Bot Pack + Images', '5 caring, strict, and loving mother figures.', 5.00, ARRAY['5 Unique Personalities', 'Full Backstories', 'Image Collection', 'Voice Clone Ready'], NULL, 'Family Packs'),
('sister-pack', 'Sister Bot Pack + Images', '5 dynamic sister archetypes for roleplay.', 5.00, ARRAY['5 Character Variations', 'Anime & Realistic Styles', 'Image Collection', 'Voice Cloning Data'], NULL, 'Family Packs'),
('family-roleplay', 'Family Roleplay Bot Pack + Images', 'Complete household dynamic with 10 bots.', 10.00, ARRAY['10 Interactive Bots', 'Interconnected Lore', 'Image Collection', 'Exclusive Images'], NULL, 'Family Packs'),
('mom-safe-images', 'Mom NSFW Free Images', 'High-quality, safe-for-work images of Mom characters.', 9.00, ARRAY['best Images collection', 'High Resolution', 'Variety of Poses', 'No Explicit Content'], NULL, 'NSFW Free Image Packs'),
('sister-safe-images', 'Sister NSFW Free Images', 'High-quality, safe-for-work images of Sister characters.', 9.00, ARRAY['best Images collection', 'High Resolution', 'Anime & Realistic', 'No Explicit Content'], NULL, 'NSFW Free Image Packs'),
('family-safe-images', 'Family NSFW Free Images', 'Complete family collection in a safe, wholesome format.', 9.00, ARRAY['best Images collection', 'Group Scenes', 'High Resolution', 'Wholesome Themes'], NULL, 'NSFW Free Image Packs'),
('nsfw-safe-prompt-pack', 'NSFW-Safe Image + Prompt Pack', 'Tasteful and safe prompts.', 9.00, ARRAY['Tasteful Prompts', 'Mature Themes (Safe)', 'Artistic Guidance', 'Avoid Filters'], NULL, 'NSFW Free Image Packs'),
('bot-image', 'Full Bot + Image Pack', 'Characters with 50+ images each.', 29.00, ARRAY['5 Premium Bots', '250+ HD Images', 'Consistent Faces', 'Gallery Mode Access'], NULL, 'Special Combo Packs'),
('bot-prompt', 'Full Bot + Prompt Pack', 'Bots + The prompts to render them.', 29.00, ARRAY['Source Prompts Included', 'Midjourney Guide', 'Stable Diffusion LoRAs', 'Commercial Use'], NULL, 'Special Combo Packs'),
('world-pack', 'Full Roleplay World', 'An entire universe in a box.', 59.00, ARRAY['20+ Linked Characters', 'World Lore Bible', 'Map Descriptions', 'Campaign System'], NULL, 'Special Combo Packs'),
('custom-bot-pack', '5 Custom Bot Creation Pack', 'Request any 5 bots you want.', 29.00, ARRAY['5 Custom Bots Request', 'Any User Defined Personality', 'Custom Image Generation', 'Priority Creation Support'], NULL, 'Custom Request Packs'),
('custom-image-pack', '1 Custom Image Pack', '1 Custom image of any character or type you want.', 19.00, ARRAY['1 Custom Image Request', 'Any Character / Style', 'High Resolution Generations', 'No Content Limitations'], NULL, 'Custom Request Packs')
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    features = EXCLUDED.features;
