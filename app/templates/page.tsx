'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

type Template = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
};

type FilterOptions = {
  category: string;
  priceRange: [number, number];
  frameworks: string[];
  features: string[];
};

type SortOption = 'popular' | 'newest' | 'price-low' | 'price-high' | 'rating';

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    priceRange: [0, 100],
    frameworks: [],
    features: []
  });
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const categories = [
    'all', 'portfolio', 'e-commerce', 'blog', 'landing', 'dashboard', 'saas'
  ];
  
  const frameworks = [
    'Next.js', 'React', 'Vue', 'Angular', 'HTML/CSS', 'Tailwind'
  ];
  
  const features = [
    'Dark Mode', 'Responsive', 'Animation', 'SEO Optimized', 'Accessibility', 'i18n'
  ];
  
  useEffect(() => {
    // In a real app, fetch templates from an API
    // For now, we'll simulate a fetch with setTimeout
    setTimeout(() => {
      setTemplates([
        {
          id: 'modern-portfolio',
          title: 'Modern Portfolio',
          description: 'A sleek, minimalist portfolio template with dark mode support.',
          image: '/templates/portfolio-preview.jpg',
          price: 49,
          rating: 4.8,
          reviewCount: 124,
          tags: ['Portfolio', 'Dark Mode', 'Next.js'],
          author: {
            name: 'Alex Johnson',
            avatar: '/avatars/alex.jpg'
          }
        },
        {
          id: 'ecommerce-starter',
          title: 'E-commerce Starter',
          description: 'A complete e-commerce template with product listings and cart.',
          image: '/templates/ecommerce-preview.jpg',
          price: 69,
          rating: 4.7,
          reviewCount: 98,
          tags: ['E-commerce', 'React', 'Tailwind'],
          author: {
            name: 'Sarah Miller',
            avatar: '/avatars/sarah.jpg'
          }
        },
        {
          id: 'blog-platform',
          title: 'Blog Platform',
          description: 'A modern blog template with support for rich content and comments.',
          image: '/templates/blog-preview.jpg',
          price: 39,
          rating: 4.9,
          reviewCount: 156,
          tags: ['Blog', 'Next.js', 'MDX'],
          author: {
            name: 'Michael Chen',
            avatar: '/avatars/michael.jpg'
          }
        },
        {
          id: 'saas-landing',
          title: 'SaaS Landing Page',
          description: 'A high-converting landing page template for SaaS products.',
          image: '/templates/saas-preview.jpg',
          price: 59,
          rating: 4.6,
          reviewCount: 87,
          tags: ['Landing', 'React', 'Animation'],
          author: {
            name: 'Emily Rodriguez',
            avatar: '/avatars/emily.jpg'
          }
        },
        {
          id: 'admin-dashboard',
          title: 'Admin Dashboard',
          description: 'A comprehensive admin dashboard with charts and data tables.',
          image: '/templates/dashboard-preview.jpg',
          price: 79,
          rating: 4.8,
          reviewCount: 112,
          tags: ['Dashboard', 'React', 'Charts'],
          author: {
            name: 'David Kim',
            avatar: '/avatars/david.jpg'
          }
        },
        {
          id: 'restaurant-site',
          title: 'Restaurant Website',
          description: 'A beautiful website template for restaurants and cafes.',
          image: '/templates/restaurant-preview.jpg',
          price: 49,
          rating: 4.7,
          reviewCount: 76,
          tags: ['Restaurant', 'HTML/CSS', 'Responsive'],
          author: {
            name: 'Jessica Lee',
            avatar: '/avatars/jessica.jpg'
          }
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);
  
  const toggleFramework = (framework: string) => {
    setFilters(prev => {
      if (prev.frameworks.includes(framework)) {
        return {
          ...prev,
          frameworks: prev.frameworks.filter(f => f !== framework)
        };
      } else {
        return {
          ...prev,
          frameworks: [...prev.frameworks, framework]
        };
      }
    });
  };
  
  const toggleFeature = (feature: string) => {
    setFilters(prev => {
      if (prev.features.includes(feature)) {
        return {
          ...prev,
          features: prev.features.filter(f => f !== feature)
        };
      } else {
        return {
          ...prev,
          features: [...prev.features, feature]
        };
      }
    });
  };
  
  const filteredTemplates = templates
    .filter(template => {
      // Filter by category
      if (filters.category !== 'all' && !template.tags.some(tag => tag.toLowerCase() === filters.category.toLowerCase())) {
        return false;
      }
      
      // Filter by price range
      if (template.price < filters.priceRange[0] || template.price > filters.priceRange[1]) {
        return false;
      }
      
      // Filter by frameworks
      if (filters.frameworks.length > 0 && !template.tags.some(tag => filters.frameworks.includes(tag))) {
        return false;
      }
      
      // Filter by features
      if (filters.features.length > 0 && !template.tags.some(tag => filters.features.includes(tag))) {
        return false;
      }
      
      // Filter by search term
      if (searchTerm && !template.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !template.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return -1; // In a real app, would compare dates
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
        default:
          return b.reviewCount - a.reviewCount;
      }
    });
  
  return (
    <div className="min-h-screen pt-20">
      <div className="bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">Browse Templates</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Find the perfect template for your next project
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search templates..."
                className="w-full px-5 py-4 rounded-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-neon-blue shadow-lg"
              />
              <button className="absolute right-2 top-2 bg-neon-blue text-dark p-2 rounded-full hover:bg-opacity-90 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="flex justify-center mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setFilters(prev => ({ ...prev, category }))}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filters.category === category
                      ? 'bg-neon-blue text-dark'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-heading font-bold">Filters</h2>
                <button
                  onClick={() => setFilters({
                    category: 'all',
                    priceRange: [0, 100],
                    frameworks: [],
                    features: []
                  })}
                  className="text-sm text-neon-blue hover:underline"
                >
                  Reset All
                </button>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Price Range</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">${filters.priceRange[0]}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">${filters.priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], parseInt(e.target.value)] }))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Frameworks</h3>
                <div className="space-y-2">
                  {frameworks.map(framework => (
                    <div key={framework} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`framework-${framework}`}
                        checked={filters.frameworks.includes(framework)}
                        onChange={() => toggleFramework(framework)}
                        className="h-4 w-4 text-neon-blue focus:ring-neon-blue border-gray-300 rounded"
                      />
                      <label htmlFor={`framework-${framework}`} className="ml-2 text-gray-700 dark:text-gray-300">
                        {framework}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Features</h3>
                <div className="space-y-2">
                  {features.map(feature => (
                    <div key={feature} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`feature-${feature}`}
                        checked={filters.features.includes(feature)}
                        onChange={() => toggleFeature(feature)}
                        className="h-4 w-4 text-neon-blue focus:ring-neon-blue border-gray-300 rounded"
                      />
                      <label htmlFor={`feature-${feature}`} className="ml-2 text-gray-700 dark:text-gray-300">
                        {feature}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-3/4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="mb-4 md:mb-0 lg:hidden flex items-center text-gray-700 dark:text-gray-300 hover:text-neon-blue"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
              
              <div className="flex items-center">
                <span className="text-gray-600 dark:text-gray-400 mr-2">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-blue"></div>
              </div>
            ) : filteredTemplates.length === 0 ? (
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 text-center">
                <h3 className="text-xl font-heading font-bold mb-2">No templates found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your filters or search term.</p>
                <button
                  onClick={() => {
                    setFilters({
                      category: 'all',
                      priceRange: [0, 100],
                      frameworks: [],
                      features: []
                    });
                    setSearchTerm('');
                  }}
                  className="btn-primary"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    className="card group hover:shadow-xl dark:hover:shadow-gray-800/30 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Link href={`/templates/${template.id}`} className="block">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={template.image}
                          alt={template.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-2 right-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-2 py-1 rounded-lg text-sm font-medium">
                          ${template.price}
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {template.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <h3 className="text-xl font-heading font-bold mb-2">{template.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{template.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Image
                              src={template.author.avatar}
                              alt={template.author.name}
                              width={24}
                              height={24}
                              className="rounded-full mr-2"
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{template.author.name}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <svg className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{template.rating}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
            
            <div className="mt-12 flex justify-center">
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map(page => (
                  <button
                    key={page}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      page === 1
                        ? 'bg-neon-blue text-dark'
                        : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}