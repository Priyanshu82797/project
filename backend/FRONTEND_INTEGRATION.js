/**
 * Example Frontend Integration
 * Shows how to connect React frontend to Node.js backend
 */

// Add this to src/pages/Dashboard.js or create a new hook

import { useState, useEffect } from 'react';

// Configuration
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Hook to fetch sensor data from backend
 */
export const useSensorData = () => {
  const [sensorData, setSensorData] = useState({
    vibration: 0,
    load: 0,
    crack: 0,
    temperature: 0,
    riskScore: 0,
    status: 'SAFE',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSensorData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/sensor-data`);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setSensorData({
          vibration: result.data.vibration,
          load: result.data.load,
          crack: result.data.crack,
          temperature: result.data.temperature,
          riskScore: result.data.riskScore,
          status: result.data.status,
          riskLevel: result.data.riskLevel,
        });
        setError(null);
      }
    } catch (err) {
      console.error('Sensor data fetch error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on interval
  useEffect(() => {
    // Fetch immediately
    fetchSensorData();

    // Then fetch every 2 seconds
    const interval = setInterval(fetchSensorData, 2000);

    return () => clearInterval(interval);
  }, []);

  return { sensorData, isLoading, error, fetchSensorData };
};

/**
 * Hook to record sensor data to backend
 */
export const useRecordSensorData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const recordSensorData = async (data) => {
    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/sensor-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vibration: data.vibration,
          load: data.load,
          crack: data.crack,
          temperature: data.temperature,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setError(null);
        return result.data;
      }
    } catch (err) {
      console.error('Record sensor data error:', err);
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { recordSensorData, isLoading, error };
};

/**
 * Hook to get sensor statistics
 */
export const useSensorStats = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/sensor-data/stats`);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setStats(result.data);
        setError(null);
      }
    } catch (err) {
      console.error('Stats fetch error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 10000); // Fetch every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return { stats, isLoading, error, fetchStats };
};

/**
 * Hook to get sensor history
 */
export const useSensorHistory = (limit = 50) => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/sensor-data/history?limit=${limit}`);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setHistory(result.data);
        setError(null);
      }
    } catch (err) {
      console.error('History fetch error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [limit]);

  return { history, isLoading, error, fetchHistory };
};

// ==================== Usage Examples ====================

/**
 * Example 1: Update Dashboard.js to use real backend data
 */

// import { useSensorData } from '../hooks/useSensorData';
//
// function Dashboard() {
//   const { sensorData, isLoading, error } = useSensorData();
//   const { vibration, load, crack, temperature, riskScore } = sensorData;
//
//   if (error) {
//     return <div>Error: {error}</div>;
//   }
//
//   return (
//     <div>
//       {/* Your dashboard components */}
//       <SensorCard value={vibration} />
//       {/* ... */}
//     </div>
//   );
// }

/**
 * Example 2: Manual recording of sensor data
 */

// import { useRecordSensorData } from '../hooks/useSensorData';
//
// function RecordButton() {
//   const { recordSensorData, isLoading } = useRecordSensorData();
//
//   const handleRecord = async () => {
//     await recordSensorData({
//       vibration: 45.67,
//       load: 32.45,
//       crack: 3.21,
//       temperature: 28.5,
//     });
//   };
//
//   return (
//     <button onClick={handleRecord} disabled={isLoading}>
//       {isLoading ? 'Recording...' : 'Record Data'}
//     </button>
//   );
// }

/**
 * Example 3: Display statistics
 */

// import { useSensorStats } from '../hooks/useSensorData';
//
// function Statistics() {
//   const { stats, isLoading } = useSensorStats();
//
//   if (isLoading || !stats) return <div>Loading...</div>;
//
//   return (
//     <div>
//       <h3>Average Vibration: {stats.vibration.avg}</h3>
//       <h3>Max Load: {stats.load.max}</h3>
//       {/* ... */}
//     </div>
//   );
// }

export default {
  useSensorData,
  useRecordSensorData,
  useSensorStats,
  useSensorHistory,
};
