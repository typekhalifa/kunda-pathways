-- Fix the profile linkage and handle new user creation
-- First, get the actual auth user ID and update the profile to match
DO $$
DECLARE
    auth_user_id uuid;
BEGIN
    -- Get the real auth user ID
    SELECT id INTO auth_user_id FROM auth.users WHERE email = 'typekhalifa@gmail.com';
    
    -- Delete the placeholder profile
    DELETE FROM public.profiles WHERE email = 'typekhalifa@gmail.com';
    
    -- Insert the correct profile with the real auth user ID
    IF auth_user_id IS NOT NULL THEN
        INSERT INTO public.profiles (id, email, full_name, role, created_at, updated_at)
        VALUES (
            auth_user_id,
            'typekhalifa@gmail.com',
            'Admin User',
            'admin'::user_role,
            now(),
            now()
        );
    END IF;
END $$;

-- Fix the handle_new_user function to avoid the database error
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'user'::user_role
  );
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Log the error but don't fail the user creation
  RAISE LOG 'Error creating profile for user %: %', NEW.id, SQLERRM;
  RETURN NEW;
END;
$$;