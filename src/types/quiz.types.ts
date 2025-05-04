// Types for the Ather Electric Scooter Quiz

// Question Types
export enum QuestionType {
  WELCOME = "welcome",
  TEXT_INPUT = "text_input",
  SINGLE_CHOICE = "single_choice",
  MULTI_CHOICE = "multi_choice",
  SLIDER = "slider",
  RESULTS = "results",
}

// Quiz Question Categories
export enum QuestionCategory {
  WELCOME = "welcome",
  COMMUTE = "commute",
  CHARGING = "charging",
  BUDGET = "budget",
  RIDING = "riding",
  SUSTAINABILITY = "sustainability",
  PRACTICAL = "practical",
  RESULTS = "results",
}

// Base Question Interface
export interface BaseQuestion {
  id: string;
  type: QuestionType;
  category: QuestionCategory;
  title: string;
  description?: string;
  required: boolean;
  weight?: number; // Weighting for score calculation
}

// Welcome Question
export interface WelcomeQuestion extends BaseQuestion {
  type: QuestionType.WELCOME;
  category: QuestionCategory.WELCOME;
}

// Text Input Question (for name input)
export interface TextInputQuestion extends BaseQuestion {
  type: QuestionType.TEXT_INPUT;
  placeholder?: string;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  };
}

// Option for choice questions
export interface QuestionOption {
  id: string;
  label: string;
  value: string | number;
  description?: string;
  image?: string;
  score?: number; // Score contribution for this option
}

// Single Choice Question
export interface SingleChoiceQuestion extends BaseQuestion {
  type: QuestionType.SINGLE_CHOICE;
  options: QuestionOption[];
}

// Multi Choice Question
export interface MultiChoiceQuestion extends BaseQuestion {
  type: QuestionType.MULTI_CHOICE;
  options: QuestionOption[];
  maxSelections?: number;
}

// Slider Question
export interface SliderQuestion extends BaseQuestion {
  type: QuestionType.SLIDER;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  marks?: { value: number; label: string }[];
}

// Results Question (final screen)
export interface ResultsQuestion extends BaseQuestion {
  type: QuestionType.RESULTS;
  category: QuestionCategory.RESULTS;
}

// Union type for all question types
export type Question =
  | WelcomeQuestion
  | TextInputQuestion
  | SingleChoiceQuestion
  | MultiChoiceQuestion
  | SliderQuestion
  | ResultsQuestion;

// Answer Types
export type TextAnswer = string;
export type SingleChoiceAnswer = string;
export type MultiChoiceAnswer = string[];
export type SliderAnswer = number;

// Union type for all answer types
export type Answer = TextAnswer | SingleChoiceAnswer | MultiChoiceAnswer | SliderAnswer;

// Map of question ID to answer
export interface QuizAnswers {
  [questionId: string]: Answer;
}

// Quiz Progress State
export interface QuizProgress {
  currentQuestionIndex: number;
  totalQuestions: number;
  isComplete: boolean;
}

// Quiz State
export interface QuizState {
  answers: QuizAnswers;
  currentQuestionIndex: number;
  userName: string;
  progress: QuizProgress;
  isComplete: boolean;
}

// Category Score for Results
export interface CategoryScore {
  category: QuestionCategory;
  score: number;
  maxScore: number;
  percentage: number;
}

// Quiz Results
export interface QuizResults {
  overallScore: number;
  overallPercentage: number;
  categoryScores: CategoryScore[];
  recommendation: ScooterRecommendation;
  savingsEstimates: SavingsEstimates;
}

// Scooter Model Recommendation
export interface ScooterModel {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  range: number;
  topSpeed: number;
  chargingTime: number;
  features: string[];
}

// Scooter Recommendation
export interface ScooterRecommendation {
  bestMatch: ScooterModel;
  alternativeModels: ScooterModel[];
  compatibilityScore: number;
}

// Savings Estimates
export interface SavingsEstimates {
  fuelSavings: number; // Annual fuel savings in rupees
  co2Reduction: number; // Annual CO2 reduction in kg
  maintenanceSavings: number; // Annual maintenance savings in rupees
  totalSavings: number; // Total annual savings
}

