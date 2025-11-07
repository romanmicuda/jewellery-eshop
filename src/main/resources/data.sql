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
(gen_random_uuid(), 'Diamond Engagement Ring', 'Elegant diamond solitaire ring with platinum band', 2500.00, 'RINGS', 'Tiffany & Co', 'PLATINUM', 'DIAMOND', 'SIZE_7', 15, 10.0, ARRAY['diamond_ring.png']),
(gen_random_uuid(), 'Gold Pearl Necklace', 'Classic 18k gold necklace with cultured pearls', 890.00, 'NECKLACES', 'Mikimoto', 'GOLD', null, 'ONE_SIZE', 25, 5.0, ARRAY['gold_pearl_necklace.png']),
(gen_random_uuid(), 'Ruby Drop Earrings', 'Stunning ruby drop earrings in white gold setting', 1200.00, 'EARRINGS', 'Cartier', 'GOLD', 'RUBY', 'ONE_SIZE', 12, 15.0, ARRAY['ruby_earrings.png']),
(gen_random_uuid(), 'Silver Chain Bracelet', 'Modern sterling silver chain bracelet', 150.00, 'BRACELETS', 'Pandora', 'SILVER', null, 'MEDIUM', 40, 0.0, ARRAY['silver_bracelet.png']),
(gen_random_uuid(), 'Sapphire Pendant', 'Blue sapphire pendant with diamond accents', 750.00, 'PENDANTS', 'Blue Nile', 'GOLD', 'SAPPHIRE', 'ONE_SIZE', 20, 8.0, ARRAY['sapphire_pendant.png']),
(gen_random_uuid(), 'Rose Gold Wedding Band', 'Simple rose gold wedding band', 450.00, 'RINGS', 'James Allen', 'GOLD', null, 'SIZE_8', 30, 0.0, ARRAY['rose_gold_band.png']),
(gen_random_uuid(), 'Emerald Tennis Bracelet', 'Luxury emerald tennis bracelet in platinum', 3200.00, 'BRACELETS', 'Harry Winston', 'PLATINUM', 'EMERALD', 'LARGE', 8, 12.0, ARRAY['emerald_bracelet.png']),
(gen_random_uuid(), 'Pearl Stud Earrings', 'Classic white pearl stud earrings', 180.00, 'EARRINGS', 'Majorica', 'SILVER', null, 'ONE_SIZE', 35, 0.0, ARRAY['pearl_studs.png']),
(gen_random_uuid(), 'Amethyst Cocktail Ring', 'Large amethyst statement ring in silver', 320.00, 'RINGS', 'Ippolita', 'SILVER', 'AMETHYST', 'SIZE_9', 18, 20.0, ARRAY['amethyst_ring.png']),
(gen_random_uuid(), 'Gold Chain Necklace', '14k gold figaro chain necklace', 420.00, 'NECKLACES', 'Kay Jewelers', 'GOLD', null, 'ONE_SIZE', 22, 5.0, ARRAY['gold_chain.png']),
(gen_random_uuid(), 'Diamond Stud Earrings', 'Round brilliant diamond stud earrings', 1800.00, 'EARRINGS', 'De Beers', 'PLATINUM', 'DIAMOND', 'ONE_SIZE', 10, 0.0, ARRAY['diamond_studs.png']),
(gen_random_uuid(), 'Silver Ankle Bracelet', 'Delicate silver ankle bracelet with charms', 80.00, 'ANKLETS', 'Alex and Ani', 'SILVER', null, 'SMALL', 45, 10.0, ARRAY['silver_anklet.png']),
(gen_random_uuid(), 'Topaz Fashion Ring', 'Blue topaz fashion ring with white gold', 280.00, 'RINGS', 'Zales', 'GOLD', 'TOPAZ', 'SIZE_6', 25, 15.0, ARRAY['topaz_ring.png']),
(gen_random_uuid(), 'Platinum Cufflinks', 'Classic platinum cufflinks with diamond center', 950.00, 'CUFFLINKS', 'Montblanc', 'PLATINUM', 'DIAMOND', 'ONE_SIZE', 15, 0.0, ARRAY['platinum_cufflinks.png']),
(gen_random_uuid(), 'Garnet Pendant Necklace', 'Vintage-style garnet pendant on gold chain', 340.00, 'PENDANTS', 'Effy', 'GOLD', 'GARNET', 'ONE_SIZE', 28, 12.0, ARRAY['garnet_pendant.png']),
(gen_random_uuid(), 'Stainless Steel Watch Bracelet', 'Modern stainless steel link bracelet', 120.00, 'BRACELETS', 'Fossil', 'STAINLESS_STEEL', null, 'LARGE', 50, 0.0, ARRAY['steel_bracelet.png']),
(gen_random_uuid(), 'Aquamarine Drop Earrings', 'Light blue aquamarine drop earrings', 420.00, 'EARRINGS', 'Monica Vinader', 'SILVER', 'AQUAMARINE', 'ONE_SIZE', 20, 8.0, ARRAY['aquamarine_earrings.png']),
(gen_random_uuid(), 'Gold Charm Bracelet', 'Traditional gold charm bracelet', 380.00, 'BRACELETS', 'Charm & Chain', 'GOLD', null, 'MEDIUM', 32, 5.0, ARRAY['charm_bracelet.png']),
(gen_random_uuid(), 'Silver Flower Brooch', 'Vintage silver flower brooch with crystals', 95.00, 'BROOCHES', 'Vintage Collection', 'SILVER', null, 'ONE_SIZE', 38, 18.0, ARRAY['flower_brooch.png']),
(gen_random_uuid(), 'Diamond Eternity Ring', 'Diamond eternity band in white gold', 1400.00, 'RINGS', 'Brilliant Earth', 'GOLD', 'DIAMOND', 'SIZE_10', 12, 0.0, ARRAY['eternity_ring.png']),
(gen_random_uuid(), 'Pearl Strand Necklace', 'Long pearl strand necklace, hand-knotted', 520.00, 'NECKLACES', 'Honora', 'SILVER', null, 'ONE_SIZE', 18, 10.0, ARRAY['pearl_strand.png']),
(gen_random_uuid(), 'Ruby Tennis Bracelet', 'Ruby and diamond tennis bracelet', 2800.00, 'BRACELETS', 'Graff', 'PLATINUM', 'RUBY', 'MEDIUM', 6, 15.0, ARRAY['ruby_tennis.png']),
(gen_random_uuid(), 'Gold Hoop Earrings', 'Medium 14k gold hoop earrings', 210.00, 'EARRINGS', 'Roberto Coin', 'GOLD', null, 'ONE_SIZE', 42, 0.0, ARRAY['gold_hoops.png']),
(gen_random_uuid(), 'Ceramic Fashion Ring', 'Modern black ceramic ring with steel accents', 65.00, 'RINGS', 'Chanel', 'CERAMIC', null, 'SIZE_11', 55, 25.0, ARRAY['ceramic_ring.png']),
(gen_random_uuid(), 'Emerald Stud Earrings', 'Natural emerald stud earrings in gold', 680.00, 'EARRINGS', 'Zamels', 'GOLD', 'EMERALD', 'ONE_SIZE', 16, 5.0, ARRAY['emerald_studs.png']),
(gen_random_uuid(), 'Wooden Bead Necklace', 'Natural wood bead necklace with leather cord', 45.00, 'NECKLACES', 'Earth Elements', 'WOOD', null, 'ONE_SIZE', 60, 0.0, ARRAY['wood_necklace.png']),
(gen_random_uuid(), 'Diamond Pendant', 'Solitaire diamond pendant on white gold chain', 990.00, 'PENDANTS', 'Hearts on Fire', 'GOLD', 'DIAMOND', 'ONE_SIZE', 14, 8.0, ARRAY['diamond_pendant.png']),
(gen_random_uuid(), 'Silver Cuff Bracelet', 'Wide sterling silver cuff bracelet', 140.00, 'BRACELETS', 'David Yurman', 'SILVER', null, 'LARGE', 25, 12.0, ARRAY['silver_cuff.png']),
(gen_random_uuid(), 'Gold Ankle Chain', 'Delicate 14k gold ankle chain', 180.00, 'ANKLETS', 'Mejuri', 'GOLD', null, 'SMALL', 30, 0.0, ARRAY['gold_anklet.png']),
(gen_random_uuid(), 'Sapphire Cocktail Ring', 'Large blue sapphire cocktail ring', 1600.00, 'RINGS', 'Bulgari', 'PLATINUM', 'SAPPHIRE', 'SIZE_12', 9, 10.0, ARRAY['sapphire_cocktail.png']);