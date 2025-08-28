'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  level?: 'page' | 'component' | 'critical';
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

// Main Error Boundary Component
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error to monitoring service
    this.logError(error, errorInfo);

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  private logError(error: Error, errorInfo: ErrorInfo) {
    // In production, send to error monitoring service (Sentry, LogRocket, etc.)
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { extra: errorInfo });
      console.error('Error caught by boundary:', error, errorInfo);
    } else {
      console.error('Error caught by boundary:', error, errorInfo);
    }

    // Send to analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'exception', {
        description: error.message,
        fatal: this.props.level === 'critical',
        error_boundary_level: this.props.level || 'component',
      });
    }
  }

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI based on level
      return <ErrorFallbackUI 
        error={this.state.error}
        errorInfo={this.state.errorInfo}
        level={this.props.level || 'component'}
        onRetry={this.handleRetry}
        onReload={this.handleReload}
      />;
    }

    return this.props.children;
  }
}

// Error Fallback UI Component
interface ErrorFallbackUIProps {
  error: Error | null;
  errorInfo: ErrorInfo | null;
  level: 'page' | 'component' | 'critical';
  onRetry: () => void;
  onReload: () => void;
}

const ErrorFallbackUI: React.FC<ErrorFallbackUIProps> = ({
  error,
  errorInfo,
  level,
  onRetry,
  onReload,
}) => {
  const getErrorMessage = () => {
    switch (level) {
      case 'critical':
        return {
          title: 'Critical Error',
          message: 'A critical error occurred. Please refresh the page.',
          suggestion: 'If the problem persists, please contact support.',
        };
      case 'page':
        return {
          title: 'Page Error',
          message: 'Something went wrong loading this page.',
          suggestion: 'Try refreshing the page or go back to the homepage.',
        };
      default:
        return {
          title: 'Component Error',
          message: 'A component failed to load properly.',
          suggestion: 'This error has been reported. You can try again.',
        };
    }
  };

  const { title, message, suggestion } = getErrorMessage();

  return (
    <motion.div 
      className="flex flex-col items-center justify-center p-8 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-md mx-auto">
        {/* Error Icon */}
        <motion.div 
          className="mx-auto mb-4 w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <svg 
            className="w-8 h-8 text-red-600 dark:text-red-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z" 
            />
          </svg>
        </motion.div>

        {/* Error Content */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          {message}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
          {suggestion}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-neon-blue text-dark rounded-lg font-medium hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-offset-2"
          >
            Try Again
          </button>
          {level !== 'component' && (
            <button
              onClick={onReload}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Refresh Page
            </button>
          )}
        </div>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && error && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              Show Error Details
            </summary>
            <div className="mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <pre className="text-xs text-red-600 dark:text-red-400 whitespace-pre-wrap">
                {error.message}
                {error.stack}
              </pre>
            </div>
          </details>
        )}
      </div>
    </motion.div>
  );
};

// Specialized Error Boundaries for different use cases

// Page-level Error Boundary
export const PageErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ErrorBoundary level="page">
    {children}
  </ErrorBoundary>
);

// Component-level Error Boundary
export const ComponentErrorBoundary: React.FC<{ children: ReactNode; name?: string }> = ({ 
  children, 
  name = 'component' 
}) => (
  <ErrorBoundary 
    level="component"
    onError={(error, errorInfo) => {
      console.error(`Error in ${name}:`, error, errorInfo);
    }}
  >
    {children}
  </ErrorBoundary>
);

// Critical Error Boundary (for essential app functionality)
export const CriticalErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ErrorBoundary level="critical">
    {children}
  </ErrorBoundary>
);

// Async Component Error Boundary (for dynamic imports)
export const AsyncErrorBoundary: React.FC<{ children: ReactNode; componentName?: string }> = ({ 
  children, 
  componentName = 'async component' 
}) => (
  <ErrorBoundary 
    level="component"
    onError={(error, errorInfo) => {
      console.error(`Error loading ${componentName}:`, error, errorInfo);
    }}
    fallback={
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-blue mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Failed to load {componentName}. Retrying...
          </p>
        </div>
      </div>
    }
  >
    {children}
  </ErrorBoundary>
);

// Hook for handling async errors in components
export const useErrorHandler = () => {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = () => setError(null);

  const handleError = (error: Error) => {
    setError(error);
    
    // Log error
    console.error('Async error:', error);
    
    // Send to monitoring service
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'exception', {
        description: error.message,
        fatal: false,
        error_type: 'async_error',
      });
    }
  };

  // Throw error to be caught by nearest error boundary
  if (error) {
    throw error;
  }

  return { handleError, resetError };
};

export default ErrorBoundary;