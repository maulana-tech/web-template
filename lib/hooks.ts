'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from './auth'
import { 
  templateQueries, 
  userQueries, 
  collectionQueries, 
  reviewQueries,
  purchaseQueries 
} from './queries'
import type { 
  Template, 
  TemplateWithImages,
  TemplateWithImagesAndUser, 
  User,
  Collection,
  TemplateCategory 
} from './database.types'

// Template hooks
export function useTemplates(category?: TemplateCategory, page = 1, limit = 12) {
  const [templates, setTemplates] = useState<TemplateWithImagesAndUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)

  const fetchTemplates = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error } = await templateQueries.getPublishedTemplates(page, limit, category)
      
      if (error) throw error
      
      if (page === 1) {
        setTemplates(data || [])
      } else {
        setTemplates(prev => [...prev, ...(data || [])])
      }
      
      setHasMore((data?.length || 0) === limit)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch templates')
    } finally {
      setLoading(false)
    }
  }, [category, page, limit])

  useEffect(() => {
    fetchTemplates()
  }, [fetchTemplates])

  return { templates, loading, error, hasMore, refetch: fetchTemplates }
}

export function useFeaturedTemplates(limit = 6) {
  const [templates, setTemplates] = useState<TemplateWithImagesAndUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data, error } = await templateQueries.getFeaturedTemplates(limit)
        if (error) throw error
        setTemplates(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch featured templates')
      } finally {
        setLoading(false)
      }
    }

    fetchFeatured()
  }, [limit])

  return { templates, loading, error }
}

export function useTemplate(id: string) {
  const [template, setTemplate] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const { data, error } = await templateQueries.getTemplateById(id)
        if (error) throw error
        setTemplate(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch template')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchTemplate()
    }
  }, [id])

  return { template, loading, error }
}

export function useTemplateSearch() {
  const [results, setResults] = useState<TemplateWithImagesAndUser[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = useCallback(async (query: string, category?: TemplateCategory) => {
    if (!query.trim()) {
      setResults([])
      return
    }

    try {
      setLoading(true)
      setError(null)
      const { data, error } = await templateQueries.searchTemplates(query, category)
      if (error) throw error
      setResults(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search templates')
    } finally {
      setLoading(false)
    }
  }, [])

  return { results, loading, error, search }
}

// User data hooks
export function useUserFavorites() {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchFavorites = useCallback(async () => {
    if (!user) return
    
    try {
      const { data, error } = await userQueries.getUserFavorites(user.id)
      if (error) throw error
      setFavorites(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch favorites')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchFavorites()
  }, [fetchFavorites])

  const toggleFavorite = useCallback(async (templateId: string) => {
    if (!user) return

    try {
      const { error } = await userQueries.toggleFavorite(user.id, templateId)
      if (error) throw error
      await fetchFavorites() // Refresh favorites
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle favorite')
    }
  }, [user, fetchFavorites])

  const isFavorite = useCallback((templateId: string) => {
    return favorites.some(fav => fav.template_id === templateId)
  }, [favorites])

  return { favorites, loading, error, toggleFavorite, isFavorite, refetch: fetchFavorites }
}

export function useUserDownloads() {
  const { user } = useAuth()
  const [downloads, setDownloads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDownloads = useCallback(async () => {
    if (!user) return
    
    try {
      const { data, error } = await userQueries.getUserDownloads(user.id)
      if (error) throw error
      setDownloads(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch downloads')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchDownloads()
  }, [fetchDownloads])

  const recordDownload = useCallback(async (templateId: string) => {
    if (!user) return

    try {
      const { error } = await userQueries.recordDownload(user.id, templateId)
      if (error) throw error
      await fetchDownloads() // Refresh downloads
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to record download')
    }
  }, [user, fetchDownloads])

  const hasDownloaded = useCallback((templateId: string) => {
    return downloads.some(download => download.template_id === templateId)
  }, [downloads])

  return { downloads, loading, error, recordDownload, hasDownloaded, refetch: fetchDownloads }
}

export function useUserPurchases() {
  const { user } = useAuth()
  const [purchases, setPurchases] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPurchases = useCallback(async () => {
    if (!user) return
    
    try {
      const { data, error } = await purchaseQueries.getUserPurchases(user.id)
      if (error) throw error
      setPurchases(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch purchases')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchPurchases()
  }, [fetchPurchases])

  const hasPurchased = useCallback((templateId: string) => {
    return purchases.some(purchase => purchase.template_id === templateId && purchase.status === 'completed')
  }, [purchases])

  return { purchases, loading, error, hasPurchased, refetch: fetchPurchases }
}

// Collection hooks
export function useUserCollections() {
  const { user } = useAuth()
  const [collections, setCollections] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCollections = useCallback(async () => {
    if (!user) return
    
    try {
      const { data, error } = await collectionQueries.getUserCollections(user.id)
      if (error) throw error
      setCollections(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch collections')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchCollections()
  }, [fetchCollections])

  const createCollection = useCallback(async (name: string, description?: string, isPublic = false) => {
    if (!user) return

    try {
      const { data, error } = await collectionQueries.createCollection({
        user_id: user.id,
        name,
        description: description || null,
        is_public: isPublic
      })
      if (error) throw error
      await fetchCollections() // Refresh collections
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create collection')
    }
  }, [user, fetchCollections])

  const addToCollection = useCallback(async (collectionId: string, templateId: string) => {
    try {
      const { error } = await collectionQueries.addToCollection(collectionId, templateId)
      if (error) throw error
      await fetchCollections() // Refresh collections
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add to collection')
    }
  }, [fetchCollections])

  const removeFromCollection = useCallback(async (collectionId: string, templateId: string) => {
    try {
      const { error } = await collectionQueries.removeFromCollection(collectionId, templateId)
      if (error) throw error
      await fetchCollections() // Refresh collections
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove from collection')
    }
  }, [fetchCollections])

  return { 
    collections, 
    loading, 
    error, 
    createCollection, 
    addToCollection, 
    removeFromCollection,
    refetch: fetchCollections 
  }
}

// Review hooks
export function useTemplateReviews(templateId: string) {
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchReviews = useCallback(async () => {
    try {
      const { data, error } = await reviewQueries.getTemplateReviews(templateId)
      if (error) throw error
      setReviews(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reviews')
    } finally {
      setLoading(false)
    }
  }, [templateId])

  useEffect(() => {
    if (templateId) {
      fetchReviews()
    }
  }, [fetchReviews])

  const addReview = useCallback(async (rating: number, reviewText?: string) => {
    const { user } = useAuth()
    if (!user) return

    try {
      const { error } = await reviewQueries.createReview({
        template_id: templateId,
        user_id: user.id,
        rating,
        review_text: reviewText
      })
      if (error) throw error
      await fetchReviews() // Refresh reviews
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add review')
    }
  }, [templateId, fetchReviews])

  return { reviews, loading, error, addReview, refetch: fetchReviews }
}

// Utility hook for loading states
export function useAsyncOperation() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const execute = useCallback(async (operation: () => Promise<any>) => {
    try {
      setLoading(true)
      setError(null)
      const result = await operation()
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { loading, error, execute, clearError: () => setError(null) }
}