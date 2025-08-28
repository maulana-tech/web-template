-- Better Auth Database Schema for Supabase
-- Run this SQL in your Supabase SQL Editor

-- Create Better Auth user table
CREATE TABLE IF NOT EXISTS "user" (
  "id" TEXT PRIMARY KEY,
  "email" TEXT UNIQUE NOT NULL,
  "emailVerified" BOOLEAN NOT NULL DEFAULT FALSE,
  "name" TEXT NOT NULL,
  "image" TEXT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Additional fields for our application
  "full_name" TEXT,
  "avatar_url" TEXT,
  "role" TEXT DEFAULT 'guest',
  "subscription_tier" TEXT DEFAULT 'free',
  "subscription_end_date" TIMESTAMPTZ
);

-- Create Better Auth session table
CREATE TABLE IF NOT EXISTS "session" (
  "id" TEXT PRIMARY KEY,
  "expiresAt" TIMESTAMPTZ NOT NULL,
  "token" TEXT UNIQUE NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "ipAddress" TEXT,
  "userAgent" TEXT,
  "userId" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE
);

-- Create Better Auth account table (for social providers)
CREATE TABLE IF NOT EXISTS "account" (
  "id" TEXT PRIMARY KEY,
  "accountId" TEXT NOT NULL,
  "providerId" TEXT NOT NULL,
  "userId" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "accessToken" TEXT,
  "refreshToken" TEXT,
  "idToken" TEXT,
  "accessTokenExpiresAt" TIMESTAMPTZ,
  "refreshTokenExpiresAt" TIMESTAMPTZ,
  "scope" TEXT,
  "password" TEXT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  UNIQUE("providerId", "accountId")
);

-- Create Better Auth verification table (for email verification, password reset)
CREATE TABLE IF NOT EXISTS "verification" (
  "id" TEXT PRIMARY KEY,
  "identifier" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "expiresAt" TIMESTAMPTZ NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "idx_session_userId" ON "session"("userId");
CREATE INDEX IF NOT EXISTS "idx_account_userId" ON "account"("userId");
CREATE INDEX IF NOT EXISTS "idx_verification_identifier" ON "verification"("identifier");

-- Enable Row Level Security (RLS)
ALTER TABLE "user" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "session" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "account" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "verification" ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for Better Auth tables

-- User table policies
CREATE POLICY "Users can view own profile" ON "user"
  FOR SELECT USING (auth.uid()::text = id);

CREATE POLICY "Users can update own profile" ON "user"
  FOR UPDATE USING (auth.uid()::text = id);

-- Session table policies  
CREATE POLICY "Users can view own sessions" ON "session"
  FOR SELECT USING (auth.uid()::text = "userId");

CREATE POLICY "Users can delete own sessions" ON "session"
  FOR DELETE USING (auth.uid()::text = "userId");

-- Account table policies
CREATE POLICY "Users can view own accounts" ON "account"
  FOR SELECT USING (auth.uid()::text = "userId");

-- Verification table policies (typically handled by the auth system)
CREATE POLICY "Allow verification operations" ON "verification"
  FOR ALL USING (true);

-- Function to sync BetterAuth user with existing users table
CREATE OR REPLACE FUNCTION sync_better_auth_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert or update the existing users table when BetterAuth user is created/updated
  INSERT INTO public.users (
    id, 
    email, 
    full_name, 
    avatar_url, 
    role,
    created_at,
    updated_at
  ) VALUES (
    NEW.id::uuid,
    NEW.email,
    COALESCE(NEW.full_name, NEW.name),
    NEW.avatar_url,
    COALESCE(NEW.role::user_role, 'guest'::user_role),
    NEW."createdAt",
    NEW."updatedAt"
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    avatar_url = EXCLUDED.avatar_url,
    role = EXCLUDED.role,
    updated_at = EXCLUDED.updated_at;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to sync users
DROP TRIGGER IF EXISTS sync_better_auth_user_trigger ON "user";
CREATE TRIGGER sync_better_auth_user_trigger
  AFTER INSERT OR UPDATE ON "user"
  FOR EACH ROW
  EXECUTE FUNCTION sync_better_auth_user();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON "user", "session", "account", "verification" TO anon, authenticated;

-- Comment on tables
COMMENT ON TABLE "user" IS 'Better Auth users table';
COMMENT ON TABLE "session" IS 'Better Auth sessions table'; 
COMMENT ON TABLE "account" IS 'Better Auth accounts table for social providers';
COMMENT ON TABLE "verification" IS 'Better Auth verification tokens table';