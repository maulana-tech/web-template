'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    setIsSubmitted(true);
    setEmail('');
    
    // Reset the submitted state after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };
  
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">TemplateHub</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The modern marketplace for premium website templates and UI kits.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-heading font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/docs" className="text-gray-600 dark:text-gray-400 hover:text-neon-blue transition-colors">Documentation</Link></li>
              <li><Link href="/tutorials" className="text-gray-600 dark:text-gray-400 hover:text-neon-blue transition-colors">Tutorials</Link></li>
              <li><Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-neon-blue transition-colors">Blog</Link></li>
              <li><Link href="/support" className="text-gray-600 dark:text-gray-400 hover:text-neon-blue transition-colors">Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-heading font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-neon-blue transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="text-gray-600 dark:text-gray-400 hover:text-neon-blue transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-neon-blue transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-neon-blue transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-heading font-bold mb-4">Subscribe</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Get the latest templates and updates straight to your inbox.
            </p>
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                required
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bg-neon-blue text-dark px-3 py-1 rounded-md font-medium hover:bg-opacity-90 transition-colors"
              >
                {isSubmitted ? 'Sent!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} TemplateHub. All rights reserved.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Trusted by:</p>
              {['Vercel', 'Netlify', 'Stripe', 'Shopify', 'Figma'].map((company) => (
                <span key={company} className="text-gray-400 dark:text-gray-500 font-medium">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}