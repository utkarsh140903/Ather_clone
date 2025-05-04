import React from 'react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
  percentage: number;
}

export const QuizProgress: React.FC<QuizProgressProps> = ({ 
  currentStep, 
  totalSteps, 
  percentage 
}) => {
  // Ensure the percentage is a valid number between 0 and 100
  const safePercentage = Math.max(0, Math.min(100, percentage || 0));
  
  return (
    <div className="w-full md:w-auto flex flex-col items-center gap-2" role="progressbar" aria-valuenow={safePercentage} aria-valuemin={0} aria-valuemax={100}>
      {/* Step indicator */}
      <div className="flex items-center gap-1 text-sm text-ather-gray font-medium">
        <span className="text-ather-green font-bold">{currentStep + 1}</span>
        <span>of</span>
        <span>{totalSteps + 1}</span>
        <span className="hidden md:inline">steps</span>
      </div>
      
      {/* Progress bar */}
      <div className="w-full md:w-48 lg:w-64 h-2 bg-ather-lightGray rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-ather-green rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${safePercentage}%` }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        />
      </div>
      
      {/* Percentage indicator (optional) */}
      <span className="text-xs text-ather-mediumGray">
        {Math.round(safePercentage)}% complete
      </span>
    </div>
  );
};

