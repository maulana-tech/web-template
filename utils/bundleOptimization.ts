// Bundle optimization utilities for better code splitting and tree shaking

// Dynamic import wrapper with retry logic
export const dynamicImport = <T = any>(
  importFn: () => Promise<{ default: T }>,
  options: {
    retries?: number;
    retryDelay?: number;
    chunkName?: string;
  } = {}
) => {
  const { retries = 3, retryDelay = 1000 } = options;
  
  let retryCount = 0;
  
  const loadWithRetry = async (): Promise<{ default: T }> => {
    try {
      return await importFn();
    } catch (error) {
      if (retryCount < retries) {
        retryCount++;
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        return loadWithRetry();
      }
      throw error;
    }
  };
  
  return loadWithRetry;
};

// Preload utility for critical resources
export const preloadComponent = (importFn: () => Promise<any>) => {
  if (typeof window !== 'undefined') {
    const preload = () => {
      importFn();
    };
    
    // Preload on user interaction
    document.addEventListener('mouseover', preload, { once: true });
    document.addEventListener('focus', preload, { once: true });
    
    // Preload after initial load
    if (document.readyState === 'complete') {
      setTimeout(preload, 100);
    } else {
      window.addEventListener('load', () => setTimeout(preload, 100), { once: true });
    }
  }
};

// Tree shaking optimized imports for commonly used libraries
export const optimizedImports = {
  // Framer Motion - only import what we need
  motion: () => import('framer-motion').then(mod => ({ motion: mod.motion })),
  AnimatePresence: () => import('framer-motion').then(mod => ({ AnimatePresence: mod.AnimatePresence })),
  
  // React Syntax Highlighter - language-specific imports
  SyntaxHighlighter: () => import('react-syntax-highlighter/dist/esm/prism-async-light'),
  javascript: () => import('react-syntax-highlighter/dist/esm/languages/prism/javascript'),
  typescript: () => import('react-syntax-highlighter/dist/esm/languages/prism/typescript'),
  jsx: () => import('react-syntax-highlighter/dist/esm/languages/prism/jsx'),
  tsx: () => import('react-syntax-highlighter/dist/esm/languages/prism/tsx'),
  css: () => import('react-syntax-highlighter/dist/esm/languages/prism/css'),
  html: () => import('react-syntax-highlighter/dist/esm/languages/prism/markup'),
  
  // Themes
  vscDarkPlus: () => import('react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus'),
  
  // Canvas Confetti - optimized import
  confetti: () => import('canvas-confetti').then(mod => mod.default),
};

// Bundle size monitoring utility
export const bundleMetrics = {
  // Track component render performance
  trackComponentLoad: (componentName: string, loadTime: number) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'component_load', {
        component_name: componentName,
        load_time: loadTime,
        custom_parameter: 'bundle_optimization'
      });
    }
  },
  
  // Monitor bundle chunk loading
  trackChunkLoad: (chunkName: string, success: boolean) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'chunk_load', {
        chunk_name: chunkName,
        success: success,
        custom_parameter: 'bundle_optimization'
      });
    }
  }
};

// Service Worker for aggressive caching
export const registerServiceWorker = () => {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};

// Critical CSS inlining utility
export const inlineCriticalCSS = (css: string) => {
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = css;
    style.setAttribute('data-critical', 'true');
    document.head.appendChild(style);
  }
};

// Resource hints utility
export const addResourceHints = (resources: Array<{url: string, as: string, type?: string}>) => {
  if (typeof document !== 'undefined') {
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.url;
      link.as = resource.as;
      if (resource.type) {
        link.type = resource.type;
      }
      document.head.appendChild(link);
    });
  }
};

// Export all utilities
export default {
  dynamicImport,
  preloadComponent,
  optimizedImports,
  bundleMetrics,
  registerServiceWorker,
  inlineCriticalCSS,
  addResourceHints
};