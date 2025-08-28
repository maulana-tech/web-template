'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

type Template = {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  rating: number;
  downloads: number;
  features: string[];
  category: string;
  tags: string[];
};

export default function TemplateComparison() {
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  
  const templates: Template[] = [
    {
      id: 'portfolio-pro',
      name: 'Portfolio Pro',
      image: '/templates/portfolio-preview.jpg',
      description: 'Professional portfolio template with dark mode and animations',
      price: 49,
      rating: 4.8,
      downloads: 12500,
      features: [
        'Responsive Design',
        'Dark/Light Mode',
        'Animations',
        'SEO Optimized',
        'Contact Form',
        'Portfolio Gallery'
      ],
      category: 'portfolio',
      tags: ['React', 'Next.js', 'Dark Mode']
    },
    {
      id: 'ecommerce-elite',
      name: 'E-commerce Elite',
      image: '/templates/ecommerce-preview.jpg',
      description: 'Complete e-commerce solution with cart and checkout',
      price: 79,
      rating: 4.6,
      downloads: 8900,
      features: [
        'Product Catalog',
        'Shopping Cart',
        'Checkout Process',
        'Payment Integration',
        'User Accounts',
        'Admin Dashboard'
      ],
      category: 'ecommerce',
      tags: ['React', 'Tailwind', 'E-commerce']
    },
    {
      id: 'blog-master',
      name: 'Blog Master',
      image: '/templates/blog-preview.jpg',
      description: 'Modern blog template with MDX support',
      price: 59,
      rating: 4.7,
      downloads: 6700,
      features: [
        'MDX Support',
        'SEO Optimized',
        'RSS Feed',
        'Comment System',
        'Category Filtering',
        'Search Functionality'
      ],
      category: 'blog',
      tags: ['Next.js', 'MDX', 'Blog']
    },
    {
      id: 'saas-dashboard',
      name: 'SaaS Dashboard',
      image: '/templates/saas-preview.jpg',
      description: 'Professional dashboard for SaaS applications',
      price: 99,
      rating: 4.9,
      downloads: 15200,
      features: [
        'Analytics Dashboard',
        'User Management',
        'Subscription System',
        'API Integration',
        'Data Visualization',
        'Customizable Widgets'
      ],
      category: 'dashboard',
      tags: ['React', 'Analytics', 'SaaS']
    }
  ];
  
  const toggleTemplateSelection = (templateId: string) => {
    setSelectedTemplates(prev => {
      if (prev.includes(templateId)) {
        return prev.filter(id => id !== templateId);
      } else if (prev.length < 3) {
        return [...prev, templateId];
      }
      return prev;
    });
  };
  
  const selectedTemplateObjects = templates.filter(t => selectedTemplates.includes(t.id));
  
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-heading font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Compare Templates
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Select up to 3 templates to compare their features, pricing, and capabilities
          </motion.p>
        </div>
        
        {/* Template Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              className={`card cursor-pointer transition-all duration-300 ${
                selectedTemplates.includes(template.id) 
                  ? 'ring-2 ring-neon-blue scale-105' 
                  : 'hover:shadow-xl'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => toggleTemplateSelection(template.id)}
            >
              <div className="relative h-48 overflow-hidden rounded-t-xl">
                <Image
                  src={template.image}
                  alt={template.name}
                  fill
                  className="object-cover"
                />
                {selectedTemplates.includes(template.id) && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-12 h-12 bg-neon-blue rounded-full flex items-center justify-center">
                      <svg className="h-6 w-6 text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-heading font-bold">{template.name}</h3>
                  <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    <svg className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm">{template.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{template.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-heading font-bold text-neon-blue">${template.price}</span>
                  <span className="text-sm text-gray-500">
                    {template.downloads > 1000 
                      ? `${(template.downloads / 1000).toFixed(1)}k downloads` 
                      : `${template.downloads} downloads`}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Comparison Table */}
        {selectedTemplateObjects.length > 0 && (
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-heading font-bold">Detailed Comparison</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="text-left p-4 font-medium text-gray-500 dark:text-gray-400">Feature</th>
                    {selectedTemplateObjects.map(template => (
                      <th key={template.id} className="p-4 text-center min-w-[200px]">
                        <div className="flex flex-col items-center">
                          <div className="relative w-16 h-16 mb-2">
                            <Image
                              src={template.image}
                              alt={template.name}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <h4 className="font-heading font-bold">{template.name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">${template.price}</p>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="p-4 font-medium">Description</td>
                    {selectedTemplateObjects.map(template => (
                      <td key={template.id} className="p-4 text-center text-sm text-gray-600 dark:text-gray-400">
                        {template.description}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="p-4 font-medium">Rating</td>
                    {selectedTemplateObjects.map(template => (
                      <td key={template.id} className="p-4 text-center">
                        <div className="flex items-center justify-center">
                          <svg className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span>{template.rating}</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="p-4 font-medium">Downloads</td>
                    {selectedTemplateObjects.map(template => (
                      <td key={template.id} className="p-4 text-center">
                        {template.downloads > 1000 
                          ? `${(template.downloads / 1000).toFixed(1)}k` 
                          : template.downloads}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="p-4 font-medium">Category</td>
                    {selectedTemplateObjects.map(template => (
                      <td key={template.id} className="p-4 text-center">
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">
                          {template.category}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-medium align-top">Features</td>
                    {selectedTemplateObjects.map(template => (
                      <td key={template.id} className="p-4">
                        <ul className="space-y-2">
                          {template.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <svg className="h-5 w-5 text-neon-blue mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex justify-end">
              <button className="btn-primary">
                Select Best Match
              </button>
            </div>
          </motion.div>
        )}
        
        {selectedTemplateObjects.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 dark:bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-heading font-bold mb-2">Select Templates to Compare</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Choose up to 3 templates from above to see a detailed comparison of their features and capabilities.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}