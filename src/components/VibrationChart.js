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
} from 'recharts';

const VibrationChart = ({ data }) => {
  return (
    <div className="w-full rounded-lg shadow-lg p-6 bg-white">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Vibration Trend (Last 30 seconds)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 12 }}
            domain={[0, 30]}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            domain={[0, 100]}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#f3f4f6', border: '1px solid #d1d5db' }}
            formatter={(value) => value.toFixed(2)}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="vibration"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
            name="Vibration Level"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VibrationChart;
