const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema(
  {
    bridgeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bridge',
      required: true,
    },
    type: {
      type: String,
      enum: ['vibration', 'load', 'crack', 'temperature', 'risk'],
      required: true,
    },
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'high',
    },
    message: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    riskScore: {
      type: Number,
      default: 0,
    },
    resolved: {
      type: Boolean,
      default: false,
    },
    resolvedAt: {
      type: Date,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Alert', alertSchema);
