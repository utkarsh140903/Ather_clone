
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center max-w-xl px-4 py-12">
          <h1 className="text-6xl font-bold mb-6">404</h1>
          <p className="text-xl text-ather-gray mb-8">
            We couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
          
          <div className="space-y-4">
            <Link to="/">
              <Button className="ather-button-primary">
                Return to Home
              </Button>
            </Link>
            
            <div className="pt-4">
              <Link 
                to="/contact" 
                className="text-ather-gray hover:text-ather-green transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
