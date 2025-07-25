-- Reset admin user credentials
DO $$
BEGIN
  -- Update the profile table
  UPDATE public.profiles 
  SET email = 'admin@kundapathways.com', 
      full_name = 'Admin User'
  WHERE role = 'admin';
  
  -- If no admin profile exists, create one
  INSERT INTO public.profiles (id, email, full_name, role)
  SELECT '00000000-0000-0000-0000-000000000001'::uuid, 'admin@kundapathways.com', 'Admin User', 'admin'::user_role
  WHERE NOT EXISTS (SELECT 1 FROM public.profiles WHERE role = 'admin');
END
$$;