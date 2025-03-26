'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, PresentationControls } from '@react-three/drei';
import TemplateCard3D from './TemplateCard3D';

export default function HeroSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  const categories = [
    'portfolio', 'e-commerce', 'blog', 'landing page', 'dashboard',
    'admin panel', 'saas', 'mobile app', 'restaurant', 'education'
  ];
  
  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = categories.filter(cat => 
        cat.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);
  
  const stats = [
    { value: '500+', label: 'Templates' },
    { value: '200k+', label: 'Downloads' },
    { value: '10k+', label: 'Developers' }
  ];
  
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 via-white dark:via-dark to-neon-pink/20 animate-gradient-x" />
      
      {/* Content container */}
      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Modern Templates for the{' '}
              <span className="bg-clip-text text-transparent gradient-bg">
                Modern Web
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Discover premium, responsive website templates built with the latest technologies.
              Download, customize, and deploy in minutes.
            </p>
            
            {/* Search bar */}
            <div className="relative mb-8">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search templates (e.g., portfolio, e-commerce)"
                className="w-full px-5 py-4 rounded-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-neon-blue shadow-lg"
              />
              <button className="absolute right-2 top-2 bg-neon-blue text-dark p-2 rounded-full hover:bg-opacity-90 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              {/* Search suggestions */}
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-20 border border-gray-200 dark:border-gray-700">
                  <ul>
                    {suggestions.map((suggestion, index) => (
                      <li 
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => {
                          setSearchTerm(suggestion);
                          setSuggestions([]);
                        }}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="/templates"
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Browse Templates
              </motion.a>
              
              <motion.a
                href="/pricing"
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Pricing
              </motion.a>
            </div>
            
            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <h3 className="text-3xl md:text-4xl font-heading font-bold bg-clip-text text-transparent gradient-bg">
                    {stat.value}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* 3D Template Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-[500px]"
          >
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <PresentationControls
                global
                zoom={0.8}
                rotation={[0, 0, 0]}
                polar={[-Math.PI / 4, Math.PI / 4]}
                azimuth={[-Math.PI / 4, Math.PI / 4]}
              >
                <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                  <TemplateCard3D position={[-2, 0, 0]} rotation={[0, 0.5, 0]} scale={1.2} templateId="portfolio" />
                  <TemplateCard3D position={[2, 1, -2]} rotation={[0.1, -0.5, 0]} scale={1} templateId="ecommerce" />
                  <TemplateCard3D position={[0, -1.5, 0]} rotation={[-0.1, 0, 0]} scale={1.5} templateId="blog" />
                </Float>
              </PresentationControls>
            </Canvas>
          </motion.div>
        </div>
      </div>
    </section>
  );
}