/**
 * In-memory data store for sensor readings
 */

// Store last 100 sensor readings
let sensorReadings = [];
const MAX_READINGS = 100;

/**
 * Add sensor reading to store
 */
const addReading = (data) => {
  sensorReadings.unshift({
    ...data,
    id: Date.now(),
  });

  // Keep only last 100 readings
  if (sensorReadings.length > MAX_READINGS) {
    sensorReadings = sensorReadings.slice(0, MAX_READINGS);
  }

  return sensorReadings[0];
};

/**
 * Get all readings
 */
const getAllReadings = () => {
  return sensorReadings;
};

/**
 * Get latest reading
 */
const getLatestReading = () => {
  return sensorReadings[0] || null;
};

/**
 * Get stats from all readings
 */
const getStats = () => {
  if (sensorReadings.length === 0) return null;

  const vibrations = sensorReadings.map((r) => r.vibration);
  const loads = sensorReadings.map((r) => r.load);
  const cracks = sensorReadings.map((r) => r.crack);
  const temps = sensorReadings.map((r) => r.temperature);
  const risks = sensorReadings.map((r) => r.riskScore);

  const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
  const max = (arr) => Math.max(...arr);
  const min = (arr) => Math.min(...arr);

  return {
    vibration: { avg: parseFloat(avg(vibrations).toFixed(2)), max: parseFloat(max(vibrations).toFixed(2)), min: parseFloat(min(vibrations).toFixed(2)) },
    load: { avg: parseFloat(avg(loads).toFixed(2)), max: parseFloat(max(loads).toFixed(2)), min: parseFloat(min(loads).toFixed(2)) },
    crack: { avg: parseFloat(avg(cracks).toFixed(2)), max: parseFloat(max(cracks).toFixed(2)), min: parseFloat(min(cracks).toFixed(2)) },
    temperature: { avg: parseFloat(avg(temps).toFixed(2)), max: parseFloat(max(temps).toFixed(2)), min: parseFloat(min(temps).toFixed(2)) },
    riskScore: { avg: parseFloat(avg(risks).toFixed(1)), max: parseFloat(max(risks).toFixed(1)), min: parseFloat(min(risks).toFixed(1)) },
    totalReadings: sensorReadings.length,
  };
};

/**
 * Clear all readings (for testing)
 */
const clearReadings = () => {
  sensorReadings = [];
};

module.exports = {
  addReading,
  getAllReadings,
  getLatestReading,
  getStats,
  clearReadings,
};
