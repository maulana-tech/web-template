'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useFeaturedTemplates } from '@/lib/hooks'
import TemplateCard from '@/components/templates/TemplateCard'
import { TemplateGridSkeleton, ErrorState } from '@/components/ui/LoadingComponents'
import Link from 'next/link'

export default function TemplateShowcase() {
  const { templates, loading, error } = useFeaturedTemplates(6)

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-heading font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Featured Templates
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Discover our most popular and highest-rated templates
          </motion.p>
        </div>
        
        {loading ? (
          <TemplateGridSkeleton count={6} />
        ) : error ? (
          <ErrorState
            title="Failed to load featured templates"
            message={error}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {templates.map((template, index) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  index={index}
                  showCategory={true}
                  showAuthor={true}
                />
              ))}
            </div>
            
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href="/templates"
                className="btn-primary inline-flex items-center px-8 py-3 text-lg"
              >
                View All Templates
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}