-- Create scholarships table
CREATE TABLE public.scholarships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT NOT NULL,
  amount TEXT NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  deadline DATE NOT NULL,
  eligibility_criteria TEXT NOT NULL,
  application_process TEXT,
  provider TEXT NOT NULL,
  country TEXT,
  field_of_study TEXT,
  education_level TEXT NOT NULL DEFAULT 'undergraduate',
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  image_url TEXT,
  external_link TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.scholarships ENABLE ROW LEVEL SECURITY;

-- Create policies for scholarships
CREATE POLICY "Anyone can view active scholarships" 
ON public.scholarships 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Only admins can manage scholarships" 
ON public.scholarships 
FOR ALL 
USING (is_admin(auth.uid()));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_scholarships_updated_at
BEFORE UPDATE ON public.scholarships
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();