# Backend - Quick Start Guide

## 📦 Setup Backend

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Server
```bash
# Development (with file watching)
npm run dev

# Or production
npm start
```

### 4. Server Running
```
http://localhost:5000
```

## 🌐 Quick API Test

### Test Health
```bash
curl http://localhost:5000/health
```

### Test Sensor Data
```bash
curl http://localhost:5000/api/sensor-data
```

### Post Sensor Reading
```bash
curl -X POST http://localhost:5000/api/sensor-data \
  -H "Content-Type: application/json" \
  -d '{
    "vibration": 45.67,
    "load": 32.45,
    "crack": 3.21,
    "temperature": 28.5
  }'
```

## 🔌 Connect Frontend to Backend

### Update Frontend API URL

Edit `src/pages/Dashboard.js` and change the fetch calls:

**Before (simulated data):**
```javascript
setInterval(() => {
  setVibration(prev => {
    const change = (Math.random() - 0.5) * 15;
    return Math.max(5, Math.min(95, prev + change));
  });
  // ... more simulated data
}, 2000);
```

**After (real backend data):**
```javascript
const API_URL = 'http://localhost:5000/api';

useEffect(() => {
  const interval = setInterval(async () => {
    try {
      const response = await fetch(`${API_URL}/sensor-data`);
      const result = await response.json();
      
      if (result.success) {
        const { data } = result;
        setVibration(data.vibration);
        setLoad(data.load);
        setCrack(data.crack);
        setTemperature(data.temperature);
      }
    } catch (error) {
      console.error('Failed to fetch sensor data:', error);
    }
  }, 2000);

  return () => clearInterval(interval);
}, []);
```

## 📊 API Endpoints Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Server health check |
| `/api/sensor-data` | GET | Get current sensor reading |
| `/api/sensor-data` | POST | Record new sensor reading |
| `/api/sensor-data/latest` | GET | Get latest reading |
| `/api/sensor-data/history` | GET | Get sensor history |
| `/api/sensor-data/stats` | GET | Get statistics |

## ⚙️ Configuration

Edit `src/config.js`:
```javascript
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
```

## 🚀 Run Both Frontend + Backend

### Terminal 1 (Frontend)
```bash
cd project
npm start
```

### Terminal 2 (Backend)
```bash
cd project/backend
npm start
```

Both should now be running:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 📋 Common Issues

### Backend not starting
```bash
# Try clearing node_modules
rm -rf node_modules package-lock.json
npm install
npm start
```

### CORS error in frontend
- Verify backend is running on http://localhost:5000
- Check CORS config in `src/middleware/cors.js`
- Ensure frontend URL matches FRONTEND_URL in config

### Port already in use
```bash
# Kill process on port 5000
npx kill-port 5000
npm start
```

## 📚 Full Backend Docs

See [backend/README.md](README.md) for complete API documentation, examples, and deployment options.

---

**Ready to go! 🚀**
