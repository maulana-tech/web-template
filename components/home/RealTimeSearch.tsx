'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type SearchResult = {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  rating: number;
  downloads: number;
  price: number;
  tags: string[];
  type: 'template' | 'blog' | 'documentation';
};

export default function RealTimeSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Mock search data
  const mockData: SearchResult[] = [
    {
      id: 'portfolio-pro',
      title: 'Portfolio Pro Template',
      description: 'Professional portfolio template with dark mode and animations',
      category: 'Templates',
      image: '/templates/portfolio-preview.jpg',
      rating: 4.8,
      downloads: 12500,
      price: 49,
      tags: ['React', 'Next.js', 'Portfolio'],
      type: 'template'
    },
    {
      id: 'ecommerce-guide',
      title: 'E-commerce Setup Guide',
      description: 'Complete guide to setting up an online store with our templates',
      category: 'Documentation',
      image: '/docs/ecommerce-guide.jpg',
      rating: 4.7,
      downloads: 8900,
      price: 0,
      tags: ['E-commerce', 'Setup', 'Guide'],
      type: 'documentation'
    },
    {
      id: 'blog-best-practices',
      title: 'Best Practices for Blog Templates',
      description: 'Tips and tricks for creating engaging blog content',
      category: 'Blog',
      image: '/blog/best-practices.jpg',
      rating: 4.6,
      downloads: 6700,
      price: 0,
      tags: ['Blog', 'Content', 'SEO'],
      type: 'blog'
    },
    {
      id: 'saas-dashboard',
      title: 'SaaS Dashboard Template',
      description: 'Professional dashboard for SaaS applications',
      category: 'Templates',
      image: '/templates/saas-preview.jpg',
      rating: 4.9,
      downloads: 15200,
      price: 99,
      tags: ['React', 'Dashboard', 'SaaS'],
      type: 'template'
    },
    {
      id: 'landing-page',
      title: 'High-Converting Landing Page',
      description: 'Template designed to maximize conversions',
      category: 'Templates',
      image: '/templates/landing-preview.jpg',
      rating: 4.5,
      downloads: 21500,
      price: 39,
      tags: ['Marketing', 'Landing Page', 'Conversion'],
      type: 'template'
    },
    {
      id: 'restaurant-template',
      title: 'Restaurant Website Template',
      description: 'Beautiful template for restaurants with menu display',
      category: 'Templates',
      image: '/templates/restaurant-preview.jpg',
      rating: 4.4,
      downloads: 7800,
      price: 69,
      tags: ['Food', 'Restaurant', 'E-commerce'],
      type: 'template'
    }
  ];
  
  // Handle clicks outside the search to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Simulate real-time search
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API delay
    const timeout = setTimeout(() => {
      const term = searchTerm.toLowerCase();
      const filtered = mockData.filter(item => 
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.tags.some(tag => tag.toLowerCase().includes(term)) ||
        item.category.toLowerCase().includes(term)
      );
      
      setSearchResults(filtered.slice(0, 6)); // Limit to 6 results
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timeout);
  }, [searchTerm]);
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'template':
        return (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        );
      case 'blog':
        return (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        );
      case 'documentation':
        return (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      default:
        return null;
    }
  };
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'template': return 'bg-neon-blue text-dark';
      case 'blog': return 'bg-neon-pink text-white';
      case 'documentation': return 'bg-gradient-to-r from-neon-blue to-neon-pink text-white';
      default: return 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
  };
  
  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          placeholder="Search templates, blog posts, documentation..."
          className="w-full px-6 py-4 pl-12 rounded-full border border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-neon-blue shadow-lg text-lg"
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      <AnimatePresence>
        {showResults && (searchTerm || searchResults.length > 0) && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl z-50 overflow-hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-neon-blue mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Searching...</p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="max-h-[500px] overflow-y-auto">
                <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                  </p>
                </div>
                
                <ul>
                  {searchResults.map((result, index) => (
                    <motion.li
                      key={result.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <a
                        href={`/${result.type === 'template' ? 'templates' : result.type}/${result.id}`}
                        className="block p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex items-start">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 mr-4">
                            <Image
                              src={result.image}
                              alt={result.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center mb-1">
                              <span className={`text-xs px-2 py-1 rounded-full mr-2 ${getTypeColor(result.type)}`}>
                                <div className="flex items-center">
                                  {getTypeIcon(result.type)}
                                  <span className="ml-1 capitalize">{result.type}</span>
                                </div>
                              </span>
                              {result.price > 0 && (
                                <span className="text-xs font-bold text-neon-blue">${result.price}</span>
                              )}
                            </div>
                            
                            <h3 className="font-heading font-bold text-lg truncate">{result.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                              {result.description}
                            </p>
                            
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <div className="flex items-center mr-3">
                                <svg className="h-3 w-3 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span>{result.rating}</span>
                              </div>
                              
                              <div className="flex items-center">
                                <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                <span>
                                  {result.downloads > 1000 
                                    ? `${(result.downloads / 1000).toFixed(1)}k` 
                                    : result.downloads}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </motion.li>
                  ))}
                </ul>
                
                <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
                  <a 
                    href={`/search?q=${encodeURIComponent(searchTerm)}`}
                    className="text-neon-blue hover:underline font-medium flex items-center justify-center"
                  >
                    View all results
                    <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ) : searchTerm ? (
              <div className="p-8 text-center">
                <div className="bg-gray-100 dark:bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">No results found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  We couldn't find anything matching "{searchTerm}"
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Try different keywords or browse our categories
                </p>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}