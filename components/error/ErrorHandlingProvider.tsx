'use client';

import { useEffect, ReactNode } from 'react';
import { initializeErrorHandling } from '@/utils/errorHandling';

interface ErrorHandlingProviderProps {
  children: ReactNode;
}

export default function ErrorHandlingProvider({ children }: ErrorHandlingProviderProps) {
  useEffect(() => {
    // Initialize global error handling
    initializeErrorHandling({
      // Add user context if available
      // userId: user?.id,
      // sessionId: session?.id,
    });

    // Set up performance monitoring
    if (typeof window !== 'undefined') {
      // Monitor performance metrics
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          // Log slow operations
          if (entry.duration > 1000) {
            console.warn('Slow operation detected:', entry);
          }
        });
      });

      observer.observe({ entryTypes: ['measure', 'navigation'] });

      // Monitor memory usage (if available)
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.9) {
          console.warn('High memory usage detected');
        }
      }

      // Clean up observer on unmount
      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return <>{children}</>;
}