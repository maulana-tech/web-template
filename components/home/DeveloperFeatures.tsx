'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Lazy load syntax highlighter to reduce initial bundle
const SyntaxHighlighter = dynamic(
  () => import('react-syntax-highlighter/dist/esm/prism-async-light').then((mod) => mod.default),
  { 
    ssr: false,
    loading: () => <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
  }
);

export default function DeveloperFeatures() {
  const [activeTab, setActiveTab] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [codeOutput, setCodeOutput] = useState<string>('');
  
  // Memoize tabs data to prevent recreation on each render
  const tabs = useMemo(() => [
    {
      title: 'Dark/Light Mode',
      description: 'Our templates come with built-in dark and light mode support using CSS variables and Tailwind CSS.',
      code: `// ThemeProvider.tsx
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);
  
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}`,
      output: `<div class="p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <h1 class="text-2xl font-bold">Theme Example</h1>
  <p class="mt-2">This text changes color based on theme</p>
  <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
    Theme Toggle Button
  </button>
</div>`
    },
    {
      title: 'API Integration',
      description: 'Easily integrate with our API to fetch templates, user data, and more.',
      code: `// api.ts
import { Template, User } from './types';

const API_URL = 'https://api.templatehub.com';

export async function fetchTemplates(options?: {
  category?: string;
  tags?: string[];
  search?: string;
  page?: number;
  limit?: number;
}): Promise<{ templates: Template[]; total: number }> {
  const params = new URLSearchParams();
  
  if (options?.category) {
    params.append('category', options.category);
  }
  
  if (options?.tags?.length) {
    options.tags.forEach(tag => params.append('tags', tag));
  }
  
  if (options?.search) {
    params.append('search', options.search);
  }
  
  params.append('page', String(options?.page || 1));
  params.append('limit', String(options?.limit || 10));
  
  const response = await fetch(\`\${API_URL}/templates?\${params.toString()}\`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch templates');
  }
  
  return response.json();
}

export async function fetchTemplateById(id: string): Promise<Template> {
  const response = await fetch(\`\${API_URL}/templates/\${id}\`);
  
  if (!response.ok) {
    throw new Error(\`Template with ID \${id} not found\`);
  }
  
  return response.json();
}`,
      output: `{
  "templates": [
    {
      "id": "portfolio-pro",
      "title": "Portfolio Pro",
      "category": "portfolio",
      "tags": ["react", "nextjs", "portfolio"],
      "downloads": 12500,
      "rating": 4.8
    },
    {
      "id": "ecommerce-starter",
      "title": "E-commerce Starter",
      "category": "ecommerce",
      "tags": ["react", "tailwind", "ecommerce"],
      "downloads": 8900,
      "rating": 4.6
    }
  ],
  "total": 2
}`
    },
    {
      title: 'Quick Start Tutorial',
      description: 'Build your first site in 5 minutes with our step-by-step tutorial.',
      code: `// Step 1: Install dependencies
npm install next react react-dom tailwindcss

// Step 2: Create a new Next.js app
npx create-next-app@latest my-template --typescript --tailwind

// Step 3: Import the template
import { Hero, Features, Pricing } from '@templatehub/components';

// Step 4: Use the components in your page
export default function Home() {
  return (
    <main>
      <Hero 
        title="My Awesome Website" 
        subtitle="Built with TemplateHub in minutes"
      />
      <Features items={[
        { title: 'Fast', description: 'Optimized for speed' },
        { title: 'Responsive', description: 'Looks great on all devices' },
        { title: 'Modern', description: 'Using the latest technologies' }
      ]} />
      <Pricing />
    </main>
  );
}`,
      output: `<div class="min-h-screen">
  <header class="bg-white dark:bg-gray-900 shadow">
    <div class="container mx-auto px-4 py-6">
      <h1 class="text-2xl font-bold">My Awesome Website</h1>
    </div>
  </header>
  <main>
    <section class="py-20 text-center">
      <h2 class="text-4xl font-bold mb-4">Built with TemplateHub in minutes</h2>
      <p class="text-xl text-gray-600">Professional templates for modern websites</p>
    </section>
    <!-- Features and Pricing sections would appear here -->
  </main>
</div>`
    },
    {
      title: 'Component Customization',
      description: 'Easily customize components to match your brand identity.',
      code: `// Customizing a component
import { Button } from '@templatehub/components';

export default function CustomButton() {
  return (
    <Button 
      variant="primary"
      size="lg"
      className="rounded-full px-8 hover:shadow-lg transition-shadow"
      style={{
        background: 'linear-gradient(45deg, #FF00C4, #00F0FF)',
        border: 'none'
      }}
    >
      Custom Gradient Button
    </Button>
  );
}`,
      output: `<button 
  class="px-8 py-3 rounded-full text-white font-medium hover:shadow-lg transition-shadow"
  style="background: linear-gradient(45deg, #FF00C4, #00F0FF); border: none;">
  Custom Gradient Button
</button>`
    }
  ], []);
  
  // Simulate code output with memoized effect
  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        setCodeOutput(tabs[activeTab].output);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [activeTab, isPlaying, tabs]);
  
  // Memoized copy function to prevent re-creation
  const copyToClipboard = useCallback((text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }, []);
  
  // Memoized tab change handler
  const handleTabChange = useCallback((index: number) => {
    setActiveTab(index);
  }, []);
  
  // Memoized play toggle handler
  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);
  
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
            Developer-Friendly Features
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Built with developers in mind, our templates include features that make your life easier
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => copyToClipboard(tabs[activeTab].code, activeTab)}
                    className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    {copiedIndex === activeTab ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
              <SyntaxHighlighter
                language="typescript"
                style={vscDarkPlus}
                showLineNumbers
                customStyle={{
                  margin: 0,
                  borderRadius: '0.5rem',
                  fontSize: '14px',
                  backgroundColor: 'transparent'
                }}
              >
                {tabs[activeTab].code}
              </SyntaxHighlighter>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-heading font-bold">Live Preview</h3>
                <button
                  onClick={togglePlay}
                  className="text-sm bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 min-h-[200px]">
                {codeOutput ? (
                  <pre className="text-sm whitespace-pre-wrap">{codeOutput}</pre>
                ) : (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-blue"></div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 sticky top-24">
              <div className="flex border-b border-gray-200 dark:border-gray-800 mb-6">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => handleTabChange(index)}
                    className={`px-4 py-2 font-medium transition-colors relative ${
                      activeTab === index
                        ? 'text-neon-blue'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    {tab.title}
                    {activeTab === index && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-blue"
                        layoutId="tabIndicator"
                      />
                    )}
                  </button>
                ))}
              </div>
              
              <h3 className="text-2xl font-heading font-bold mb-4">{tabs[activeTab].title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{tabs[activeTab].description}</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-neon-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Easy to implement</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-neon-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Well-documented</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-neon-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>TypeScript support</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-neon-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Responsive by default</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <motion.button
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Documentation
                </motion.button>
                
                <motion.button
                  className="btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Try Demo
                </motion.button>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                <h4 className="font-heading font-bold mb-3">Related Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-neon-blue hover:underline flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      API Reference
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-neon-blue hover:underline flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Component Guide
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-neon-blue hover:underline flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Best Practices
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}