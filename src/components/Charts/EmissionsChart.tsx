import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { VehicleType, CalculationResult } from '@/types';
import { colors } from '@/styles/theme';

interface EmissionsChartProps {
  calculationResult: CalculationResult | null;
  currentVehicleType: VehicleType;
}

const EmissionsChart: React.FC<EmissionsChartProps> = ({
  calculationResult,
  currentVehicleType,
}) => {
  if (!calculationResult) {
    return <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Enter your travel details to see emission comparisons</p>
    </div>;
  }

  const { emissions } = calculationResult;

  // Prepare data for the chart
  const data = Object.entries(emissions.alternatives).map(([vehicleType, emission]) => {
    const type = vehicleType as VehicleType;
    const isCurrent = type === currentVehicleType;
    
    return {
      name: vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1),
      emissions: emission,
      fill: colors.chart[type],
      isCurrent,
    };
  });

  // Sort data by emissions (highest to lowest)
  data.sort((a, b) => b.emissions - a.emissions);

  return (
    <div className="w-full h-80 bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">CO₂ Emissions Comparison</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="name" />
          <YAxis 
            label={{ 
              value: 'CO₂ Emissions (kg)', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle' } 
            }} 
          />
          <Tooltip
            formatter={(value: number) => [`${value.toFixed(2)} kg CO₂`, 'Emissions']}
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
          />
          <Legend verticalAlign="top" height={36} />
          <ReferenceLine 
            y={emissions.current} 
            stroke="#8884d8" 
            strokeDasharray="3 3" 
            label={{ 
              value: 'Your Current', 
              position: 'insideTopRight',
              style: { fill: '#8884d8' },
            }} 
          />
          <Bar 
            dataKey="emissions" 
            name="CO₂ Emissions" 
            radius={[4, 4, 0, 0]}
            strokeWidth={1}
            stroke="#fff"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmissionsChart;

