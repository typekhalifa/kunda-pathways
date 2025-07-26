-- Add new categories for fb-consulting and study-programs services
-- This will allow admin to manage these services separately

-- Add new service categories
-- study-programs and fb-consulting services can now be managed from admin
-- We'll update the pages to fetch from database

-- No schema changes needed - existing services table already supports different categories
-- We just need to insert the hardcoded services into the database

-- Insert FB Consulting services
INSERT INTO public.services (name, description, price, category, duration, is_active) VALUES
('Market Entry Strategy', 'Comprehensive market analysis and entry strategy for Asian F&B markets', 2500, 'fb-consulting', '2-3 weeks', true),
('Regulatory Compliance', 'Navigate complex food safety regulations across Asian markets', 1800, 'fb-consulting', '1-2 weeks', true),
('Food Product Development', 'Develop products tailored for Asian consumer preferences', 3200, 'fb-consulting', '4-6 weeks', true),
('Supply Chain Optimization', 'Optimize your supply chain for Asian market efficiency', 2200, 'fb-consulting', '2-4 weeks', true),
('Brand Localization', 'Adapt your brand for local Asian markets', 1500, 'fb-consulting', '1-3 weeks', true),
('Partnership & Distribution', 'Connect with local partners and establish distribution networks', 2800, 'fb-consulting', '3-5 weeks', true);

-- Insert Study Programs services
INSERT INTO public.services (name, description, price, category, duration, is_active) VALUES
('Scholarship Guidance', 'Expert guidance for finding and applying to scholarships in Korea', 100, 'study-programs', '1-2 weeks', true),
('University Admissions', 'Complete support for Korean university admission process', 70, 'study-programs', '2-3 weeks', true),
('Visa Application Assistance', 'Professional help with Korean student visa applications', 100, 'study-programs', '1 week', true),
('Korean Language Preparation', 'Comprehensive Korean language preparation program', 80, 'study-programs', 'Ongoing', true);