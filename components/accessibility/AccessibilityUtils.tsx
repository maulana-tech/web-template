'use client';

import { useEffect } from 'react';
import Link from 'next/link';

// Skip Links Component
export function SkipLinks() {
  return (
    <div className="sr-only focus-within:not-sr-only">
      <a 
        href="#main-content" 
        className="fixed top-0 left-0 z-[9999] bg-neon-blue text-dark px-4 py-2 rounded-br-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transform -translate-y-full focus:translate-y-0 transition-transform"
      >
        Skip to main content
      </a>
      <a 
        href="#main-navigation" 
        className="fixed top-0 left-32 z-[9999] bg-neon-blue text-dark px-4 py-2 rounded-br-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transform -translate-y-full focus:translate-y-0 transition-transform"
      >
        Skip to navigation
      </a>
    </div>
  );
}

// Focus Management Hook
export function useFocusManagement() {
  useEffect(() => {
    // Focus first heading when page loads for screen readers
    const firstHeading = document.querySelector('h1');
    if (firstHeading) {
      firstHeading.setAttribute('tabindex', '-1');
      firstHeading.focus();
      // Remove tabindex after focus to prevent issues
      setTimeout(() => {
        firstHeading.removeAttribute('tabindex');
      }, 100);
    }

    // Add focus-visible polyfill behavior
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        document.body.setAttribute('data-keyboard-navigation', 'true');
      }
    };

    const handleMouseDown = () => {
      document.body.removeAttribute('data-keyboard-navigation');
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);
}

// Announcement Component for Screen Readers
export function ScreenReaderAnnouncement({ 
  message, 
  priority = 'polite' 
}: { 
  message: string; 
  priority?: 'polite' | 'assertive'; 
}) {
  return (
    <div 
      role="status" 
      aria-live={priority} 
      aria-atomic="true" 
      className="sr-only"
    >
      {message}
    </div>
  );
}

// Accessible Modal Focus Trap
export function useFocusTrap(isOpen: boolean, containerRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    // Focus first element when modal opens
    firstElement?.focus();

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, containerRef]);
}

// Accessible Button Component
export function AccessibleButton({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'medium',
  className = '',
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  [key: string]: any;
}) {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-neon-blue text-dark hover:bg-opacity-90 focus:ring-neon-blue',
    secondary: 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 focus:ring-gray-400',
    ghost: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-400'
  };
  
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

// Accessible Form Input Component
export function AccessibleInput({
  label,
  id,
  type = 'text',
  required = false,
  error,
  helpText,
  className = '',
  ...props
}: {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  className?: string;
  [key: string]: any;
}) {
  const helpId = `${id}-help`;
  const errorId = `${id}-error`;

  return (
    <div className={`space-y-1 ${className}`}>
      <label 
        htmlFor={id} 
        className={`block text-sm font-medium ${
          error ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'
        }`}
      >
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>
      
      <input
        id={id}
        type={type}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
          error 
            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
            : 'border-gray-300 dark:border-gray-700 focus:ring-neon-blue focus:border-neon-blue'
        } dark:bg-gray-800 dark:text-gray-100`}
        required={required}
        aria-describedby={`${helpText ? helpId : ''} ${error ? errorId : ''}`.trim()}
        aria-invalid={error ? 'true' : 'false'}
        {...props}
      />
      
      {helpText && (
        <p id={helpId} className="text-sm text-gray-600 dark:text-gray-400">
          {helpText}
        </p>
      )}
      
      {error && (
        <p id={errorId} className="text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}