import React from 'react';

const SensorCard = ({ 
  title, 
  value, 
  unit, 
  icon, 
  min, 
  max, 
  threshold 
}) => {
  // Determine color based on threshold
  const getColor = () => {
    if (threshold && value > threshold) {
      return 'border-red-500 bg-red-50';
    }
    if (value > (max * 0.75)) {
      return 'border-yellow-500 bg-yellow-50';
    }
    return 'border-blue-500 bg-blue-50';
  };

  const getTextColor = () => {
    if (threshold && value > threshold) {
      return 'text-red-600';
    }
    if (value > (max * 0.75)) {
      return 'text-yellow-600';
    }
    return 'text-blue-600';
  };

  return (
    <div className={`rounded-lg border-2 p-6 shadow-lg transition-all duration-300 ${getColor()}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className="text-3xl">{icon}</div>
      </div>
      
      <div className="mb-4">
        <p className={`text-4xl font-bold ${getTextColor()}`}>
          {value.toFixed(2)}
        </p>
        <p className="text-sm text-gray-600 mt-1">{unit}</p>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-300 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            value > (max * 0.75) ? 'bg-red-500' : 'bg-green-500'
          }`}
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>

      <div className="flex justify-between text-xs text-gray-600 mt-2">
        <span>Min: {min.toFixed(2)}</span>
        <span>Max: {max.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default SensorCard;
