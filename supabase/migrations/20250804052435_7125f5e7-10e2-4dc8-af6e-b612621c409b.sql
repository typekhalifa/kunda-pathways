-- Fix security issues identified by linter

-- 1. Create security audit log table
CREATE TABLE IF NOT EXISTS public.security_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  resource TEXT,
  ip_address INET,
  user_agent TEXT,
  success BOOLEAN NOT NULL DEFAULT true,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on security_audit_log
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Only admins can view audit logs" 
ON public.security_audit_log 
FOR SELECT 
USING (is_admin(auth.uid()));

-- System can insert audit logs
CREATE POLICY "System can insert audit logs" 
ON public.security_audit_log 
FOR INSERT 
WITH CHECK (true);

-- 2. Add missing RLS policy for about_advisor table
CREATE POLICY "Anyone can view about advisor info" 
ON public.about_advisor 
FOR SELECT 
USING (true);

-- Only admins can manage about advisor info
CREATE POLICY "Only admins can manage about advisor info" 
ON public.about_advisor 
FOR ALL 
USING (is_admin(auth.uid()));

-- 3. Create security functions with proper search path
CREATE OR REPLACE FUNCTION public.log_security_event(
  p_action TEXT,
  p_resource TEXT DEFAULT NULL,
  p_success BOOLEAN DEFAULT true,
  p_details JSONB DEFAULT '{}'
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  INSERT INTO public.security_audit_log (
    user_id, action, resource, success, details
  ) VALUES (
    auth.uid(), p_action, p_resource, p_success, p_details
  );
END;
$$;

-- 4. Create rate limiting function with proper search path
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  p_identifier TEXT,
  p_max_attempts INTEGER DEFAULT 5,
  p_window_minutes INTEGER DEFAULT 60
) RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  attempt_count INTEGER;
  window_start TIMESTAMP WITH TIME ZONE;
BEGIN
  window_start := now() - (p_window_minutes || ' minutes')::INTERVAL;
  
  SELECT COUNT(*)
  INTO attempt_count
  FROM public.security_audit_log
  WHERE details->>'identifier' = p_identifier
    AND created_at >= window_start
    AND success = false;
    
  RETURN attempt_count < p_max_attempts;
END;
$$;

-- 5. Create input validation function with proper search path
CREATE OR REPLACE FUNCTION public.validate_input(
  p_input TEXT,
  p_type TEXT DEFAULT 'general'
) RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  -- Remove potentially dangerous patterns
  IF p_input ~ '<script|javascript:|on\w+\s*=' THEN
    RETURN false;
  END IF;
  
  -- Validate email format
  IF p_type = 'email' AND p_input !~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$' THEN
    RETURN false;
  END IF;
  
  -- Validate phone format
  IF p_type = 'phone' AND p_input !~ '^\+?[\d\s\-\(\)]{7,15}$' THEN
    RETURN false;
  END IF;
  
  RETURN true;
END;
$$;

-- 6. Update existing functions to have proper search path
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id AND role = 'admin'
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
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