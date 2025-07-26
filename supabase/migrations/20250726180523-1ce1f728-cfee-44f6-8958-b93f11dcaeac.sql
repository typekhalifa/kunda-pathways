-- Create packages table for managing special package deals
CREATE TABLE public.packages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- 'study-abroad' or 'fb-consulting'
  original_price NUMERIC NOT NULL,
  discounted_price NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  services TEXT[] NOT NULL DEFAULT '{}',
  is_popular BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;

-- Create policies for packages
CREATE POLICY "Anyone can view active packages" 
ON public.packages 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Only admins can manage packages" 
ON public.packages 
FOR ALL 
USING (is_admin(auth.uid()));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_packages_updated_at
BEFORE UPDATE ON public.packages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default packages
INSERT INTO public.packages (name, description, category, original_price, discounted_price, services, is_popular) VALUES
(
  'Study Abroad Complete Package',
  'Complete package for studying in Korea with all essential services',
  'study-abroad',
  500,
  320,
  ARRAY['Scholarship Guidance', 'University Admissions', 'Visa Application', 'Korean Language (1 month)', 'Cultural Orientation'],
  true
),
(
  'F&B Market Entry Complete',
  'Complete F&B market entry package for Korean market',
  'fb-consulting', 
  16000,
  12000,
  ARRAY['Market Entry Strategy', 'Regulatory Compliance', 'Product Development', 'Supply Chain', 'Brand Localization', 'Partnership Support'],
  false
);