-- Sample data for testing (run this after setting up authentication)

-- Insert sample templates
INSERT INTO public.templates (
  id,
  title,
  description,
  preview_image_url,
  demo_url,
  download_url,
  price,
  category,
  tags,
  status,
  featured
) VALUES 
(
  uuid_generate_v4(),
  'Modern E-commerce Store',
  'A sleek and responsive e-commerce template with shopping cart, product listings, and checkout flow.',
  '/images/templates/ecommerce-modern.jpg',
  'https://demo.example.com/ecommerce-modern',
  '/downloads/ecommerce-modern.zip',
  29.99,
  'ecommerce',
  ARRAY['responsive', 'modern', 'shopping', 'cart'],
  'published',
  true
),
(
  uuid_generate_v4(),
  'Business Portfolio Pro',
  'Professional business portfolio template with contact forms, service pages, and team showcase.',
  '/images/templates/business-portfolio.jpg',
  'https://demo.example.com/business-portfolio',
  '/downloads/business-portfolio.zip',
  19.99,
  'business',
  ARRAY['professional', 'portfolio', 'corporate'],
  'published',
  true
),
(
  uuid_generate_v4(),
  'Creative Agency Landing',
  'Eye-catching landing page template perfect for creative agencies and freelancers.',
  '/images/templates/creative-agency.jpg',
  'https://demo.example.com/creative-agency',
  '/downloads/creative-agency.zip',
  24.99,
  'landing',
  ARRAY['creative', 'agency', 'animation', 'modern'],
  'published',
  false
),
(
  uuid_generate_v4(),
  'Tech Blog Template',
  'Clean and minimalist blog template with code syntax highlighting and responsive design.',
  '/images/templates/tech-blog.jpg',
  'https://demo.example.com/tech-blog',
  '/downloads/tech-blog.zip',
  0.00,
  'blog',
  ARRAY['blog', 'minimal', 'tech', 'free'],
  'published',
  false
),
(
  uuid_generate_v4(),
  'Personal Portfolio',
  'Showcase your work with this elegant personal portfolio template.',
  '/images/templates/personal-portfolio.jpg',
  'https://demo.example.com/personal-portfolio',
  '/downloads/personal-portfolio.zip',
  0.00,
  'portfolio',
  ARRAY['personal', 'portfolio', 'showcase', 'free'],
  'published',
  true
),
(
  uuid_generate_v4(),
  'Dashboard Analytics',
  'Comprehensive dashboard template with charts, tables, and data visualization.',
  '/images/templates/dashboard-analytics.jpg',
  'https://demo.example.com/dashboard-analytics',
  '/downloads/dashboard-analytics.zip',
  39.99,
  'dashboard',
  ARRAY['dashboard', 'analytics', 'charts', 'admin'],
  'published',
  false
),
(
  uuid_generate_v4(),
  'Education Platform',
  'Learning management system template with course listings and student dashboard.',
  '/images/templates/education-platform.jpg',
  'https://demo.example.com/education-platform',
  '/downloads/education-platform.zip',
  49.99,
  'education',
  ARRAY['education', 'learning', 'courses', 'lms'],
  'published',
  false
),
(
  uuid_generate_v4(),
  'Health & Wellness',
  'Health and wellness website template with appointment booking and service pages.',
  '/images/templates/health-wellness.jpg',
  'https://demo.example.com/health-wellness',
  '/downloads/health-wellness.zip',
  34.99,
  'health',
  ARRAY['health', 'wellness', 'medical', 'booking'],
  'published',
  false
);

-- Insert template images (you'll need to run this after templates are inserted)
DO $$
DECLARE
  template_record RECORD;
BEGIN
  FOR template_record IN SELECT id, title FROM public.templates LOOP
    INSERT INTO public.template_images (template_id, image_url, alt_text, is_primary, sort_order)
    VALUES 
    (template_record.id, '/images/templates/' || LOWER(REPLACE(template_record.title, ' ', '-')) || '-1.jpg', template_record.title || ' Preview 1', true, 1),
    (template_record.id, '/images/templates/' || LOWER(REPLACE(template_record.title, ' ', '-')) || '-2.jpg', template_record.title || ' Preview 2', false, 2),
    (template_record.id, '/images/templates/' || LOWER(REPLACE(template_record.title, ' ', '-')) || '-3.jpg', template_record.title || ' Preview 3', false, 3);
  END LOOP;
END $$;