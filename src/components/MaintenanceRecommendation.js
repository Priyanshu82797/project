import React, { useMemo } from 'react';

/**
 * Maintenance Recommendation Engine Component
 * Displays maintenance recommendations based on risk score
 */

const MaintenanceRecommendation = ({ riskScore }) => {
  // Generate recommendation details using useMemo for performance
  const details = useMemo(() => {
    if (riskScore < 40) {
      return {
        recommendation: "Routine Monitoring Recommended",
        priority: "LOW",
        bgColor: "bg-green-50",
        borderColor: "border-green-500",
        textColor: "text-green-700",
        badgeColor: "bg-green-100 text-green-800",
        priorityBadgeColor: "bg-green-500",
        icon: "✅",
        actionItems: [
          "Continue regular monitoring schedule",
          "Review data logs weekly",
          "No immediate action required",
        ],
        timeline: "Next scheduled inspection: 30 days",
        description: "Bridge is operating within normal parameters. Continue standard maintenance protocols.",
      };
    }
    if (riskScore >= 40 && riskScore < 75) {
      return {
        recommendation: "Schedule Structural Inspection Within 7 Days",
        priority: "MEDIUM",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-500",
        textColor: "text-yellow-700",
        badgeColor: "bg-yellow-100 text-yellow-800",
        priorityBadgeColor: "bg-yellow-500",
        icon: "⚠️",
        actionItems: [
          "Schedule inspection within 7 days",
          "Increase monitoring frequency to daily",
          "Document sensor anomalies",
          "Alert maintenance team",
        ],
        timeline: "Action required within: 7 days",
        description: "Structural integrity showing elevated stress levels. Professional inspection recommended to ensure continued safety.",
      };
    }
    return {
      recommendation: "Immediate Load Restriction & Emergency Inspection Required",
      priority: "CRITICAL",
      bgColor: "bg-red-50",
      borderColor: "border-red-500",
      textColor: "text-red-700",
      badgeColor: "bg-red-100 text-red-800",
      priorityBadgeColor: "bg-red-600",
      icon: "🚨",
      actionItems: [
        "IMMEDIATE: Restrict vehicle loads",
        "Implement emergency traffic control",
        "Emergency structural inspection required",
        "Notify authorities immediately",
        "Divert traffic if necessary",
      ],
      timeline: "Action required: IMMEDIATE (within 24 hours)",
      description: "CRITICAL: Bridge detected with severe structural stress. Immediate action and emergency inspection required.",
    };
  }, [riskScore]);

  return (
    <div className={`rounded-lg border-2 p-6 shadow-lg transition-all duration-300 ${details.bgColor} ${details.borderColor}`}>
      {/* Header with Icon and Priority Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{details.icon}</span>
          <h3 className="text-lg font-semibold text-gray-800">Maintenance Recommendation</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${details.badgeColor}`}>
          {details.priority}
        </span>
      </div>

      {/* Main Recommendation Text */}
      <div className={`mb-4 p-4 rounded-lg bg-white border-l-4 ${details.borderColor}`}>
        <p className={`text-lg font-bold ${details.textColor}`}>
          {details.recommendation}
        </p>
        <p className="text-sm text-gray-600 mt-2">
          {details.description}
        </p>
      </div>

      {/* Timeline */}
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-700">
        <span>⏱️</span>
        <span>{details.timeline}</span>
      </div>

      {/* Action Items */}
      <div className="mb-4">
        <h4 className="text-sm font-bold text-gray-800 mb-2">Required Actions:</h4>
        <ul className="space-y-2">
          {details.actionItems.map((item, index) => (
            <li
              key={index}
              className={`text-sm flex items-start gap-2 ${
                details.priority === "CRITICAL" ? "text-red-700" : details.priority === "MEDIUM" ? "text-yellow-700" : "text-green-700"
              }`}
            >
              <span className="mt-1">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Risk Score Meter */}
      <div className="bg-white rounded-lg p-3 text-center">
        <p className="text-xs text-gray-600 mb-1">Current Risk Score</p>
        <div className="flex items-center justify-center gap-2">
          <p className={`text-3xl font-bold ${details.textColor}`}>
            {riskScore.toFixed(1)}
          </p>
          <p className="text-sm text-gray-600">/ 100</p>
        </div>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              riskScore < 40
                ? "bg-green-500"
                : riskScore < 75
                ? "bg-yellow-500"
                : "bg-red-600"
            }`}
            style={{ width: `${riskScore}%` }}
          />
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-4 p-3 bg-gray-100 rounded text-xs text-gray-700 border border-gray-300">
        <p className="font-semibold">📋 Note:</p>
        <p>
          This recommendation is based on real-time sensor data analysis. Always conduct professional
          inspections and consult with qualified structural engineers for critical decisions.
        </p>
      </div>
    </div>
  );
};

export default MaintenanceRecommendation;
