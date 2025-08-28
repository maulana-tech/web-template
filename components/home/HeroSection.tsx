'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, PresentationControls, Environment, OrbitControls } from '@react-three/drei';
import TemplateCard3D from './TemplateCard3D';

export default function HeroSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeCard, setActiveCard] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const carouselRef = useRef<NodeJS.Timeout | null>(null);
  
  const categories = [
    'portfolio', 'e-commerce', 'blog', 'landing page', 'dashboard',
    'admin panel', 'saas', 'mobile app', 'restaurant', 'education'
  ];
  
  const templates = [
    { id: 'portfolio', name: 'Portfolio Pro', position: [-2, 0, 0], rotation: [0, 0.5, 0], scale: 1.2 },
    { id: 'ecommerce', name: 'E-commerce Elite', position: [2, 1, -2], rotation: [0.1, -0.5, 0], scale: 1 },
    { id: 'blog', name: 'Blog Master', position: [0, -1.5, 0], rotation: [-0.1, 0, 0], scale: 1.5 },
    { id: 'landing', name: 'Landing Page', position: [3, -0.5, -1], rotation: [0, 0.3, 0.1], scale: 1.1 },
    { id: 'dashboard', name: 'Dashboard Pro', position: [-3, 1, 1], rotation: [0.2, -0.3, 0], scale: 1.3 }
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
  
  // Auto-rotate carousel
  useEffect(() => {
    if (isPlaying) {
      carouselRef.current = setInterval(() => {
        setActiveCard(prev => (prev + 1) % templates.length);
      }, 3000);
    }
    
    return () => {
      if (carouselRef.current) {
        clearInterval(carouselRef.current);
      }
    };
  }, [isPlaying, templates.length]);
  
  const stats = [
    { value: '500+', label: 'Templates' },
    { value: '200k+', label: 'Downloads' },
    { value: '10k+', label: 'Developers' }
  ];
  
  const handleCardClick = (index: number) => {
    setActiveCard(index);
    setIsPlaying(false);
    if (carouselRef.current) {
      clearInterval(carouselRef.current);
    }
  };
  
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
            <motion.h1 
              className="text-4xl md:text-6xl font-heading font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Modern Templates for the{' '}
              <motion.span 
                className="bg-clip-text text-transparent gradient-bg"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Modern Web
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Discover premium, responsive website templates built with the latest technologies.
              Download, customize, and deploy in minutes.
            </motion.p>
            
            {/* Search bar */}
            <div className="relative mb-8">
              <motion.input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search templates (e.g., portfolio, e-commerce)"
                className="w-full px-5 py-4 rounded-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-neon-blue shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileFocus={{ scale: 1.02 }}
              />
              <motion.button 
                className="absolute right-2 top-2 bg-neon-blue text-dark p-2 rounded-full hover:bg-opacity-90 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </motion.button>
              
              {/* Search suggestions */}
              <AnimatePresence>
                {suggestions.length > 0 && (
                  <motion.div
                    className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-20 border border-gray-200 dark:border-gray-700"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <ul>
                      {suggestions.map((suggestion, index) => (
                        <motion.li 
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                          onClick={() => {
                            setSearchTerm(suggestion);
                            setSuggestions([]);
                          }}
                          whileHover={{ backgroundColor: '#f3f4f6' }}
                          dark-whileHover={{ backgroundColor: '#374151' }}
                        >
                          {suggestion}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="/templates"
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Browse Templates
              </motion.a>
              
              <motion.a
                href="/pricing"
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                View Pricing
              </motion.a>
            </div>
            
            {/* Template preview carousel indicators */}
            <div className="mt-8 flex items-center">
              <div className="flex space-x-2">
                {templates.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleCardClick(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === activeCard 
                        ? 'bg-neon-blue' 
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="ml-4 text-sm text-neon-blue hover:underline"
              >
                {isPlaying ? 'Pause' : 'Play'}
              </button>
            </div>
            
            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
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
            className="h-[500px] relative"
          >
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <Environment preset="city" />
              <PresentationControls
                global
                zoom={0.8}
                rotation={[0, 0, 0]}
                polar={[-Math.PI / 4, Math.PI / 4]}
                azimuth={[-Math.PI / 4, Math.PI / 4]}
              >
                <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                  {templates.map((template, index) => (
                    <group
                      key={template.id}
                    >
                      <TemplateCard3D 
                        position={template.position as [number, number, number]} 
                        rotation={template.rotation as [number, number, number]} 
                        scale={template.scale} 
                        templateId={template.id} 
                      />
                    </group>
                  ))}
                </Float>
              </PresentationControls>
              <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
            
            {/* Template name overlay */}
            <motion.div 
              className="absolute bottom-4 left-0 right-0 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-heading font-bold text-white bg-black/50 px-4 py-2 rounded-lg inline-block">
                {templates[activeCard].name}
              </h3>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}