/**
 * Sensor Data Utility Functions
 * Handles sensor data generation and risk calculations
 */

/**
 * Generate realistic sensor data with constraints
 */
const generateSensorData = () => {
  const lastData = global.lastSensorData || {
    vibration: 20,
    load: 40,
    crack: 5,
    temperature: 25,
  };

  // Vibration: 0-100 m/s² with gradual changes
  const vibration = Math.max(
    0,
    Math.min(100, lastData.vibration + (Math.random() - 0.5) * 15)
  );

  // Load: 0-100 MN with gradual changes
  const load = Math.max(
    0,
    Math.min(100, lastData.load + (Math.random() - 0.5) * 10)
  );

  // Crack: 0-10 mm with minimal changes
  const crack = Math.max(
    0,
    Math.min(10, lastData.crack + (Math.random() - 0.5) * 2)
  );

  // Temperature: 20-50°C with small fluctuations
  const temperature = Math.max(
    20,
    Math.min(50, lastData.temperature + (Math.random() - 0.5) * 3)
  );

  // Store as last data for next iteration
  global.lastSensorData = {
    vibration,
    load,
    crack,
    temperature,
  };

  return {
    vibration: parseFloat(vibration.toFixed(2)),
    load: parseFloat(load.toFixed(2)),
    crack: parseFloat(crack.toFixed(2)),
    temperature: parseFloat(temperature.toFixed(2)),
    timestamp: new Date().toISOString(),
  };
};

/**
 * Calculate risk score from sensor data
 * Formula: (vibration * 0.4) + (crack * 10 * 0.3) + (load * 0.3)
 * Normalized to 0-100 scale
 */
const calculateRiskScore = (vibration, load, crack, temperature) => {
  // Normalize crack width (0-10mm → 0-100 scale)
  const crackNormalized = (crack / 10) * 100;

  // Calculate weighted risk
  const riskScore = vibration * 0.4 + crackNormalized * 0.3 + load * 0.3;

  // Clamp to 0-100
  const normalizedRisk = Math.max(0, Math.min(100, riskScore));

  return parseFloat(normalizedRisk.toFixed(1));
};

/**
 * Determine status based on risk score
 */
const getStatus = (riskScore) => {
  if (riskScore > 75) return 'DANGER';
  if (riskScore > 50) return 'WARNING';
  return 'SAFE';
};

/**
 * Get risk level details
 */
const getRiskLevel = (riskScore) => {
  if (riskScore > 75) return { level: 'CRITICAL', color: 'red' };
  if (riskScore > 50) return { level: 'HIGH', color: 'orange' };
  if (riskScore > 25) return { level: 'MEDIUM', color: 'yellow' };
  return { level: 'LOW', color: 'green' };
};

module.exports = {
  generateSensorData,
  calculateRiskScore,
  getStatus,
  getRiskLevel,
};
