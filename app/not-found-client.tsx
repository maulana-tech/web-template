'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFoundClient() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4" role="main">
      <motion.div 
        className="max-w-lg w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 404 Illustration */}
        <motion.div 
          className="mb-8"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-8xl font-bold text-neon-blue mb-4" aria-hidden="true">
            404
          </div>
          <motion.div 
            className="mx-auto w-32 h-32 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
          >
            <svg 
              className="w-16 h-16 text-gray-400 dark:text-gray-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-3-5h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* Error Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Sorry, we couldn't find the page you're looking for. 
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link
            href="/"
            className="px-6 py-3 bg-neon-blue text-dark rounded-lg font-medium hover:bg-opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-900"
            aria-label="Return to TemplateHub homepage"
          >
            Go Home
          </Link>
          <Link
            href="/templates"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-900"
            aria-label="Browse our template collection"
          >
            Browse Templates
          </Link>
        </motion.div>

        {/* Helpful Links */}
        <motion.div 
          className="pt-6 border-t border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Popular Pages
          </h2>
          <nav aria-label="Popular page links" className="grid grid-cols-2 gap-4 text-sm">
            <Link 
              href="/templates" 
              className="text-gray-600 dark:text-gray-400 hover:text-neon-blue transition-colors duration-200 focus:outline-none focus:text-neon-blue"
            >
              Templates
            </Link>
            <Link 
              href="/pricing" 
              className="text-gray-600 dark:text-gray-400 hover:text-neon-blue transition-colors duration-200 focus:outline-none focus:text-neon-blue"
            >
              Pricing
            </Link>
            <Link 
              href="/docs" 
              className="text-gray-600 dark:text-gray-400 hover:text-neon-blue transition-colors duration-200 focus:outline-none focus:text-neon-blue"
            >
              Documentation
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-600 dark:text-gray-400 hover:text-neon-blue transition-colors duration-200 focus:outline-none focus:text-neon-blue"
            >
              Contact
            </Link>
          </nav>
        </motion.div>

        {/* Skip to main content for screen readers */}
        <div className="sr-only">
          <Link href="#main-content" className="focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-neon-blue text-dark px-4 py-2 rounded">
            Skip to main content
          </Link>
        </div>
      </motion.div>
    </main>
  );
}