import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EmissionsChart from '@/components/Charts/EmissionsChart';
import CostSavingsChart from '@/components/Charts/CostSavingsChart';
import { VehicleType, UnitSystem, UserPreferences, CalculationResult } from '@/types';
import { 
  generateCalculationResult, 
  convertDistance, 
  calculateTreesEquivalent,
  getEnvironmentalImpactDescription
} from '@/utils/calculations';
import { colors } from '@/styles/theme';
import { Share2, Download, Info, ArrowRight, BarChart2, LineChart, Car, Bike, Check, Save, Trees, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from "framer-motion";

const LOCAL_STORAGE_KEY = 'sustainability-calculator-prefs';

const SustainabilityCalculator: React.FC = () => {
  // State for user inputs and preferences
  const [distance, setDistance] = useState<number>(100);
  const [vehicleType, setVehicleType] = useState<VehicleType>(VehicleType.GASOLINE);
  const [unitSystem, setUnitSystem] = useState<UnitSystem>(UnitSystem.METRIC);
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);
  const [activeTab, setActiveTab] = useState('emissions');
  const [savedCalculations, setSavedCalculations] = useState<CalculationResult[]>([]);
  const { toast } = useToast();

  // Load user preferences from local storage
  useEffect(() => {
    const savedPrefs = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedPrefs) {
      try {
        const prefs: UserPreferences = JSON.parse(savedPrefs);
        setDistance(prefs.monthlyDistance);
        setVehicleType(prefs.vehicleType);
        setUnitSystem(prefs.unitSystem);
        
        if (prefs.savedCalculations) {
          // Convert string dates back to Date objects
          const calculations = prefs.savedCalculations.map(calc => ({
            ...calc,
            timestamp: new Date(calc.timestamp)
          }));
          setSavedCalculations(calculations);
        }
        
        // Generate result based on saved preferences
        handleCalculate(prefs.monthlyDistance, prefs.vehicleType);
      } catch (error) {
        console.error('Error loading saved preferences:', error);
      }
    }
  }, []);

  // Save preferences to local storage whenever they change
  useEffect(() => {
    if (calculationResult) {
      const prefs: UserPreferences = {
        monthlyDistance: distance,
        vehicleType,
        unitSystem,
        savedCalculations,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(prefs));
    }
  }, [distance, vehicleType, unitSystem, savedCalculations]);

  const handleCalculate = (dist: number = distance, vType: VehicleType = vehicleType) => {
    // Convert distance to kilometers if in imperial
    const distanceInKm = unitSystem === UnitSystem.IMPERIAL 
      ? convertDistance(dist, UnitSystem.IMPERIAL, UnitSystem.METRIC) 
      : dist;
    
    // Generate calculation result
    const result = generateCalculationResult(distanceInKm, vType);
    setCalculationResult(result);
  };

  // Handle distance input change
  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setDistance(value);
    }
  };

  // Handle vehicle type change
  const handleVehicleTypeChange = (value: string) => {
    setVehicleType(value as VehicleType);
  };

  // Toggle unit system
  const handleUnitSystemToggle = () => {
    const newUnitSystem = unitSystem === UnitSystem.METRIC ? UnitSystem.IMPERIAL : UnitSystem.METRIC;
    
    // Convert distance to the new unit system
    const convertedDistance = convertDistance(distance, unitSystem, newUnitSystem);
    
    setUnitSystem(newUnitSystem);
    setDistance(parseFloat(convertedDistance.toFixed(1)));
  };

  // Save current calculation
  const handleSaveCalculation = () => {
    if (calculationResult) {
      // Add calculation to saved list
      setSavedCalculations(prev => {
        const newSavedCalculations = [...prev, calculationResult];
        
        // Format date and time for display
        const now = new Date();
        const formattedDate = new Intl.DateTimeFormat('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }).format(now);
        
        // Vehicle type with capitalized first letter
        const formattedVehicleType = vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1);
        
        // Calculate CO₂ savings information if not using electric
        let savingsInfo = '';
        if (vehicleType !== VehicleType.ELECTRIC) {
          const co2Saved = calculationResult.emissions.current - calculationResult.emissions.alternatives[VehicleType.ELECTRIC];
          const treesEquivalent = calculateTreesEquivalent(co2Saved);
          savingsInfo = `Potential savings: ${co2Saved.toFixed(1)}kg CO₂ (${treesEquivalent} trees)`;
        }

        // Show enhanced toast notification
        toast({
          title: (
            <div className="flex items-center space-x-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 500, 
                  damping: 15 
                }}
                className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white"
              >
                <Check className="h-4 w-4" />
              </motion.div>
              <span>Calculation Saved</span>
            </div>
          ),
          description: (
            <div className="space-y-1 mt-1">
              <div className="flex items-center text-gray-700">
                <Calendar className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                <span className="text-sm">{formattedDate}</span>
              </div>
              <p className="text-sm font-medium">
                {formattedVehicleType} • {distance} {unitSystem === UnitSystem.METRIC ? 'km' : 'miles'}/month
              </p>
              {savingsInfo && (
                <div className="flex items-center text-green-600 text-sm">
                  <Trees className="h-3.5 w-3.5 mr-1.5" />
                  {savingsInfo}
                </div>
              )}
              <p className="text-xs text-gray-500 pt-1">
                Total: {newSavedCalculations.length} saved calculation{newSavedCalculations.length !== 1 ? 's' : ''}
              </p>
            </div>
          ),
          variant: "default",
        });
        
        return newSavedCalculations;
      });
    }
  };

  // Download results as CSV
  const handleDownloadResults = () => {
    if (!calculationResult) return;
    
    const { emissions, costs, greenScore } = calculationResult;
    
    const csvContent = [
      'Vehicle Type,CO2 Emissions (kg),Monthly Cost,Annual Cost,Trees Equivalent,Green Score',
      `Current (${vehicleType}),${emissions.current.toFixed(2)},${costs.current.toFixed(2)},${(costs.current * 12).toFixed(2)},N/A,${greenScore.toFixed(0)}`,
      ...Object.entries(emissions.alternatives)
        .filter(([type]) => type !== vehicleType)
        .map(([type, emission]) => {
          const cost = costs.alternatives[type as VehicleType];
          const co2Saved = emissions.current - emission;
          const treesEquivalent = calculateTreesEquivalent(co2Saved);
          return `${type},${emission.toFixed(2)},${cost.toFixed(2)},${(cost * 12).toFixed(2)},${treesEquivalent},${calculationResult.greenScore.toFixed(0)}`;
        })
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `sustainability-calculator-${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Share results
  const handleShareResults = async () => {
    if (!calculationResult) return;
    
    const { emissions, costs, greenScore } = calculationResult;
    const co2Saved = vehicleType !== VehicleType.ELECTRIC 
      ? emissions.current - emissions.alternatives[VehicleType.ELECTRIC]
      : 0;
    
    const shareText = `🌱 My sustainability score: ${greenScore.toFixed(0)}/100 🌱\n
🚗 Current vehicle: ${vehicleType}\n
💨 CO₂ emissions: ${emissions.current.toFixed(2)} kg per month\n
💰 Monthly cost: $${costs.current.toFixed(2)}\n
🌳 By switching to electric, I could save ${co2Saved.toFixed(2)} kg of CO₂ per month!\n
Calculate your impact: ${window.location.href}`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My Sustainability Calculator Results',
          text: shareText,
        });
      } else {
        // Fallback for browsers that don't support the Web Share API
        navigator.clipboard.writeText(shareText);
        alert('Results copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing results:', error);
    }
  };

  // Format distance label based on unit system
  const getDistanceUnitLabel = () => {
    return unitSystem === UnitSystem.METRIC ? 'km' : 'miles';
  };

  // Get CSS color class based on green score
  const getGreenScoreColorClass = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-green-400';
    if (score >= 50) return 'text-yellow-500';
    if (score >= 30) return 'text-yellow-600';
    return 'text-red-500';
  };

  // Render the calculator UI
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-600 mb-2">Sustainability Calculator</h1>
          <p className="text-lg text-gray-600">
            Understand your environmental impact and discover greener transportation alternatives
          </p>
        </div>
        
        <div className="grid md:grid-cols-12 gap-6">
          {/* Input Section */}
          <Card className="md:col-span-4">
            <CardHeader>
              <CardTitle>Your Travel Details</CardTitle>
              <CardDescription>
                Enter your monthly travel information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="distance">Monthly Distance</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">km</span>
                    <Switch 
                      id="unit-toggle"
                      checked={unitSystem === UnitSystem.IMPERIAL}
                      onCheckedChange={handleUnitSystemToggle}
                    />
                    <span className="text-sm text-gray-500">miles</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Input
                    id="distance"
                    type="number"
                    value={distance}
                    onChange={handleDistanceChange}
                    min={0}
                    className="flex-grow"
                  />
                  <span className="flex items-center text-sm text-gray-500 min-w-16">
                    {getDistanceUnitLabel()}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vehicle-type">Current Vehicle Type</Label>
                <Select 
                  value={vehicleType} 
                  onValueChange={handleVehicleTypeChange}
                >
                  <SelectTrigger id="vehicle-type">
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={VehicleType.GASOLINE}>Gasoline</SelectItem>
                    <SelectItem value={VehicleType.DIESEL}>Diesel</SelectItem>
                    <SelectItem value={VehicleType.HYBRID}>Hybrid</SelectItem>
                    <SelectItem value={VehicleType.ELECTRIC}>Electric</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                className="w-full mt-4" 
                onClick={() => handleCalculate()}
              >
                Calculate Impact
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="md:col-span-8 space-y-6">
            {calculationResult && (
              <>
                {/* Green Score */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-center">
                      <div className="flex-1 mb-4 md:mb-0">
                        <h3 className="text-xl font-semibold mb-2">Your Green Score</h3>
                        <p className="text-gray-600">
                          {getEnvironmentalImpactDescription(calculationResult.greenScore)}
                        </p>
                      </div>
                      <div className="flex items-center justify-center w-32 h-32 rounded-full bg-gray-50 border-4 border-opacity-70"
                        style={{ borderColor: colors.primary[500] }}>
                        <div className="text-center">
                          <span className={`text-4xl font-bold ${getGreenScoreColorClass(calculationResult.greenScore)}`}>
                            {Math.round(calculationResult.greenScore)}
                          </span>
                          <span className="text-sm block text-gray-500">out of 100</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Impact visualization */}
                    {vehicleType !== VehicleType.ELECTRIC && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center">
                          <div className="mb-2 sm:mb-0 sm:mr-6">
                            <span className="text-sm text-gray-500">By switching to electric:</span>
                            <div className="flex items-baseline">
                              <span className="text-2xl font-bold text-green-500">
                                {calculateTreesEquivalent(calculationResult.emissions.current - calculationResult.emissions.alternatives[VehicleType.ELECTRIC])}
                              </span>
                              <span className="ml-2 text-gray-700">trees worth of CO₂ absorption per year</span>
                            </div>
                          </div>
                          <ArrowRight className="hidden sm:block text-gray-400" />
                          <div className="mt-2 sm:mt-0 sm:ml-6">
                            <span className="text-sm text-gray-500">Annual cost savings:</span>
                            <div className="text-2xl font-bold text-primary-600">
                              ${((calculationResult.costs.current - calculationResult.costs.alternatives[VehicleType.ELECTRIC]) * 12).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Charts */}
                <Tabs defaultValue="emissions" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="emissions" className="flex items-center">
                      <BarChart2 className="w-4 h-4 mr-2" />
                      Emissions
                    </TabsTrigger>
                    <TabsTrigger value="costs" className="flex items-center">
                      <LineChart className="w-4 h-4 mr-2" />
                      Cost Savings
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="emissions" className="mt-0">
                    <EmissionsChart 
                      calculationResult={calculationResult} 
                      currentVehicleType={vehicleType}
                    />
                  </TabsContent>
                  <TabsContent value="costs" className="mt-0">
                    <CostSavingsChart 
                      calculationResult={calculationResult} 
                      currentVehicleType={vehicleType}
                    />
                  </TabsContent>
                </Tabs>

                {/* Comparison Table */}
                <Card>
                  <CardHeader>
                    <CardTitle>Vehicle Comparison</CardTitle>
                    <CardDescription>
                      See how different vehicle types compare
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 font-medium">Vehicle Type</th>
                            <th className="text-right py-3 font-medium">CO₂ Emissions</th>
                            <th className="text-right py-3 font-medium">Monthly Cost</th>
                            <th className="text-right py-3 font-medium">Annual Cost</th>
                            {vehicleType !== VehicleType.ELECTRIC && (
                              <th className="text-right py-3 font-medium">CO₂ Saved</th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {/* Current vehicle */}
                          <tr className="border-b bg-gray-50">
                            <td className="py-3 flex items-center">
                              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colors.chart[vehicleType] }}></div>
                              <span className="font-medium">{vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1)} (Current)</span>
                            </td>
                            <td className="text-right py-3">{calculationResult.emissions.current.toFixed(2)} kg</td>
                            <td className="text-right py-3">${calculationResult.costs.current.toFixed(2)}</td>
                            <td className="text-right py-3">${(calculationResult.costs.current * 12).toFixed(2)}</td>
                            {vehicleType !== VehicleType.ELECTRIC && (
                              <td className="text-right py-3">-</td>
                            )}
                          </tr>
                          
                          {/* Alternative vehicles */}
                          {Object.entries(calculationResult.emissions.alternatives)
                            .filter(([type]) => type !== vehicleType)
                            .map(([type, emission]) => {
                              const typedType = type as VehicleType;
                              const cost = calculationResult.costs.alternatives[typedType];
                              const co2Saved = calculationResult.emissions.current - emission;
                              
                              return (
                                <tr key={type} className="border-b hover:bg-gray-50">
                                  <td className="py-3 flex items-center">
                                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colors.chart[typedType] }}></div>
                                    <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                                  </td>
                                  <td className="text-right py-3">{emission.toFixed(2)} kg</td>
                                  <td className="text-right py-3">${cost.toFixed(2)}</td>
                                  <td className="text-right py-3">${(cost * 12).toFixed(2)}</td>
                                  {vehicleType !== VehicleType.ELECTRIC && (
                                    <td className="text-right py-3 text-green-500">
                                      {co2Saved > 0 ? `${co2Saved.toFixed(2)} kg` : '-'}
                                    </td>
                                  )}
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                    
                    {/* Battery lifecycle impact (show only for electric) */}
                    {(vehicleType === VehicleType.ELECTRIC || calculationResult.batteryLifecycle) && (
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <h4 className="text-sm font-medium mb-2 flex items-center">
                          <Info className="w-4 h-4 mr-2 text-blue-500" />
                          Battery Lifecycle Impact
                        </h4>
                        <p className="text-sm text-gray-600">
                          Electric vehicles have production emissions of approximately {calculationResult.batteryLifecycle?.productionEmissions} kg CO₂ from battery manufacturing.
                          However, this is offset over {calculationResult.batteryLifecycle?.lifespanYears} years of cleaner driving.
                          Battery recycling can recover up to {calculationResult.batteryLifecycle?.recyclingEfficiency}% of materials.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Action Buttons */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-3 justify-between">
                      <Button 
                        variant="outline" 
                        className="flex-1 sm:flex-none"
                        onClick={handleSaveCalculation}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Result {savedCalculations.length > 0 && (
                          <span className="ml-1 px-1.5 py-0.5 text-xs bg-green-500 text-white rounded-full">
                            {savedCalculations.length}
                          </span>
                        )}
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1 sm:flex-none"
                        onClick={handleDownloadResults}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download CSV
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1 sm:flex-none"
                        onClick={handleShareResults}
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Results
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
            
            {!calculationResult && (
              <Card className="h-96 flex items-center justify-center">
                <CardContent className="text-center">
                  <div className="mb-4 text-primary-500 opacity-80">
                    <div className="flex justify-center mb-6">
                      <Car className="w-16 h-16 mr-2" />
                      <ArrowRight className="w-16 h-16 mx-2" />
                      <Bike className="w-16 h-16 ml-2" />
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Enter Your Travel Details</h3>
                  <p className="text-gray-500 max-w-md">
                    Fill in your monthly travel distance and current vehicle type 
                    to see your environmental impact and explore greener alternatives.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        
        {/* Attribution footer */}
        <div className="mt-12 text-center text-xs text-gray-500">
          <p>Sustainability Calculator &copy; {new Date().getFullYear()}</p>
          <p className="mt-1">Data based on average emission factors and estimated costs.</p>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityCalculator;
