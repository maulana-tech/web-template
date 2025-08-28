-- Row Level Security Policies

-- Users table policies
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Public profiles are viewable by authenticated users" ON public.users
  FOR SELECT USING (
    auth.role() = 'authenticated' AND 
    (role = 'member' OR role = 'admin')
  );

-- Templates table policies
CREATE POLICY "Published templates are viewable by everyone" ON public.templates
  FOR SELECT USING (status = 'published');

CREATE POLICY "Admin can view all templates" ON public.templates
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can create templates" ON public.templates
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role IN ('member', 'admin')
    )
  );

CREATE POLICY "Template creators can update their templates" ON public.templates
  FOR UPDATE USING (
    created_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admin can delete templates" ON public.templates
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Template images policies
CREATE POLICY "Template images are viewable with templates" ON public.template_images
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.templates 
      WHERE id = template_id AND status = 'published'
    ) OR
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Template creators can manage template images" ON public.template_images
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.templates 
      WHERE id = template_id AND created_by = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Collections policies
CREATE POLICY "Users can view their own collections" ON public.collections
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Public collections are viewable by authenticated users" ON public.collections
  FOR SELECT USING (is_public = true AND auth.role() = 'authenticated');

CREATE POLICY "Users can manage their own collections" ON public.collections
  FOR ALL USING (user_id = auth.uid());

-- Collection templates policies
CREATE POLICY "Collection templates follow collection policies" ON public.collection_templates
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.collections 
      WHERE id = collection_id AND (
        user_id = auth.uid() OR 
        (is_public = true AND auth.role() = 'authenticated')
      )
    )
  );

CREATE POLICY "Users can manage their collection templates" ON public.collection_templates
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.collections 
      WHERE id = collection_id AND user_id = auth.uid()
    )
  );

-- User downloads policies
CREATE POLICY "Users can view their own downloads" ON public.user_downloads
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can add to their downloads" ON public.user_downloads
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admin can view all downloads" ON public.user_downloads
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- User favorites policies
CREATE POLICY "Users can view their own favorites" ON public.user_favorites
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can manage their own favorites" ON public.user_favorites
  FOR ALL USING (user_id = auth.uid());

-- Template reviews policies
CREATE POLICY "Reviews are viewable by everyone" ON public.template_reviews
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create reviews" ON public.template_reviews
  FOR INSERT WITH CHECK (
    user_id = auth.uid() AND 
    auth.role() = 'authenticated'
  );

CREATE POLICY "Users can update their own reviews" ON public.template_reviews
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own reviews" ON public.template_reviews
  FOR DELETE USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Purchases policies
CREATE POLICY "Users can view their own purchases" ON public.purchases
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create their own purchases" ON public.purchases
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admin can view all purchases" ON public.purchases
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );