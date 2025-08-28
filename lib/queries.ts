import { supabase, supabaseAdmin } from './supabase'
import type { 
  Template, 
  TemplateWithImages, 
  TemplateWithReviews,
  User,
  UserFavorite,
  UserDownload,
  Collection,
  Purchase,
  TemplateCategory,
  TemplateStatus,
  UserRole
} from './database.types'

// Template queries
export const templateQueries = {
  // Get all published templates with pagination
  getPublishedTemplates: async (page = 1, limit = 12, category?: TemplateCategory) => {
    let query = supabase
      .from('templates')
      .select(`
        *,
        template_images (
          id,
          image_url,
          alt_text,
          is_primary,
          sort_order
        ),
        users (
          id,
          full_name,
          avatar_url
        )
      `)
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1)

    if (category) {
      query = query.eq('category', category)
    }

    return await query
  },

  // Get featured templates
  getFeaturedTemplates: async (limit = 6) => {
    return await supabase
      .from('templates')
      .select(`
        *,
        template_images (
          id,
          image_url,
          alt_text,
          is_primary,
          sort_order
        )
      `)
      .eq('status', 'published')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(limit)
  },

  // Get template by ID with full details
  getTemplateById: async (id: string) => {
    return await supabase
      .from('templates')
      .select(`
        *,
        template_images (
          id,
          image_url,
          alt_text,
          is_primary,
          sort_order
        ),
        template_reviews (
          id,
          rating,
          review_text,
          created_at,
          users (
            id,
            full_name,
            avatar_url
          )
        ),
        users (
          id,
          full_name,
          avatar_url
        )
      `)
      .eq('id', id)
      .single()
  },

  // Search templates
  searchTemplates: async (query: string, category?: TemplateCategory, limit = 20) => {
    let dbQuery = supabase
      .from('templates')
      .select(`
        *,
        template_images (
          id,
          image_url,
          alt_text,
          is_primary,
          sort_order
        )
      `)
      .eq('status', 'published')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%,tags.cs.{${query}}`)
      .order('rating', { ascending: false })
      .limit(limit)

    if (category) {
      dbQuery = dbQuery.eq('category', category)
    }

    return await dbQuery
  },

  // Get templates by user
  getUserTemplates: async (userId: string) => {
    return await supabase
      .from('templates')
      .select(`
        *,
        template_images (
          id,
          image_url,
          alt_text,
          is_primary,
          sort_order
        )
      `)
      .eq('created_by', userId)
      .order('created_at', { ascending: false })
  },

  // Create template
  createTemplate: async (template: Omit<Template, 'id' | 'created_at' | 'updated_at' | 'downloads_count' | 'rating' | 'rating_count'>) => {
    return await supabase
      .from('templates')
      .insert(template)
      .select()
      .single()
  },

  // Update template
  updateTemplate: async (id: string, updates: Partial<Template>) => {
    return await supabase
      .from('templates')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
  },

  // Delete template (admin only)
  deleteTemplate: async (id: string) => {
    return await supabaseAdmin
      .from('templates')
      .delete()
      .eq('id', id)
  }
}

// User queries
export const userQueries = {
  // Get user profile
  getUserProfile: async (userId: string) => {
    return await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
  },

  // Update user profile
  updateUserProfile: async (userId: string, updates: Partial<User>) => {
    return await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
  },

  // Get user favorites
  getUserFavorites: async (userId: string) => {
    return await supabase
      .from('user_favorites')
      .select(`
        *,
        templates (
          *,
          template_images (
            id,
            image_url,
            alt_text,
            is_primary,
            sort_order
          )
        )
      `)
      .eq('user_id', userId)
      .order('favorited_at', { ascending: false })
  },

  // Toggle favorite
  toggleFavorite: async (userId: string, templateId: string) => {
    // Check if already favorited
    const { data: existing } = await supabase
      .from('user_favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('template_id', templateId)
      .single()

    if (existing) {
      // Remove favorite
      return await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', userId)
        .eq('template_id', templateId)
    } else {
      // Add favorite
      return await supabase
        .from('user_favorites')
        .insert({ user_id: userId, template_id: templateId })
    }
  },

  // Get user downloads
  getUserDownloads: async (userId: string) => {
    return await supabase
      .from('user_downloads')
      .select(`
        *,
        templates (
          *,
          template_images (
            id,
            image_url,
            alt_text,
            is_primary,
            sort_order
          )
        )
      `)
      .eq('user_id', userId)
      .order('downloaded_at', { ascending: false })
  },

  // Record download
  recordDownload: async (userId: string, templateId: string) => {
    return await supabase
      .from('user_downloads')
      .insert({ user_id: userId, template_id: templateId })
  },

  // Check if user has downloaded template
  hasDownloaded: async (userId: string, templateId: string) => {
    const { data } = await supabase
      .from('user_downloads')
      .select('id')
      .eq('user_id', userId)
      .eq('template_id', templateId)
      .single()
    
    return !!data
  }
}

// Collection queries
export const collectionQueries = {
  // Get user collections
  getUserCollections: async (userId: string) => {
    return await supabase
      .from('collections')
      .select(`
        *,
        collection_templates (
          templates (
            *,
            template_images (
              id,
              image_url,
              alt_text,
              is_primary,
              sort_order
            )
          )
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
  },

  // Create collection
  createCollection: async (collection: Omit<Collection, 'id' | 'created_at' | 'updated_at'>) => {
    return await supabase
      .from('collections')
      .insert(collection)
      .select()
      .single()
  },

  // Add template to collection
  addToCollection: async (collectionId: string, templateId: string) => {
    return await supabase
      .from('collection_templates')
      .insert({ collection_id: collectionId, template_id: templateId })
  },

  // Remove template from collection
  removeFromCollection: async (collectionId: string, templateId: string) => {
    return await supabase
      .from('collection_templates')
      .delete()
      .eq('collection_id', collectionId)
      .eq('template_id', templateId)
  },

  // Delete collection
  deleteCollection: async (collectionId: string) => {
    return await supabase
      .from('collections')
      .delete()
      .eq('id', collectionId)
  }
}

// Review queries
export const reviewQueries = {
  // Get template reviews
  getTemplateReviews: async (templateId: string) => {
    return await supabase
      .from('template_reviews')
      .select(`
        *,
        users (
          id,
          full_name,
          avatar_url
        )
      `)
      .eq('template_id', templateId)
      .order('created_at', { ascending: false })
  },

  // Create review
  createReview: async (review: { template_id: string; user_id: string; rating: number; review_text?: string }) => {
    return await supabase
      .from('template_reviews')
      .insert(review)
      .select()
      .single()
  },

  // Update review
  updateReview: async (reviewId: string, updates: { rating?: number; review_text?: string }) => {
    return await supabase
      .from('template_reviews')
      .update(updates)
      .eq('id', reviewId)
      .select()
      .single()
  },

  // Delete review
  deleteReview: async (reviewId: string) => {
    return await supabase
      .from('template_reviews')
      .delete()
      .eq('id', reviewId)
  }
}

// Purchase queries
export const purchaseQueries = {
  // Get user purchases
  getUserPurchases: async (userId: string) => {
    return await supabase
      .from('purchases')
      .select(`
        *,
        templates (
          *,
          template_images (
            id,
            image_url,
            alt_text,
            is_primary,
            sort_order
          )
        )
      `)
      .eq('user_id', userId)
      .order('purchased_at', { ascending: false })
  },

  // Create purchase record
  createPurchase: async (purchase: Omit<Purchase, 'id' | 'purchased_at'>) => {
    return await supabase
      .from('purchases')
      .insert(purchase)
      .select()
      .single()
  },

  // Check if user has purchased template
  hasPurchased: async (userId: string, templateId: string) => {
    const { data } = await supabase
      .from('purchases')
      .select('id')
      .eq('user_id', userId)
      .eq('template_id', templateId)
      .eq('status', 'completed')
      .single()
    
    return !!data
  }
}

// Admin queries
export const adminQueries = {
  // Get all users (admin only)
  getAllUsers: async (page = 1, limit = 20) => {
    return await supabaseAdmin
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1)
  },

  // Update user role (admin only)
  updateUserRole: async (userId: string, role: UserRole) => {
    return await supabaseAdmin
      .from('users')
      .update({ role })
      .eq('id', userId)
      .select()
      .single()
  },

  // Get all templates (admin only)
  getAllTemplates: async (page = 1, limit = 20, status?: TemplateStatus) => {
    let query = supabaseAdmin
      .from('templates')
      .select(`
        *,
        template_images (
          id,
          image_url,
          alt_text,
          is_primary,
          sort_order
        ),
        users (
          id,
          full_name,
          avatar_url
        )
      `)
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1)

    if (status) {
      query = query.eq('status', status)
    }

    return await query
  },

  // Update template status (admin only)
  updateTemplateStatus: async (templateId: string, status: TemplateStatus) => {
    return await supabaseAdmin
      .from('templates')
      .update({ status })
      .eq('id', templateId)
      .select()
      .single()
  },

  // Get analytics data
  getAnalytics: async () => {
    const [
      { count: totalUsers },
      { count: totalTemplates },
      { count: totalDownloads },
      { count: totalPurchases }
    ] = await Promise.all([
      supabaseAdmin.from('users').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('templates').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('user_downloads').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('purchases').select('*', { count: 'exact', head: true })
    ])

    return {
      totalUsers: totalUsers || 0,
      totalTemplates: totalTemplates || 0,
      totalDownloads: totalDownloads || 0,
      totalPurchases: totalPurchases || 0
    }
  }
}

// Real-time subscriptions
export const subscriptions = {
  // Subscribe to template changes
  subscribeToTemplates: (callback: (payload: any) => void) => {
    return supabase
      .channel('templates')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'templates' 
      }, callback)
      .subscribe()
  },

  // Subscribe to user favorites
  subscribeToUserFavorites: (userId: string, callback: (payload: any) => void) => {
    return supabase
      .channel(`user_favorites:${userId}`)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'user_favorites',
        filter: `user_id=eq.${userId}`
      }, callback)
      .subscribe()
  }
}