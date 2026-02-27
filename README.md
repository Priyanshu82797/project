# Smart Bridge Digital Twin Dashboard

A professional, real-time dashboard for monitoring Smart Bridge structural health using React, Tailwind CSS, Three.js, and Recharts.

## Features

✨ **Real-time Sensor Monitoring**
- Live updates every 2 seconds
- 4 sensor cards: Vibration, Load Stress, Crack Width, Temperature
- Realistic simulated data with visual indicators

📊 **Risk Assessment**
- Intelligent risk score calculation (0-100)
- Formula: Risk = (Vibration × 0.4) + (Crack × 0.3) + (Load × 0.3)
- Visual risk meter with color-coded alerts
- Critical alert system for high-risk scenarios

📈 **Data Visualization**
- Real-time vibration trend chart (last 30 seconds)
- Smooth animations and transitions
- Responsive design for all screen sizes

🎨 **3D Bridge Model**
- Interactive Three.js 3D bridge visualization
- Color changes: Gray (Normal) → Red (High Risk)
- Subtle vibration animation when at-risk
- Professional lighting and shadows

🎯 **Professional UI/UX**
- Modern gradient design with Tailwind CSS
- Responsive grid layout
- Smooth transitions and animations
- Status indicators and live time display
- Hackathon-ready aesthetics

## Project Structure

```
src/
├── components/
│   ├── Navbar.js           # Header with title and status
│   ├── SensorCard.js       # Individual sensor display
│   ├── RiskMeter.js        # Risk score visualization
│   ├── BridgeModel.js      # 3D bridge using Three.js
│   └── VibrationChart.js   # Recharts visualization
├── pages/
│   └── Dashboard.js        # Main dashboard page
├── App.js                  # Root component
├── index.js                # Entry point
└── index.css               # Global styles
```

## Installation

### Prerequisites
- Node.js 14+ 
- npm or yarn

### Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm start
```

3. **Build for production:**
```bash
npm build
```

The app will open at `http://localhost:3000`

## Dependencies

- **react** & **react-dom** - UI framework
- **tailwindcss** - Utility-first CSS framework
- **recharts** - React charting library
- **three** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful Three.js utilities

## Usage

### Real-time Data
- Sensor values update automatically every 2 seconds
- Data is simulated with realistic ranges and variations
- Chart maintains rolling window of last 30 data points

### Risk Assessment
- Risk score updates in real-time based on sensor inputs
- Visual indicators change color as risk increases:
  - 🟢 Green/Blue: Low to Medium risk
  - 🟡 Yellow/Orange: High risk
  - 🔴 Red: Critical risk (>75)

### 3D Bridge Visualization
- Bridge model rotates slowly for visual interest
- Changes to red color when risk score exceeds 75
- Subtle vibration effect provides feedback of structural stress
- Completely responsive to screen size

## Customization

### Adjust Update Frequency
Edit [src/pages/Dashboard.js](src/pages/Dashboard.js) line ~50:
```javascript
setInterval(() => { ... }, 2000); // Change from 2000ms
```

### Change Risk Thresholds
Edit [src/pages/Dashboard.js](src/pages/Dashboard.js) line ~28:
```javascript
const isHighRisk = riskScore > 75; // Change threshold
```

### Modify Sensor Ranges
Edit [src/pages/Dashboard.js](src/pages/Dashboard.js) sensor update logic to adjust min/max values

### Customize Colors
Edit `tailwind.config.js` to modify the color scheme, or update individual component Tailwind classes

## Performance Optimization

- Uses React.memo for component optimization (optional)
- Efficient Three.js rendering with proper cleanup
- Recharts optimized for performance
- Scrolling optimization with CSS containment

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag build folder to netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Future Enhancements

- Backend API integration for real data
- WebSocket support for live data streaming
- Historical data analysis and trends
- Export/Report generation
- User authentication
- Multiple bridge monitoring
- Alert notifications
- Data logging and archival

## License

MIT License - feel free to use for any project

## Support

For issues or questions, create an issue in the repository.

---

**Built with ❤️ for structural health monitoring**
