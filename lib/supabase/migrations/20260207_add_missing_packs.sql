-- Insert missing packs including stepsisters-part-2 and special packs
INSERT INTO packs (id, title, description, price, features, category) VALUES
('mom-friend-part-2', 'Mom Friends Pool Party Part-2', 'A fully detailed bot personality section with 5 wide-range scenarios and open starting. Includes a full detailed lorebook and 8k images of all types.', 9.00, ARRAY['Detailed Personality', '5 Wide Context Scenarios', 'Full Detailed Lorebook', '8k Images Collection'], 'Special Packs'),

-- Stepsisters Part 2
('stepsisters-part-2', 'stepsisters part 2', 'Fully detailed bot personality with wide range scenarios.', 9.00, ARRAY['Fully Detailed Personality', '5 Wide Range Scenarios', 'Open Starting', 'Full Image Collection'], 'Family Packs'),

-- Prompt Packs
('romance-prompt-pack', 'Romance Image + Prompt Pack', 'Curated collection of romantic scenarios, couples poses, and atmospheric settings for your characters.', 5.00, NULL, 'Prompt Packs'),
('anime-character-pack', 'Anime Character Image + Prompt Pack', 'High-quality anime style prompts covering various genres, outfits, and dynamic poses.', 5.00, NULL, 'Prompt Packs'),
('dark-fantasy-pack', 'Dark Fantasy Image + Prompt Pack', 'Eerie, gothic, and magical prompts perfect for villains, monsters, and dark heroes.', 7.00, NULL, 'Prompt Packs'),

-- Special Packs / Courses
('viral-bot-creation-guide', 'Viral Bot Creation & Growth Guide', 'Perfect for beginners and intermediate creators who want to build bots that actually get noticed.', 30.00, ARRAY[
    'Complete bot creation tutorial (step-by-step, beginner-friendly)',
    'How to structure personality, scenario, and starter messages',
    'Common mistakes that kill bot engagement (and how to avoid them)',
    'Viral growth insights — what makes bots trend',
    'Guidance for creating short viral reels & promos for bots',
    'Tips on bio optimization, tags, and presentation',
    'Basic lorebook creation guide'
], 'Special Packs'),

('pro-bot-image-mastery', 'Professional Bot Image Creation Mastery', 'Made for creators who want high-quality, eye-catching bot images without constantly hitting filters or limits.', 30.00, ARRAY[
    'Full guide on professional bot image creation',
    'How to find image ideas that fit your character & story',
    'Advanced prompt engineering for character images',
    'Deep guidance on LoRAs, embeddings, and styles',
    'How to avoid common filters, bans, and limits',
    'Best image generation websites & models explained',
    'How to maintain visual consistency across images'
], 'Special Packs'),

('ultimate-creator-pack', 'Ultimate Creator Pack (All-in-One)', 'The complete professional package for serious creators.', 60.00, ARRAY[
    'Everything from Pack 1 + Pack 2',
    '3 fully built, premium bots (professionally structured)',
    'Bots are fully customizable to your needs',
    'Image packs tailored to each bot',
    'Prompt packs for chat + image generation',
    'Advanced personalization tips',
    'Priority guidance for setup & usage',
    'Fully fledged detailed lorebook creation guide'
], 'Special Packs'),

('voice-extension-v1', 'Cinematic Voice Extension', 'Unlock cinematic voice capabilities for your Janitor AI bots instantly.', 9.00, ARRAY['Cinematic Voice', 'Instant Unlock'], 'Special Packs')

ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    features = EXCLUDED.features;
