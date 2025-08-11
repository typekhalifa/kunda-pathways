-- Insert default about content data
INSERT INTO about_content (
  section_key,
  title,
  description,
  mission_text,
  advisor_name,
  advisor_title,
  advisor_description,
  advisor_image_url,
  stats,
  is_active
) VALUES (
  'main',
  'About Kunda Pathways',
  'Your trusted partner for global education and F&B consulting services.',
  'We are committed to providing exceptional guidance and support for students seeking international education opportunities and businesses looking to expand in the F&B sector.',
  'Kunda John Kim',
  'Global Education & F&B Consultant',
  'With years of experience in international education and F&B consulting, Kunda John Kim helps clients achieve their dreams of studying abroad and building successful businesses.',
  null,
  '[{"label": "Students Placed", "value": "500+", "color": "blue"}, {"label": "Partner Universities", "value": "50+", "color": "green"}, {"label": "Success Rate", "value": "95%", "color": "purple"}]'::jsonb,
  true
);