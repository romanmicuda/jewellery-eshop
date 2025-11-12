INSERT INTO roles(id, name) VALUES(gen_random_uuid(), 'ROLE_USER');
INSERT INTO roles(id, name) VALUES(gen_random_uuid(), 'ROLE_ADMIN');

INSERT INTO users(id, username, email, password, full_name, is_active_newsletter_subscriber, date_of_birth) VALUES(
    gen_random_uuid(),
    'admin',
    'admin@admin.com',
    '$2a$12$P6Sx7GDdDaljR/K9ealaDO2l7u4BOmMSi3gkZ1EyU1.yjynt8jNmq',
    'John Doe',
    true,
    '1990-01-01'
);

INSERT INTO user_roles(role_id, user_id) VALUES(
    (SELECT id FROM roles WHERE name = 'ROLE_USER'),
    (SELECT id FROM users WHERE email = 'admin@admin.com')
);

-- Insert 30 jewelry products
INSERT INTO product (product_id, name, description, price, category, brand, material, gemstone, size, stock_quantity, discount_percentage, images) VALUES
('556eadd5-f080-4bfe-9abf-d1f6de202c71', 'Diamond Engagement Ring', 'Elegant diamond solitaire ring', 2500.00, 'RINGS', 'Tiffany & Co', 'PLATINUM', 'DIAMOND', 'SIZE_7', 15, 10.0, ARRAY['diamond_ring.png']),
('195c47d3-10fb-45c9-bd84-27f331df0aef', 'Gold Pearl Necklace', 'Classic 18k gold necklace with cultured pearls', 890.00, 'NECKLACES', 'Mikimoto', 'GOLD', null, 'ONE_SIZE', 25, 5.0, ARRAY['gold_pearl_necklace.png']),
('31ebb63a-4b4b-48e5-bdf4-ca1ade894976', 'Ruby Drop Earrings', 'Stunning ruby drop earrings in white gold setting', 1200.00, 'EARRINGS', 'Cartier', 'GOLD', 'RUBY', 'ONE_SIZE', 12, 15.0, ARRAY['ruby_earrings.png']),
('a6af1c61-28dd-4acd-a902-d497d068258b', 'Silver Chain Bracelet', 'Modern sterling silver chain bracelet', 150.00, 'BRACELETS', 'Pandora', 'SILVER', null, 'MEDIUM', 40, 0.0, ARRAY['silver_bracelet.png']),
('ab9f828a-561a-4c5c-a1f2-218c2f4aa97f', 'Sapphire Pendant', 'Blue sapphire pendant with diamond accents', 750.00, 'PENDANTS', 'Blue Nile', 'GOLD', 'SAPPHIRE', 'ONE_SIZE', 20, 8.0, ARRAY['sapphire_pendant.png']),
('a01b3308-bc9c-43da-87b8-c132ef54b71c', 'Rose Gold Wedding Band', 'Simple rose gold wedding band', 450.00, 'RINGS', 'James Allen', 'GOLD', null, 'SIZE_8', 30, 0.0, ARRAY['rose_gold_band.png']),
('312f4bff-6797-4bf4-96bc-267e2336a645', 'Emerald Tennis Bracelet', 'Luxury emerald tennis bracelet in platinum', 3200.00, 'BRACELETS', 'Harry Winston', 'PLATINUM', 'EMERALD', 'LARGE', 8, 12.0, ARRAY['emerald_bracelet.png']),
('b0338599-16f8-4e1c-ae4c-57c275487149', 'Pearl Stud Earrings', 'Classic white pearl stud earrings', 180.00, 'EARRINGS', 'Majorica', 'SILVER', null, 'ONE_SIZE', 35, 0.0, ARRAY['pearl_studs.png']),
('7ff09a18-490e-4017-ae02-e84e88570ff7', 'Amethyst Cocktail Ring', 'Large amethyst statement ring in silver', 320.00, 'RINGS', 'Ippolita', 'SILVER', 'AMETHYST', 'SIZE_9', 18, 20.0, ARRAY['amethyst_ring.png']),
('fea637f1-a5cb-4211-b867-7d318c9fd195', 'Gold Chain Necklace', '14k gold figaro chain necklace', 420.00, 'NECKLACES', 'Kay Jewelers', 'GOLD', null, 'ONE_SIZE', 22, 5.0, ARRAY['gold_chain.png']),
('2463d728-871d-482a-91b3-cbcd5572d055', 'Diamond Stud Earrings', 'Round brilliant diamond stud earrings', 1800.00, 'EARRINGS', 'De Beers', 'PLATINUM', 'DIAMOND', 'ONE_SIZE', 10, 0.0, ARRAY['diamond_studs.png']),
('d87dd614-2bf8-4321-aff3-019e958fe1ef', 'Silver Ankle Bracelet', 'Delicate silver ankle bracelet with charms', 80.00, 'ANKLETS', 'Alex and Ani', 'SILVER', null, 'SMALL', 45, 10.0, ARRAY['silver_anklet.png']),
('2cd562c3-fa1b-45ef-b00d-cf21cf96ac9f', 'Topaz Fashion Ring', 'Blue topaz fashion ring with white gold', 280.00, 'RINGS', 'Zales', 'GOLD', 'TOPAZ', 'SIZE_6', 25, 15.0, ARRAY['topaz_ring.png']),
('a2754738-5116-4dfc-bd3c-c51bc7699dc3', 'Platinum Cufflinks', 'Classic platinum cufflinks with diamond center', 950.00, 'CUFFLINKS', 'Montblanc', 'PLATINUM', 'DIAMOND', 'ONE_SIZE', 15, 0.0, ARRAY['platinum_cufflinks.png']),
('0af3a0fa-00b0-4a98-b0f8-5eee771ef712', 'Garnet Pendant Necklace', 'Vintage-style garnet pendant on gold chain', 340.00, 'PENDANTS', 'Effy', 'GOLD', 'GARNET', 'ONE_SIZE', 28, 12.0, ARRAY['garnet_pendant.png']),
('778bff09-c3b3-40ed-959f-f2f9b61460a0', 'Stainless Steel Watch Bracelet', 'Modern stainless steel link bracelet', 120.00, 'BRACELETS', 'Fossil', 'STAINLESS_STEEL', null, 'LARGE', 50, 0.0, ARRAY['steel_bracelet.png']),
('640c2913-b304-4a7f-9952-880c170e4788', 'Aquamarine Drop Earrings', 'Light blue aquamarine drop earrings', 420.00, 'EARRINGS', 'Monica Vinader', 'SILVER', 'AQUAMARINE', 'ONE_SIZE', 20, 8.0, ARRAY['aquamarine_earrings.png']),
('76610d5d-7a46-43da-a8ef-cd07055c3a7a', 'Gold Charm Bracelet', 'Traditional gold charm bracelet', 380.00, 'BRACELETS', 'Charm & Chain', 'GOLD', null, 'MEDIUM', 32, 5.0, ARRAY['charm_bracelet.png']),
('174a4418-67ae-43c9-b357-e7bb4329a6dc', 'Silver Flower Brooch', 'Vintage silver flower brooch with crystals', 95.00, 'BROOCHES', 'Vintage Collection', 'SILVER', null, 'ONE_SIZE', 38, 18.0, ARRAY['flower_brooch.png']),
('a45f37a4-9597-443d-a5de-f6fd60945c9f', 'Diamond Eternity Ring', 'Diamond eternity band in white gold', 1400.00, 'RINGS', 'Brilliant Earth', 'GOLD', 'DIAMOND', 'SIZE_10', 12, 0.0, ARRAY['eternity_ring.png']),
('c0bba809-2bb3-4375-a4f4-b0fa6c845a1e', 'Pearl Strand Necklace', 'Long pearl strand necklace, hand-knotted', 520.00, 'NECKLACES', 'Honora', 'SILVER', null, 'ONE_SIZE', 18, 10.0, ARRAY['pearl_strand.png']),
('36f3f78c-f90a-427b-a2a4-607d132c1051', 'Ruby Tennis Bracelet', 'Ruby and diamond tennis bracelet', 2800.00, 'BRACELETS', 'Graff', 'PLATINUM', 'RUBY', 'MEDIUM', 6, 15.0, ARRAY['ruby_tennis.png']),
('e9882645-29b9-4555-8c5b-8f1a69a8e016', 'Gold Hoop Earrings', 'Medium 14k gold hoop earrings', 210.00, 'EARRINGS', 'Roberto Coin', 'GOLD', null, 'ONE_SIZE', 42, 0.0, ARRAY['gold_hoops.png']),
('56052e1b-ac3f-4e76-8829-f425a2a2f9e4', 'Ceramic Fashion Ring', 'Modern black ceramic ring with steel accents', 65.00, 'RINGS', 'Chanel', 'CERAMIC', null, 'SIZE_11', 55, 25.0, ARRAY['ceramic_ring.png']),
('6af9a614-ae80-4e1d-b5f4-dd89c9aab9e1', 'Emerald Stud Earrings', 'Natural emerald stud earrings in gold', 680.00, 'EARRINGS', 'Zamels', 'GOLD', 'EMERALD', 'ONE_SIZE', 16, 5.0, ARRAY['emerald_studs.png']),
('b351e14a-6456-48b3-bff9-d5747eb649ad', 'Wooden Bead Necklace', 'Natural wood bead necklace with leather cord', 45.00, 'NECKLACES', 'Earth Elements', 'WOOD', null, 'ONE_SIZE', 60, 0.0, ARRAY['wood_necklace.png']),
('a1412119-94cf-429d-aa56-b7d811cfb40c', 'Diamond Pendant', 'Solitaire diamond pendant on white gold chain', 990.00, 'PENDANTS', 'Hearts on Fire', 'GOLD', 'DIAMOND', 'ONE_SIZE', 14, 8.0, ARRAY['diamond_pendant.png']),
('c06bc18b-1154-44f1-b2e3-7fb41796db04', 'Silver Cuff Bracelet', 'Wide sterling silver cuff bracelet', 140.00, 'BRACELETS', 'David Yurman', 'SILVER', null, 'LARGE', 25, 12.0, ARRAY['silver_cuff.png']),
('e99967d4-086f-4303-b555-9a7dee064f7b', 'Gold Ankle Chain', 'Delicate 14k gold ankle chain', 180.00, 'ANKLETS', 'Mejuri', 'GOLD', null, 'SMALL', 30, 0.0, ARRAY['gold_anklet.png']),
('f73a1f22-a666-41d9-a7fd-cd8a6571f045', 'Sapphire Cocktail Ring', 'Large blue sapphire cocktail ring', 1600.00, 'RINGS', 'Bulgari', 'PLATINUM', 'SAPPHIRE', 'SIZE_12', 9, 10.0, ARRAY['sapphire_cocktail.png']);