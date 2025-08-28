-- Remove Better Auth Tables and Consolidate to Supabase Auth
-- This migration removes the duplicate Better Auth tables and keeps only Supabase Auth

-- Drop Better Auth tables in correct order (respecting foreign keys)
DROP TABLE IF EXISTS public."verification" CASCADE;
DROP TABLE IF EXISTS public."account" CASCADE;
DROP TABLE IF EXISTS public."session" CASCADE;

-- Drop the sync function and trigger
DROP TRIGGER IF EXISTS sync_better_auth_user_trigger ON public."user";
DROP FUNCTION IF EXISTS public.sync_better_auth_user() CASCADE;

-- Drop the Better Auth user table
DROP TABLE IF EXISTS public."user" CASCADE;

-- Ensure the original users table is properly configured for Supabase Auth
-- (This table should already exist and be properly linked to auth.users)

-- Add any missing indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_users_subscription_tier ON public.users(subscription_tier);

-- Update any missing default values
ALTER TABLE public.users 
  ALTER COLUMN created_at SET DEFAULT NOW(),
  ALTER COLUMN updated_at SET DEFAULT NOW();

-- Ensure proper RLS policies are in place (they should already exist)
-- Users can view their own profile
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'users' 
    AND policyname = 'Users can view their own profile'
  ) THEN
    CREATE POLICY "Users can view their own profile" ON public.users
      FOR SELECT USING (auth.uid() = id);
  END IF;
END
$$;

-- Users can update their own profile
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'users' 
    AND policyname = 'Users can update their own profile'
  ) THEN
    CREATE POLICY "Users can update their own profile" ON public.users
      FOR UPDATE USING (auth.uid() = id);
  END IF;
END
$$;

-- Insert trigger for new Supabase auth users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.raw_user_meta_data->>'avatar_url',
    'guest'::user_role
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Comment on changes
COMMENT ON TABLE public.users IS 'User profiles table linked to Supabase auth.users';