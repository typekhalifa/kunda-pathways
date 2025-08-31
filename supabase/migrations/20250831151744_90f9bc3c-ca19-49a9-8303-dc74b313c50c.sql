-- Create website_settings table if not exists and add default contact/social settings
CREATE TABLE IF NOT EXISTS public.website_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admins can view website settings" ON public.website_settings
  FOR SELECT USING (is_admin());

CREATE POLICY "Admins can update website settings" ON public.website_settings
  FOR UPDATE USING (is_admin());

CREATE POLICY "Admins can insert website settings" ON public.website_settings
  FOR INSERT WITH CHECK (is_admin());

-- Insert default contact settings if they don't exist
INSERT INTO public.website_settings (setting_key, setting_value) VALUES
  ('contact', '{"email": "info@kundapathways.com", "phone": "+82-10-1234-5678", "whatsapp": "+82-10-1234-5678", "location": "Seoul, South Korea", "business_hours": {"weekday": "9:00 AM - 6:00 PM KST", "saturday": "10:00 AM - 4:00 PM KST", "sunday": "Closed"}}'),
  ('social', '{"facebook": "", "twitter": "", "linkedin": "", "instagram": ""}')
ON CONFLICT (setting_key) DO NOTHING;

-- Create trigger for updated_at
CREATE TRIGGER update_website_settings_updated_at
  BEFORE UPDATE ON public.website_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();