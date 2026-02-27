# SETUP GUIDE - Smart Bridge Digital Twin Dashboard

## Quick Start

### 1. Install Dependencies
Open terminal in project directory and run:
```bash
npm install
```

This will install all required packages including:
- React & React DOM
- Tailwind CSS
- Recharts
- Three.js
- @react-three/fiber
- @react-three/drei

### 2. Start Development Server
```bash
npm start
```

The application will automatically open at `http://localhost:3000`

### 3. Build for Production
```bash
npm run build
```

Production files will be in the `build/` directory.

## Project Structure

```
smart-bridge-digital-twin/
├── public/
│   ├── index.html              # Main HTML file
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Navbar.js           # Header navigation (🌉 Smart Bridge Digital Twin)
│   │   ├── SensorCard.js       # Vibration, Load, Crack, Temperature cards
│   │   ├── RiskMeter.js        # Risk score circular gauge (0-100)
│   │   ├── BridgeModel.js      # 3D bridge visualization (Three.js)
│   │   └── VibrationChart.js   # Real-time line chart (Recharts)
│   ├── pages/
│   │   └── Dashboard.js        # Main dashboard layout & state management
│   ├── App.js                  # Root component
│   ├── index.js                # React DOM render entry
│   └── index.css               # Global styles + Tailwind directives
├── package.json                # Dependencies & scripts
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
├── jsconfig.json               # JavaScript path aliases
├── .gitignore                  # Git ignore rules
└── README.md                   # Full documentation

```

## Key Features

### 1. Real-time Sensor Data
- **Update Interval:** Every 2 seconds
- **4 Sensors:**
  - Vibration Level (5-95 m/s²)
  - Load Stress (10-100 MN)
  - Crack Width (0-25 mm)
  - Temperature (10-40 °C)
- Realistic random fluctuations with constraints

### 2. Risk Assessment System
**Risk Calculation Formula:**
```
Risk Score = (Vibration × 0.4) + (Crack Width × 0.3) + (Load Stress × 0.3)
```

**Risk Levels:**
- 0-25: LOW (🟢 Green)
- 25-50: MEDIUM (🟡 Yellow)
- 50-75: HIGH (🟠 Orange)
- 75-100: CRITICAL (🔴 Red)

**Alert System:**
- When Risk > 75: Red alert box appears
- 3D bridge turns red
- Bridge vibrates slightly
- All visual indicators update in real-time

### 3. Components Breakdown

#### Navbar Component
- Displays app title with bridge emoji
- Shows "Real-time Structural Monitoring" status
- Live status indicator (green pulsing dot)

#### Sensor Cards
- Displays current value with unit
- Shows min/max range
- Visual progress bar
- Color-coded based on threshold
- Icons for visual identification

#### Risk Meter
- Circular gauge showing risk (0-100)
- Risk level badge (LOW/MEDIUM/HIGH/CRITICAL)
- Component breakdown showing weights
- Formula reference at bottom

#### 3D Bridge Model
- Three.js 3D rendering
- Gray bridge in normal state
- Red bridge when high-risk
- Subtle rotation animation
- Vibration effect when at-risk
- Professional lighting and shadows
- Responsive to window resize

#### Vibration Chart
- Recharts line chart
- Rolling 30-second window
- Smooth animations
- Interactive tooltips
- Responsive container

### 4. Dashboard Layout
- Responsive grid system using Tailwind
- Mobile-first design
- 4-column sensor layout on desktop
- 2-column on tablet
- 1-column on phone
- Statistics footer with key metrics

## File Descriptions

### src/components/Navbar.js
Header navigation bar with branding and status indicator.

### src/components/SensorCard.js
Reusable card component for displaying sensor data with:
- Dynamic color coding
- Progress bar
- Min/Max display
- Threshold alerts

### src/components/RiskMeter.js
Risk assessment gauge showing:
- Circular progress ring
- Risk score (0-100)
- Risk level (LOW/MEDIUM/HIGH/CRITICAL)
- Component breakdown
- Formula display

### src/components/BridgeModel.js
3D bridge visualization using Three.js with:
- Main deck platform
- Support towers and pillars
- Decorative cables
- Dynamic color changes
- Vibration animation
- Professional lighting

### src/components/VibrationChart.js
Real-time vibration trend chart using Recharts.

### src/pages/Dashboard.js
Main dashboard component that:
- Manages all sensor state
- Calculates risk score
- Updates data every 2 seconds
- Maintains chart data history
- Orchestrates all sub-components

### src/App.js
Root component that renders the Dashboard.

### src/index.js
React DOM entry point.

### src/index.css
Global styles with Tailwind directives.

## Customization Guide

### Change Update Interval
File: `src/pages/Dashboard.js` (Line ~50)
```javascript
}, 2000); // Change to 1000 for 1 second, 5000 for 5 seconds, etc.
```

### Adjust Risk Threshold
File: `src/pages/Dashboard.js` (Line ~28)
```javascript
const isHighRisk = riskScore > 75; // Change 75 to your desired threshold
```

### Modify Sensor Value Ranges
File: `src/pages/Dashboard.js` (Sensor update logic)
Adjust the Math.max/Math.min values for each sensor.

### Change Colors
File: `tailwind.config.js` or individual components
Modify Tailwind classes or use custom hex colors in components.

### Adjust Risk Calculation Weights
File: `src/pages/Dashboard.js` (Line ~27-28)
```javascript
const riskScore = (vibration * 0.4) + (crack * 0.3) + (load * 0.3);
//                                ^^^              ^^^        ^^^
//                        Change these weights as needed
```

## Performance Tips

1. **Memoization:** Add React.memo() to components if needed
```javascript
export default React.memo(SensorCard);
```

2. **useCallback:** For callback functions in Dashboard
```javascript
const updateSensors = useCallback(() => { ... }, []);
```

3. **useMemo:** For expensive calculations
```javascript
const riskScore = useMemo(() => { ... }, [vibration, crack, load]);
```

## Troubleshooting

### Port 3000 Already in Use
```bash
npx kill-port 3000
npm start
```

### Dependencies Not Installing
```bash
rm -rf node_modules package-lock.json
npm install
```

### Three.js Not Rendering
- Ensure WebGL is supported in browser
- Check browser console for errors
- Verify BridgeModel container has proper dimensions

### Chart Not Updating
- Check that chartData state is updating
- Verify vibration value changes
- Check Recharts console warnings

### Tailwind Styles Not Applied
- Ensure tailwind.config.js paths are correct
- Run `npm run build` to regenerate CSS
- Clear browser cache

## Deployment

### Vercel (Easiest)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag 'build' folder to Netlify
```

### GitHub Pages
Modify package.json:
```json
"homepage": "https://yourusername.github.io/smart-bridge-dashboard"
```

## Browser Compatibility

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Start dev server: `npm start`
3. ✅ Open http://localhost:3000
4. ✅ Explore the dashboard
5. ✅ Customize as needed
6. ✅ Deploy to production

## Support

For issues:
1. Check browser console for errors
2. Verify all dependencies are installed
3. Clear node_modules and reinstall if needed
4. Check device has WebGL support for 3D

Happy building! 🚀
