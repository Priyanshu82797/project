/**
 * Maintenance Recommendation Utility
 * Generates maintenance recommendations based on risk score
 */

/**
 * Generate maintenance recommendation text
 */
const generateRecommendation = (riskScore) => {
  if (riskScore < 40) {
    return "Routine Monitoring Recommended";
  }
  if (riskScore >= 40 && riskScore < 75) {
    return "Schedule Structural Inspection Within 7 Days";
  }
  return "Immediate Load Restriction & Emergency Inspection Required";
};

/**
 * Get recommendation details including color and priority
 */
const getRecommendationDetails = (riskScore) => {
  if (riskScore < 40) {
    return {
      recommendation: generateRecommendation(riskScore),
      priority: "LOW",
      bgColor: "bg-green-50",
      borderColor: "border-green-500",
      textColor: "text-green-700",
      badgeColor: "bg-green-100 text-green-800",
      icon: "✅",
      actionItems: [
        "Continue regular monitoring schedule",
        "Review data logs weekly",
        "No immediate action required",
      ],
    };
  }
  if (riskScore >= 40 && riskScore < 75) {
    return {
      recommendation: generateRecommendation(riskScore),
      priority: "MEDIUM",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-500",
      textColor: "text-yellow-700",
      badgeColor: "bg-yellow-100 text-yellow-800",
      icon: "⚠️",
      actionItems: [
        "Schedule inspection within 7 days",
        "Increase monitoring frequency to daily",
        "Document sensor anomalies",
        "Alert maintenance team",
      ],
    };
  }
  return {
    recommendation: generateRecommendation(riskScore),
    priority: "CRITICAL",
    bgColor: "bg-red-50",
    borderColor: "border-red-500",
    textColor: "text-red-700",
    badgeColor: "bg-red-100 text-red-800",
    icon: "🚨",
    actionItems: [
      "IMMEDIATE: Restrict vehicle loads",
      "Implement emergency traffic control",
      "Emergency structural inspection required",
      "Notify authorities immediately",
      "Divert traffic if necessary",
    ],
  };
};

/**
 * Get maintenance timeline
 */
const getMaintenanceTimeline = (riskScore) => {
  if (riskScore < 40) {
    return "Next scheduled inspection: 30 days";
  }
  if (riskScore >= 40 && riskScore < 75) {
    return "Action required within: 7 days";
  }
  return "Action required: IMMEDIATE (within 24 hours)";
};

module.exports = {
  generateRecommendation,
  getRecommendationDetails,
  getMaintenanceTimeline,
};
