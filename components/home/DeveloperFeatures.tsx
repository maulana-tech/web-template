'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function DeveloperFeatures() {
  const [activeTab, setActiveTab] = useState(0);
  
  const tabs = [
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
}`
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
}`
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 mb-6">
              <div className="flex space-x-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
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
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
              <div className="flex border-b border-gray-200 dark:border-gray-800 mb-6">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`px-4 py-2 font-medium transition-colors ${
                      activeTab === index
                        ? 'text-neon-blue border-b-2 border-neon-blue'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    {tab.title}
                  </button>
                ))}
              </div>
              
              <h3 className="text-2xl font-heading font-bold mb-4">{tabs[activeTab].title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{tabs[activeTab].description}</p>
              
              <div className="space-y-4">
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
              </div>
              
              <motion.button
                className="mt-8 btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Documentation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}