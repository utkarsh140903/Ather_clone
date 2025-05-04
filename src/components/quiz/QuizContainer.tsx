import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuizState } from '@/hooks/useQuizState';
import { QuizProgress } from './QuizProgress';
import { QuestionCard } from './QuestionCard';
import { ResultsDisplay } from './ResultsDisplay';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { QuestionType } from '@/types/quiz.types';

export const QuizContainer: React.FC = () => {
  const {
    currentQuestion,
    currentQuestionIndex,
    answers,
    userName,
    progress,
    isComplete,
    results,
    nextQuestion,
    previousQuestion,
    updateAnswer,
    resetQuiz,
    canProceedToNext,
    canGoBack,
    quizQuestions,
    totalQuestions,
  } = useQuizState();

  // Animation variants for question transitions
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  // Track animation direction
  const [direction, setDirection] = React.useState(0);

  // Handle next button click
  const handleNext = () => {
    setDirection(1);
    nextQuestion();
  };

  // Handle previous button click
  const handlePrevious = () => {
    setDirection(-1);
    previousQuestion();
  };

  // Handle answer updates
  const handleAnswerUpdate = (answer: any) => {
    updateAnswer(answer);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 flex flex-col min-h-[600px] bg-white rounded-xl shadow-lg">
      {/* Quiz Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <div className="h-8 w-8 bg-ather-green rounded-full flex items-center justify-center">
            <span className="text-white font-bold">A</span>
          </div>
          <h1 className="text-xl font-bold text-ather-darkGray">Ather Compatibility Quiz</h1>
        </div>
        
        {/* Progress indicator */}
        <QuizProgress 
          currentStep={currentQuestionIndex} 
          totalSteps={totalQuestions - 1} // Subtract 1 for the results page
          percentage={progress.percentage} 
        />
      </div>

      {/* Quiz Content */}
      <div className="flex-grow relative overflow-hidden" style={{ minHeight: "500px" }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestionIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0"
          >
            {/* Show results or question card */}
            {currentQuestion.type === QuestionType.RESULTS ? (
              <ResultsDisplay 
                results={results} 
                userName={userName}
                onRestart={resetQuiz}
              />
            ) : (
              <QuestionCard
                question={currentQuestion}
                currentAnswer={answers[currentQuestion.id]}
                onAnswerUpdate={handleAnswerUpdate}
                userName={userName}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button
          onClick={handlePrevious}
          disabled={!canGoBack()}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ChevronLeft size={16} />
          Back
        </Button>

        {currentQuestion.type !== QuestionType.RESULTS && (
          <Button
            onClick={handleNext}
            disabled={!canProceedToNext()}
            className="bg-ather-green hover:bg-ather-green/90 text-white flex items-center gap-2"
          >
            Next
            <ChevronRight size={16} />
          </Button>
        )}

        {currentQuestion.type === QuestionType.RESULTS && (
          <Button
            onClick={resetQuiz}
            className="bg-ather-green hover:bg-ather-green/90 text-white"
          >
            Start Over
          </Button>
        )}
      </div>
    </div>
  );
};

