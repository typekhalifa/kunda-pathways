-- Create partners table
CREATE TABLE public.partners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  alt_text TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create about_content table for managing About section
CREATE TABLE public.about_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key TEXT NOT NULL UNIQUE,
  title TEXT,
  description TEXT,
  mission_text TEXT,
  advisor_name TEXT,
  advisor_title TEXT,
  advisor_description TEXT,
  advisor_image_url TEXT,
  stats JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create testimonials table 
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  country TEXT,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  avatar_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Create policies for partners
CREATE POLICY "Anyone can view active partners" 
ON public.partners 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Only admins can manage partners" 
ON public.partners 
FOR ALL 
USING (is_admin(auth.uid()));

-- Create policies for about_content
CREATE POLICY "Anyone can view active about content" 
ON public.about_content 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Only admins can manage about content" 
ON public.about_content 
FOR ALL 
USING (is_admin(auth.uid()));

-- Create policies for testimonials
CREATE POLICY "Anyone can view active testimonials" 
ON public.testimonials 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Only admins can manage testimonials" 
ON public.testimonials 
FOR ALL 
USING (is_admin(auth.uid()));

-- Create triggers for updated_at
CREATE TRIGGER update_partners_updated_at
BEFORE UPDATE ON public.partners
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_about_content_updated_at
BEFORE UPDATE ON public.about_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
BEFORE UPDATE ON public.testimonials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default data
INSERT INTO public.partners (name, logo_url, alt_text, display_order) VALUES
('Seoul National University', '', 'SNU Logo', 1),
('KAIST', '', 'KAIST Logo', 2),
('Yonsei University', '', 'Yonsei Logo', 3),
('Korea University', '', 'Korea University Logo', 4),
('POSTECH', '', 'POSTECH Logo', 5),
('Hanyang University', '', 'Hanyang Logo', 6),
('Korean Government', '', 'Korean Government Logo', 7),
('KOTRA', '', 'KOTRA Logo', 8);

INSERT INTO public.about_content (section_key, title, description, mission_text, advisor_name, advisor_title, advisor_description, advisor_image_url, stats) VALUES
('main', 'About Kunda Pathways', 'Empowering dreams through education and business excellence. We bridge cultures and create opportunities for global success.', 'To provide comprehensive, personalized guidance that transforms educational aspirations and business ventures into successful realities. We believe in the power of quality education and strategic business planning to change lives.', 'Kunda John', 'International Education & F&B Expert', 'With over 5 years of experience in international education consulting and MSc in Food Science, our team has helped over 500 students achieve their academic dreams and numerous businesses expand globally.', '/lovable-uploads/khali.jpg', '[
  {"label": "Successful Students", "value": "53+", "color": "blue"},
  {"label": "Businesses Helped", "value": "42+", "color": "green"},
  {"label": "Scholarship Success Rate", "value": "87%", "color": "purple"},
  {"label": "Years Experience", "value": "5+", "color": "orange"}
]'::jsonb);

INSERT INTO public.testimonials (name, role, content, country, rating, display_order) VALUES
('Marie Uwimana', 'University Student in Seoul', 'Thanks to Kunda Pathways, I am now studying at a top Korean university with a full scholarship. The guidance was incredible!', 'Rwanda', 5, 1),
('Type Khalifa', 'F&B Entrepreneur', 'The food industry consulting helped me launch my beverage company in the Korean market. Invaluable expertise!', 'Uganda', 5, 2),
('Sarah Nkunda', 'Graduate Student', 'From visa application to finding accommodation, every step was handled professionally. Highly recommended!', 'Rwanda', 5, 3);