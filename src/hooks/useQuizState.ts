import { useCallback, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Answer,
  Question,
  QuestionCategory,
  QuestionType,
  QuizAnswers,
  QuizProgress,
  QuizResults,
  QuizState,
} from "../types/quiz.types";
import {
  QUIZ_RESULTS_KEY,
  QUIZ_STATE_KEY,
  loadFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "../utils/storage-helpers";
import { calculateQuizResults } from "../utils/quiz-calculations";

// Define quiz questions
const quizQuestions: Question[] = [
  // Welcome question
  {
    id: "welcome",
    type: QuestionType.WELCOME,
    category: QuestionCategory.WELCOME,
    title: "Welcome to the Ather E-Scooter Compatibility Quiz",
    description: "Let's find out if an Ather electric scooter is the perfect match for your lifestyle!",
    required: false,
  },
  // Name input
  {
    id: "user-name",
    type: QuestionType.TEXT_INPUT,
    category: QuestionCategory.WELCOME,
    title: "What's your name?",
    description: "We'll personalize your experience",
    placeholder: "Enter your name",
    required: true,
    validation: {
      minLength: 2,
      maxLength: 50,
    },
  },
  // Daily commute - distance
  {
    id: "commute-distance",
    type: QuestionType.SINGLE_CHOICE,
    category: QuestionCategory.COMMUTE,
    title: "How far do you commute daily?",
    description: "This helps us determine if an Ather scooter's range matches your needs",
    required: true,
    weight: 1,
    options: [
      {
        id: "under-5km",
        label: "Under 5km",
        value: "under-5km",
        description: "Short urban commute",
        score: 100,
      },
      {
        id: "5-15km",
        label: "5-15km",
        value: "5-15km",
        description: "Medium commute distance",
        score: 90,
      },
      {
        id: "15-30km",
        label: "15-30km",
        value: "15-30km",
        description: "Longer commute distance",
        score: 70,
      },
      {
        id: "30km-plus",
        label: "Over 30km",
        value: "30km-plus",
        description: "Extended daily travel",
        score: 50,
      },
    ],
  },
  // Daily commute - terrain
  {
    id: "commute-terrain",
    type: QuestionType.SINGLE_CHOICE,
    category: QuestionCategory.COMMUTE,
    title: "What type of terrain do you typically ride on?",
    description: "Different Ather models handle different terrains with varying efficiency",
    required: true,
    weight: 0.8,
    options: [
      {
        id: "mostly-flat",
        label: "Mostly flat",
        value: "mostly-flat",
        description: "Urban city roads and highways",
        score: 100,
      },
      {
        id: "some-hills",
        label: "Some hills",
        value: "some-hills",
        description: "Mix of flat roads and occasional hills",
        score: 80,
      },
      {
        id: "mountainous",
        label: "Mountainous",
        value: "mountainous",
        description: "Frequent steep inclines and hills",
        score: 60,
      },
    ],
  },
  // Charging infrastructure - home
  {
    id: "charging-home",
    type: QuestionType.SINGLE_CHOICE,
    category: QuestionCategory.CHARGING,
    title: "Do you have access to home charging?",
    description: "Home charging requires a standard power outlet near your parking spot",
    required: true,
    weight: 1.2,
    options: [
      {
        id: "yes",
        label: "Yes",
        value: "yes",
        description: "I have a power outlet where I park",
        score: 100,
      },
      {
        id: "maybe",
        label: "Maybe",
        value: "maybe",
        description: "I might be able to set up charging",
        score: 70,
      },
      {
        id: "no",
        label: "No",
        value: "no",
        description: "I don't have access to power where I park",
        score: 40,
      },
    ],
  },
  // Charging infrastructure - public
  {
    id: "charging-public",
    type: QuestionType.SINGLE_CHOICE,
    category: QuestionCategory.CHARGING,
    title: "How is public charging availability in your area?",
    description: "Ather Grid provides fast-charging stations in many urban centers",
    required: true,
    weight: 0.8,
    options: [
      {
        id: "multiple",
        label: "Multiple options",
        value: "multiple",
        description: "Several charging stations nearby",
        score: 100,
      },
      {
        id: "limited",
        label: "Limited",
        value: "limited",
        description: "Few charging options available",
        score: 70,
      },
      {
        id: "none",
        label: "None",
        value: "none",
        description: "No public charging stations I'm aware of",
        score: 40,
      },
    ],
  },
  // Budget - purchase range
  {
    id: "budget-purchase",
    type: QuestionType.SINGLE_CHOICE,
    category: QuestionCategory.BUDGET,
    title: "What's your budget for an electric scooter?",
    description: "Ather offers different models at different price points",
    required: true,
    weight: 1.5,
    options: [
      {
        id: "under-100k",
        label: "Under ₹1,00,000",
        value: "under-100k",
        description: "Entry-level budget",
        score: 50,
      },
      {
        id: "100k-130k",
        label: "₹1,00,000 - ₹1,30,000",
        value: "100k-130k",
        description: "Mid-range budget",
        score: 80,
      },
      {
        id: "130k-150k",
        label: "₹1,30,000 - ₹1,50,000",
        value: "130k-150k",
        description: "Premium budget",
        score: 90,
      },
      {
        id: "above-150k",
        label: "Above ₹1,50,000",
        value: "above-150k",
        description: "High-end budget",
        score: 100,
      },
    ],
  },
  // Budget - operating cost expectations
  {
    id: "budget-operating",
    type: QuestionType.SLIDER,
    category: QuestionCategory.BUDGET,
    title: "How important are low operating costs to you?",
    description: "Electric vehicles typically have lower running costs than petrol vehicles",
    required: true,
    weight: 0.7,
    min: 0,
    max: 100,
    step: 10,
    defaultValue: 50,
    marks: [
      { value: 0, label: "Not important" },
      { value: 50, label: "Somewhat" },
      { value: 100, label: "Very important" },
    ],
  },
  // Budget - long-term vs upfront
  {
    id: "budget-longterm",
    type: QuestionType.SINGLE_CHOICE,
    category: QuestionCategory.BUDGET,
    title: "What matters more to you?",
    description: "Long-term savings often come with higher upfront costs",
    required: true,
    weight: 0.8,
    options: [
      {
        id: "upfront",
        label: "Lower upfront cost",
        value: "upfront",
        description: "I prefer to pay less initially",
        score: 60,
      },
      {
        id: "balanced",
        label: "Balanced approach",
        value: "balanced",
        description: "I want a reasonable balance",
        score: 80,
      },
      {
        id: "longterm",
        label: "Long-term savings",
        value: "longterm",
        description: "I'm willing to pay more now to save later",
        score: 100,
      },
    ],
  },
  // Riding preferences - speed
  {
    id: "riding-speed",
    type: QuestionType.SLIDER,
    category: QuestionCategory.RIDING,
    title: "How important is speed and acceleration to you?",
    description: "Ather scooters offer different performance levels",
    required: true,
    weight: 1.2,
    min: 0,
    max: 100,
    step: 10,
    defaultValue: 50,
    marks: [
      { value: 0, label: "Not important" },
      { value: 50, label: "Somewhat" },
      { value: 100, label: "Very important" },
    ],
  },
  // Riding preferences - technology
  {
    id: "riding-tech",
    type: QuestionType.MULTI_CHOICE,
    category: QuestionCategory.RIDING,
    title: "Which smart features interest you most?",
    description: "Select all that apply",
    required: true,
    weight: 0.9,
    maxSelections: 3,
    options: [
      {
        id: "touchscreen",
        label: "Touchscreen dashboard",
        value: "touchscreen",
        score: 90,
      },
      {
        id: "navigation",
        label: "Built-in navigation",
        value: "navigation",
        score: 85,
      },
      {
        id: "connectivity",
        label: "Smartphone connectivity",
        value: "connectivity",
        score: 80,
      },
      {
        id: "riding-modes",
        label: "Different riding modes",
        value: "riding-modes",
        score: 75,
      },
      {
        id: "ota-updates",
        label: "Over-the-air updates",
        value: "ota-updates",
        score: 70,
      },
    ],
  },
  // Riding preferences - aesthetics
  {
    id: "riding-aesthetics",
    type: QuestionType.SLIDER,
    category: QuestionCategory.RIDING,
    title: "How important is design and aesthetics to you?",
    description: "Rate the importance of looks and styling",
    required: true,
    weight: 0.6,
    min: 0,
    max: 100,
    step: 10,
    defaultValue: 50,
    marks: [
      { value: 0, label: "Not important" },
      { value: 50, label: "Somewhat" },
      { value: 100, label: "Very important" },
    ],
  },
  // Sustainability - environmental impact
  {
    id: "sustainability-environment",
    type: QuestionType.SLIDER,
    category: QuestionCategory.SUSTAINABILITY,
    title: "How important is reducing environmental impact to you?",
    description: "Electric vehicles produce zero tailpipe emissions",
    required: true,
    weight: 1.0,
    min: 0,
    max: 100,
    step: 10,
    defaultValue: 50,
    marks: [
      { value: 0, label: "Not important" },
      { value: 50, label: "Somewhat" },
      { value: 100, label: "Very important" },
    ],
  },
  // Sustainability - carbon footprint
  {
    id: "sustainability-carbon",
    type: QuestionType.SINGLE_CHOICE,
    category: QuestionCategory.SUSTAINABILITY,
    title: "Are you actively trying to reduce your carbon footprint?",
    description: "Electric vehicles can significantly reduce personal carbon emissions",
    required: true,
    weight: 0.8,
    options: [
      {
        id: "very-active",
        label: "Yes, it's a priority",
        value: "very-active",
        score: 100,
      },
      {
        id: "somewhat",
        label: "Somewhat, when convenient",
        value: "somewhat",
        score: 70,
      },
      {
        id: "not-really",
        label: "Not actively",
        value: "not-really",
        score: 40,
      },
    ],
  },
  // Sustainability - local pollution
  {
    id: "sustainability-pollution",
    type: QuestionType.SINGLE_CHOICE,
    category: QuestionCategory.SUSTAINABILITY,
    title: "How concerned are you about local air pollution?",
    description: "Electric vehicles produce no direct air pollution",
    required: true,
    weight: 0.7,
    options: [
      {
        id: "very-concerned",
        label: "Very concerned",
        value: "very-concerned",
        score: 100,
      },
      {
        id: "somewhat-concerned",
        label: "Somewhat concerned",
        value: "somewhat-concerned",
        score: 70,
      },
      {
        id: "not-concerned",
        label: "Not particularly concerned",
        value: "not-concerned",
        score: 40,
      },
    ],
  },
  // Practical needs - storage
  {
    id: "practical-storage",
    type: QuestionType.SINGLE_CHOICE,
    category: QuestionCategory.PRACTICAL,
    title: "What are your storage requirements?",
    description: "How much carrying capacity do you need?",
    required: true,
    weight: 0.7,
    options: [
      {
        id: "minimal",
        label: "Minimal",
        value: "minimal",
        description: "Just essentials",
        score: 100,
      },
      {
        id: "moderate",
        label: "Moderate",
        value: "moderate",
        description: "Small bags or packages",
        score: 80,
      },
      {
        id: "substantial",
        label: "Substantial",
        value: "substantial",
        description: "Need to carry larger items regularly",
        score: 60,
      },
    ],
  },
  // Practical needs - passengers
  {
    id: "practical-passengers",
    type: QuestionType.SINGLE_CHOICE,
    category: QuestionCategory.PRACTICAL,
    title: "How often do you carry a passenger?",
    description: "Ather scooters are designed for two riders",
    required: true,
    weight: 0.8,
    options: [
      {
        id: "never",
        label: "Never",
        value: "never",
        description: "I always ride alone",
        score: 100,
      },
      {
        id: "occasionally",
        label: "Occasionally",
        value: "occasionally",
        description: "A few times a month",
        score: 90,
      },
      {
        id: "frequently",
        label: "Frequently",
        value: "frequently",
        description: "Multiple times a week",
        score: 70,
      },
      {
        id: "always",
        label: "Always",
        value: "always",
        description: "Almost every ride",
        score: 60,
      },
    ],
  },
  // Practical needs - weather
  {
    id: "practical-weather",
    type: QuestionType.SINGLE_CHOICE,
    category: QuestionCategory.PRACTICAL,
    title: "What's the typical weather in your location?",
    description: "Weather can impact riding experience",
    required: true,
    weight: 0.6,
    options: [
      {
        id: "mostly-sunny",
        label: "Mostly sunny/dry",
        value: "mostly-sunny",
        description: "Year-round good weather",
        score: 100,
      },
      {
        id: "seasonal-rain",
        label: "Seasonal rain",
        value: "seasonal-rain",
        description: "Rainy season but mostly dry",
        score: 80,
      },
      {
        id: "frequent-rain",
        label: "Frequent rain",
        value: "frequent-rain",
        description: "Rain throughout the year",
        score: 60,
      },
      {
        id: "extreme",
        label: "Extreme conditions",
        value: "extreme",
        description: "Very hot, cold, or wet climate",
        score: 40,
      },
    ],
  },
  // Results screen
  {
    id: "results",
    type: QuestionType.RESULTS,
    category: QuestionCategory.RESULTS,
    title: "Your Ather Compatibility Results",
    description: "Here's how well an Ather electric scooter matches your lifestyle",
    required: false,
  },
];

// Question weight mapping for score calculation
const questionWeights: Record<string, { category: QuestionCategory; weight: number; maxScore: number }> = {};

// Initialize weights for calculation
quizQuestions.forEach((question) => {
  if (question.weight && question.category !== QuestionCategory.WELCOME && question.category !== QuestionCategory.RESULTS) {
    let maxScore = 100; // Default max score
    
    // For multi-choice questions, calculate max possible score
    if (question.type === QuestionType.MULTI_CHOICE && "options" in question) {
      // Take top 3 scores if maxSelections is 3, otherwise sum all
      const sortedScores = [...question.options]
        .map(opt => opt.score || 0)
        .sort((a, b) => b - a);
        
      const maxSelections = question.maxSelections || sortedScores.length;
      maxScore = sortedScores.slice(0, maxSelections).reduce((sum, score) => sum + score, 0);
    }
    
    questionWeights[question.id] = {
      category: question.category,
      weight: question.weight,
      maxScore,
    };
  }
});

/**
 * Custom hook for managing quiz state
 */
export const useQuizState = () => {
  // Initialize state from localStorage or defaults
  const [state, setState] = useState<QuizState>(() => {
    const savedState = loadFromLocalStorage<QuizState>(QUIZ_STATE_KEY);
    
    if (savedState) {
      return savedState;
    }
    
    return {
      currentQuestionIndex: 0,
      answers: {},
      userName: "",
      progress: {
        currentQuestionIndex: 0,
        totalQuestions: quizQuestions.length,
        isComplete: false,
      },
      isComplete: false,
    };
  });
  
  // Results state
  const [results, setResults] = useState<QuizResults | null>(() => {
    return loadFromLocalStorage<QuizResults>(QUIZ_RESULTS_KEY);
  });
  
  // Derived state
  const currentQuestion = useMemo(() => {
    return quizQuestions[state.currentQuestionIndex];
  }, [state.currentQuestionIndex]);
  
  // Calculate progress percentage
  const progressPercentage = useMemo(() => {
    if (quizQuestions.length <= 1) return 0;
    return Math.round((state.currentQuestionIndex / (quizQuestions.length - 1)) * 100);
  }, [state.currentQuestionIndex]);
  
  // Persist state changes to localStorage
  useEffect(() => {
    saveToLocalStorage(QUIZ_STATE_KEY, state);
  }, [state]);
  
  // Persist results to localStorage
  useEffect(() => {
    if (results) {
      saveToLocalStorage(QUIZ_RESULTS_KEY, results);
    }
  }, [results]);
  
  // Set user name when it's provided
  useEffect(() => {
    if (
      state.answers["user-name"] && 
      typeof state.answers["user-name"] === "string" && 
      state.userName !== state.answers["user-name"]
    ) {
      setState(prev => ({
        ...prev,
        userName: state.answers["user-name"] as string,
      }));
    }
  }, [state.answers]);
  
  /**
   * Check if current question has a valid answer
   */
  const isCurrentQuestionAnswered = useCallback((): boolean => {
    if (!currentQuestion.required) {
      return true;
    }
    
    const answer = state.answers[currentQuestion.id];
    
    if (answer === undefined) {
      return false;
    }
    
    // Check for empty string
    if (typeof answer === "string" && answer.trim() === "") {
      return false;
    }
    
    // Check for empty array
    if (Array.isArray(answer) && answer.length === 0) {
      return false;
    }
    
    return true;
  }, [currentQuestion, state.answers]);
  
  /**
   * Check if can proceed to next question
   */
  const canProceedToNext = useCallback((): boolean => {
    // Can't proceed if at the end
    if (state.currentQuestionIndex >= quizQuestions.length - 1) {
      return false;
    }
    
    return isCurrentQuestionAnswered();
  }, [state.currentQuestionIndex, isCurrentQuestionAnswered]);
  
  /**
   * Check if can go back to previous question
   */
  const canGoBack = useCallback((): boolean => {
    return state.currentQuestionIndex > 0;
  }, [state.currentQuestionIndex]);
  
  /**
   * Go to next question
   */
  const nextQuestion = useCallback((): void => {
    if (!canProceedToNext()) {
      return;
    }
    
    // If this is the second to last question, calculate results
    if (state.currentQuestionIndex === quizQuestions.length - 2) {
      calculateResults();
    }
    
    setState(prev => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1,
      progress: {
        ...prev.progress,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        isComplete: prev.currentQuestionIndex + 1 === quizQuestions.length - 1,
      },
      isComplete: prev.currentQuestionIndex + 1 === quizQuestions.length - 1,
    }));
  }, [state.currentQuestionIndex, canProceedToNext]);
  
  /**
   * Go to previous question
   */
  const previousQuestion = useCallback((): void => {
    if (!canGoBack()) {
      return;
    }
    
    setState(prev => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex - 1,
      progress: {
        ...prev.progress,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
        isComplete: false,
      },
      isComplete: false,
    }));
  }, [canGoBack]);
  
  /**
   * Jump to a specific question
   */
  const jumpToQuestion = useCallback((index: number): void => {
    if (index < 0 || index >= quizQuestions.length) {
      return;
    }
    
    setState(prev => ({
      ...prev,
      currentQuestionIndex: index,
      progress: {
        ...prev.progress,
        currentQuestionIndex: index,
        isComplete: index === quizQuestions.length - 1,
      },
      isComplete: index === quizQuestions.length - 1,
    }));
  }, []);
  
  /**
   * Update answer for the current question
   */
  const updateAnswer = useCallback((answer: Answer): void => {
    setState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [currentQuestion.id]: answer,
      },
    }));
  }, [currentQuestion.id]);
  
  /**
   * Calculate quiz results
   */
  const calculateResults = useCallback((): void => {
    const quizResults = calculateQuizResults(state.answers, questionWeights);
    setResults(quizResults);
  }, [state.answers]);
  
  /**
   * Reset the quiz
   */
  const resetQuiz = useCallback((): void => {
    setState({
      currentQuestionIndex: 0,
      answers: {},
      userName: "",
      progress: {
        currentQuestionIndex: 0,
        totalQuestions: quizQuestions.length,
        isComplete: false,
      },
      isComplete: false,
    });
    
    setResults(null);
    removeFromLocalStorage(QUIZ_STATE_KEY);
    removeFromLocalStorage(QUIZ_RESULTS_KEY);
  }, []);
  
  return {
    // State
    currentQuestion,
    currentQuestionIndex: state.currentQuestionIndex,
    answers: state.answers,
    userName: state.userName,
    progress: {
      ...state.progress,
      percentage: progressPercentage,
    },
    isComplete: state.isComplete,
    results,
    
    // Navigation methods
    nextQuestion,
    previousQuestion,
    jumpToQuestion,
    
    // State management
    updateAnswer,
    calculateResults,
    resetQuiz,
    
    // Helpers
    canProceedToNext,
    canGoBack,
    isCurrentQuestionAnswered,
    
    // Quiz data
    quizQuestions,
    totalQuestions: quizQuestions.length,
  };
};

