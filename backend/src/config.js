const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/smart-bridge';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

module.exports = {
  PORT,
  NODE_ENV,
  FRONTEND_URL,
  API_PREFIX: '/api',
  SENSOR_UPDATE_INTERVAL: 2000, // milliseconds
  MONGODB_URI,
  JWT_SECRET,
  JWT_EXPIRE,
};
