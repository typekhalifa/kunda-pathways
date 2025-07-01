
-- Create services table for managing consultation services
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  category TEXT NOT NULL DEFAULT 'study-abroad',
  duration TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on services table
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for services (admin-only access)
CREATE POLICY "Only admins can manage services" ON public.services
  FOR ALL USING (public.is_admin(auth.uid()));

-- Add some sample services
INSERT INTO public.services (name, description, price, currency, category, duration) VALUES
('Study Abroad Consultation', 'Complete guidance for studying abroad including university selection and application process', 150.00, 'USD', 'study-abroad', '90 minutes'),
('Visa Application Support', 'Expert assistance with visa applications and documentation', 100.00, 'USD', 'visa-assistance', '60 minutes'),
('F&B Business Consultation', 'Comprehensive consultation for food and beverage business setup', 200.00, 'USD', 'fb-consulting', '120 minutes');
