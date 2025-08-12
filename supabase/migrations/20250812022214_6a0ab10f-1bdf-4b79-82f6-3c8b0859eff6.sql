-- Fix function search path security issue
CREATE OR REPLACE FUNCTION public.log_profile_access()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = 'public', 'pg_temp'
AS $$
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
$$;

-- Add rate limiting function with secure search path
CREATE OR REPLACE FUNCTION public.check_authentication_rate_limit(p_email text)
RETURNS boolean 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = 'public', 'pg_temp'
AS $$
DECLARE
  attempt_count INTEGER;
  window_start TIMESTAMP WITH TIME ZONE;
BEGIN
  window_start := now() - INTERVAL '15 minutes';
  
  SELECT COUNT(*)
  INTO attempt_count
  FROM public.security_audit_log
  WHERE action = 'auth_attempt'
    AND details->>'email' = p_email
    AND created_at >= window_start
    AND success = false;
    
  RETURN attempt_count < 5; -- Allow max 5 failed attempts per 15 minutes
END;
$$;