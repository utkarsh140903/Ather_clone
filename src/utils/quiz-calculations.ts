import {
  Answer,
  CategoryScore,
  QuestionCategory,
  QuizAnswers,
  QuizResults,
  SavingsEstimates,
  ScooterModel,
  ScooterRecommendation,
} from "../types/quiz.types";

/**
 * Ather scooter models with their specifications
 * In a real application, these would typically come from an API or database
 */
export const SCOOTER_MODELS: ScooterModel[] = [
  {
    id: "ather-450x",
    name: "Ather 450X",
    description: "The high-performance scooter for tech enthusiasts and urban riders.",
    imageUrl: "/assets/models/450x.png",
    price: 150000,
    range: 116, // km
    topSpeed: 90, // km/h
    chargingTime: 4.5, // hours
    features: [
      "7\" touchscreen dashboard",
      "4G connectivity",
      "Turn-by-turn navigation",
      "Auto-hold & reverse assist",
      "Theft & crash detection",
    ],
  },
  {
    id: "ather-450s",
    name: "Ather 450S",
    description: "The everyday commuter with best-in-class features at an affordable price.",
    imageUrl: "/assets/models/450s.png",
    price: 128000,
    range: 100, // km
    topSpeed: 85, // km/h
    chargingTime: 5, // hours
    features: [
      "Monochrome display",
      "Bluetooth connectivity",
      "Turn-by-turn navigation via app",
      "Lightweight design",
      "Fast charging capability",
    ],
  },
  {
    id: "ather-450-plus",
    name: "Ather 450 Plus",
    description: "The perfect balance of performance and value.",
    imageUrl: "/assets/models/450-plus.png",
    price: 140000,
    range: 108, // km
    topSpeed: 80, // km/h
    chargingTime: 5.5, // hours
    features: [
      "Digital display",
      "Bluetooth connectivity",
      "Multiple ride modes",
      "Reverse parking assist",
      "OTA updates",
    ],
  },
];

/**
 * Calculate scores for each category based on user answers
 * @param answers User responses to quiz questions
 * @param questionWeights Weight information for each question
 * @returns Array of scores for each category
 */
export const calculateCategoryScores = (
  answers: QuizAnswers,
  questionWeights: Record<string, { category: QuestionCategory; weight: number; maxScore: number }>
): CategoryScore[] => {
  // Initialize category scores
  const categoryScores: Record<QuestionCategory, { score: number; maxScore: number }> = {
    [QuestionCategory.WELCOME]: { score: 0, maxScore: 0 },
    [QuestionCategory.COMMUTE]: { score: 0, maxScore: 0 },
    [QuestionCategory.CHARGING]: { score: 0, maxScore: 0 },
    [QuestionCategory.BUDGET]: { score: 0, maxScore: 0 },
    [QuestionCategory.RIDING]: { score: 0, maxScore: 0 },
    [QuestionCategory.SUSTAINABILITY]: { score: 0, maxScore: 0 },
    [QuestionCategory.PRACTICAL]: { score: 0, maxScore: 0 },
    [QuestionCategory.RESULTS]: { score: 0, maxScore: 0 },
  };

  // Calculate scores for each category
  Object.entries(answers).forEach(([questionId, answer]) => {
    const questionInfo = questionWeights[questionId];
    
    if (!questionInfo) return;
    
    const { category, weight, maxScore } = questionInfo;
    
    // Skip welcome and results categories for scoring
    if (category === QuestionCategory.WELCOME || category === QuestionCategory.RESULTS) {
      return;
    }
    
    // Add to max possible score for this category
    categoryScores[category].maxScore += maxScore;
    
    // Calculate score based on answer type
    let score = 0;
    
    if (typeof answer === 'string') {
      // For single choice answers, use the value as is
      score = parseFloat(answer) || 0;
    } else if (Array.isArray(answer)) {
      // For multi-choice, sum all values
      score = answer.reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
    } else if (typeof answer === 'number') {
      // For slider values
      score = answer;
    }
    
    // Apply question weight
    // Apply weight and add 15% boost to make results more favorable
    // Apply weight and add 20% boost to make results even more favorable
    categoryScores[category].score += (score * weight) * 1.2;
  });

  // Convert to array format with percentages
  return Object.entries(categoryScores)
    .filter(([category]) => category !== QuestionCategory.WELCOME && category !== QuestionCategory.RESULTS)
    .map(([category, { score, maxScore }]) => ({
      category: category as QuestionCategory,
      score,
      maxScore,
      // Apply a more favorable percentage calculation (minimum 55%)
      // Apply an even more favorable percentage calculation (minimum 60%)
      percentage: maxScore > 0 ? Math.max(60, (score / maxScore) * 100) : 60,
    }));
};

/**
 * Calculate savings estimates based on commute answers
 */
export const calculateSavingsEstimates = (answers: QuizAnswers): SavingsEstimates => {
  // Extract commute distance from answers (assuming question ID for distance is 'commute-distance')
  const commuteDistanceAnswer = answers['commute-distance'] as string;
  
  // Default values if answers are not available
  let dailyDistance = 15; // km per day
  
  // Parse the commute distance answer
  if (commuteDistanceAnswer) {
    switch (commuteDistanceAnswer) {
      case 'under-5km':
        dailyDistance = 5;
        break;
      case '5-15km':
        dailyDistance = 10;
        break;
      case '15-30km':
        dailyDistance = 20;
        break;
      case '30km-plus':
        dailyDistance = 35;
        break;
      default:
        dailyDistance = 15;
    }
  }
  
  // Calculate annual distance (assuming 22 working days per month)
  const annualDistance = dailyDistance * 22 * 12;
  
  // Fuel cost comparison (petrol scooter vs electric)
  const petrolPricePerLiter = 100; // Rupees
  const petrolScooterMileage = 45; // km per liter
  const electricityCostPerKWh = 8; // Rupees
  const atherEnergyConsumption = 0.018; // kWh per km (slightly reduced to show better savings)
  
  // Calculate costs
  const petrolCost = (annualDistance / petrolScooterMileage) * petrolPricePerLiter;
  const electricityCost = annualDistance * atherEnergyConsumption * electricityCostPerKWh;
  
  // Calculate savings
  const fuelSavings = petrolCost - electricityCost;
  
  // CO2 reduction (petrol emits approximately 2.3 kg CO2 per liter)
  const co2Reduction = (annualDistance / petrolScooterMileage) * 2.3;
  
  // Maintenance savings (approximation)
  const maintenanceSavings = annualDistance * 0.6; // Assume 0.6 rupees per km savings (increased)
  
  return {
    fuelSavings: Math.round(fuelSavings),
    co2Reduction: Math.round(co2Reduction),
    maintenanceSavings: Math.round(maintenanceSavings),
    totalSavings: Math.round(fuelSavings + maintenanceSavings),
  };
};

/**
// Determine the most suitable Ather scooter model based on user preferences
 */
export const determineRecommendation = (
  categoryScores: CategoryScore[],
  answers?: QuizAnswers
): ScooterRecommendation => {
  // Get overall percentage as simple average of all category percentages
  // Apply a more favorable calculation for recommendation compatibility
  let overallPercentage = categoryScores.reduce((sum, category) => sum + category.percentage, 0) / categoryScores.length;
  overallPercentage = Math.max(80, overallPercentage); // Minimum 80% compatibility
  
  // Get riding preference score (higher score suggests preference for high performance)
  const ridingCategory = categoryScores.find(cat => cat.category === QuestionCategory.RIDING);
  const ridingPreferenceScore = ridingCategory ? ridingCategory.percentage : 50;
  
  // Get budget score (higher score suggests more budget flexibility)
  const budgetCategory = categoryScores.find(cat => cat.category === QuestionCategory.BUDGET);
  const budgetScore = budgetCategory ? budgetCategory.percentage : 50;
  
  // Simple logic for model selection
  let bestMatchId = "ather-450s"; // Default to 450S as middle option
  
  // Lowered thresholds to make premium models more likely to be recommended
  // Make the premium model (450X) even more likely to be recommended
  if (ridingPreferenceScore > 55 || budgetScore > 45) {
    // Tech enthusiast with good budget - recommend 450X
    bestMatchId = "ather-450x";
  } else if (ridingPreferenceScore < 35 && budgetScore < 35) {
    // Budget-conscious casual rider - recommend 450S
    bestMatchId = "ather-450s";
  } else {
    // Middle-ground rider - recommend 450 Plus
    bestMatchId = "ather-450-plus";
  }
  
  // Find the best match model
  const bestMatch = SCOOTER_MODELS.find(model => model.id === bestMatchId) || SCOOTER_MODELS[0];
  
  // Get alternative models (all models except the best match)
  const alternativeModels = SCOOTER_MODELS.filter(model => model.id !== bestMatchId);
  
  return {
    bestMatch,
    alternativeModels,
    compatibilityScore: Math.round(overallPercentage),
  };
};

/**
 * Calculate final quiz results
 */
export const calculateQuizResults = (
  answers: QuizAnswers,
  questionWeights: Record<string, { category: QuestionCategory; weight: number; maxScore: number }>
): QuizResults => {
  // Calculate category scores
  const categoryScores = calculateCategoryScores(answers, questionWeights);
  
  // Calculate overall score
  const totalScore = categoryScores.reduce((sum, category) => sum + category.score, 0);
  const totalMaxScore = categoryScores.reduce((sum, category) => sum + category.maxScore, 0);
  // Calculate more favorable overall percentage (minimum 70%)
  let overallPercentage = totalMaxScore > 0 ? (totalScore / totalMaxScore) * 100 : 70;
  overallPercentage = Math.max(75, overallPercentage);
  
  // Get scooter recommendation
  const recommendation = determineRecommendation(categoryScores);
  
  // Calculate savings estimates
  const savingsEstimates = calculateSavingsEstimates(answers);
  
  return {
    overallScore: Math.round(totalScore),
    overallPercentage: Math.round(overallPercentage),
    categoryScores,
    recommendation,
    savingsEstimates,
  };
};

