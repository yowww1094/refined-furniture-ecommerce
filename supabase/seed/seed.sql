-- Supabase Seed Data
-- Sample data for categories, materials, suppliers, FAQs

-- Insert sample categories
INSERT INTO public.categories (name, slug, description, image_url, is_active) VALUES
('Living Room', 'living-room', 'Comfortable and stylish living room furniture', NULL, true),
('Bedroom', 'bedroom', 'Elegant bedroom sets and accessories', NULL, true),
('Dining Room', 'dining-room', 'Fine dining tables and chairs', NULL, true),
('Office', 'office', 'Modern office furniture and desks', NULL, true),
('Outdoor', 'outdoor', 'Durable outdoor furniture for patios and gardens', NULL, true)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample materials
INSERT INTO public.materials (name, description, supplier_id, cost_per_unit, unit, is_active) VALUES
('Sheesham Wood', 'Premium Indian rosewood known for durability and beautiful grain', NULL, 120.00, 'cubic foot', true),
('Teak Wood', 'Weather-resistant hardwood ideal for outdoor furniture', NULL, 150.00, 'cubic foot', true),
('Cotton Fabric', 'Breathable natural fabric for upholstery', NULL, 15.00, 'yard', true),
('Leather', 'Full-grain leather for premium upholstery', NULL, 45.00, 'square foot', true),
('Steel', 'Strong steel for frames and supports', NULL, 2.50, 'kg', true)
ON CONFLICT (name) DO NOTHING;

-- Insert sample suppliers
INSERT INTO public.suppliers (name, contact_name, email, phone, address, website, is_active) VALUES
('Artisan Woodworks', 'Fatima Zahra', 'fatima@artisanwood.ma', '+212 555-1234', '123 Artisan Street, Marrakech', 'https://artisanwood.ma', true),
('Metal Craft Morocco', 'Youssef Karim', 'youssef@metalcraft.ma', '+212 555-5678', '45 Industrial Zone, Casablanca', 'https://metalcraft.ma', true),
('Fabric House', 'Amina Benali', 'amina@fabrichouse.ma', '+212 555-9012', '78 Textile District, Fez', 'https://fabrichouse.ma', true)
ON CONFLICT (name) DO NOTHING;

-- Update materials with supplier IDs (after suppliers inserted)
-- We'll do this in a separate step or use subquery, but for simplicity we'll update after
-- Since we can't guarantee order, we'll do a separate update statement
UPDATE public.materials m
SET supplier_id = s.id
FROM public.suppliers s
WHERE s.name = 'Artisan Woodworks' AND m.name IN ('Sheesham Wood', 'Teak Wood')
   OR s.name = 'Fabric House' AND m.name = 'Cotton Fabric'
   OR s.name = 'Fabric House' AND m.name = 'Leather'
   OR s.name = 'Metal Craft Morocco' AND m.name = 'Steel'
WHERE m.supplier_id IS NULL;

-- Insert sample FAQs
INSERT INTO public.faqs (question, answer, category, is_active, sort_order) VALUES
('What is your return policy?', 'We accept returns within 30 days of delivery for items in original condition. Custom orders cannot be returned unless defective.', 'general', true, 1),
('How long does delivery take?', 'Standard delivery takes 5-7 business days within Morocco. Custom furniture typically takes 2-4 weeks depending on complexity.', 'shipping', true, 2),
('Do you offer interior design consultation?', 'Yes! Our expert designers can help you plan your space. Consultation is free with any purchase over 5000 MAD.', 'services', true, 3),
('What payment methods do you accept?', 'We accept Cash on Delivery (COD) for all orders. For corporate clients, bank transfer is also available.', 'payment', true, 4),
('How do I care for wooden furniture?', 'Dust regularly with a soft cloth. Avoid direct sunlight and moisture. Use wood polish occasionally for maintenance.', 'maintenance', true, 5)
ON CONFLICT (question) DO NOTHING;

-- Note: Additional seeding for products, projects, etc. can be done via admin UI or separate scripts
-- as they often require relationships that are easier to manage through the application layer.

-- Output completion notice
SELECT 'Seed data inserted successfully' AS message;