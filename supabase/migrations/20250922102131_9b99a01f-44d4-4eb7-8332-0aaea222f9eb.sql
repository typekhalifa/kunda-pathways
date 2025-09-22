-- Ensure RLS is enabled on newsletter_subscribers
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies and recreate them properly
DROP POLICY IF EXISTS "Enable newsletter subscription for anonymous users" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Allow public newsletter subscription" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admins can view all newsletter subscribers" ON public.newsletter_subscribers;  
DROP POLICY IF EXISTS "Admins can update newsletter subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admins can delete newsletter subscribers" ON public.newsletter_subscribers;

-- Create simple policy for newsletter subscriptions that works with anonymous and authenticated users
CREATE POLICY "Allow newsletter subscription" ON public.newsletter_subscribers
  FOR INSERT 
  WITH CHECK (true);

-- Create admin policies using the is_admin function
CREATE POLICY "Admins can view newsletter subscribers" ON public.newsletter_subscribers 
  FOR SELECT 
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins can update newsletter subscribers" ON public.newsletter_subscribers 
  FOR UPDATE 
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete newsletter subscribers" ON public.newsletter_subscribers 
  FOR DELETE 
  USING (is_admin(auth.uid()));