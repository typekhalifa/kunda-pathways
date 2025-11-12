-- Add maintenance mode setting to website_settings
INSERT INTO public.website_settings (setting_key, setting_value, category)
VALUES ('maintenance_mode', '{"enabled": false, "message": "We are currently performing maintenance. Please check back soon!"}', 'general')
ON CONFLICT (setting_key) DO NOTHING;

-- Enable RLS on website_settings if not already enabled
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow authenticated users to read settings" ON public.website_settings;
DROP POLICY IF EXISTS "Allow public to read maintenance mode" ON public.website_settings;

-- Create policy to allow authenticated users to read settings
CREATE POLICY "Allow authenticated users to read settings"
ON public.website_settings
FOR SELECT
TO authenticated
USING (true);

-- Create policy to allow public (anonymous) users to read maintenance mode setting
CREATE POLICY "Allow public to read maintenance mode"
ON public.website_settings
FOR SELECT
TO anon
USING (setting_key = 'maintenance_mode');