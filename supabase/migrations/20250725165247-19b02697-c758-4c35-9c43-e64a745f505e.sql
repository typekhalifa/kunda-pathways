-- Clear existing services and insert the real ones from the website
DELETE FROM services;

-- Study in Korea Services
INSERT INTO services (name, description, price, currency, category, duration) VALUES 
('Scholarship Guidance', 'Complete guidance for finding and applying to scholarships including scholarship search, application assistance, and document preparation', 199.00, 'USD', 'study-abroad', '90 minutes'),
('University Admissions', 'End-to-end university admission support including university selection, application review, and interview preparation', 249.00, 'USD', 'study-abroad', '120 minutes'),
('Visa Application Assistance', 'Comprehensive visa application assistance including document preparation, application filing, and interview coaching', 179.00, 'USD', 'study-abroad', '75 minutes'),
('Korean Language Training', 'Professional Korean language preparation including TOPIK preparation, conversation practice, and cultural orientation', 149.00, 'USD', 'study-abroad', '60 minutes');

-- F&B Consulting Services  
INSERT INTO services (name, description, price, currency, category, duration) VALUES
('Business Consultation', 'Strategic business planning and market entry including market research, business planning, and strategy development', 299.00, 'USD', 'fb-consulting', '120 minutes'),
('Market Analysis', 'In-depth market analysis and competitive intelligence including market sizing, competitor analysis, and trend identification', 199.00, 'USD', 'fb-consulting', '90 minutes'),
('Product Development', 'Food product development and innovation including recipe development, product testing, and regulatory compliance', 399.00, 'USD', 'fb-consulting', '150 minutes'),
('Regulatory Compliance', 'Navigate food safety and regulatory requirements including safety standards, certification support, and compliance audits', 249.00, 'USD', 'fb-consulting', '90 minutes');

-- Extra Services (additional services mentioned in bookings)
INSERT INTO services (name, description, price, currency, category, duration) VALUES
('Document Translation', 'Professional translation of academic and business documents', 89.00, 'USD', 'extra-services', '24 hours'),
('Interview Coaching', 'One-on-one coaching for university or business interviews', 129.00, 'USD', 'extra-services', '45 minutes'),
('Portfolio Review', 'Comprehensive review and optimization of academic or business portfolios', 159.00, 'USD', 'extra-services', '60 minutes'),
('Cultural Orientation', 'Introduction to Korean culture and business practices', 99.00, 'USD', 'extra-services', '45 minutes');