import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { VehicleType, CalculationResult } from '@/types';
import { colors } from '@/styles/theme';

interface CostSavingsChartProps {
  calculationResult: CalculationResult | null;
  currentVehicleType: VehicleType;
}

const CostSavingsChart: React.FC<CostSavingsChartProps> = ({
  calculationResult,
  currentVehicleType,
}) => {
  if (!calculationResult) {
    return <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Enter your travel details to see cost savings</p>
    </div>;
  }

  // Generate 12 months of cost savings data
  const generateCostSavingsOverTime = () => {
    const data = [];
    const monthlyCosts = calculationResult.costs.current;
    
    // Generate data for each alternative vehicle type
    const alternatives = Object.entries(calculationResult.costs.alternatives)
      .filter(([vehicleType]) => vehicleType !== currentVehicleType)
      .map(([vehicleType, cost]) => ({
        type: vehicleType as VehicleType,
        monthlySaving: monthlyCosts - cost,
      }));

    // Create data points for each month
    for (let month = 1; month <= 12; month++) {
      const dataPoint: { month: string; [key: string]: string | number } = {
        month: `Month ${month}`,
      };
      
      // Add cumulative savings for each alternative
      alternatives.forEach(alt => {
        const cumulativeSaving = alt.monthlySaving * month;
        dataPoint[alt.type] = Number(cumulativeSaving.toFixed(2));
      });
      
      data.push(dataPoint);
    }
    
    return data;
  };

  const costData = generateCostSavingsOverTime();
  
  // Create lines for each alternative vehicle type
  const alternatives = Object.keys(calculationResult.costs.alternatives)
    .filter(vehicleType => vehicleType !== currentVehicleType);
  
  return (
    <div className="w-full h-80 bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Cost Savings Over Time</h3>
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart
          data={costData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="month" />
          <YAxis 
            label={{ 
              value: 'Cumulative Savings', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle' } 
            }} 
          />
          <Tooltip 
            formatter={(value: number, name: string) => {
              const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
              return [`$${value}`, `Savings with ${formattedName}`];
            }}
            cursor={{ stroke: '#ccc', strokeDasharray: '3 3' }}
          />
          <Legend />
          
          {alternatives.map((vehicleType, index) => (
            <Area
              key={vehicleType}
              type="monotone"
              dataKey={vehicleType}
              name={vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1)}
              stroke={colors.chart[vehicleType as VehicleType]}
              fill={colors.chart[vehicleType as VehicleType]}
              fillOpacity={0.3}
              activeDot={{ r: 6 }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CostSavingsChart;

