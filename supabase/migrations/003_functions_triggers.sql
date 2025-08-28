-- Functions and Triggers for automated tasks

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_users_updated_at 
  BEFORE UPDATE ON public.users 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_templates_updated_at 
  BEFORE UPDATE ON public.templates 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_collections_updated_at 
  BEFORE UPDATE ON public.collections 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_template_reviews_updated_at 
  BEFORE UPDATE ON public.template_reviews 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    'guest'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for automatic user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update template rating when review is added/updated/deleted
CREATE OR REPLACE FUNCTION update_template_rating()
RETURNS TRIGGER AS $$
DECLARE
  template_uuid UUID;
  avg_rating DECIMAL(3,2);
  review_count INTEGER;
BEGIN
  -- Get template_id from the operation
  IF TG_OP = 'DELETE' THEN
    template_uuid := OLD.template_id;
  ELSE
    template_uuid := NEW.template_id;
  END IF;

  -- Calculate new average rating and count
  SELECT 
    COALESCE(AVG(rating), 0)::DECIMAL(3,2),
    COUNT(*)
  INTO avg_rating, review_count
  FROM public.template_reviews
  WHERE template_id = template_uuid;

  -- Update the template
  UPDATE public.templates
  SET 
    rating = avg_rating,
    rating_count = review_count,
    updated_at = NOW()
  WHERE id = template_uuid;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Triggers for template rating updates
CREATE TRIGGER update_template_rating_on_insert
  AFTER INSERT ON public.template_reviews
  FOR EACH ROW EXECUTE FUNCTION update_template_rating();

CREATE TRIGGER update_template_rating_on_update
  AFTER UPDATE ON public.template_reviews
  FOR EACH ROW EXECUTE FUNCTION update_template_rating();

CREATE TRIGGER update_template_rating_on_delete
  AFTER DELETE ON public.template_reviews
  FOR EACH ROW EXECUTE FUNCTION update_template_rating();

-- Function to increment download count
CREATE OR REPLACE FUNCTION increment_download_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.templates
  SET 
    downloads_count = downloads_count + 1,
    updated_at = NOW()
  WHERE id = NEW.template_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for download count increment
CREATE TRIGGER increment_download_count_trigger
  AFTER INSERT ON public.user_downloads
  FOR EACH ROW EXECUTE FUNCTION increment_download_count();

-- Function to ensure only one primary image per template
CREATE OR REPLACE FUNCTION ensure_single_primary_image()
RETURNS TRIGGER AS $$
BEGIN
  -- If this image is being set as primary, remove primary from others
  IF NEW.is_primary = true THEN
    UPDATE public.template_images
    SET is_primary = false
    WHERE template_id = NEW.template_id AND id != NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for primary image management
CREATE TRIGGER ensure_single_primary_image_trigger
  BEFORE INSERT OR UPDATE ON public.template_images
  FOR EACH ROW EXECUTE FUNCTION ensure_single_primary_image();

-- Function to get user role (useful for client-side role checks)
CREATE OR REPLACE FUNCTION get_user_role(user_uuid UUID DEFAULT auth.uid())
RETURNS user_role AS $$
DECLARE
  user_role_result user_role;
BEGIN
  SELECT role INTO user_role_result
  FROM public.users
  WHERE id = user_uuid;
  
  RETURN COALESCE(user_role_result, 'guest'::user_role);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user can access premium templates
CREATE OR REPLACE FUNCTION can_access_premium(user_uuid UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
DECLARE
  user_tier TEXT;
  user_end_date TIMESTAMP WITH TIME ZONE;
BEGIN
  SELECT subscription_tier, subscription_end_date
  INTO user_tier, user_end_date
  FROM public.users
  WHERE id = user_uuid;
  
  -- Admin always has access
  IF get_user_role(user_uuid) = 'admin' THEN
    RETURN true;
  END IF;
  
  -- Check if user has active premium subscription
  RETURN (
    user_tier IN ('premium', 'pro') AND 
    (user_end_date IS NULL OR user_end_date > NOW())
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;