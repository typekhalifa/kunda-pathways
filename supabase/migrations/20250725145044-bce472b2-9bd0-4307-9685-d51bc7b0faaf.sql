-- Clean up any existing problematic admin profiles and set up for existing user
DELETE FROM public.profiles WHERE email IN ('admin@kundapathways.com', 'typekhalifa@gmail.com');

-- Set up clean admin profile for the existing auth user
-- We'll use a predictable UUID that can be manually matched if needed
INSERT INTO public.profiles (id, email, full_name, role, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000001'::uuid,
  'typekhalifa@gmail.com',
  'Admin User',
  'admin'::user_role,
  now(),
  now()
);