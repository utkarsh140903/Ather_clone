import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Custom ErrorFallback component to display when an error occurs
 */
const DefaultErrorFallback = ({ 
  error, 
  resetErrorBoundary 
}: { 
  error: Error | null; 
  resetErrorBoundary: () => void;
}) => {
  // This is a wrapper component to use hooks within a class component
  return <ErrorFallbackWithNavigation error={error} resetErrorBoundary={resetErrorBoundary} />;
};

/**
 * Internal component that uses React Router's useNavigate hook
 */
const ErrorFallbackWithNavigation = ({ 
  error, 
  resetErrorBoundary 
}: { 
  error: Error | null; 
  resetErrorBoundary: () => void;
}) => {
  const navigate = useNavigate();

  // Simplified error message for user display
  const userFriendlyMessage = getUserFriendlyErrorMessage(error);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-lg border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 p-6 text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
              className="mx-auto mb-4 bg-white w-16 h-16 rounded-full flex items-center justify-center"
            >
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </motion.div>
            <h2 className="text-2xl font-bold text-ather-darkGray mb-1">Something went wrong</h2>
            <p className="text-ather-gray text-sm">We've encountered an unexpected error</p>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="mb-4">
              <h3 className="font-medium text-ather-darkGray mb-2">What happened?</h3>
              <p className="text-sm text-ather-gray mb-4">{userFriendlyMessage}</p>
              
              <div className="bg-gray-50 p-3 rounded-md border border-gray-200 my-4">
                <details className="text-xs text-ather-gray">
                  <summary className="cursor-pointer font-medium">Technical details</summary>
                  <div className="mt-2 p-2 bg-gray-100 rounded overflow-auto max-h-32">
                    <code className="text-red-600 whitespace-pre-wrap">
                      {error?.toString() || "Unknown error"}
                    </code>
                  </div>
                </details>
              </div>

              <p className="text-sm text-ather-gray">
                You can try refreshing the page or return to the home page.
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-3 p-6 bg-gray-50 border-t">
            <Button 
              onClick={resetErrorBoundary}
              className="w-full bg-ather-green hover:bg-ather-green/90 text-white flex items-center justify-center"
            >
              <RefreshCw className="mr-2 h-4 w-4" /> Try Again
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full border-ather-green text-ather-green hover:bg-ather-green/10 flex items-center justify-center"
              onClick={() => navigate('/')}
            >
              <Home className="mr-2 h-4 w-4" /> Go to Home
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

/**
 * Convert technical error messages to user-friendly language
 */
function getUserFriendlyErrorMessage(error: Error | null): string {
  if (!error) {
    return "An unknown error occurred.";
  }

  // Check for specific error types and provide friendly messages
  if (error.message.includes("NetworkError") || error.message.includes("Failed to fetch")) {
    return "We're having trouble connecting to our servers. Please check your internet connection and try again.";
  }
  
  if (error.message.includes("ChunkLoadError") || error.message.includes("Loading chunk")) {
    return "We couldn't load the necessary resources. This might be due to a poor network connection or an update to our site. Refreshing the page should fix this.";
  }
  
  if (error.message.includes("localStorage")) {
    return "We couldn't access local storage. This could be due to privacy settings in your browser.";
  }

  // Default message for other errors
  return "We've encountered an unexpected issue. Our team has been notified and is working on it.";
}

/**
 * Error reporting function
 */
function reportError(error: Error, errorInfo: ErrorInfo): void {
  // In a real application, this would send the error to a monitoring service
  console.error("Error caught by ErrorBoundary:", error);
  console.error("Component stack:", errorInfo.componentStack);
  
  // Example of sending to an analytics or error monitoring service
  // if (process.env.NODE_ENV === 'production') {
  //   // Send to error monitoring service like Sentry, LogRocket, etc.
  //   try {
  //     // Sentry.captureException(error);
  //     // or other error reporting service
  //   } catch (reportingError) {
  //     console.error("Failed to report error:", reportingError);
  //   }
  // }
}

/**
 * Main ErrorBoundary component that catches JavaScript errors anywhere in the child component tree
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Capture component stack and update state
    this.setState({ errorInfo });
    
    // Call optional onError handler from props
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    
    // Report the error to monitoring services
    reportError(error, errorInfo);
  }

  resetErrorBoundary = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Use custom fallback if provided, otherwise use default
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return <DefaultErrorFallback 
        error={this.state.error} 
        resetErrorBoundary={this.resetErrorBoundary} 
      />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

