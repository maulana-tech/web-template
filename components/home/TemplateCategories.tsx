'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

type Category = {
  id: string;
  name: string;
  image: string;
  count: number;
  description: string;
};

type Filter = {
  industry: string[];
  framework: string[];
  style: string[];
  search: string;
};

export default function TemplateCategories() {
  const [activeFilters, setActiveFilters] = useState<Filter>({
    industry: [],
    framework: [],
    style: [],
    search: ''
  });
  
  const industries = [
    'All', 'Education', 'SaaS', 'E-commerce', 'Portfolio', 
    'Blog', 'Agency', 'Restaurant', 'Healthcare', 'Real Estate', 'Travel'
  ];
  
  const frameworks = [
    'All', 'Next.js', 'React', 'Vue', 'HTML/CSS', 'Tailwind', 'Angular', 'Svelte'
  ];
  
  const styles = [
    'All', 'Minimal', 'Dark Mode', 'Colorful', 'Glassmorphism', 'Neumorphism', 'Brutalism', 'Retro'
  ];
  
  const categories: Category[] = [
    {
      id: 'portfolio',
      name: 'Portfolio Templates',
      image: '/templates/portfolio-category.jpg',
      count: 48,
      description: 'Showcase your work with stunning portfolio templates'
    },
    {
      id: 'ecommerce',
      name: 'E-commerce Templates',
      image: '/templates/ecommerce-category.jpg',
      count: 36,
      description: 'Build online stores with conversion-focused designs'
    },
    {
      id: 'blog',
      name: 'Blog Templates',
      image: '/templates/blog-category.jpg',
      count: 24,
      description: 'Create content-rich blogs with beautiful layouts'
    },
    {
      id: 'dashboard',
      name: 'Dashboard Templates',
      image: '/templates/dashboard-category.jpg',
      count: 18,
      description: 'Professional dashboards for data visualization'
    },
    {
      id: 'landing',
      name: 'Landing Page Templates',
      image: '/templates/landing-category.jpg',
      count: 42,
      description: 'High-converting landing pages for marketing campaigns'
    },
    {
      id: 'saas',
      name: 'SaaS Templates',
      image: '/templates/saas-category.jpg',
      count: 15,
      description: 'Complete solutions for software as a service products'
    },
    {
      id: 'restaurant',
      name: 'Restaurant Templates',
      image: '/templates/restaurant-category.jpg',
      count: 22,
      description: 'Beautiful websites for restaurants and food businesses'
    },
    {
      id: 'agency',
      name: 'Agency Templates',
      image: '/templates/agency-category.jpg',
      count: 31,
      description: 'Professional templates for creative agencies'
    }
  ];
  
  const toggleFilter = (type: keyof Filter, value: string) => {
    if (type === 'search') {
      setActiveFilters(prev => ({
        ...prev,
        search: value
      }));
      return;
    }
    
    setActiveFilters(prev => {
      // If "All" is selected, clear other filters of this type
      if (value === 'All') {
        return {
          ...prev,
          [type]: []
        };
      }
      
      // If the filter is already active, remove it
      if (prev[type].includes(value)) {
        return {
          ...prev,
          [type]: prev[type].filter(item => item !== value)
        };
      }
      
      // Otherwise, add it
      return {
        ...prev,
        [type]: [...prev[type], value]
      };
    });
  };
  
  const isFilterActive = (type: keyof Filter, value: string) => {
    if (type === 'search') return false;
    if (value === 'All') {
      return activeFilters[type].length === 0;
    }
    return activeFilters[type].includes(value);
  };
  
  // Filter categories based on active filters
  const filteredCategories = useMemo(() => {
    if (!activeFilters.search && activeFilters.industry.length === 0 && 
        activeFilters.framework.length === 0 && activeFilters.style.length === 0) {
      return categories;
    }
    
    return categories.filter(category => {
      // Search filter
      if (activeFilters.search) {
        const term = activeFilters.search.toLowerCase();
        if (!category.name.toLowerCase().includes(term) && 
            !category.description.toLowerCase().includes(term)) {
          return false;
        }
      }
      
      // For now, we'll just return all categories since we don't have detailed tags
      // In a real implementation, we would filter based on the category's tags
      return true;
    });
  }, [categories, activeFilters]);
  
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
            Browse by Category
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Find the perfect template for your next project
          </motion.p>
        </div>
        
        {/* Search bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-neon-blue pl-10"
              value={activeFilters.search}
              onChange={(e) => toggleFilter('search', e.target.value)}
            />
            <svg 
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        {/* Filter tabs */}
        <div className="mb-12">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Industry</h3>
            <div className="flex flex-wrap gap-2">
              {industries.map(industry => (
                <motion.button
                  key={industry}
                  onClick={() => toggleFilter('industry', industry)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isFilterActive('industry', industry)
                      ? 'bg-neon-blue text-dark'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {industry}
                </motion.button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Framework</h3>
            <div className="flex flex-wrap gap-2">
              {frameworks.map(framework => (
                <motion.button
                  key={framework}
                  onClick={() => toggleFilter('framework', framework)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isFilterActive('framework', framework)
                      ? 'bg-neon-pink text-white'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {framework}
                </motion.button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Style</h3>
            <div className="flex flex-wrap gap-2">
              {styles.map(style => (
                <motion.button
                  key={style}
                  onClick={() => toggleFilter('style', style)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isFilterActive('style', style)
                      ? 'bg-gradient-to-r from-neon-blue to-neon-pink text-white'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {style}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Category grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-heading font-bold mb-1">{category.name}</h3>
                <p className="text-sm text-gray-200 mb-2">{category.description}</p>
                <p className="text-sm text-gray-300">{category.count} templates</p>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <motion.button
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Templates
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Clear filters button */}
        {(activeFilters.search || activeFilters.industry.length > 0 || 
          activeFilters.framework.length > 0 || activeFilters.style.length > 0) && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setActiveFilters({ industry: [], framework: [], style: [], search: '' })}
              className="text-neon-blue hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}