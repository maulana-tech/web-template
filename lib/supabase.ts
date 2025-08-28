import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Create mock client for when Supabase is not configured
const createMockClient = () => ({
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    signInWithPassword: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
    signUp: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
    signOut: () => Promise.resolve({ error: null }),
    signInWithOAuth: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
        order: () => ({
          limit: () => Promise.resolve({ data: [], error: null })
        })
      })
    }),
    insert: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
    update: () => ({
      eq: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') })
    }),
    delete: () => ({
      eq: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') })
    })
  }),
  channel: () => ({
    on: () => ({
      subscribe: () => ({ unsubscribe: () => {} })
    })
  })
} as any)

// Create the actual client or mock based on environment variables
let supabaseClient: any
let supabaseAdminClient: any

if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window !== 'undefined') {
    // Client-side: Show user-friendly error
    console.warn('⚠️  Supabase configuration missing:', {
      url: !!supabaseUrl,
      key: !!supabaseAnonKey
    })
    console.warn('🔧 Using mock Supabase client. Please check your environment variables.')
  }
  
  supabaseClient = createMockClient()
  supabaseAdminClient = createMockClient()
} else {
  // Normal initialization when environment variables are present
  supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  })
  
  // Admin client for server-side operations
  supabaseAdminClient = createClient<Database>(
    supabaseUrl,
    supabaseServiceKey || supabaseAnonKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}

export const supabase = supabaseClient
export const supabaseAdmin = supabaseAdminClient