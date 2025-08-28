'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

type Template = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  rating: number;
  downloads: number;
  price: number;
};

export default function TemplateRecommendations() {
  const [recommendedTemplates, setRecommendedTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [preferences, setPreferences] = useState({
    category: 'all',
    style: 'all',
    framework: 'all'
  });
  
  // Mock template data
  const allTemplates: Template[] = [
    {
      id: 'portfolio-pro',
      title: 'Portfolio Pro',
      description: 'Professional portfolio template with dark mode and animations',
      image: '/templates/portfolio-preview.jpg',
      category: 'portfolio',
      tags: ['React', 'Next.js', 'Dark Mode'],
      rating: 4.8,
      downloads: 12500,
      price: 49
    },
    {
      id: 'ecommerce-elite',
      title: 'E-commerce Elite',
      description: 'Complete e-commerce solution with cart and checkout',
      image: '/templates/ecommerce-preview.jpg',
      category: 'ecommerce',
      tags: ['React', 'Tailwind', 'E-commerce'],
      rating: 4.6,
      downloads: 8900,
      price: 79
    },
    {
      id: 'blog-master',
      title: 'Blog Master',
      description: 'Modern blog template with MDX support',
      image: '/templates/blog-preview.jpg',
      category: 'blog',
      tags: ['Next.js', 'MDX', 'Blog'],
      rating: 4.7,
      downloads: 6700,
      price: 59
    },
    {
      id: 'saas-dashboard',
      title: 'SaaS Dashboard',
      description: 'Professional dashboard for SaaS applications',
      image: '/templates/saas-preview.jpg',
      category: 'dashboard',
      tags: ['React', 'Analytics', 'SaaS'],
      rating: 4.9,
      downloads: 15200,
      price: 99
    },
    {
      id: 'landing-pro',
      title: 'Landing Page Pro',
      description: 'High-converting landing page template',
      image: '/templates/landing-preview.jpg',
      category: 'landing',
      tags: ['Marketing', 'Conversion', 'Landing Page'],
      rating: 4.5,
      downloads: 21500,
      price: 39
    },
    {
      id: 'restaurant-template',
      title: 'Restaurant Template',
      description: 'Beautiful template for restaurants with menu display',
      image: '/templates/restaurant-preview.jpg',
      category: 'restaurant',
      tags: ['Food', 'E-commerce', 'Restaurant'],
      rating: 4.4,
      downloads: 7800,
      price: 69
    }
  ];
  
  // Simulate fetching recommendations based on user preferences
  useEffect(() => {
    setLoading(true);
    
    // In a real app, this would be an API call
    const timer = setTimeout(() => {
      // Filter templates based on preferences
      let filtered = [...allTemplates];
      
      if (preferences.category !== 'all') {
        filtered = filtered.filter(template => template.category === preferences.category);
      }
      
      if (preferences.style !== 'all') {
        // This would be more sophisticated in a real app
        filtered = filtered.filter(template => 
          template.tags.some(tag => 
            tag.toLowerCase().includes(preferences.style.toLowerCase())
          )
        );
      }
      
      if (preferences.framework !== 'all') {
        filtered = filtered.filter(template => 
          template.tags.some(tag => 
            tag.toLowerCase().includes(preferences.framework.toLowerCase())
          )
        );
      }
      
      // Sort by rating and downloads
      filtered.sort((a, b) => {
        // Primary sort by rating
        if (b.rating !== a.rating) {
          return b.rating - a.rating;
        }
        // Secondary sort by downloads
        return b.downloads - a.downloads;
      });
      
      // Take top 4 recommendations
      setRecommendedTemplates(filtered.slice(0, 4));
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [preferences]);
  
  const categories = ['all', 'portfolio', 'ecommerce', 'blog', 'dashboard', 'landing', 'restaurant'];
  const styles = ['all', 'minimal', 'dark', 'colorful', 'glassmorphism'];
  const frameworks = ['all', 'react', 'nextjs', 'vue', 'angular'];
  
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
            Recommended For You
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Templates personalized based on your preferences and browsing history
          </motion.p>
        </div>
        
        {/* Preference filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-12 max-w-4xl mx-auto">
          <h3 className="text-lg font-heading font-bold mb-4">Customize Your Recommendations</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue"
                value={preferences.category}
                onChange={(e) => setPreferences({...preferences, category: e.target.value})}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Style</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue"
                value={preferences.style}
                onChange={(e) => setPreferences({...preferences, style: e.target.value})}
              >
                {styles.map(style => (
                  <option key={style} value={style}>
                    {style === 'all' ? 'All Styles' : style.charAt(0).toUpperCase() + style.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Framework</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue"
                value={preferences.framework}
                onChange={(e) => setPreferences({...preferences, framework: e.target.value})}
              >
                {frameworks.map(framework => (
                  <option key={framework} value={framework}>
                    {framework === 'all' ? 'All Frameworks' : framework === 'nextjs' ? 'Next.js' : framework.charAt(0).toUpperCase() + framework.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Recommended templates */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-blue"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {recommendedTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                className="card group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-48 overflow-hidden rounded-t-xl">
                  <Image
                    src={template.image}
                    alt={template.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 bg-neon-blue text-dark text-xs font-bold px-2 py-1 rounded">
                    ${template.price}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-heading font-bold">{template.title}</h3>
                    <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      <svg className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm">{template.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{template.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {template.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      {template.downloads > 1000 ? `${(template.downloads / 1000).toFixed(1)}k` : template.downloads}
                    </div>
                    
                    <button className="text-neon-blue hover:underline text-sm font-medium">
                      View Template
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Personalization note */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Recommendations are based on your preferences and browsing history. 
            <button className="text-neon-blue hover:underline ml-1">
              Adjust preferences
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}