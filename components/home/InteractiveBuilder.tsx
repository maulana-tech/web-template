'use client';
'use client'

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box } from '@react-three/drei';
import type { Mesh } from 'three';

// Simple 3D component for the builder
function TemplateElement({ position, color, onClick }: { position: [number, number, number]; color: string; onClick: () => void }) {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime()) * 0.2;
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
    }
  });
  
  return (
    <mesh 
      position={position} 
      ref={meshRef}
      onClick={onClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} metalness={0.2} roughness={0.7} />
    </mesh>
  );
}

export default function InteractiveBuilder() {
  const [elements, setElements] = useState([
    { id: 1, type: 'header', position: [0, 2, 0], color: '#00F0FF' },
    { id: 2, type: 'content', position: [0, 0, 0], color: '#FF00C4' },
    { id: 3, type: 'footer', position: [0, -2, 0], color: '#00F0FF' }
  ]);
  
  const [selectedElement, setSelectedElement] = useState<number | null>(null);
  const [customization, setCustomization] = useState({
    color: '#00F0FF',
    text: 'Template Element',
    size: 1
  });
  
  const addElement = () => {
    const newId = elements.length + 1;
    const newY = elements.length * 1.5;
    setElements([
      ...elements,
      { id: newId, type: 'custom', position: [0, newY, 0], color: customization.color }
    ]);
  };
  
  const removeElement = (id: number) => {
    if (elements.length > 1) {
      setElements(elements.filter(el => el.id !== id));
      if (selectedElement === id) {
        setSelectedElement(null);
      }
    }
  };
  
  const updateElement = (id: number) => {
    setElements(elements.map(el => 
      el.id === id 
        ? { ...el, color: customization.color } 
        : el
    ));
  };
  
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
            Interactive Template Builder
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Build your custom template by dragging, dropping, and customizing elements
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 3D Builder Canvas */}
          <div className="lg:col-span-2">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 h-[500px] relative">
              <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <OrbitControls enableZoom={true} enablePan={true} />
                
                {elements.map((element) => (
                  <TemplateElement
                    key={element.id}
                    position={element.position as [number, number, number]}
                    color={selectedElement === element.id ? '#ffffff' : element.color}
                    onClick={() => setSelectedElement(element.id)}
                  />
                ))}
                
                <Text
                  position={[0, 3.5, 0]}
                  color="white"
                  fontSize={0.5}
                  maxWidth={5}
                  textAlign="center"
                >
                  Click elements to customize
                </Text>
              </Canvas>
              
              <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                <div className="bg-black/50 text-white px-4 py-2 rounded-lg">
                  <p className="text-sm">Drag to rotate • Scroll to zoom</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Customization Panel */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-heading font-bold mb-6">Customize Elements</h3>
            
            {selectedElement ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Element Type</label>
                  <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-lg">
                    <p className="font-medium">
                      {elements.find(el => el.id === selectedElement)?.type?.charAt(0).toUpperCase() + 
                       (elements.find(el => el.id === selectedElement)?.type?.slice(1) || 'Element')}
                    </p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Color</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={customization.color}
                      onChange={(e) => setCustomization({...customization, color: e.target.value})}
                      className="w-12 h-12 border-0 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={customization.color}
                      onChange={(e) => setCustomization({...customization, color: e.target.value})}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-lg"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Size</label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={customization.size}
                    onChange={(e) => setCustomization({...customization, size: parseFloat(e.target.value)})}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>Small</span>
                    <span>Medium</span>
                    <span>Large</span>
                  </div>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => updateElement(selectedElement)}
                    className="flex-1 bg-neon-blue text-dark py-2 px-4 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                  >
                    Apply Changes
                  </button>
                  <button
                    onClick={() => removeElement(selectedElement)}
                    className="flex-1 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-gray-100 dark:bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </div>
                <h4 className="font-heading font-bold text-lg mb-2">Select an Element</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Click on any element in the 3D builder to customize it
                </p>
              </div>
            )}
            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={addElement}
                className="w-full bg-gradient-to-r from-neon-blue to-neon-pink text-dark py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Add New Element
              </button>
              
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  Save Template
                </button>
                <button className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  Export Code
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-12 h-12 bg-neon-blue rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="h-6 w-6 text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="text-lg font-heading font-bold mb-2">Drag & Drop</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Intuitive drag and drop interface for building templates
            </p>
          </motion.div>
          
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="w-12 h-12 bg-neon-pink rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-heading font-bold mb-2">Real-time Preview</h3>
            <p className="text-gray-600 dark:text-gray-400">
              See changes instantly with our real-time preview system
            </p>
          </motion.div>
          
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-pink rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="h-6 w-6 text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <h3 className="text-lg font-heading font-bold mb-2">Export Options</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Export to HTML, React, Vue, or download the complete source code
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}