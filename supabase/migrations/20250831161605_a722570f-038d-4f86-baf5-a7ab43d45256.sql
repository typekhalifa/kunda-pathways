-- Allow public read access to website_settings
DROP POLICY IF EXISTS "Only admins can manage website settings" ON website_settings;

-- Create new policies for website_settings
CREATE POLICY "Anyone can view website settings" 
ON website_settings 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can manage website settings" 
ON website_settings 
FOR ALL 
USING (is_admin(auth.uid()));