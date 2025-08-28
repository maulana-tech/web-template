// Global error handling utilities

interface ErrorContext {
  userId?: string;
  sessionId?: string;
  userAgent: string;
  url: string;
  timestamp: string;
}

export interface AppError extends Error {
  code?: string;
  status?: number;
  context?: ErrorContext;
  severity?: 'low' | 'medium' | 'high' | 'critical';
}

// Custom Error Classes
export class NetworkError extends Error implements AppError {
  code = 'NETWORK_ERROR';
  status: number;
  severity: 'medium' | 'high' = 'medium';

  constructor(message: string, status: number = 0) {
    super(message);
    this.name = 'NetworkError';
    this.status = status;
    this.severity = status >= 500 ? 'high' : 'medium';
  }
}

export class APIError extends Error implements AppError {
  code = 'API_ERROR';
  status: number;
  severity: 'medium' | 'high' = 'medium';

  constructor(message: string, status: number) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.severity = status >= 500 ? 'high' : 'medium';
  }
}

export class ValidationError extends Error implements AppError {
  code = 'VALIDATION_ERROR';
  severity: 'low' = 'low';
  field?: string;

  constructor(message: string, field?: string) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

export class NotFoundError extends Error implements AppError {
  code = 'NOT_FOUND';
  status = 404;
  severity: 'medium' = 'medium';

  constructor(resource: string) {
    super(`${resource} not found`);
    this.name = 'NotFoundError';
  }
}

// Error Logger
class ErrorLogger {
  private static instance: ErrorLogger;
  private context: Partial<ErrorContext> = {};

  static getInstance(): ErrorLogger {
    if (!ErrorLogger.instance) {
      ErrorLogger.instance = new ErrorLogger();
    }
    return ErrorLogger.instance;
  }

  setContext(context: Partial<ErrorContext>) {
    this.context = { ...this.context, ...context };
  }

  private getFullContext(): ErrorContext {
    return {
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      ...this.context,
    };
  }

  log(error: AppError | Error, additionalInfo?: Record<string, any>) {
    const enrichedError = {
      ...error,
      context: this.getFullContext(),
      additionalInfo,
    };

    // Console logging for development
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Error Logged');
      console.error('Error:', error);
      console.log('Context:', enrichedError.context);
      if (additionalInfo) {
        console.log('Additional Info:', additionalInfo);
      }
      console.groupEnd();
    }

    // Send to external logging service in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToLoggingService(enrichedError);
    }

    // Send to analytics
    this.sendToAnalytics(enrichedError);
  }

  private sendToLoggingService(error: any) {
    // Example: Send to Sentry, LogRocket, or custom logging service
    // Sentry.captureException(error);
    
    // Example: Send to custom logging endpoint
    fetch('/api/errors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        context: error.context,
        severity: error.severity || 'medium',
        additionalInfo: error.additionalInfo,
      }),
    }).catch(() => {
      // Silently fail if logging service is unavailable
    });
  }

  private sendToAnalytics(error: any) {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'exception', {
        description: error.message,
        fatal: error.severity === 'critical',
        error_type: error.name || 'Error',
        error_code: error.code,
        error_status: error.status,
      });
    }
  }
}

// Global Error Handler
export class GlobalErrorHandler {
  private static instance: GlobalErrorHandler;
  private logger: ErrorLogger;
  private errorQueue: AppError[] = [];
  private isOnline = true;

  static getInstance(): GlobalErrorHandler {
    if (!GlobalErrorHandler.instance) {
      GlobalErrorHandler.instance = new GlobalErrorHandler();
    }
    return GlobalErrorHandler.instance;
  }

  constructor() {
    this.logger = ErrorLogger.getInstance();
    this.setupGlobalHandlers();
    this.setupNetworkHandlers();
  }

  private setupGlobalHandlers() {
    if (typeof window === 'undefined') return;

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      const error = new Error(
        event.reason?.message || 'Unhandled promise rejection',
      ) as AppError;
      error.code = 'UNHANDLED_PROMISE';
      error.severity = 'high';
      
      this.handleError(error, {
        type: 'unhandledrejection',
        promise: event.promise,
        reason: event.reason,
      });

      // Prevent the default browser error logging
      event.preventDefault();
    });

    // Handle global JavaScript errors
    window.addEventListener('error', (event) => {
      const error = new Error(event.message) as AppError;
      error.code = 'GLOBAL_ERROR';
      error.severity = 'high';
      
      this.handleError(error, {
        type: 'global_error',
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
      });
    });
  }

  private setupNetworkHandlers() {
    if (typeof window === 'undefined') return;

    // Monitor network status
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.processErrorQueue();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  handleError(error: AppError | Error, additionalInfo?: Record<string, any>) {
    const appError = error as AppError;
    
    if (this.isOnline) {
      this.logger.log(appError, additionalInfo);
    } else {
      // Queue errors when offline
      this.errorQueue.push(appError);
    }

    // Show user notification for critical errors
    if (appError.severity === 'critical') {
      this.showCriticalErrorNotification(appError);
    }
  }

  private processErrorQueue() {
    while (this.errorQueue.length > 0) {
      const error = this.errorQueue.shift();
      if (error) {
        this.logger.log(error);
      }
    }
  }

  private showCriticalErrorNotification(error: AppError) {
    // Create a toast notification or modal for critical errors
    if (typeof window !== 'undefined') {
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50';
      notification.innerHTML = `
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          <span>Critical error occurred. Please refresh the page.</span>
        </div>
      `;
      
      document.body.appendChild(notification);
      
      // Auto-remove after 5 seconds
      setTimeout(() => {
        notification.remove();
      }, 5000);
    }
  }
}

// API Error Handler
export const handleApiError = (response: Response): never => {
  let error: APIError;

  switch (response.status) {
    case 400:
      error = new APIError('Invalid request data', 400);
      break;
    case 401:
      error = new APIError('Authentication required', 401);
      break;
    case 403:
      error = new APIError('Access forbidden', 403);
      break;
    case 404:
      error = new NotFoundError('Resource');
      break;
    case 429:
      error = new APIError('Rate limit exceeded', 429);
      break;
    case 500:
      error = new APIError('Internal server error', 500);
      error.severity = 'high';
      break;
    default:
      error = new APIError(`Request failed with status ${response.status}`, response.status);
  }

  throw error;
};

// Network Request Wrapper with Error Handling
export const safeApiCall = async <T>(
  request: () => Promise<T>,
  options: {
    retries?: number;
    retryDelay?: number;
    timeout?: number;
  } = {}
): Promise<T> => {
  const { retries = 3, retryDelay = 1000, timeout = 10000 } = options;
  
  let lastError: Error = new Error('Unknown error');
  
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // Add timeout wrapper
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new NetworkError('Request timeout', 408)), timeout);
      });
      
      const result = await Promise.race([request(), timeoutPromise]);
      return result;
    } catch (error) {
      lastError = error as Error;
      
      // Don't retry for certain types of errors
      if (error instanceof ValidationError || error instanceof NotFoundError) {
        throw error;
      }
      
      // Don't retry on last attempt
      if (attempt === retries) {
        break;
      }
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
    }
  }
  
  throw new NetworkError(`Request failed after ${retries + 1} attempts: ${lastError.message}`);
};

// Initialize global error handler
let globalErrorHandler: GlobalErrorHandler;

export const initializeErrorHandling = (context?: Partial<ErrorContext>) => {
  if (typeof window !== 'undefined') {
    globalErrorHandler = GlobalErrorHandler.getInstance();
    
    if (context) {
      ErrorLogger.getInstance().setContext(context);
    }
  }
};

// Export singleton instances
export const errorHandler = GlobalErrorHandler.getInstance();
export const errorLogger = ErrorLogger.getInstance();