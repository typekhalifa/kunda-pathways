-- Create storage bucket for uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('uploads', 'uploads', true);

-- Create RLS policies for storage
CREATE POLICY "Anyone can view uploads" ON storage.objects FOR SELECT USING (bucket_id = 'uploads');

CREATE POLICY "Only admins can upload files" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'uploads' AND 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'::user_role
  )
);

CREATE POLICY "Only admins can update files" ON storage.objects FOR UPDATE USING (
  bucket_id = 'uploads' AND 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'::user_role
  )
);

CREATE POLICY "Only admins can delete files" ON storage.objects FOR DELETE USING (
  bucket_id = 'uploads' AND 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'::user_role
  )
);

-- Add reading_time column to blog_posts to properly calculate reading time
ALTER TABLE blog_posts ADD COLUMN reading_time INTEGER DEFAULT 1;