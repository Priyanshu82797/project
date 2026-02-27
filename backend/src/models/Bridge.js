const mongoose = require('mongoose');

const bridgeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a bridge name'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Please provide bridge location'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['operational', 'maintenance', 'alert'],
      default: 'operational',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bridge', bridgeSchema);
