-- Fix the missing user_role type and clean up existing data
-- First, create the missing user_role enum type
CREATE TYPE user_role AS ENUM ('user', 'admin');

-- Clean up any existing admin profiles that might be causing issues
DELETE FROM public.profiles WHERE email = 'admin@kundapathways.com' OR email = 'typekhalifa@gmail.com';

-- Insert a clean admin profile for the existing user
INSERT INTO public.profiles (id, email, full_name, role, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000001'::uuid,
  'typekhalifa@gmail.com',
  'Admin User',
  'admin'::user_role,
  now(),
  now()
);