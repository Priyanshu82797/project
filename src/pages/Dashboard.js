import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import SensorCard from '../components/SensorCard';
import RiskMeter from '../components/RiskMeter';
import BridgeModel from '../components/BridgeModel';
import VibrationChart from '../components/VibrationChart';
import MaintenanceRecommendation from '../components/MaintenanceRecommendation';

const Dashboard = () => {
  // Sensor data state
  const [vibration, setVibration] = useState(15);
  const [load, setLoad] = useState(35);
  const [crack, setCrack] = useState(5);
  const [temperature, setTemperature] = useState(22);

  // Chart data
  const [chartData, setChartData] = useState([]);

  // Risk calculation
  const riskScore = (vibration * 0.4) + (crack * 0.3) + (load * 0.3);
  const isHighRisk = riskScore > 75;

  // Simulate sensor data updates every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Vibration: realistic range 10-90
      setVibration(prev => {
        const change = (Math.random() - 0.5) * 15;
        return Math.max(5, Math.min(95, prev + change));
      });

      // Load Stress: realistic range 20-80
      setLoad(prev => {
        const change = (Math.random() - 0.5) * 10;
        return Math.max(10, Math.min(100, prev + change));
      });

      // Crack Width: realistic range 0-20
      setCrack(prev => {
        const change = (Math.random() - 0.5) * 3;
        return Math.max(0, Math.min(25, prev + change));
      });

      // Temperature: realistic range 15-35°C
      setTemperature(prev => {
        const change = (Math.random() - 0.5) * 2;
        return Math.max(10, Math.min(40, prev + change));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Update chart data
  useEffect(() => {
    setChartData(prev => {
      const newData = [
        ...prev,
        {
          time: prev.length,
          vibration: vibration,
        },
      ];
      // Keep only last 30 data points
      return newData.slice(-30);
    });
  }, [vibration]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alert Box */}
        {isHighRisk && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 rounded-lg shadow-lg animate-pulse">
            <div className="flex items-center">
              <span className="text-2xl mr-3">⚠️</span>
              <div>
                <h3 className="text-lg font-bold text-red-700">
                  High Structural Risk Detected
                </h3>
                <p className="text-red-600 text-sm">
                  Risk score exceeds safe threshold. Immediate inspection recommended.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Top Section: Sensors & Risk Meter */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          {/* Sensor Cards */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <SensorCard
              title="Vibration Level"
              value={vibration}
              unit="m/s²"
              icon="📡"
              min={5}
              max={95}
              threshold={70}
            />
            <SensorCard
              title="Load Stress"
              value={load}
              unit="MN"
              icon="⚖️"
              min={10}
              max={100}
              threshold={80}
            />
            <SensorCard
              title="Crack Width"
              value={crack}
              unit="mm"
              icon="🔍"
              min={0}
              max={25}
              threshold={15}
            />
            <SensorCard
              title="Temperature"
              value={temperature}
              unit="°C"
              icon="🌡️"
              min={10}
              max={40}
              threshold={35}
            />
          </div>

          {/* Risk Meter */}
          <div className="lg:col-span-1">
            <RiskMeter
              riskScore={riskScore}
              vibration={vibration}
              crack={crack}
              load={load}
            />
          </div>
        </div>
        {/* Maintenance Recommendation Section */}
        <div className="mb-8">
          <MaintenanceRecommendation riskScore={riskScore} />
        </div>

        {/* Bottom Section: Chart & 3D Model */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Chart */}
          <div className="lg:col-span-2">
            <VibrationChart data={chartData} />
          </div>

          {/* 3D Bridge Model */}
          <div className="lg:col-span-1">
            <div className="rounded-lg shadow-lg overflow-hidden bg-white" style={{ height: '400px' }}>
              <BridgeModel 
                isRisk={isHighRisk}
                vibration={vibration}
                load={load}
                crack={crack}
                temperature={temperature}
                riskScore={riskScore}
              />
            </div>
          </div>
        </div>

        {/* Statistics Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-white rounded-lg shadow-lg p-6">
          <div className="text-center">
            <p className="text-gray-600 text-sm">Risk Score</p>
            <p className={`text-2xl font-bold ${isHighRisk ? 'text-red-600' : 'text-green-600'}`}>
              {riskScore.toFixed(1)}/100
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm">Last Update</p>
            <p className="text-2xl font-bold text-blue-600">
              {new Date().toLocaleTimeString()}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm">Status</p>
            <p className={`text-2xl font-bold ${isHighRisk ? 'text-red-600' : 'text-green-600'}`}>
              {isHighRisk ? '🔴 Critical' : '🟢 Normal'}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm">Data Points</p>
            <p className="text-2xl font-bold text-purple-600">
              {chartData.length}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
