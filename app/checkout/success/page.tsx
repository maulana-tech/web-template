'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { motion } from 'framer-motion'; // Add this import

// Create a client component that uses useSearchParams
function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ORD-' + Math.floor(Math.random() * 10000000);
  const templateId = searchParams.get('templateId') || 'modern-portfolio';
  
  const [template, setTemplate] = useState({
    id: templateId,
    title: 'Modern Portfolio Template',
    image: '/templates/portfolio-preview.jpg'
  });
  
  const [countdown, setCountdown] = useState(5);
  
  useEffect(() => {
    // In a real app, fetch the template details from an API
    // For now, we'll use the default values set above
    
    // Auto-redirect countdown
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [templateId]);
  
  useEffect(() => {
    if (countdown === 0) {
      window.location.href = '/dashboard';
    }
  }, [countdown]);
  
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-4">
                <svg className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">Thank You for Your Purchase!</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">Your order has been successfully processed.</p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-heading font-bold">Order Details</h2>
                <span className="text-gray-600 dark:text-gray-400">Order #{orderId}</span>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden mr-4">
                  <Image
                    src={template.image}
                    alt={template.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{template.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Purchase Date: {new Date().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-between font-medium">
                  <span>Total Paid</span>
                  <span>$49.00</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <p className="text-gray-600 dark:text-gray-400">
                We've sent a receipt and download instructions to your email address.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                You can also download your template directly from your dashboard.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/dashboard" className="btn-primary block">
                  Go to Dashboard
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={`/templates/${template.id}`} className="btn-secondary block">
                  View Template Details
                </Link>
              </motion.div>
            </div>
            
            <div className="mt-8 text-sm text-gray-600 dark:text-gray-400">
              <p>You will be redirected to your dashboard in {countdown} seconds...</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-heading font-bold mb-4">What's Next?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                  <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <h3 className="font-medium mb-2">Download Your Template</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Access your template files from your dashboard and download them to your computer.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full mb-4">
                  <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-medium mb-2">Read the Documentation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Check out the included documentation to learn how to customize and deploy your template.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full mb-4">
                  <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-medium mb-2">Get Support</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  If you have any questions or need help, our support team is ready to assist you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}