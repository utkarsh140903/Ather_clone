import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Bike, HomeIcon, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const NotFound: React.FC = () => {
  const location = useLocation();

  // Log the attempted path for debugging
  React.useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Helmet>
        <title>Page Not Found | Ather Energy</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to Ather Energy." />
      </Helmet>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full"
      >
        <Card className="shadow-lg border-0 overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-ather-green/10 to-green-50 p-8 text-center rounded-t-lg">
              <motion.div 
                className="flex justify-center mb-4"
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 260,
                  damping: 20
                }}
              >
                <Search className="h-20 w-20 text-ather-green opacity-70" />
              </motion.div>
              <motion.h1 
                className="text-6xl font-bold mb-2 text-ather-darkGray"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                404
              </motion.h1>
              <motion.h2 
                className="text-2xl font-medium mb-2 text-ather-green"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Page Not Found
              </motion.h2>
            </div>
            
            <div className="p-8 text-center">
              <p className="text-ather-gray mb-8">
                We couldn't find the page you're looking for. Perhaps you're looking for our electric scooters or the compatibility quiz?
              </p>
              
              <div className="space-y-3">
                <Button 
                  asChild 
                  className="w-full bg-ather-green hover:bg-ather-green/90 flex items-center justify-center"
                >
                  <Link to="/" className="inline-flex items-center justify-center">
                    <HomeIcon className="w-4 h-4 mr-2" />
                    Back to Home
                  </Link>
                </Button>
                
                <Button 
                  asChild 
                  variant="outline"
                  className="w-full border-ather-green text-ather-green hover:bg-ather-green/10 flex items-center justify-center"
                >
                  <Link to="/quiz" className="inline-flex items-center justify-center">
                    <Bike className="w-4 h-4 mr-2" />
                    Try Our Compatibility Quiz
                  </Link>
                </Button>
                
                <div className="mt-6 pt-6 border-t border-gray-100 flex justify-center">
                  <span className="text-sm text-ather-gray">
                    Every journey has detours, but we're here to help you find your way.
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default NotFound;
