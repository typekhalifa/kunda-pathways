-- Debug: Check current table structure and enable RLS
SELECT rls_enabled FROM pg_class WHERE relname = 'newsletter_subscribers';

-- Ensure RLS is enabled
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies and recreate them properly
DROP POLICY IF EXISTS "Enable newsletter subscription for anonymous users" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admins can view all newsletter subscribers" ON public.newsletter_subscribers;  
DROP POLICY IF EXISTS "Admins can update newsletter subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admins can delete newsletter subscribers" ON public.newsletter_subscribers;

-- Create simple, clear policy for anonymous newsletter subscriptions
CREATE POLICY "Allow public newsletter subscription" ON public.newsletter_subscribers
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

-- Create admin policies  
CREATE POLICY "Admins can view all newsletter subscribers" ON public.newsletter_subscribers 
  FOR SELECT 
  TO authenticated
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins can update newsletter subscribers" ON public.newsletter_subscribers 
  FOR UPDATE 
  TO authenticated
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete newsletter subscribers" ON public.newsletter_subscribers 
  FOR DELETE 
  TO authenticated  
  USING (is_admin(auth.uid()));