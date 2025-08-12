-- Fix profiles table RLS policies to prevent unauthorized access
-- Drop existing conflicting policies
DROP POLICY IF EXISTS "Allow profile read" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile only" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Create secure RLS policies for profiles table
-- Policy 1: Users can only view their own profile
CREATE POLICY "users_can_view_own_profile" ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy 2: Admins can view all profiles (using security definer function)
CREATE POLICY "admins_can_view_all_profiles" ON public.profiles
  FOR SELECT
  USING (is_admin(auth.uid()));

-- Policy 3: Users can only update their own profile
CREATE POLICY "users_can_update_own_profile" ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Ensure RLS is enabled on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Log this security fix
INSERT INTO public.security_audit_log (
  action,
  resource,
  success,
  details
) VALUES (
  'security_fix_applied',
  'profiles_table_rls',
  true,
  jsonb_build_object(
    'issue', 'profiles_table_publicly_readable',
    'fix_applied', 'restricted_access_policies',
    'timestamp', now()
  )
);