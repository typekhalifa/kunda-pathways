-- Fix newsletter subscription issue by updating RLS policy
-- Remove the is_admin function dependency and ensure proper INSERT policy

-- Drop existing policies for newsletter_subscribers
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Only admins can view newsletter subscribers" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Only admins can update newsletter subscribers" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Only admins can delete newsletter subscribers" ON newsletter_subscribers;

-- Create simple and clear policies
CREATE POLICY "Anyone can insert newsletter subscription" 
ON newsletter_subscribers 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can view all newsletter subscribers" 
ON newsletter_subscribers 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

CREATE POLICY "Admins can update newsletter subscribers" 
ON newsletter_subscribers 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

CREATE POLICY "Admins can delete newsletter subscribers" 
ON newsletter_subscribers 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Also check if we need to fix the send-reply-email function
-- Update the from email to use a verified domain