# Smart Bridge Digital Twin - Quick Reference Guide

## 🚀 Start in 3 Commands

### Windows
```bash
cd "c:\Users\ASUS\OneDrive\Pictures\Desktop\project"
npm install
npm start
```

### Linux/Mac
```bash
cd ~/Desktop/project
npm install
npm start
```

## 📌 File Reference

### Must-Read Files
1. **README.md** - Overview and deployment guide
2. **SETUP.md** - Detailed setup and customization
3. **PROJECT_SUMMARY.md** - Complete project breakdown

### Component Files (in src/components/)
- **Navbar.js** - Header with title (35 lines)
- **SensorCard.js** - Sensor display cards (60 lines)
- **RiskMeter.js** - Risk gauge visualization (85 lines)
- **BridgeModel.js** - 3D bridge using Three.js (180 lines)
- **VibrationChart.js** - Recharts visualization (45 lines)

### Main Files
- **src/App.js** - Root component
- **src/index.js** - React entry point
- **src/pages/Dashboard.js** - Main dashboard

## 🎮 Live Dashboard Features

| Feature | Status |
|---------|--------|
| Sensor Data Updates | Every 2 seconds ✅ |
| Real-time Risk Score | 0-100 automatic ✅ |
| 3D Bridge Model | Interactive, color-changes ✅ |
| Vibration Chart | Last 30 seconds ✅ |
| High-Risk Alert | Red box when >75 ✅ |
| Status Indicator | Live dot in navbar ✅ |

## 🔧 Customization Cheat Sheet

### Change Update Speed
**File:** `src/pages/Dashboard.js` (line ~50)
```javascript
}, 2000);  // 2000 = 2 seconds
```
Change to: `1000` (1 sec), `5000` (5 sec), etc.

### Change Risk Alert Threshold
**File:** `src/pages/Dashboard.js` (line ~28)
```javascript
const isHighRisk = riskScore > 75;  // Change 75 to any value
```

### Change Sensor Range
**File:** `src/pages/Dashboard.js` (line ~57-76)
```javascript
Math.max(5, Math.min(95, ...))  // Min=5, Max=95 for vibration
```

### Change Colors
**Option 1:** Edit Tailwind classes in components
**Option 2:** Edit `tailwind.config.js`

## 📊 Risk Formula

```
Risk Score = (Vibration × 0.4) + (Crack × 0.3) + (Load × 0.3)
```

**Risk Levels:**
- 0-25: LOW (Green)
- 25-50: MEDIUM (Yellow)
- 50-75: HIGH (Orange)
- 75+: CRITICAL (Red) 🚨

## 👀 Component Tree

```
App.js
└── Dashboard.js
    ├── Navbar.js
    ├── SensorCard.js (4x)
    │   ├── Vibration Level
    │   ├── Load Stress
    │   ├── Crack Width
    │   └── Temperature
    ├── RiskMeter.js
    ├── VibrationChart.js
    └── BridgeModel.js (3D)
```

## 🔌 Dependencies Quick View

```
react@18.2              - UI framework
tailwindcss@3.3         - Styling
recharts@2.10           - Charts
three@r157              - 3D graphics
@react-three/fiber      - React + Three.js
```

## 🌐 Browser Compatibility

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+

## 📁 Key File Paths

```
package.json               - Dependencies & scripts
src/App.js                - Root component
src/index.js              - Entry point
src/index.css             - Global styles
src/components/Navbar.js  - Header
src/components/SensorCard.js
src/components/RiskMeter.js
src/components/BridgeModel.js
src/components/VibrationChart.js
src/pages/Dashboard.js    - Main page
public/index.html         - HTML template
tailwind.config.js        - Tailwind config
```

## 🎯 Feature Checklist

- [x] Real-time updates every 2 seconds
- [x] 4 sensor cards (vibration, load, crack, temperature)
- [x] Risk calculation with proper weights
- [x] High-risk alert (red box when >75)
- [x] Line chart with 30-second history
- [x] 3D bridge that turns red on high-risk
- [x] Responsive design (mobile to desktop)
- [x] Professional UI with Tailwind CSS
- [x] Smooth animations and transitions
- [x] Status footer with metrics

## 🐛 Common Issues & Fixes

### Port 3000 in use?
```bash
npx kill-port 3000
npm start
```

### Modules not found?
```bash
rm -rf node_modules
npm install
```

### Styles not showing?
```bash
npm run build
# Clear browser cache (Ctrl+Shift+Delete)
```

### 3D not rendering?
- Check if WebGL is supported
- Try a different browser
- Check console for errors (F12)

## 📈 Performance Tips

- Chart keeps last 30 points (configurable)
- Three.js properly cleans up on unmount
- Recharts optimized animations
- No unnecessary re-renders
- Efficient state management

## 🚢 Deployment

### Quick Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag 'build' folder to netlify.com
```

## 💡 Learning Path

1. **Understand Structure:** Read PROJECT_SUMMARY.md
2. **Review Components:** Check each component file
3. **Customize:** Adjust values in Dashboard.js
4. **Extend:** Add new sensors or features
5. **Deploy:** Ship to Vercel or Netlify

## 📞 Resources

- **React:** https://react.dev
- **Tailwind:** https://tailwindcss.com
- **Three.js:** https://threejs.org
- **Recharts:** https://recharts.org
- **Create React App:** https://create-react-app.dev

## ✨ Pro Tips

1. **Monitor Real-time Data:**
   - Open DevTools (F12)
   - Watch state values change every 2 seconds

2. **Test Risk Mode:**
   - Modify sensor values to force high-risk state
   - Watch 3D bridge turn red and vibrate

3. **Customize for Your Use Case:**
   - Change threshold values
   - Add more sensors
   - Modify calculation weights

4. **Show It Off:**
   - Deploy to live URL
   - Share the link
   - Impress at hackathon! 🎉

## 🎊 You're All Set!

Run:
```bash
npm install && npm start
```

Dashboard opens instantly! 🚀

---

**Questions? Check SETUP.md for detailed guidance.**
