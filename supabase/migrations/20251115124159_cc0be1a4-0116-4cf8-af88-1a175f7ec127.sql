-- Enable RLS on newsletter_subscribers if not already enabled
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Allow anonymous insert newsletter_subscribers" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow anonymous select newsletter_subscribers" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow newsletter subscribers to update their own data" ON newsletter_subscribers;

-- Allow anyone to subscribe (insert)
CREATE POLICY "Allow anonymous insert newsletter_subscribers" 
ON newsletter_subscribers 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Allow anyone to check if email exists (select for checking duplicates)
CREATE POLICY "Allow anonymous select newsletter_subscribers" 
ON newsletter_subscribers 
FOR SELECT 
TO anon, authenticated
USING (true);

-- Allow subscribers to update their own subscription using their email
CREATE POLICY "Allow newsletter subscribers to update their own data" 
ON newsletter_subscribers 
FOR UPDATE 
TO anon, authenticated
USING (true)
WITH CHECK (true);