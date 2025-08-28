'use client'

import React, { useState, memo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useAuth } from '@/lib/auth'
import { useUserFavorites, useUserPurchases } from '@/lib/hooks'
import { ProgressiveImage } from '@/components/ui/LoadingComponents'
import type { TemplateWithImagesAndUser } from '@/lib/database.types'

interface TemplateCardProps {
  template: TemplateWithImagesAndUser
  index?: number
  showCategory?: boolean
  showAuthor?: boolean
}

const TemplateCard = memo(function TemplateCard({ 
  template, 
  index = 0, 
  showCategory = true,
  showAuthor = false 
}: TemplateCardProps) {
  const { user } = useAuth()
  const { toggleFavorite, isFavorite } = useUserFavorites()
  const { hasPurchased } = useUserPurchases()
  const [isHovered, setIsHovered] = useState(false)

  const primaryImage = template.template_images?.find(img => img.is_primary) || template.template_images?.[0]
  const isFavorited = user ? isFavorite(template.id) : false
  const isPurchased = user ? hasPurchased(template.id) : false
  const isFree = template.price === 0

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!user) {
      // Could trigger auth modal here
      return
    }
    
    await toggleFavorite(template.id)
  }

  const formatPrice = (price: number) => {
    return price === 0 ? 'Free' : `$${price.toFixed(2)}`
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      ecommerce: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      business: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      portfolio: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      blog: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      landing: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      dashboard: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
      education: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
      health: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      finance: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <Link href={`/templates/${template.id}`} className="block">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Image Section */}
          <div className="relative h-48 overflow-hidden">
            <ProgressiveImage
              src={primaryImage?.image_url || '/images/placeholder-template.jpg'}
              alt={primaryImage?.alt_text || template.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
              {showCategory && (
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(template.category)}`}>
                  {template.category}
                </span>
              )}
              {template.featured && (
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-yellow-400 text-yellow-900">
                  Featured
                </span>
              )}
              {isPurchased && (
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-400 text-green-900">
                  Owned
                </span>
              )}
            </div>
            
            {/* Favorite Button */}
            {user && (
              <button
                onClick={handleFavoriteClick}
                className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
                  isFavorited 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
                }`}
                aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
              >
                <svg className="w-4 h-4" fill={isFavorited ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            )}
            
            {/* Preview Button */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ scale: 0.8 }}
              animate={{ scale: isHovered ? 1 : 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex space-x-2">
                <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Preview
                </button>
                {template.demo_url && (
                  <a
                    href={template.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </div>
          
          {/* Content Section */}
          <div className="p-6">
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
                {template.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {template.description}
              </p>
            </div>
            
            {/* Tags */}
            {template.tags && template.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {template.tags.slice(0, 3).map(tag => (
                  <span 
                    key={tag}
                    className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
                  >
                    {tag}
                  </span>
                ))}
                {template.tags.length > 3 && (
                  <span className="text-xs px-2 py-1 text-gray-500">
                    +{template.tags.length - 3} more
                  </span>
                )}
              </div>
            )}
            
            {/* Author */}
            {showAuthor && template.users && (
              <div className="flex items-center mb-3">
                <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full mr-2 flex items-center justify-center">
                  <span className="text-xs font-medium">
                    {template.users.full_name?.charAt(0) || 'A'}
                  </span>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {template.users.full_name || 'Anonymous'}
                </span>
              </div>
            )}
            
            {/* Stats & Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                {/* Rating */}
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{template.rating.toFixed(1)}</span>
                  <span className="ml-1">({template.rating_count})</span>
                </div>
                
                {/* Downloads */}
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>{template.downloads_count.toLocaleString()}</span>
                </div>
              </div>
              
              {/* Price */}
              <div className="text-right">
                <span className={`text-lg font-bold ${
                  isFree 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {formatPrice(template.price)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
})

export default TemplateCard