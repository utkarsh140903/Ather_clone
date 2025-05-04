export enum VehicleType {
  GASOLINE = 'gasoline',
  DIESEL = 'diesel',
  HYBRID = 'hybrid',
  ELECTRIC = 'electric'
}

export enum UnitSystem {
  METRIC = 'metric',
  IMPERIAL = 'imperial'
}

export interface UserPreferences {
  unitSystem: UnitSystem;
  monthlyDistance: number;
  vehicleType: VehicleType;
  savedCalculations?: CalculationResult[];
}

export interface EmissionData {
  vehicleType: VehicleType;
  co2PerKm: number; // grams of CO2 per km
  label: string;
}

export interface FuelCostData {
  vehicleType: VehicleType;
  costPerKm: number; // in currency unit per km
  label: string;
}

export interface HealthBenefitData {
  caloriesBurnedPerKm: number;
  mentalHealthScore: number; // 1-10 scale
  airQualityImprovement: number; // percentage
}

export interface BatteryLifecycleData {
  productionEmissions: number; // kg CO2
  lifespanYears: number;
  recyclingEfficiency: number; // percentage
}

export interface CalculationResult {
  id: string;
  timestamp: Date;
  userInputs: {
    distance: number;
    vehicleType: VehicleType;
  };
  emissions: {
    current: number; // kg CO2
    alternatives: Record<VehicleType, number>; // kg CO2
    saved: Record<VehicleType, number>; // kg CO2 saved by switching
  };
  costs: {
    current: number; // in currency unit
    alternatives: Record<VehicleType, number>; // in currency unit
    saved: Record<VehicleType, number>; // money saved by switching
  };
  healthBenefits: Record<VehicleType, HealthBenefitData>;
  batteryLifecycle?: BatteryLifecycleData;
  greenScore: number; // 0-100 scale
}

