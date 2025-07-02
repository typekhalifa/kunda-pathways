-- First, ensure the admin user exists in auth.users with correct password
-- This will create the user if it doesn't exist
DO $$
BEGIN
  -- Delete existing user if exists to recreate with correct password
  DELETE FROM auth.users WHERE email = 'typekhalifa@gmail.com';
  
  -- Insert the admin user with correct password hash
  INSERT INTO auth.users (
    id,
    instance_id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    invited_at,
    confirmation_token,
    confirmation_sent_at,
    recovery_token,
    recovery_sent_at,
    email_change_token_new,
    email_change,
    email_change_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    created_at,
    updated_at,
    phone,
    phone_confirmed_at,
    phone_change,
    phone_change_token,
    phone_change_sent_at,
    email_change_token_current,
    email_change_confirm_status,
    banned_until,
    reauthentication_token,
    reauthentication_sent_at,
    is_sso_user,
    deleted_at
  ) VALUES (
    '00000000-0000-0000-0000-000000000001'::uuid,
    '00000000-0000-0000-0000-000000000000'::uuid,
    'authenticated',
    'authenticated',
    'typekhalifa@gmail.com',
    crypt('admin123', gen_salt('bf')),
    now(),
    now(),
    '',
    now(),
    '',
    null,
    '',
    '',
    null,
    null,
    '{"provider": "email", "providers": ["email"]}',
    '{"full_name": "Admin User"}',
    false,
    now(),
    now(),
    null,
    null,
    '',
    '',
    null,
    '',
    0,
    null,
    '',
    null,
    false,
    null
  ) ON CONFLICT (id) DO UPDATE SET
    encrypted_password = crypt('admin123', gen_salt('bf')),
    email_confirmed_at = now(),
    updated_at = now();

  -- Ensure the profile exists
  INSERT INTO public.profiles (id, email, full_name, role, created_at, updated_at)
  VALUES (
    '00000000-0000-0000-0000-000000000001'::uuid,
    'typekhalifa@gmail.com',
    'Admin User',
    'admin'::user_role,
    now(),
    now()
  ) ON CONFLICT (id) DO UPDATE SET
    email = 'typekhalifa@gmail.com',
    full_name = 'Admin User',
    role = 'admin'::user_role,
    updated_at = now();

END $$;