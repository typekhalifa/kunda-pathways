-- Add is_featured field to blog_posts table
ALTER TABLE public.blog_posts ADD COLUMN is_featured boolean DEFAULT false;

-- Insert the sample blog posts that are currently showing on homepage
INSERT INTO public.blog_posts (
  title, 
  excerpt, 
  content,
  category, 
  slug, 
  is_published, 
  is_featured,
  created_at
) VALUES 
(
  'Visa Application Process for Korean Universities',
  'Step-by-step guide to successfully obtaining your student visa for Korea...',
  'This comprehensive guide will walk you through the entire visa application process for Korean universities. From gathering required documents to attending your embassy interview, we cover everything you need to know to ensure a smooth application process.',
  'education',
  'visa-application-process-korean-universities',
  true,
  true,
  '2024-02-28'
),
(
  'Food Safety Regulations in Asian Markets', 
  'Understanding compliance requirements for F&B businesses expanding into Asia...',
  'Navigate the complex landscape of food safety regulations across Asian markets. This guide covers regulatory compliance, certification requirements, and best practices for F&B businesses looking to expand their operations in Asia.',
  'business',
  'food-safety-regulations-asian-markets', 
  true,
  true,
  '2024-02-20'
),
(
  'Cultural Adaptation Guide for International Students',
  'Essential tips for adapting to Korean culture and academic environment...',
  'Moving to a new country for education can be challenging. This guide provides practical advice for international students on adapting to Korean culture, academic expectations, and social norms to ensure a successful study abroad experience.',
  'education', 
  'cultural-adaptation-guide-international-students',
  true,
  true,
  '2024-02-15'
);