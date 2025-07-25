-- Fix RLS policies for admin access to all booking tables

-- Update study_abroad_bookings policies
DROP POLICY IF EXISTS "Allow insert for all" ON public.study_abroad_bookings;
DROP POLICY IF EXISTS "Only admins can view study abroad bookings" ON public.study_abroad_bookings;
DROP POLICY IF EXISTS "Only admins can update study abroad bookings" ON public.study_abroad_bookings;
DROP POLICY IF EXISTS "Only admins can delete study abroad bookings" ON public.study_abroad_bookings;

CREATE POLICY "Allow insert for all" ON public.study_abroad_bookings
FOR INSERT WITH CHECK (true);

CREATE POLICY "Only admins can view study abroad bookings" ON public.study_abroad_bookings
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'::user_role
  )
);

CREATE POLICY "Only admins can update study abroad bookings" ON public.study_abroad_bookings
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'::user_role
  )
);

CREATE POLICY "Only admins can delete study abroad bookings" ON public.study_abroad_bookings
FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'::user_role
  )
);

-- Update fb_consultation_bookings policies
DROP POLICY IF EXISTS "Allow insert for anyone" ON public.fb_consultation_bookings;
DROP POLICY IF EXISTS "Only admins can view fb consultations" ON public.fb_consultation_bookings;
DROP POLICY IF EXISTS "Only admins can update fb consultations" ON public.fb_consultation_bookings;
DROP POLICY IF EXISTS "Only admins can delete fb consultations" ON public.fb_consultation_bookings;

CREATE POLICY "Allow insert for anyone" ON public.fb_consultation_bookings
FOR INSERT WITH CHECK (true);

CREATE POLICY "Only admins can view fb consultations" ON public.fb_consultation_bookings
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'::user_role
  )
);

CREATE POLICY "Only admins can update fb consultations" ON public.fb_consultation_bookings
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'::user_role
  )
);

CREATE POLICY "Only admins can delete fb consultations" ON public.fb_consultation_bookings
FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'::user_role
  )
);

-- Update extra_service_bookings policies
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.extra_service_bookings;
DROP POLICY IF EXISTS "Only admins can view extra services" ON public.extra_service_bookings;
DROP POLICY IF EXISTS "Only admins can update extra services" ON public.extra_service_bookings;
DROP POLICY IF EXISTS "Only admins can delete extra services" ON public.extra_service_bookings;

CREATE POLICY "Allow anonymous inserts" ON public.extra_service_bookings
FOR INSERT WITH CHECK (true);

CREATE POLICY "Only admins can view extra services" ON public.extra_service_bookings
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'::user_role
  )
);

CREATE POLICY "Only admins can update extra services" ON public.extra_service_bookings
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'::user_role
  )
);

CREATE POLICY "Only admins can delete extra services" ON public.extra_service_bookings
FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'::user_role
  )
);