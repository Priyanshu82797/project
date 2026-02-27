/**
 * Sensor Routes
 */

const express = require('express');
const router = express.Router();
const {
  getSensorData,
  postSensorData,
  getLatestSensorData,
  getSensorHistory,
  getSensorStats,
} = require('../controllers/sensorController');

// Routes
router.get('/', getSensorData); // GET /api/sensor-data
router.post('/', postSensorData); // POST /api/sensor-data
router.get('/latest', getLatestSensorData); // GET /api/sensor-data/latest
router.get('/history', getSensorHistory); // GET /api/sensor-data/history
router.get('/stats', getSensorStats); // GET /api/sensor-data/stats

module.exports = router;
