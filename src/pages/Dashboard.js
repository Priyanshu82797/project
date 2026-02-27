import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import SensorCard from '../components/SensorCard';
import RiskMeter from '../components/RiskMeter';
import BridgeModel from '../components/BridgeModel';
import VibrationChart from '../components/VibrationChart';
import MaintenanceRecommendation from '../components/MaintenanceRecommendation';
import FeaturesSection from '../components/FeaturesSection';
import LiveDataIndicator from '../components/LiveDataIndicator';

const Dashboard = () => {
  // ==========================================
  // SENSOR DATA STATE
  // ==========================================
  const [vibration, setVibration] = useState(15);
  const [load, setLoad] = useState(35);
  const [crack, setCrack] = useState(5);
  const [temperature, setTemperature] = useState(22);
  const [chartData, setChartData] = useState([]);

  // ==========================================
  // CONNECTION STATE
  // ==========================================
  const [isLiveDataConnected, setIsLiveDataConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Connecting to Live Data...');
  const [lastUpdateTime, setLastUpdateTime] = useState(null);

  // ==========================================
  // LIVE DATA TRACKING (For Hackathon Display)
  // ==========================================
  const [isFetching, setIsFetching] = useState(false);
  const [apiCallCount, setApiCallCount] = useState(0);
  const [apiSuccessCount, setApiSuccessCount] = useState(0);
  const [dataSource, setDataSource] = useState({
    weather: { connected: false },
    earthquake: { connected: false },
  });

  // ==========================================
  // TRACK EARTHQUAKE SPIKE
  // ==========================================
  const earthquakeSpikeRef = useRef(0);
  const lastEarthquakeRef = useRef(null);

  // ==========================================
  // RISK CALCULATION (Same formula)
  // ==========================================
  const riskScore = (vibration * 0.4) + (crack * 0.3) + (load * 0.3);
  const isHighRisk = riskScore > 75;

  // ==========================================
  // FETCH REAL WEATHER DATA
  // ==========================================
  const fetchWeatherData = async () => {
    try {
      const apiKey = process.env.REACT_APP_WEATHER_KEY;
      const city = process.env.REACT_APP_WEATHER_CITY || 'London';
      const countryCode = process.env.REACT_APP_WEATHER_COUNTRY_CODE || 'GB';

      if (!apiKey || apiKey === 'your_openweather_api_key_here') {
        console.warn('⚠️ Weather API key not configured. Using backup mode.');
        setDataSource(prev => ({ ...prev, weather: { connected: false } }));
        return null;
      }

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${apiKey}&units=metric`,
        { timeout: 5000 }
      );

      const { main, wind } = response.data;
      
      // Mark weather API as connected
      setDataSource(prev => ({ ...prev, weather: { connected: true } }));
      setApiSuccessCount(prev => prev + 1);
      
      return {
        temperature: Math.round(main.temp * 10) / 10,
        windSpeed: Math.round(wind.speed * 10) / 10,
      };
    } catch (error) {
      console.error('❌ Weather API Error:', error.message);
      setDataSource(prev => ({ ...prev, weather: { connected: false } }));
      return null;
    }
  };

  // ==========================================
  // FETCH REAL EARTHQUAKE DATA
  // ==========================================
  const fetchEarthquakeData = async () => {
    try {
      const response = await axios.get(
        'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson',
        { timeout: 5000 }
      );

      if (response.data.features && response.data.features.length > 0) {
        // Get the most recent earthquake with magnitude > 4
        const recentEarthquakes = response.data.features
          .map(eq => ({
            magnitude: eq.properties.mag,
            place: eq.properties.place,
            time: eq.properties.time,
          }))
          .filter(eq => eq.magnitude > 4)
          .sort((a, b) => b.time - a.time);

        if (recentEarthquakes.length > 0) {
          const latestEarthquake = recentEarthquakes[0];
          
          // Only process if it's a new earthquake (different from last one)
          if (lastEarthquakeRef.current !== latestEarthquake.time) {
            lastEarthquakeRef.current = latestEarthquake.time;
            const spike = latestEarthquake.magnitude * 2;
            earthquakeSpikeRef.current = spike;
            
            console.log(`📍 Earthquake detected: Magnitude ${latestEarthquake.magnitude} - ${latestEarthquake.place}`);
            setApiSuccessCount(prev => prev + 1);
            return spike;
          }
        }
      }
      
      // Mark earthquake API as connected
      setDataSource(prev => ({ ...prev, earthquake: { connected: true } }));
      setApiSuccessCount(prev => prev + 1);
      return 0;
    } catch (error) {
      console.error('❌ Earthquake API Error:', error.message);
      setDataSource(prev => ({ ...prev, earthquake: { connected: false } }));
      return 0;
    }
  };

  // ==========================================
  // MAIN SENSOR UPDATE LOOP (Real + Simulated Data)
  // ==========================================
  useEffect(() => {
    let isUnmounted = false;
    let interval;

    const updateSensorData = async () => {
      if (isUnmounted) return;

      // Set fetching state
      setIsFetching(true);
      setApiCallCount(prev => prev + 1);

      // Fetch real data from APIs
      const weatherData = await fetchWeatherData();
      const earthquakeSpike = await fetchEarthquakeData();

      if (isUnmounted) return;

      // ==========================================
      // UPDATE TEMPERATURE (REAL from weather API)
      // ==========================================
      if (weatherData) {
        setTemperature(weatherData.temperature);
        
        // ==========================================
        // UPDATE VIBRATION (REAL wind + earthquake)
        // ==========================================
        // Base vibration from wind speed: windSpeed * 4
        let baseVibration = weatherData.windSpeed * 4;
        
        // Add earthquake spike if active
        let totalVibration = baseVibration + earthquakeSpikeRef.current;
        
        // Gradually reduce earthquake spike over time
        if (earthquakeSpikeRef.current > 0) {
          earthquakeSpikeRef.current = Math.max(0, earthquakeSpikeRef.current - 2);
        }
        
        // Keep vibration in realistic range: 5-95
        totalVibration = Math.max(5, Math.min(95, totalVibration));
        setVibration(totalVibration);

        setIsLiveDataConnected(true);
        setConnectionStatus('✅ Live Data Connected');
      } else {
        // FALLBACK: Use simulated data if API fails
        setIsLiveDataConnected(false);
        setConnectionStatus('🔄 Using Backup Mode');

        setTemperature(prev => {
          const change = (Math.random() - 0.5) * 2;
          return Math.max(10, Math.min(40, prev + change));
        });

        setVibration(prev => {
          const change = (Math.random() - 0.5) * 15;
          return Math.max(5, Math.min(95, prev + change));
        });
      }

      // ==========================================
      // UPDATE LOAD STRESS (SIMULATED - traffic)
      // ==========================================
      setLoad(prev => {
        const change = (Math.random() - 0.5) * 10;
        return Math.max(10, Math.min(100, prev + change));
      });

      // ==========================================
      // UPDATE CRACK WIDTH (SIMULATED - slow growth)
      // ==========================================
      setCrack(prev => {
        const change = (Math.random() - 0.5) * 3;
        return Math.max(0, Math.min(25, prev + change));
      });

      setLastUpdateTime(new Date().toLocaleTimeString());
      setIsFetching(false);
    };

    // Initial update
    updateSensorData();

    // Set up interval for continuous updates (every 10 seconds)
    interval = setInterval(updateSensorData, 10000);

    return () => {
      isUnmounted = true;
      clearInterval(interval);
    };
  }, []);

  // ==========================================
  // UPDATE CHART DATA
  // ==========================================
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
        {/* Live Data Indicator - Hackathon Display */}
        <LiveDataIndicator
          isConnected={isLiveDataConnected}
          lastUpdateTime={lastUpdateTime}
          isFetching={isFetching}
          apiCallCount={apiCallCount}
          successRate={apiCallCount > 0 ? Math.round((apiSuccessCount / (apiCallCount * 2)) * 100) : 0}
          dataSource={dataSource}
        />

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

        {/* Key Features Section */}
        <div className="mb-16 bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-blue-500 border-opacity-30 rounded-lg p-8">
          <FeaturesSection inDashboard={true} />
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
            <p className="text-gray-600 text-sm">Data Source</p>
            <p className={`text-lg font-bold ${
              isLiveDataConnected ? 'text-green-600' : 'text-yellow-600'
            }`}>
              {isLiveDataConnected ? '🌍 Live' : '⚙️ Backup'}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
