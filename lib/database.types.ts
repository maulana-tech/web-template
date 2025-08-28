export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Enums
export type UserRole = 'guest' | 'member' | 'admin'
export type TemplateStatus = 'draft' | 'published' | 'archived'
export type TemplateCategory = 
  | 'ecommerce' 
  | 'business' 
  | 'portfolio' 
  | 'blog' 
  | 'landing' 
  | 'dashboard' 
  | 'education' 
  | 'health' 
  | 'finance'

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: UserRole
          subscription_tier: string | null
          subscription_end_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: UserRole
          subscription_tier?: string | null
          subscription_end_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: UserRole
          subscription_tier?: string | null
          subscription_end_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      templates: {
        Row: {
          id: string
          title: string
          description: string | null
          preview_image_url: string | null
          demo_url: string | null
          download_url: string | null
          price: number
          category: TemplateCategory
          tags: string[]
          status: TemplateStatus
          featured: boolean
          downloads_count: number
          rating: number
          rating_count: number
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          preview_image_url?: string | null
          demo_url?: string | null
          download_url?: string | null
          price?: number
          category: TemplateCategory
          tags?: string[]
          status?: TemplateStatus
          featured?: boolean
          downloads_count?: number
          rating?: number
          rating_count?: number
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          preview_image_url?: string | null
          demo_url?: string | null
          download_url?: string | null
          price?: number
          category?: TemplateCategory
          tags?: string[]
          status?: TemplateStatus
          featured?: boolean
          downloads_count?: number
          rating?: number
          rating_count?: number
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      template_images: {
        Row: {
          id: string
          template_id: string
          image_url: string
          alt_text: string | null
          is_primary: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          template_id: string
          image_url: string
          alt_text?: string | null
          is_primary?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          template_id?: string
          image_url?: string
          alt_text?: string | null
          is_primary?: boolean
          sort_order?: number
          created_at?: string
        }
      }
      collections: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      collection_templates: {
        Row: {
          id: string
          collection_id: string
          template_id: string
          added_at: string
        }
        Insert: {
          id?: string
          collection_id: string
          template_id: string
          added_at?: string
        }
        Update: {
          id?: string
          collection_id?: string
          template_id?: string
          added_at?: string
        }
      }
      user_downloads: {
        Row: {
          id: string
          user_id: string
          template_id: string
          downloaded_at: string
        }
        Insert: {
          id?: string
          user_id: string
          template_id: string
          downloaded_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          template_id?: string
          downloaded_at?: string
        }
      }
      user_favorites: {
        Row: {
          id: string
          user_id: string
          template_id: string
          favorited_at: string
        }
        Insert: {
          id?: string
          user_id: string
          template_id: string
          favorited_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          template_id?: string
          favorited_at?: string
        }
      }
      template_reviews: {
        Row: {
          id: string
          template_id: string
          user_id: string
          rating: number
          review_text: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          template_id: string
          user_id: string
          rating: number
          review_text?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          template_id?: string
          user_id?: string
          rating?: number
          review_text?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      purchases: {
        Row: {
          id: string
          user_id: string
          template_id: string
          price: number
          payment_intent_id: string | null
          status: string
          purchased_at: string
        }
        Insert: {
          id?: string
          user_id: string
          template_id: string
          price: number
          payment_intent_id?: string | null
          status?: string
          purchased_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          template_id?: string
          price?: number
          payment_intent_id?: string | null
          status?: string
          purchased_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: {
          user_uuid?: string
        }
        Returns: UserRole
      }
      can_access_premium: {
        Args: {
          user_uuid?: string
        }
        Returns: boolean
      }
    }
    Enums: {
      user_role: UserRole
      template_status: TemplateStatus
      template_category: TemplateCategory
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper types for common use cases
export type User = Database['public']['Tables']['users']['Row']
export type Template = Database['public']['Tables']['templates']['Row']
export type TemplateImage = Database['public']['Tables']['template_images']['Row']
export type Collection = Database['public']['Tables']['collections']['Row']
export type UserDownload = Database['public']['Tables']['user_downloads']['Row']
export type UserFavorite = Database['public']['Tables']['user_favorites']['Row']
export type TemplateReview = Database['public']['Tables']['template_reviews']['Row']
export type Purchase = Database['public']['Tables']['purchases']['Row']

// Extended types with relationships
export type TemplateWithImages = Template & {
  template_images: TemplateImage[]
}

export type TemplateWithReviews = Template & {
  template_reviews: TemplateReview[]
}

export type TemplateWithUser = Template & {
  users: Pick<User, 'id' | 'full_name' | 'avatar_url'> | null
}

// Comprehensive template type that can include both images and user info
export type TemplateWithImagesAndUser = Template & {
  template_images: TemplateImage[]
  users?: Pick<User, 'id' | 'full_name' | 'avatar_url'> | null
}

export type CollectionWithTemplates = Collection & {
  collection_templates: {
    templates: Template
  }[]
}

export type ReviewWithUser = TemplateReview & {
  users: Pick<User, 'id' | 'full_name' | 'avatar_url'>
}