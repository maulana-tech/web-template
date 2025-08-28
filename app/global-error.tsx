'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { errorHandler } from '@/utils/errorHandling';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorPageProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [isDevelopment] = useState(process.env.NODE_ENV === 'development');
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Log error to our error handling service
    errorHandler.handleError(error, {
      type: 'global_error_page',
      digest: error.digest,
      timestamp: new Date().toISOString(),
    });

    // In development, log to console for easier debugging
    if (isDevelopment) {
      console.group('🚨 Global Error');
      console.error('Error:', error.message);
      console.error('Stack:', error.stack);
      if (error.digest) {
        console.error('Digest:', error.digest);
      }
      console.groupEnd();
    }
  }, [error, isDevelopment]);

  // In development, show a dismissible notification instead of blocking overlay
  if (isDevelopment && !dismissed) {
    return (
      <div className="fixed top-4 right-4 max-w-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg shadow-lg z-50 p-4">
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs font-bold">⚠</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">
              Development Error
            </h3>
            <p className="text-xs text-red-700 dark:text-red-300 break-words">
              {error.message}
            </p>
            
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => {
                  reset();
                  setDismissed(true);
                }}
                className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
              >
                Retry
              </button>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="px-2 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600 transition-colors"
              >
                {showDetails ? 'Hide' : 'Details'}
              </button>
              <button
                onClick={() => setDismissed(true)}
                className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white text-xs rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
              >
                Dismiss
              </button>
            </div>
            
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs overflow-auto max-h-32"
                >
                  <pre className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-xs">
                    {error.stack}
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // If dismissed in development, don't show anything
  if (isDevelopment && dismissed) {
    return null;
  }

  // Production error page - cleaner and user-friendly
  return (
    <html>
      <body>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
          <motion.div 
            className="max-w-md w-full text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 14c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </motion.div>
            
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Oops! Something went wrong
            </h1>
            
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              We encountered an unexpected error. Our team has been notified and is working to fix this issue.
            </p>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.button
                  onClick={reset}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Try Again
                </motion.button>
                
                <motion.button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Refresh Page
                </motion.button>
              </div>
              
              <Link 
                href="/"
                className="inline-block text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                Return to Home
              </Link>
            </div>
            
            {error.digest && (
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Error ID: {error.digest}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </body>
    </html>
  );
}