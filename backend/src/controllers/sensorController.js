/**
 * Sensor Controller
 * Handles sensor data requests and responses
 */

const { generateSensorData, calculateRiskScore, getStatus, getRiskLevel } = require('../utils/sensorUtils');
const dataStore = require('../utils/dataStore');

/**
 * GET /api/sensor-data
 * Get current sensor data and latest reading
 */
const getSensorData = (req, res, next) => {
  try {
    const sensorData = generateSensorData();
    const riskScore = calculateRiskScore(
      sensorData.vibration,
      sensorData.load,
      sensorData.crack,
      sensorData.temperature
    );
    const status = getStatus(riskScore);
    const riskLevel = getRiskLevel(riskScore);

    const response = {
      success: true,
      data: {
        vibration: sensorData.vibration,
        load: sensorData.load,
        crack: sensorData.crack,
        temperature: sensorData.temperature,
        riskScore,
        status,
        riskLevel,
        timestamp: sensorData.timestamp,
      },
      meta: {
        responseTime: new Date().toISOString(),
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/sensor-data
 * Record sensor data (for client submissions)
 */
const postSensorData = (req, res, next) => {
  try {
    const { vibration, load, crack, temperature } = req.body;

    // Validate input
    if (
      typeof vibration !== 'number' ||
      typeof load !== 'number' ||
      typeof crack !== 'number' ||
      typeof temperature !== 'number'
    ) {
      return res.status(400).json({
        success: false,
        message: 'Invalid sensor data format. Expected numbers for all fields.',
        received: req.body,
      });
    }

    // Validate ranges
    if (vibration < 0 || vibration > 100 || load < 0 || load > 100 ||
        crack < 0 || crack > 10 || temperature < 20 || temperature > 50) {
      return res.status(400).json({
        success: false,
        message: 'Sensor values out of valid range.',
        validRanges: {
          vibration: '0-100',
          load: '0-100',
          crack: '0-10',
          temperature: '20-50',
        },
        received: req.body,
      });
    }

    // Calculate risk and status
    const riskScore = calculateRiskScore(vibration, load, crack, temperature);
    const status = getStatus(riskScore);
    const riskLevel = getRiskLevel(riskScore);

    const sensorReading = {
      vibration,
      load,
      crack,
      temperature,
      riskScore,
      status,
      riskLevel,
      timestamp: new Date().toISOString(),
    };

    // Store the reading
    dataStore.addReading(sensorReading);

    res.status(201).json({
      success: true,
      message: 'Sensor data recorded successfully',
      data: sensorReading,
      meta: {
        responseTime: new Date().toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/sensor-data/latest
 * Get the latest recorded sensor reading
 */
const getLatestSensorData = (req, res, next) => {
  try {
    const latestReading = dataStore.getLatestReading();

    if (!latestReading) {
      return res.status(404).json({
        success: false,
        message: 'No sensor readings available yet',
      });
    }

    res.status(200).json({
      success: true,
      data: latestReading,
      meta: {
        responseTime: new Date().toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/sensor-data/history
 * Get all sensor readings history
 */
const getSensorHistory = (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const readings = dataStore.getAllReadings().slice(0, limit);

    res.status(200).json({
      success: true,
      data: readings,
      count: readings.length,
      meta: {
        responseTime: new Date().toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/sensor-data/stats
 * Get statistics from all readings
 */
const getSensorStats = (req, res, next) => {
  try {
    const stats = dataStore.getStats();

    if (!stats) {
      return res.status(404).json({
        success: false,
        message: 'No sensor data available for statistics',
      });
    }

    res.status(200).json({
      success: true,
      data: stats,
      meta: {
        responseTime: new Date().toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSensorData,
  postSensorData,
  getLatestSensorData,
  getSensorHistory,
  getSensorStats,
};
