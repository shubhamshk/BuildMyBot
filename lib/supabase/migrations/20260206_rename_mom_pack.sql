-- Rename the pack ID in the packs table
UPDATE packs
SET id = 'mom/milf-pack'
WHERE id = 'mom-pack';

-- Just in case the update fails because 'mom-pack' doesn't exist but we want to ensure 'mom/milf-pack' does:
INSERT INTO packs (id, title, description, price, features, image_list, category)
VALUES (
    'mom/milf-pack', 
    'Mom Bot Pack + Images', 
    '5 caring, strict, and loving mother figures.', 
    5.00, 
    ARRAY['5 Unique Personalities', 'Full Backstories', 'Image Collection', 'Voice Clone Ready'], 
    NULL, 
    'Family Packs'
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    features = EXCLUDED.features;
