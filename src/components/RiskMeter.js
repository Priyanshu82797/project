import React from 'react';

const RiskMeter = ({ riskScore, vibration, crack, load }) => {
  // Determine risk level
  const getRiskLevel = () => {
    if (riskScore > 75) return { level: 'CRITICAL', color: 'text-red-700', bgColor: 'bg-red-100', borderColor: 'border-red-500' };
    if (riskScore > 50) return { level: 'HIGH', color: 'text-orange-700', bgColor: 'bg-orange-100', borderColor: 'border-orange-500' };
    if (riskScore > 25) return { level: 'MEDIUM', color: 'text-yellow-700', bgColor: 'bg-yellow-100', borderColor: 'border-yellow-500' };
    return { level: 'LOW', color: 'text-green-700', bgColor: 'bg-green-100', borderColor: 'border-green-500' };
  };

  const riskLevel = getRiskLevel();

  return (
    <div className={`rounded-lg border-2 p-6 shadow-lg ${riskLevel.borderColor} ${riskLevel.bgColor}`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Structural Risk Assessment</h3>
      
      {/* Risk Score Circle */}
      <div className="flex justify-center mb-6">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${(riskScore / 100) * 351.86} 351.86`}
              className="transition-all duration-500"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute text-center">
            <p className={`text-3xl font-bold ${riskLevel.color}`}>
              {riskScore.toFixed(1)}
            </p>
            <p className="text-xs text-gray-600">/ 100</p>
          </div>
        </div>
      </div>

      {/* Risk Level Badge */}
      <div className={`text-center mb-4 py-2 px-4 rounded-lg ${riskLevel.bgColor}`}>
        <p className={`text-lg font-bold ${riskLevel.color}`}>
          {riskLevel.level} RISK
        </p>
      </div>

      {/* Component Breakdown */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Vibration (40%):</span>
          <span className="font-semibold text-gray-800">{vibration.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Crack Width (30%):</span>
          <span className="font-semibold text-gray-800">{crack.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Load Stress (30%):</span>
          <span className="font-semibold text-gray-800">{load.toFixed(2)}</span>
        </div>
      </div>

      {/* Risk Formula */}
      <div className="mt-4 p-3 bg-gray-100 rounded text-xs text-gray-700">
        <p className="font-mono">
          Risk = (V × 0.4) + (C × 0.3) + (L × 0.3)
        </p>
      </div>
    </div>
  );
};

export default RiskMeter;
