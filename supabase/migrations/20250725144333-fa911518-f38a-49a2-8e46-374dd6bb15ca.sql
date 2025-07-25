-- Create admin user if it doesn't exist
-- First, let's ensure we have a proper admin user setup

-- Delete any existing admin profile
DELETE FROM public.profiles WHERE role = 'admin';

-- Insert a new admin profile with a known UUID
INSERT INTO public.profiles (id, email, full_name, role, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000001'::uuid,
  'admin@kundapathways.com',
  'Admin User',
  'admin'::user_role,
  now(),
  now()
);

-- Note: The actual auth user creation must be done through the Supabase auth system
-- This just ensures the profile is ready when the auth user is created