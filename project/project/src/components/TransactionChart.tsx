import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface TransactionChartProps {
  fraudulentCount: number;
  legitimateCount: number;
  fraudPercentage: string;
}

export const TransactionChart: React.FC<TransactionChartProps> = ({
  fraudulentCount,
  legitimateCount,
  fraudPercentage
}) => {
  const chartData = [
    { name: 'Fraudulent', value: fraudulentCount },
    { name: 'Legitimate', value: legitimateCount }
  ];

  const COLORS = ['#ff1493', '#00f5d4'];

  return (
    <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
      <h3 className="text-xl font-bold mb-4">Transaction Analysis</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center mt-4">
        <p className="text-3xl font-bold text-pink-500">{fraudPercentage}%</p>
        <p className="text-gray-400">Fraudulent Transactions</p>
      </div>
    </div>
  );
};