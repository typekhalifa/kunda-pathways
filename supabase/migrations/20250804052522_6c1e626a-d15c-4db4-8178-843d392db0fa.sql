-- Fix database function security by setting secure search paths
-- This prevents potential security vulnerabilities in database functions

-- Update existing functions to have secure search paths
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE sql
STABLE 
SECURITY DEFINER
SET search_path = public, pg_temp
AS $function$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$function$;

CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $function$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id AND role = 'admin'
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $function$
begin
  new.updated_at = now();
  return new;
end;
$function$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth, pg_temp
AS $function$
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
$function$;

-- Add RLS policies for tables that have RLS enabled but no policies
-- Check if about_advisor table needs policies (based on linter warning)
-- Add basic admin-only access policy for about_advisor table
CREATE POLICY "Only admins can manage about advisor content" 
ON public.about_advisor 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Add policy for public viewing of about_advisor content
CREATE POLICY "Anyone can view about advisor content" 
ON public.about_advisor 
FOR SELECT 
USING (true);

-- Create security audit logging function
CREATE OR REPLACE FUNCTION public.log_security_event(
  event_type text,
  event_details jsonb DEFAULT '{}'::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $function$
BEGIN
  -- Log security events for audit purposes
  INSERT INTO public.security_audit_log (
    user_id,
    event_type,
    event_details,
    ip_address,
    user_agent,
    created_at
  ) VALUES (
    auth.uid(),
    event_type,
    event_details,
    current_setting('request.headers', true)::json->>'x-forwarded-for',
    current_setting('request.headers', true)::json->>'user-agent',
    now()
  );
EXCEPTION WHEN OTHERS THEN
  -- Don't fail the main operation if logging fails
  NULL;
END;
$function$;

-- Create security audit log table
CREATE TABLE IF NOT EXISTS public.security_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type text NOT NULL,
  event_details jsonb DEFAULT '{}'::jsonb,
  ip_address text,
  user_agent text,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on audit log
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Only admins can view security audit logs" 
ON public.security_audit_log 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Create function to check for suspicious activity
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  identifier text,
  max_requests integer DEFAULT 10,
  time_window_minutes integer DEFAULT 5
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $function$
DECLARE
  request_count integer;
BEGIN
  -- Count requests in the time window
  SELECT COUNT(*) INTO request_count
  FROM public.security_audit_log
  WHERE event_details->>'identifier' = identifier
    AND created_at > now() - (time_window_minutes || ' minutes')::interval;
  
  -- Return false if rate limit exceeded
  IF request_count >= max_requests THEN
    RETURN false;
  END IF;
  
  RETURN true;
END;
$function$;

-- Create function to validate input data
CREATE OR REPLACE FUNCTION public.validate_input_security(
  input_text text,
  max_length integer DEFAULT 1000
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $function$
BEGIN
  -- Check for basic XSS patterns
  IF input_text ~* '<script|javascript:|on\w+\s*=|<iframe|<object|<embed' THEN
    RETURN false;
  END IF;
  
  -- Check length
  IF length(input_text) > max_length THEN
    RETURN false;
  END IF;
  
  RETURN true;
END;
$function$;