-- Clear existing services and add the real ones from the website
DELETE FROM services;

-- Study Abroad Services
INSERT INTO services (name, description, price, currency, category, duration, is_active) VALUES
('Scholarship Guidance', 'Complete guidance for finding and applying to scholarships', 100, 'USD', 'study-abroad', '1-2 weeks', true),
('University Admissions', 'End-to-end university application support', 70, 'USD', 'study-abroad', '2-3 weeks', true),
('Visa Application Help', 'Expert assistance with student visa applications', 100, 'USD', 'study-abroad', '1 week', true),
('Korean Language Training', 'Personalized Korean language lessons', 80, 'USD', 'study-abroad', 'Ongoing', true),
('Visits Help & Relocations', 'Support for academic visits and relocations', 100, 'USD', 'study-abroad', '1-2 weeks', true),

-- F&B Consulting Services
('Market Entry Strategy', 'Comprehensive market analysis and entry strategy', 2500, 'USD', 'fb-consulting', '2-3 weeks', true),
('Regulatory Compliance', 'Navigate food safety regulations', 1800, 'USD', 'fb-consulting', '1-2 weeks', true),
('Product Development', 'Develop products for Asian markets', 3200, 'USD', 'fb-consulting', '4-6 weeks', true),
('Supply Chain Optimization', 'Optimize supply chain efficiency', 2200, 'USD', 'fb-consulting', '2-4 weeks', true),
('Brand Localization', 'Adapt brand for local markets', 1500, 'USD', 'fb-consulting', '1-3 weeks', true),
('Partnership & Distribution', 'Connect with local partners', 2800, 'USD', 'fb-consulting', '3-5 weeks', true),

-- Additional Services
('Hotel Booking Assistance', 'Help with accommodation bookings', 60, 'USD', 'additional', '1-3 days', true),
('Phone Consultation', 'Direct consultation via phone call', 20, 'USD', 'additional', '1 hour', true),
('Airport Pickup Service', 'Arrange airport pickup in Korea', 50, 'USD', 'additional', '1 day', true),
('Cultural Orientation', 'Prepare for cultural adaptation', 120, 'USD', 'additional', '1 week', true);