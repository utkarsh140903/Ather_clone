import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Question, 
  QuestionType, 
  TextInputQuestion,
  SingleChoiceQuestion,
  MultiChoiceQuestion,
  SliderQuestion,
  WelcomeQuestion,
  Answer 
} from '@/types/quiz.types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';

interface QuestionCardProps {
  question: Question;
  currentAnswer: Answer | undefined;
  onAnswerUpdate: (answer: Answer) => void;
  userName?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentAnswer,
  onAnswerUpdate,
  userName = ''
}) => {
  // Animation variants for content
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  // Handle personalized content with username
  const getPersonalizedContent = (text: string) => {
    if (!userName) return text;
    return text.replace('{name}', userName);
  };

  // Render different question types
  const renderQuestionContent = () => {
    switch (question.type) {
      case QuestionType.WELCOME:
        return renderWelcomeQuestion(question as WelcomeQuestion);
      case QuestionType.TEXT_INPUT:
        return renderTextInputQuestion(question as TextInputQuestion);
      case QuestionType.SINGLE_CHOICE:
        return renderSingleChoiceQuestion(question as SingleChoiceQuestion);
      case QuestionType.MULTI_CHOICE:
        return renderMultiChoiceQuestion(question as MultiChoiceQuestion);
      case QuestionType.SLIDER:
        return renderSliderQuestion(question as SliderQuestion);
      default:
        return <p>Unsupported question type</p>;
    }
  };

  // Welcome screen
  const renderWelcomeQuestion = (question: WelcomeQuestion) => {
    return (
      <div className="text-center py-8">
        <motion.img
          src="https://www.atherenergy.com/favicon.ico" // Replace with actual logo path
          alt="Ather Logo"
          className="w-24 h-24 mx-auto mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.h2 
          className="text-2xl md:text-3xl font-bold text-ather-darkGray mb-4"
          variants={contentVariants}
        >
          {question.title}
        </motion.h2>
        <motion.p 
          className="text-ather-gray mb-8 max-w-md mx-auto"
          variants={contentVariants}
        >
          {question.description}
        </motion.p>
      </div>
    );
  };

  // Text input question
  const renderTextInputQuestion = (question: TextInputQuestion) => {
    const [value, setValue] = useState<string>(currentAnswer as string || '');
    const [error, setError] = useState<string>('');

    // Validate and update answer
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      
      // Validation
      if (question.required && newValue.trim() === '') {
        setError('This field is required');
      } else if (question.validation?.minLength && newValue.length < question.validation.minLength) {
        setError(`Must be at least ${question.validation.minLength} characters`);
      } else if (question.validation?.maxLength && newValue.length > question.validation.maxLength) {
        setError(`Must be less than ${question.validation.maxLength} characters`);
      } else {
        setError('');
        onAnswerUpdate(newValue);
      }
    };

    return (
      <div>
        <motion.div variants={contentVariants} className="mb-6">
          <Label htmlFor={question.id} className="text-lg font-medium text-ather-darkGray">
            {getPersonalizedContent(question.title)}
          </Label>
          {question.description && (
            <p className="text-sm text-ather-gray mt-1">
              {getPersonalizedContent(question.description)}
            </p>
          )}
        </motion.div>
        
        <motion.div variants={contentVariants} className="mt-4">
          <Input
            id={question.id}
            value={value}
            onChange={handleInputChange}
            placeholder={question.placeholder}
            className={`p-4 text-lg border-2 ${error ? 'border-red-500' : 'border-ather-lightGray'}`}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${question.id}-error` : undefined}
          />
          {error && (
            <p id={`${question.id}-error`} className="mt-2 text-sm text-red-500">
              {error}
            </p>
          )}
        </motion.div>
      </div>
    );
  };

  // Single choice question
  const renderSingleChoiceQuestion = (question: SingleChoiceQuestion) => {
    return (
      <div>
        <motion.div variants={contentVariants} className="mb-6">
          <h3 className="text-xl font-medium text-ather-darkGray">
            {getPersonalizedContent(question.title)}
          </h3>
          {question.description && (
            <p className="text-sm text-ather-gray mt-1">
              {getPersonalizedContent(question.description)}
            </p>
          )}
        </motion.div>
        
        <RadioGroup
          value={currentAnswer as string}
          onValueChange={(value) => onAnswerUpdate(value)}
          className="mt-4 space-y-3 max-h-[65vh] overflow-y-auto pr-2 scroll-smooth pb-2"
        >
          {question.options.map((option, index) => (
            <motion.div
              key={option.id}
              variants={contentVariants}
              custom={index}
              className="flex"
            >
              <Card className={`w-full hover:border-ather-green transition-colors ${
                currentAnswer === option.value ? 'border-ather-green bg-ather-lightGray' : ''
              }`}>
                <CardContent className="p-0">
                  <Label
                    htmlFor={option.id}
                    className="flex items-start p-4 cursor-pointer w-full"
                  >
                    <RadioGroupItem 
                      id={option.id} 
                      value={option.value as string} 
                      className="mt-1 mr-4 text-ather-green"
                    />
                    <div>
                      <div className="font-medium break-words">{option.label}</div>
                      {option.description && (
                        <p className="text-sm text-ather-gray break-words whitespace-normal">{option.description}</p>
                      )}
                    </div>
                  </Label>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </RadioGroup>
      </div>
    );
  };

  // Multi choice question
  const renderMultiChoiceQuestion = (question: MultiChoiceQuestion) => {
    const selectedValues = (currentAnswer as string[]) || [];
    
    const handleCheckboxChange = (checked: boolean, value: string) => {
      let newSelectedValues: string[];
      
      if (checked) {
        // Add to selected values, respecting maxSelections
        if (question.maxSelections && selectedValues.length >= question.maxSelections) {
          // Remove the first item if max reached
          newSelectedValues = [...selectedValues.slice(1), value];
        } else {
          newSelectedValues = [...selectedValues, value];
        }
      } else {
        // Remove from selected values
        newSelectedValues = selectedValues.filter(v => v !== value);
      }
      
      onAnswerUpdate(newSelectedValues);
    };

    return (
      <div>
        <motion.div variants={contentVariants} className="mb-6">
          <h3 className="text-xl font-medium text-ather-darkGray">
            {getPersonalizedContent(question.title)}
          </h3>
          {question.description && (
            <p className="text-sm text-ather-gray mt-1">
              {getPersonalizedContent(question.description)}
            </p>
          )}
          {question.maxSelections && (
            <p className="text-xs text-ather-gray mt-2">
              Select up to {question.maxSelections} options
            </p>
          )}
        </motion.div>
        
        <div className="space-y-3 mt-4 max-h-[65vh] overflow-y-auto pr-2 scroll-smooth pb-2">
          {question.options.map((option, index) => (
            <motion.div
              key={option.id}
              variants={contentVariants}
              custom={index}
            >
              <Card className={`w-full hover:border-ather-green transition-colors ${
                selectedValues.includes(option.value as string) ? 'border-ather-green bg-ather-lightGray' : ''
              }`}>
                <CardContent className="p-0">
                  <div className="flex items-start p-4">
                    <Checkbox
                      id={option.id}
                      checked={selectedValues.includes(option.value as string)}
                      onCheckedChange={(checked) => handleCheckboxChange(!!checked, option.value as string)}
                      disabled={
                        question.maxSelections !== undefined &&
                        selectedValues.length >= question.maxSelections &&
                        !selectedValues.includes(option.value as string)
                      }
                      className="mt-1 mr-4 text-ather-green"
                    />
                    <Label htmlFor={option.id} className="cursor-pointer flex-1">
                      <div className="font-medium break-words">{option.label}</div>
                      {option.description && (
                        <p className="text-sm text-ather-gray break-words whitespace-normal">{option.description}</p>
                      )}
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  // Slider question
  const renderSliderQuestion = (question: SliderQuestion) => {
    const [value, setValue] = useState<number[]>(
      currentAnswer !== undefined 
        ? [currentAnswer as number] 
        : [question.defaultValue]
    );

    useEffect(() => {
      // Update answer when the slider changes
      if (value[0] !== currentAnswer) {
        onAnswerUpdate(value[0]);
      }
    }, [value]);

    return (
      <div>
        <motion.div variants={contentVariants} className="mb-6">
          <h3 className="text-xl font-medium text-ather-darkGray">
            {getPersonalizedContent(question.title)}
          </h3>
          {question.description && (
            <p className="text-sm text-ather-gray mt-1">
              {getPersonalizedContent(question.description)}
            </p>
          )}
        </motion.div>
        
        <motion.div variants={contentVariants} className="mt-8 px-2">
          <div className="flex justify-between mb-2">
            {question.marks?.map((mark) => (
              <span 
                key={mark.value} 
                className={`text-xs ${
                  value[0] >= mark.value ? 'text-ather-green font-medium' : 'text-ather-gray'
                }`}
              >
                {mark.label}
              </span>
            ))}
          </div>
          
          <Slider
            value={value}
            min={question.min}
            max={question.max}
            step={question.step}
            onValueChange={setValue}
            className="py-4"
          />
          
          <div className="mt-4 text-center">
            <span className="text-lg font-medium text-ather-green">
              {value[0]}
            </span>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={contentVariants}
      className="w-full h-full flex flex-col p-2 overflow-hidden max-h-[90vh]"
    >
      {renderQuestionContent()}
    </motion.div>
  );
};

