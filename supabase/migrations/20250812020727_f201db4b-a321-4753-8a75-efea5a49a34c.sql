-- Fix profiles table RLS policy to restrict public access
DROP POLICY IF EXISTS "All authenticated users can view profiles" ON public.profiles;

-- Create more secure policies for profiles table
CREATE POLICY "Users can view their own profile only" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (is_admin(auth.uid()));

-- Enhanced security audit logging for profile access
CREATE OR REPLACE FUNCTION public.log_profile_access()
RETURNS TRIGGER AS $$
BEGIN
  -- Log profile access attempts
  PERFORM log_security_event(
    'profile_access',
    'profiles',
    true,
    jsonb_build_object(
      'accessed_profile_id', CASE WHEN TG_OP = 'SELECT' THEN OLD.id ELSE NEW.id END,
      'operation', TG_OP
    )
  );
  
  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;