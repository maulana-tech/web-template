'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Image from 'next/image';

type Template = {
  id: string;
  title: string;
  description: string;
  image: string;
  demoUrl: string;
  codeSnippet: string;
  figmaUrl: string;
  githubUrl: string;
  price: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
};

export default function TemplateDetailPage() {
  const params = useParams();
  const { id } = params;
  
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [previewWidth, setPreviewWidth] = useState('100%');
  const [activeTab, setActiveTab] = useState('preview');
  
  useEffect(() => {
    // In a real app, fetch the template data from an API
    // For now, we'll simulate a fetch with setTimeout
    setTimeout(() => {
      setTemplate({
        id: id as string,
        title: 'Modern Portfolio Template',
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
        githubUrl: 'https://github.com/templatehub/portfolio-template',
        price: 49,
        rating: 4.8,
        reviewCount: 124,
        tags: ['Portfolio', 'Dark Mode', 'Next.js'],
        author: {
          name: 'Alex Johnson',
          avatar: '/avatars/alex.jpg'
        }
      });
      setLoading(false);
    }, 1000);
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-blue"></div>
      </div>
    );
  }
  
  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Template not found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The template you're looking for doesn't exist or has been removed.</p>
          <a href="/templates" className="btn-primary">Browse Templates</a>
        </div>
      </div>
    );
  }
  
  const previewSizes = [
    { name: 'Mobile', width: '375px' },
    { name: 'Tablet', width: '768px' },
    { name: 'Desktop', width: '100%' }
  ];
  
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">{template.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">{template.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {template.tags.map(tag => (
                <span key={tag} className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                {[1, 2, 3, 4, 5].map(star => (
                  <svg
                    key={star}
                    className={`h-5 w-5 ${star <= Math.round(template.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 text-gray-600 dark:text-gray-400">{template.rating}</span>
              </div>
              <span className="text-gray-600 dark:text-gray-400">{template.reviewCount} reviews</span>
            </div>
            <div className="flex items-center">
              <Image
                src={template.author.avatar}
                alt={template.author.name}
                width={32}
                height={32}
                className="rounded-full mr-2"
              />
              <span className="text-gray-600 dark:text-gray-400">By {template.author.name}</span>
            </div>
          </div>
          
          <div className="mt-6 lg:mt-0 flex flex-col items-end">
            <div className="text-3xl font-heading font-bold mb-4">${template.price}</div>
            <div className="flex gap-4">
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Buy Now
              </motion.button>
              <motion.button
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Save to Collection
              </motion.button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-800 p-4 flex justify-between items-center">
              <div className="flex space-x-4">
                {previewSizes.map(size => (
                  <button
                    key={size.name}
                    onClick={() => setPreviewWidth(size.width)}
                    className={`px-3 py-1 rounded-md text-sm ${
                      previewWidth === size.width
                        ? 'bg-neon-blue text-dark'
                        : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
              <a
                href={template.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon-blue hover:underline text-sm"
              >
                Open in New Tab
              </a>
            </div>
            <div className="p-4 h-[600px] overflow-auto flex justify-center">
              <div style={{ width: previewWidth, transition: 'width 0.3s ease' }}>
                <iframe
                  src={template.demoUrl}
                  className="w-full h-full border-0 rounded-lg shadow-sm"
                  title={`${template.title} preview`}
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-800 p-4">
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1 rounded-md text-sm ${
                    activeTab === 'preview'
                      ? 'bg-neon-blue text-dark'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Code Preview
                </button>
                <button
                  onClick={() => setActiveTab('features')}
                  className={`px-3 py-1 rounded-md text-sm ${
                    activeTab === 'features'
                      ? 'bg-neon-blue text-dark'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Features
                </button>
                <button
                  onClick={() => setActiveTab('docs')}
                  className={`px-3 py-1 rounded-md text-sm ${
                    activeTab === 'docs'
                      ? 'bg-neon-blue text-dark'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Documentation
                </button>
              </div>
            </div>
            
            <div className="p-4 h-[600px] overflow-auto">
              {activeTab === 'preview' && (
                <SyntaxHighlighter
                  language="jsx"
                  style={vscDarkPlus}
                  showLineNumbers
                  customStyle={{
                    margin: 0,
                    borderRadius: '0.5rem',
                    height: '100%',
                  }}
                >
                  {template.codeSnippet}
                </SyntaxHighlighter>
              )}
              
              {activeTab === 'features' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-heading font-bold">Template Features</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-neon-blue mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Responsive design for all devices</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-neon-blue mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Dark/Light mode toggle</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-neon-blue mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Smooth animations with Framer Motion</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-neon-blue mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>SEO optimized</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-neon-blue mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>TypeScript support</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-neon-blue mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Tailwind CSS for styling</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-neon-blue mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Contact form with validation</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-neon-blue mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Blog section with MDX support</span>
                    </li>
                  </ul>
                </div>
              )}
              
              {activeTab === 'docs' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-heading font-bold">Documentation</h3>
                  <div className="prose prose-lg dark:prose-invert">
                    <h4>Getting Started</h4>
                    <p>
                      To get started with this template, follow these steps:
                    </p>
                    <ol>
                      <li>Download the template files</li>
                      <li>Install dependencies with <code>npm install</code></li>
                      <li>Run the development server with <code>npm run dev</code></li>
                      <li>Customize the content in the <code>src/content</code> directory</li>
                      <li>Deploy to your favorite hosting platform</li>
                    </ol>
                    
                    <h4>Customization</h4>
                    <p>
                      This template is built with customization in mind. You can easily change the colors, fonts, and layout by editing the Tailwind configuration file.
                    </p>
                    
                    <h4>Support</h4>
                    <p>
                      If you need help with this template, please contact our support team at support@templatehub.com.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-heading font-bold mb-6">Download Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 text-center">
              <h4 className="text-xl font-heading font-bold mb-4">Full Code</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Download the complete source code as a ZIP file.</p>
              <motion.button
                className="btn-primary w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download ZIP
              </motion.button>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 text-center">
              <h4 className="text-xl font-heading font-bold mb-4">Figma File</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Access the Figma design file for this template.</p>
              <motion.a
                href={template.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Open in Figma
              </motion.a>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 text-center">
              <h4 className="text-xl font-heading font-bold mb-4">GitHub</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Clone or fork the repository on GitHub.</p>
              <motion.a
                href={template.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900 text-white dark:bg-gray-700 w-full inline-block px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-gray-800 dark:hover:bg-gray-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View on GitHub
              </motion.a>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-heading font-bold mb-6">Reviews</h3>
          
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                {[1, 2, 3, 4, 5].map(star => (
                  <svg
                    key={star}
                    className="h-8 w-8 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-3xl font-bold">{template.rating}</span>
              </div>
              <span className="text-gray-600 dark:text-gray-400 text-lg">{template.reviewCount} reviews</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: '5 stars', percentage: 85 },
                { name: '4 stars', percentage: 10 },
                { name: '3 stars', percentage: 3 },
                { name: '2 stars', percentage: 1 },
                { name: '1 star', percentage: 1 }
              ].map(rating => (
                <div key={rating.name} className="flex items-center">
                  <span className="w-16 text-sm text-gray-600 dark:text-gray-400">{rating.name}</span>
                  <div className="flex-1 h-4 mx-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-400 rounded-full" 
                      style={{ width: `${rating.percentage}%` }}
                    ></div>
                  </div>
                  <span className="w-12 text-sm text-gray-600 dark:text-gray-400">{rating.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mb-8">
            <h4 className="text-xl font-heading font-bold mb-4">Customer Reviews</h4>
            
            <div className="space-y-6">
              {[
                {
                  id: 1,
                  author: 'Sarah Johnson',
                  avatar: '/avatars/sarah.jpg',
                  rating: 5,
                  date: '2023-08-15',
                  content: 'This template is absolutely amazing! The design is clean and modern, and the code is well-structured and easy to customize. I was able to launch my portfolio website in just a few hours. Highly recommended!'
                },
                {
                  id: 2,
                  author: 'Michael Chen',
                  avatar: '/avatars/michael.jpg',
                  rating: 4,
                  date: '2023-07-28',
                  content: 'Great template with excellent documentation. The only reason I\'m giving 4 stars instead of 5 is that I had some issues with the mobile responsiveness on very small screens, but the support team helped me fix it quickly.'
                },
                {
                  id: 3,
                  author: 'Emily Rodriguez',
                  avatar: '/avatars/emily.jpg',
                  rating: 5,
                  date: '2023-06-12',
                  content: 'I\'ve purchased several templates before, but this one stands out for its attention to detail and performance optimization. The animations are smooth, and the page load times are impressive. Worth every penny!'
                }
              ].map(review => (
                <div key={review.id} className="border-b border-gray-200 dark:border-gray-800 pb-6 last:border-0">
                  <div className="flex items-center mb-3">
                    <Image
                      src={review.avatar}
                      alt={review.author}
                      width={40}
                      height={40}
                      className="rounded-full mr-3"
                    />
                    <div>
                      <h5 className="font-medium">{review.author}</h5>
                      <div className="flex items-center">
                        <div className="flex mr-2">
                          {[1, 2, 3, 4, 5].map(star => (
                            <svg
                              key={star}
                              className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(review.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{review.content}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
            <h4 className="text-xl font-heading font-bold mb-4">Write a Review</h4>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      className="text-gray-300 hover:text-yellow-400 focus:outline-none"
                    >
                      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="review" className="block text-sm font-medium mb-2">Your Review</label>
                <textarea
                  id="review"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                  placeholder="Share your experience with this template..."
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Submit Review
              </motion.button>
            </form>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-heading font-bold mb-6">Related Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                id: 'blog-minimal',
                title: 'Minimal Blog',
                image: '/templates/blog-preview.jpg',
                rating: 4.7,
                price: 39
              },
              {
                id: 'portfolio-dark',
                title: 'Dark Portfolio',
                image: '/templates/portfolio-dark-preview.jpg',
                rating: 4.9,
                price: 49
              },
              {
                id: 'resume-template',
                title: 'Professional Resume',
                image: '/templates/resume-preview.jpg',
                rating: 4.6,
                price: 29
              }
            ].map(relatedTemplate => (
              <motion.div
                key={relatedTemplate.id}
                className="card group hover:shadow-xl dark:hover:shadow-gray-800/30 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={relatedTemplate.image}
                    alt={relatedTemplate.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-heading font-bold mb-2">{relatedTemplate.title}</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">{relatedTemplate.rating}</span>
                    </div>
                    <span className="font-medium">${relatedTemplate.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}