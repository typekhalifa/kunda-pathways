-- Alter scholarships table to support multiple education levels
ALTER TABLE public.scholarships 
ADD COLUMN education_levels text[] DEFAULT ARRAY['undergraduate'::text];

-- Copy data from old education_level column to new education_levels array
UPDATE public.scholarships 
SET education_levels = ARRAY[education_level::text] 
WHERE education_level IS NOT NULL;

-- Drop the old education_level column
ALTER TABLE public.scholarships 
DROP COLUMN IF EXISTS education_level;