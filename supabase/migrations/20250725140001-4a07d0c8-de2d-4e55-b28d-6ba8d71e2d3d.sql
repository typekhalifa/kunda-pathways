-- Create website_settings table for admin settings management
CREATE TABLE public.website_settings (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    setting_key TEXT NOT NULL UNIQUE,
    setting_value JSONB NOT NULL DEFAULT '{}',
    category TEXT NOT NULL DEFAULT 'general',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;

-- Only admins can manage website settings
CREATE POLICY "Only admins can manage website settings" 
ON public.website_settings 
FOR ALL 
USING (is_admin(auth.uid()));

-- Insert default website settings
INSERT INTO public.website_settings (setting_key, setting_value, category) VALUES
('site_info', '{
    "title": "Africa-Korea Connect",
    "description": "Educational consulting and cultural bridge between Africa and Korea",
    "contact_email": "info@africa-korea-connect.com"
}', 'general'),
('branding', '{
    "logo_url": "",
    "favicon_url": "",
    "primary_color": "#3b82f6"
}', 'design'),
('seo', '{
    "meta_title": "Africa-Korea Connect - Educational Consulting",
    "meta_description": "Professional educational consulting services connecting African students with Korean universities and opportunities.",
    "meta_keywords": "korea, education, consulting, study abroad"
}', 'seo'),
('analytics', '{
    "google_analytics_id": "",
    "google_tag_manager_id": "",
    "facebook_pixel_id": "",
    "custom_css": ""
}', 'technical');

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_website_settings_updated_at
BEFORE UPDATE ON public.website_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();