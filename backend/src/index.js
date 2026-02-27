/**
 * Main Express Application
 */

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const config = require('./config');
const corsMiddleware = require('./middleware/cors');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const healthRoutes = require('./routes/healthRoutes');
const sensorRoutes = require('./routes/sensorRoutes');
const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');

// Create Express app
const app = express();

// ==================== Middleware ====================

// CORS
app.use(corsMiddleware);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
app.use(logger);

// ==================== MongoDB Connection ====================

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/smart-bridge';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    // Continue without database for now (backward compatibility)
  }
};

connectDB();

// ==================== Routes ====================

// Health check endpoint
app.use('/health', healthRoutes);

// Legacy sensor API endpoints (for backward compatibility)
app.use(`${config.API_PREFIX}/sensor-data`, sensorRoutes);

// Authentication routes
app.use('/api/auth', authRoutes);

// Data and bridge routes
app.use('/api', dataRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Smart Bridge Digital Twin Backend API',
    version: '2.0.0',
    endpoints: {
      health: '/health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        getCurrentUser: 'GET /api/auth/me (protected)',
      },
      bridges: {
        getAll: 'GET /api/bridges (protected)',
        create: 'POST /api/bridges (admin only)',
        getById: 'GET /api/bridges/:id (protected)',
      },
      data: {
        addSensorData: 'POST /api/sensor-data',
        getLatest: 'GET /api/sensor-data/:bridgeId/latest (protected)',
        getHistory: 'GET /api/sensor-data/:bridgeId/history (protected)',
        getAlerts: 'GET /api/alerts/:bridgeId (protected)',
      },
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.path,
    method: req.method,
  });
});

// ==================== Error Handling ====================

// Error handler (must be last)
app.use(errorHandler);

// ==================== Server ====================

const PORT = process.env.PORT || config.PORT;

app.listen(PORT, () => {
  console.log('\n🌉 Smart Bridge Backend API v2.0');
  console.log('====================================');
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 CORS enabled for: ${config.FRONTEND_URL}`);
  console.log(`📡 API Prefix: ${config.API_PREFIX}`);
  console.log('\n📚 Main Endpoints:');
  console.log(`  GET  http://localhost:${PORT}/`);
  console.log(`  POST http://localhost:${PORT}/api/auth/register`);
  console.log(`  POST http://localhost:${PORT}/api/auth/login`);
  console.log(`  GET  http://localhost:${PORT}/api/bridges`);
  console.log(`  POST http://localhost:${PORT}/api/sensor-data`);
  console.log('\n💡 Tip: Press CTRL+C to stop the server\n');
});

module.exports = app;
