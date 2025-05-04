import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Leaf, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { colors } from '@/styles/theme';

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
      <Card className="max-w-lg w-full shadow-lg border-0">
        <CardContent className="p-0">
          <div className="bg-primary-50 p-8 text-center rounded-t-lg" 
               style={{ backgroundColor: `${colors.primary[50]}` }}>
            <div className="flex justify-center mb-4">
              <AlertTriangle className="h-20 w-20" style={{ color: colors.primary[500] }} />
            </div>
            <h1 className="text-6xl font-bold mb-2" style={{ color: colors.primary[600] }}>404</h1>
            <h2 className="text-2xl font-medium mb-2" style={{ color: colors.primary[700] }}>
              Page Not Found
            </h2>
          </div>
          
          <div className="p-8 text-center">
            <p className="text-gray-600 mb-8">
              Sorry, we couldn't find the page you're looking for. Our sustainability journey 
              continues on the right path.
            </p>
            
            <div className="space-y-4">
              <Button 
                asChild 
                className="w-full"
                style={{ 
                  backgroundColor: colors.primary[500],
                  borderColor: colors.primary[600],
                }}
              >
                <Link to="/" className="inline-flex items-center justify-center">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back to Calculator
                </Link>
              </Button>
              
              <div className="mt-6 pt-6 border-t border-gray-100 flex justify-center">
                <Leaf className="w-5 h-5 mr-2 text-green-500" />
                <span className="text-sm text-gray-500">
                  Every wrong turn is an opportunity to reduce our carbon footprint
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
