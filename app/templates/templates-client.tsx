'use client'

import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTemplates, useTemplateSearch } from '@/lib/hooks'
import { useAuth } from '@/lib/auth'
import TemplateCard from '@/components/templates/TemplateCard'
import { TemplateGridSkeleton, ErrorState, EmptyState, ComponentLoader } from '@/components/ui/LoadingComponents'
import type { TemplateCategory } from '@/lib/database.types'

const categories: { value: TemplateCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Categories' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'business', label: 'Business' },
  { value: 'portfolio', label: 'Portfolio' },
  { value: 'blog', label: 'Blog' },
  { value: 'landing', label: 'Landing Page' },
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'education', label: 'Education' },
  { value: 'health', label: 'Health' },
  { value: 'finance', label: 'Finance' }
]

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'free', label: 'Free First' }
]

export default function TemplatesPageClient() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all')
  const [sortBy, setSortBy] = useState('newest')
  const [page, setPage] = useState(1)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  
  // Use either search or regular templates based on search term
  const { results: searchResults, loading: searchLoading, search } = useTemplateSearch()
  const { 
    templates, 
    loading: templatesLoading, 
    error, 
    hasMore, 
    refetch 
  } = useTemplates(selectedCategory === 'all' ? undefined : selectedCategory, page, 12)
  
  const isSearching = searchTerm.trim().length > 0
  const currentTemplates = isSearching ? searchResults : templates
  const isLoading = isSearching ? searchLoading : templatesLoading
  
  // Debounced search
  useEffect(() => {
    if (!searchTerm.trim()) return
    
    const timeoutId = setTimeout(() => {
      search(searchTerm, selectedCategory === 'all' ? undefined : selectedCategory)
    }, 500)
    
    return () => clearTimeout(timeoutId)
  }, [searchTerm, selectedCategory, search])
  
  // Sort templates client-side for better UX
  const sortedTemplates = useMemo(() => {
    if (!currentTemplates) return []
    
    const sorted = [...currentTemplates]
    
    switch (sortBy) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      case 'popular':
        return sorted.sort((a, b) => b.downloads_count - a.downloads_count)
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating)
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price)
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price)
      case 'free':
        return sorted.sort((a, b) => {
          if (a.price === 0 && b.price !== 0) return -1
          if (a.price !== 0 && b.price === 0) return 1
          return 0
        })
      default:
        return sorted
    }
  }, [currentTemplates, sortBy])
  
  const loadMore = useCallback(async () => {
    if (isSearching || !hasMore || isLoadingMore) return
    
    setIsLoadingMore(true)
    setPage(prev => prev + 1)
    setTimeout(() => setIsLoadingMore(false), 1000)
  }, [isSearching, hasMore, isLoadingMore])
  
  const handleCategoryChange = (category: TemplateCategory | 'all') => {
    setSelectedCategory(category)
    setPage(1)
    setSearchTerm('') // Clear search when changing category
  }
  
  const handleRetry = () => {
    if (isSearching) {
      search(searchTerm, selectedCategory === 'all' ? undefined : selectedCategory)
    } else {
      refetch()
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Website Templates
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Browse our extensive collection of premium website templates. 
            Find the perfect template for your next project.
          </p>
        </motion.div>
        
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {isSearching && isLoading && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                </div>
              )}
            </div>
            
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value as TemplateCategory | 'all')}
                className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-w-[160px]"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-w-[160px]"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Results Count */}
          {!isLoading && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {isSearching ? (
                <span>
                  {sortedTemplates.length} result{sortedTemplates.length !== 1 ? 's' : ''} 
                  {searchTerm && ` for "${searchTerm}"`}
                  {selectedCategory !== 'all' && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
                </span>
              ) : (
                <span>
                  Showing {sortedTemplates.length} template{sortedTemplates.length !== 1 ? 's' : ''}
                  {selectedCategory !== 'all' && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
                </span>
              )}
            </div>
          )}
        </motion.div>
        
        {/* Content */}
        <AnimatePresence mode="wait">
          {isLoading && page === 1 ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TemplateGridSkeleton count={12} />
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ErrorState
                title="Failed to load templates"
                message={error}
                onRetry={handleRetry}
              />
            </motion.div>
          ) : sortedTemplates.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <EmptyState
                title={isSearching ? "No templates found" : "No templates available"}
                message={isSearching 
                  ? "Try adjusting your search criteria or browse all categories"
                  : "Check back later for new templates"
                }
                action={isSearching && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="btn-primary"
                  >
                    Clear Search
                  </button>
                )}
              />
            </motion.div>
          ) : (
            <motion.div
              key="templates"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Templates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedTemplates.map((template, index) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    index={index}
                    showCategory={selectedCategory === 'all'}
                    showAuthor={true}
                  />
                ))}
              </div>
              
              {/* Load More */}
              {!isSearching && hasMore && (
                <div className="text-center">
                  <button
                    onClick={loadMore}
                    disabled={isLoadingMore}
                    className="btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoadingMore ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                        Loading More...
                      </>
                    ) : (
                      'Load More Templates'
                    )}
                  </button>
                </div>
              )}
              
              {/* Loading More Indicator */}
              {isLoadingMore && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                  <TemplateGridSkeleton count={4} />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
