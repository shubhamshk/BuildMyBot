-- Insert new packs for Caring Stepsister Part-2 and Custom Pack Collection
INSERT INTO packs (id, title, description, price, features, category) VALUES
-- Caring Stepsister Part-2
('caring-stepsister-part-2', 'Caring Stepsister Part-2', 'A fully detailed bot personality section with 5 wide-range scenarios and open starting. Includes a full detailed lorebook and 8k images of all types.', 9.00, ARRAY['Detailed Personality', '5 Wide Context Scenarios', 'Full Detailed Lorebook', '8k Images Collection'], 'Special Packs'),

-- Custom Pack Collection Request
('custom-pack-collection-request', 'Ask for Custom Pack Collection', 'Request a custom pack collection. Type your request and we will make it.', 9.00, ARRAY['Custom Collection Request', 'Any Theme/Genre', 'Priority Support', 'Satisfaction Guaranteed'], 'Special Packs')

ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    features = EXCLUDED.features;
