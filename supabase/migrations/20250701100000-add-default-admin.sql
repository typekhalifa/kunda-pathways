
-- Insert default admin user profile
-- Note: The actual user account needs to be created through Supabase Auth
-- This just sets up the profile for when the user signs up with this email
INSERT INTO public.profiles (id, email, full_name, role, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000001'::uuid,
  'typekhalifa@gmail.com',
  'Admin User',
  'admin'::user_role,
  now(),
  now()
) ON CONFLICT (id) DO NOTHING;

-- Create the default admin auth user
-- Password: admin123
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000001'::uuid,
  '00000000-0000-0000-0000-000000000000'::uuid,
  'typekhalifa@gmail.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '',
  '',
  '',
  ''
) ON CONFLICT (id) DO NOTHING;

-- Update services with additional categories and new services
INSERT INTO public.services (name, description, price, currency, category, duration) VALUES
('Food Quality Control Consultation', 'Expert guidance on food safety standards, quality assurance protocols, and regulatory compliance', 180.00, 'USD', 'quality-control', '2 hours'),
('Research Topic Guidance', 'Professional assistance in selecting and developing research topics for academic projects', 120.00, 'USD', 'research-guidance', '90 minutes'),
('Thesis Editing & Review', 'Comprehensive editing and review services for thesis and dissertation projects', 250.00, 'USD', 'academic-editing', '3-5 days'),
('Journal Paper Publication Support', 'End-to-end support for academic paper preparation and journal submission', 300.00, 'USD', 'publication-support', '1-2 weeks'),
('Laboratory Setup Consultation', 'Technical guidance for food science laboratory equipment and setup', 220.00, 'USD', 'lab-consulting', '2 hours'),
('Nutritional Analysis Services', 'Professional nutritional analysis and labeling support for food products', 150.00, 'USD', 'nutrition-analysis', '3-5 days')
ON CONFLICT (name) DO NOTHING;
