'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

type Template = {
  id: string;
  title: string;
  image: string;
  purchaseDate: string;
  lastDownloaded: string;
  version: string;
  hasUpdates: boolean;
};

type Collection = {
  id: string;
  name: string;
  templateCount: number;
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('purchased');
  
  const purchasedTemplates: Template[] = [
    {
      id: 'modern-portfolio',
      title: 'Modern Portfolio',
      image: '/templates/portfolio-preview.jpg',
      purchaseDate: '2023-08-15',
      lastDownloaded: '2023-08-16',
      version: '1.2.0',
      hasUpdates: true
    },
    {
      id: 'ecommerce-starter',
      title: 'E-commerce Starter',
      image: '/templates/ecommerce-preview.jpg',
      purchaseDate: '2023-07-22',
      lastDownloaded: '2023-07-30',
      version: '2.0.1',
      hasUpdates: false
    },
    {
      id: 'blog-platform',
      title: 'Blog Platform',
      image: '/templates/blog-preview.jpg',
      purchaseDate: '2023-06-10',
      lastDownloaded: '2023-08-05',
      version: '1.5.3',
      hasUpdates: true
    }
  ];
  
  const collections: Collection[] = [
    {
      id: 'favorites',
      name: 'Favorites',
      templateCount: 12
    },
    {
      id: 'portfolio-ideas',
      name: 'Portfolio Ideas',
      templateCount: 5
    },
    {
      id: 'client-projects',
      name: 'Client Projects',
      templateCount: 8
    }
  ];
  
  const savedTemplates: Template[] = [
    {
      id: 'saas-landing',
      title: 'SaaS Landing Page',
      image: '/templates/saas-preview.jpg',
      purchaseDate: '',
      lastDownloaded: '',
      version: '1.0.0',
      hasUpdates: false
    },
    {
      id: 'admin-dashboard',
      title: 'Admin Dashboard',
      image: '/templates/dashboard-preview.jpg',
      purchaseDate: '',
      lastDownloaded: '',
      version: '3.1.2',
      hasUpdates: false
    }
  ];
  
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center mb-8">
                <div className="relative w-16 h-16 mr-4">
                  <Image
                    src="/avatars/user.jpg"
                    alt="User Avatar"
                    fill
                    className="rounded-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                </div>
                <div>
                  <h2 className="text-xl font-heading font-bold">John Doe</h2>
                  <p className="text-gray-600 dark:text-gray-400">Pro Member</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('purchased')}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    activeTab === 'purchased'
                      ? 'bg-neon-blue text-dark'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Purchased Templates
                </button>
                <button
                  onClick={() => setActiveTab('collections')}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    activeTab === 'collections'
                      ? 'bg-neon-blue text-dark'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Collections
                </button>
                <button
                  onClick={() => setActiveTab('saved')}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    activeTab === 'saved'
                      ? 'bg-neon-blue text-dark'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  Saved Templates
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-neon-blue text-dark'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Account Settings
                </button>
              </nav>
              
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Pro Membership</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Your membership renews on Sep 15, 2023</p>
                  <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2.5 mb-3">
                    <div className="bg-neon-pink h-2.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <button className="text-sm text-neon-blue hover:underline">Manage Subscription</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-3/4">
            {activeTab === 'purchased' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-heading font-bold">Purchased Templates</h2>
                  <div className="flex items-center">
                    <span className="text-gray-600 dark:text-gray-400 mr-2">Sort by:</span>
                    <select className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-neon-blue">
                      <option>Recently Purchased</option>
                      <option>Recently Downloaded</option>
                      <option>Name (A-Z)</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {purchasedTemplates.map((template, index) => (
                    <motion.div
                      key={template.id}
                      className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex">
                        <div className="w-1/3">
                          <div className="relative h-full">
                            <Image
                              src={template.image}
                              alt={template.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div className="w-2/3 p-6">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-heading font-bold">{template.title}</h3>
                            {template.hasUpdates && (
                              <span className="bg-neon-pink text-white text-xs px-2 py-1 rounded-full">Update Available</span>
                            )}
                          </div>
                          
                          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                            <div className="flex justify-between">
                              <span>Purchased:</span>
                              <span>{new Date(template.purchaseDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Last Downloaded:</span>
                              <span>{new Date(template.lastDownloaded).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Version:</span>
                              <span>{template.version}</span>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <motion.button
                              className="btn-primary text-sm py-2"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Download
                            </motion.button>
                            <Link href={`/templates/${template.id}`} className="btn-secondary text-sm py-2">
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'collections' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-heading font-bold">Your Collections</h2>
                  <motion.button
                    className="btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Create Collection
                  </motion.button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {collections.map((collection, index) => (
                    <motion.div
                      key={collection.id}
                      className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:shadow-xl dark:hover:shadow-gray-800/30 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-heading font-bold">{collection.name}</h3>
                        <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-6">{collection.templateCount} templates</p>
                      
                      <div className="flex justify-between">
                        <button className="text-neon-blue hover:underline text-sm">View Collection</button>
                        <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 text-sm">Edit</button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'saved' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-heading font-bold">Saved Templates</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedTemplates.map((template, index) => (
                    <motion.div
                      key={template.id}
                      className="card group hover:shadow-xl dark:hover:shadow-gray-800/30 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <Link href={`/templates/${template.id}`} className="block">
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={template.image}
                            alt={template.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-xl font-heading font-bold mb-4">{template.title}</h3>
                          
                          <div className="flex justify-between items-center">
                            <button className="text-neon-blue hover:underline text-sm">View Details</button>
                            <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 text-sm flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                              </svg>
                              Saved
                            </button>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div>
                <h2 className="text-2xl font-heading font-bold mb-6">Account Settings</h2>
                
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-8">
                  <h3 className="text-xl font-heading font-bold mb-4">Profile Information</h3>
                  
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium mb-2">First Name</label>
                        <input
                          type="text"
                          id="firstName"
                          defaultValue="John"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium mb-2">Last Name</label>
                        <input
                          type="text"
                          id="lastName"
                          defaultValue="Doe"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        defaultValue="john.doe@example.com"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium mb-2">Bio</label>
                      <textarea
                        id="bio"
                        rows={4}
                        defaultValue="Frontend developer with a passion for clean design and user experience."
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                      ></textarea>
                    </div>
                    
                    <div className="flex justify-end">
                      <motion.button
                        type="submit"
                        className="btn-primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Save Changes
                      </motion.button>
                    </div>
                  </form>
                </div>
                
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-8">
                  <h3 className="text-xl font-heading font-bold mb-4">Change Password</h3>
                  
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium mb-2">Current Password</label>
                      <input
                        type="password"
                        id="currentPassword"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium mb-2">New Password</label>
                      <input
                        type="password"
                        id="newPassword"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <motion.button
                        type="submit"
                        className="btn-primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Update Password
                      </motion.button>
                    </div>
                  </form>
                </div>
                
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-heading font-bold mb-4">Notification Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Template Updates</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Get notified when your purchased templates have updates</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-neon-blue/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-neon-blue"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">New Templates</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Get notified when new templates are added to categories you follow</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-neon-blue/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-neon-blue"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Promotional Emails</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Receive emails about special offers and discounts</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-neon-blue/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-neon-blue"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Monthly Newsletter</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Receive our monthly newsletter with tips and tutorials</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-neon-blue/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-neon-blue"></div>
                      </label>
                    </div>
                    
                    <div className="flex justify-end">
                      <motion.button
                        className="btn-primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Save Preferences
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}