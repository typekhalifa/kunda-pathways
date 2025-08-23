-- Fix newsletter_subscribers RLS policy to use security definer function
-- Drop the existing policy
DROP POLICY IF EXISTS "Only admins can view newsletter subscribers" ON newsletter_subscribers;

-- Create new policy using the is_admin() security definer function
CREATE POLICY "Only admins can view newsletter subscribers" 
ON newsletter_subscribers 
FOR SELECT 
USING (is_admin(auth.uid()));