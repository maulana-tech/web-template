'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type Template = {
  id: string;
  title: string;
  description: string;
  image: string;
  demoUrl: string;
  codeSnippet: string;
  figmaUrl: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
};

export default function TemplateShowcase() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  
  const templates: Template[] = [
    {
      id: 'modern-portfolio',
      title: 'Modern Portfolio',
      description: 'A sleek, minimalist portfolio template with dark mode support and smooth animations.',
      image: '/templates/portfolio-preview.jpg',
      demoUrl: 'https://example.com/demo/portfolio',
      codeSnippet: `import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center"
    >
      <div className="container mx-auto px-4">
        <motion.h1 
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="text-5xl font-bold"
        >
          Hi, I'm <span className="text-blue-500">Alex</span>
        </motion.h1>
        {/* More content here */}
      </div>
    </motion.section>
  );
}`,
      figmaUrl: 'https://figma.com/file/portfolio-template',
      tags: ['Portfolio', 'Dark Mode', 'Next.js'],
      author: {
        name: 'Alex Johnson',
        avatar: '/avatars/alex.jpg'
      }
    },
    {
      id: 'ecommerce-starter',
      title: 'E-commerce Starter',
      description: 'A complete e-commerce template with product listings, cart functionality, and checkout process.',
      image: '/templates/ecommerce-preview.jpg',
      demoUrl: 'https://example.com/demo/ecommerce',
      codeSnippet: `import { useState } from 'react';
import { useCart } from '../hooks/useCart';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  
  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 1000);
  };
  
  return (
    <div className="border rounded-lg overflow-hidden">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold">{product.name}</h3>
        <p className="text-gray-600">${`{product.price}`}</p>
        <button 
          onClick={handleAddToCart}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isAdding ? 'Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}`,
      figmaUrl: 'https://figma.com/file/ecommerce-template',
      tags: ['E-commerce', 'React', 'Tailwind'],
      author: {
        name: 'Sarah Miller',
        avatar: '/avatars/sarah.jpg'
      }
    },
    {
      id: 'blog-platform',
      title: 'Blog Platform',
      description: 'A modern blog template with support for rich content, categories, and comments.',
      image: '/templates/blog-preview.jpg',
      demoUrl: 'https://example.com/demo/blog',
      codeSnippet: `import { formatDate } from '../utils/date';
import { MDXRemote } from 'next-mdx-remote';

export default function BlogPost({ post }) {
  return (
    <article className="max-w-2xl mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="flex items-center mb-6">
        <img 
          src={post.author.avatar} 
          alt={post.author.name}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <p className="font-medium">{post.author.name}</p>
          <p className="text-gray-500 text-sm">
            {formatDate(post.publishedAt)}
          </p>
        </div>
      </div>
      <div className="prose prose-lg">
        <MDXRemote {...post.content} />
      </div>
    </article>
  );
}`,
      figmaUrl: 'https://figma.com/file/blog-template',
      tags: ['Blog', 'Next.js', 'MDX'],
      author: {
        name: 'Michael Chen',
        avatar: '/avatars/michael.jpg'
      }
    }
  ];
  
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
            Featured Templates
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Explore our most popular templates with live previews and code snippets
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              className="card group hover:shadow-xl dark:hover:shadow-gray-800/30 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={template.image}
                  alt={template.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => {
                      setSelectedTemplate(template);
                      setShowPreview(true);
                    }}
                    className="bg-white text-dark px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                  >
                    Quick View
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {template.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-xl font-heading font-bold mb-2">{template.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{template.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Image
                      src={template.author.avatar}
                      alt={template.author.name}
                      width={32}
                      height={32}
                      className="rounded-full mr-2"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{template.author.name}</span>
                  </div>
                  
                  <button
                    onClick={() => {
                      setSelectedTemplate(template);
                      setShowPreview(false);
                    }}
                    className="text-neon-blue hover:underline text-sm font-medium"
                  >
                    View Code
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Template Preview Modal */}
        <AnimatePresence>
          {selectedTemplate && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTemplate(null)}
            >
              <motion.div
                className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-2xl"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={e => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
                  <h3 className="text-xl font-heading font-bold">{selectedTemplate.title}</h3>
                  <button
                    onClick={() => setSelectedTemplate(null)}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="p-4 overflow-y-auto max-h-[calc(90vh-8rem)]">
                  <div className="flex space-x-4 mb-4">
                    <button
                      onClick={() => setShowPreview(true)}
                      className={`px-4 py-2 rounded-lg ${
                        showPreview ? 'bg-neon-blue text-dark' : 'bg-gray-200 dark:bg-gray-800'
                      }`}
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => setShowPreview(false)}
                      className={`px-4 py-2 rounded-lg ${
                        !showPreview ? 'bg-neon-blue text-dark' : 'bg-gray-200 dark:bg-gray-800'
                      }`}
                    >
                      Code
                    </button>
                  </div>
                  
                  {showPreview ? (
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden h-[50vh]">
                      <iframe
                        src={selectedTemplate.demoUrl}
                        className="w-full h-full border-0"
                        title={`${selectedTemplate.title} preview`}
                      />
                    </div>
                  ) : (
                    <div className="rounded-lg overflow-hidden">
                      <SyntaxHighlighter
                        language="jsx"
                        style={vscDarkPlus}
                        showLineNumbers
                        customStyle={{
                          margin: 0,
                          borderRadius: '0.5rem',
                          fontSize: '14px',
                        }}
                      >
                        {selectedTemplate.codeSnippet}
                      </SyntaxHighlighter>
                    </div>
                  )}
                  
                  <div className="mt-4 flex justify-between">
                    <a
                      href={selectedTemplate.figmaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neon-blue hover:underline"
                    >
                      View Figma Design
                    </a>
                    <a
                      href={`/templates/${selectedTemplate.id}`}
                      className="bg-neon-blue text-dark px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                    >
                      View Full Template
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}