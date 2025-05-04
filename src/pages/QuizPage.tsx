import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { QuizContainer } from '@/components/quiz/QuizContainer';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const QuizPage: React.FC = () => {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Ather Compatibility Quiz | Find Your Perfect Electric Scooter</title>
        <meta 
          name="description" 
          content="Take our interactive quiz to discover which Ather electric scooter is the perfect match for your lifestyle, commute, and preferences."
        />
      </Helmet>

      <div className="container mx-auto py-6 px-4">
        {/* Back navigation */}
        <Button
          variant="ghost"
          className="mb-6 hover:bg-transparent flex items-center text-ather-gray hover:text-ather-green transition-colors"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to home
        </Button>

        {/* Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-ather-darkGray mb-4">
            Ather Compatibility Quiz
          </h1>
          <p className="text-ather-gray text-lg">
            Answer a few questions to find which Ather electric scooter is the perfect match for your lifestyle and preferences.
          </p>
        </motion.div>

        {/* Quiz Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <QuizContainer />
        </motion.div>

        {/* Footer */}
        <div className="text-center text-sm text-ather-gray mt-8">
          <p>© {new Date().getFullYear()} Ather Energy. All rights reserved.</p>
          <p className="mt-1">
            Your responses help us provide personalized recommendations and are handled according to our{' '}
            <a href="/privacy-policy" className="text-ather-green hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;

