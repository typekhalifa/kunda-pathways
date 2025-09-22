-- Fix newsletter subscription RLS policy by ensuring anonymous users can insert
DROP POLICY IF EXISTS "Allow anonymous newsletter subscription" ON public.newsletter_subscribers;

-- Create a more explicit policy for newsletter subscriptions that allows anonymous inserts
CREATE POLICY "Enable newsletter subscription for anonymous users" ON public.newsletter_subscribers
  FOR INSERT 
  WITH CHECK (true);

-- Ensure the policy allows reading for admins to manage subscriptions
DROP POLICY IF EXISTS "Admins can view all newsletter subscribers" ON public.newsletter_subscribers;

CREATE POLICY "Admins can view all newsletter subscribers" ON public.newsletter_subscribers 
  FOR SELECT 
  USING (is_admin(auth.uid()));

-- Ensure admins can update and delete newsletter subscribers
DROP POLICY IF EXISTS "Admins can update newsletter subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admins can delete newsletter subscribers" ON public.newsletter_subscribers;

CREATE POLICY "Admins can update newsletter subscribers" ON public.newsletter_subscribers 
  FOR UPDATE 
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete newsletter subscribers" ON public.newsletter_subscribers 
  FOR DELETE 
  USING (is_admin(auth.uid()));