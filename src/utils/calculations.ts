import { 
  VehicleType, 
  UnitSystem, 
  CalculationResult, 
  EmissionData,
  FuelCostData,
  HealthBenefitData
} from '@/types';
import { v4 as uuidv4 } from 'uuid';

// Emission factors (grams of CO2 per km)
export const emissionFactors: Record<VehicleType, number> = {
  [VehicleType.GASOLINE]: 192, // Average gasoline car
  [VehicleType.DIESEL]: 171,   // Average diesel car
  [VehicleType.HYBRID]: 92,    // Average hybrid car
  [VehicleType.ELECTRIC]: 53,  // Average electric car (including electricity production)
};

// Fuel costs per km (in currency units, e.g. USD)
export const fuelCostFactors: Record<VehicleType, number> = {
  [VehicleType.GASOLINE]: 0.12, // $0.12 per km
  [VehicleType.DIESEL]: 0.09,   // $0.09 per km
  [VehicleType.HYBRID]: 0.06,   // $0.06 per km
  [VehicleType.ELECTRIC]: 0.03, // $0.03 per km
};

// Health benefits data
export const healthBenefitFactors: Record<VehicleType, HealthBenefitData> = {
  [VehicleType.GASOLINE]: {
    caloriesBurnedPerKm: 0,
    mentalHealthScore: 3,
    airQualityImprovement: 0,
  },
  [VehicleType.DIESEL]: {
    caloriesBurnedPerKm: 0,
    mentalHealthScore: 3,
    airQualityImprovement: 0,
  },
  [VehicleType.HYBRID]: {
    caloriesBurnedPerKm: 0,
    mentalHealthScore: 5,
    airQualityImprovement: 30,
  },
  [VehicleType.ELECTRIC]: {
    caloriesBurnedPerKm: 0,
    mentalHealthScore: 7,
    airQualityImprovement: 80,
  },
};

// Battery lifecycle data
export const batteryLifecycleData = {
  productionEmissions: 8000, // kg CO2
  lifespanYears: 10,
  recyclingEfficiency: 70, // percentage
};

// Unit conversion factors
export const unitConversionFactors = {
  distanceKmToMiles: 0.621371,
  distanceMilesToKm: 1.60934,
};

/**
 * Convert distance between metric and imperial units
 */
export const convertDistance = (
  distance: number,
  fromUnit: UnitSystem,
  toUnit: UnitSystem
): number => {
  if (fromUnit === toUnit) return distance;
  
  if (fromUnit === UnitSystem.METRIC && toUnit === UnitSystem.IMPERIAL) {
    return distance * unitConversionFactors.distanceKmToMiles;
  } else {
    return distance * unitConversionFactors.distanceMilesToKm;
  }
};

/**
 * Calculate the CO2 emissions for a given distance and vehicle type
 * @param distance Distance in kilometers
 * @param vehicleType Type of vehicle
 * @returns CO2 emissions in kilograms
 */
export const calculateEmissions = (
  distance: number,
  vehicleType: VehicleType
): number => {
  // Convert grams to kilograms
  return (distance * emissionFactors[vehicleType]) / 1000;
};

/**
 * Calculate fuel costs for a given distance and vehicle type
 * @param distance Distance in kilometers
 * @param vehicleType Type of vehicle
 * @returns Cost in currency units
 */
export const calculateFuelCosts = (
  distance: number,
  vehicleType: VehicleType
): number => {
  return distance * fuelCostFactors[vehicleType];
};

/**
 * Calculate green score based on emissions compared to gasoline
 * @param emissions CO2 emissions in kilograms
 * @returns Score between 0-100
 */
export const calculateGreenScore = (emissions: number, maxEmissions: number): number => {
  // Higher score means better (less emissions)
  const score = 100 - (emissions / maxEmissions) * 100;
  return Math.min(Math.max(score, 0), 100); // Ensure score is between 0-100
};

/**
 * Generate a comprehensive calculation result
 */
export const generateCalculationResult = (
  distance: number,
  vehicleType: VehicleType
): CalculationResult => {
  // Calculate emissions for current vehicle type
  const currentEmissions = calculateEmissions(distance, vehicleType);
  
  // Calculate emissions for all vehicle types
  const allEmissions: Record<VehicleType, number> = {
    [VehicleType.GASOLINE]: calculateEmissions(distance, VehicleType.GASOLINE),
    [VehicleType.DIESEL]: calculateEmissions(distance, VehicleType.DIESEL),
    [VehicleType.HYBRID]: calculateEmissions(distance, VehicleType.HYBRID),
    [VehicleType.ELECTRIC]: calculateEmissions(distance, VehicleType.ELECTRIC),
  };
  
  // Calculate emissions saved
  const emissionsSaved: Record<VehicleType, number> = {
    [VehicleType.GASOLINE]: vehicleType === VehicleType.GASOLINE ? 0 : currentEmissions - allEmissions[VehicleType.GASOLINE],
    [VehicleType.DIESEL]: vehicleType === VehicleType.DIESEL ? 0 : currentEmissions - allEmissions[VehicleType.DIESEL],
    [VehicleType.HYBRID]: vehicleType === VehicleType.HYBRID ? 0 : currentEmissions - allEmissions[VehicleType.HYBRID],
    [VehicleType.ELECTRIC]: vehicleType === VehicleType.ELECTRIC ? 0 : currentEmissions - allEmissions[VehicleType.ELECTRIC],
  };
  
  // Calculate costs for current vehicle type
  const currentCosts = calculateFuelCosts(distance, vehicleType);
  
  // Calculate costs for all vehicle types
  const allCosts: Record<VehicleType, number> = {
    [VehicleType.GASOLINE]: calculateFuelCosts(distance, VehicleType.GASOLINE),
    [VehicleType.DIESEL]: calculateFuelCosts(distance, VehicleType.DIESEL),
    [VehicleType.HYBRID]: calculateFuelCosts(distance, VehicleType.HYBRID),
    [VehicleType.ELECTRIC]: calculateFuelCosts(distance, VehicleType.ELECTRIC),
  };
  
  // Calculate costs saved
  const costsSaved: Record<VehicleType, number> = {
    [VehicleType.GASOLINE]: vehicleType === VehicleType.GASOLINE ? 0 : currentCosts - allCosts[VehicleType.GASOLINE],
    [VehicleType.DIESEL]: vehicleType === VehicleType.DIESEL ? 0 : currentCosts - allCosts[VehicleType.DIESEL],
    [VehicleType.HYBRID]: vehicleType === VehicleType.HYBRID ? 0 : currentCosts - allCosts[VehicleType.HYBRID],
    [VehicleType.ELECTRIC]: vehicleType === VehicleType.ELECTRIC ? 0 : currentCosts - allCosts[VehicleType.ELECTRIC],
  };

  // Calculate the green score (based on emissions compared to gasoline)
  const maxEmissions = allEmissions[VehicleType.GASOLINE];
  const greenScore = calculateGreenScore(currentEmissions, maxEmissions);

  return {
    id: uuidv4(),
    timestamp: new Date(),
    userInputs: {
      distance,
      vehicleType,
    },
    emissions: {
      current: currentEmissions,
      alternatives: allEmissions,
      saved: emissionsSaved,
    },
    costs: {
      current: currentCosts,
      alternatives: allCosts,
      saved: costsSaved,
    },
    healthBenefits: {
      [VehicleType.GASOLINE]: healthBenefitFactors[VehicleType.GASOLINE],
      [VehicleType.DIESEL]: healthBenefitFactors[VehicleType.DIESEL],
      [VehicleType.HYBRID]: healthBenefitFactors[VehicleType.HYBRID],
      [VehicleType.ELECTRIC]: healthBenefitFactors[VehicleType.ELECTRIC],
    },
    batteryLifecycle: vehicleType === VehicleType.ELECTRIC ? batteryLifecycleData : undefined,
    greenScore,
  };
};

/**
 * Calculate trees equivalent to CO2 savings
 * @param co2Saved CO2 emissions saved in kg
 * @returns Equivalent number of trees
 */
export const calculateTreesEquivalent = (co2Saved: number): number => {
  // One tree absorbs about 22 kg of CO2 per year
  return Math.round(co2Saved / 22);
};

/**
 * Get environmental impact description based on green score
 */
export const getEnvironmentalImpactDescription = (greenScore: number): string => {
  if (greenScore >= 90) return "Outstanding! Your carbon footprint is minimal.";
  if (greenScore >= 75) return "Great job! Your travel choices are very eco-friendly.";
  if (greenScore >= 50) return "Good! You're making environmentally conscious choices.";
  if (greenScore >= 25) return "There's room for improvement in your travel choices.";
  return "Consider greener alternatives to significantly reduce your impact.";
};
