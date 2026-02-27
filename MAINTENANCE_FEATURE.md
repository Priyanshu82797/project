# Maintenance Recommendation Engine - Feature Guide

## 🎯 Overview

The Maintenance Recommendation Engine is an intelligent component that analyzes structural risk scores and provides actionable maintenance recommendations for the Smart Bridge.

## 📊 Feature Details

### Recommendation Levels

The engine operates on three distinct risk levels:

#### 1. **LOW RISK** (Risk Score < 40) 🟢
- **Status Label**: Routine Monitoring Recommended
- **Visual**: Green background with ✅ icon
- **Timeline**: 30 days to next inspection
- **Action Items**:
  - Continue regular monitoring schedule
  - Review data logs weekly
  - No immediate action required

**Example**: Risk Score 35 - Bridge operating normally

#### 2. **MEDIUM RISK** (Risk Score 40-74) 🟡
- **Status Label**: Schedule Structural Inspection Within 7 Days
- **Visual**: Yellow background with ⚠️ icon
- **Timeline**: 7 days for professional inspection
- **Action Items**:
  - Schedule inspection within 7 days
  - Increase monitoring frequency to daily
  - Document sensor anomalies
  - Alert maintenance team

**Example**: Risk Score 55 - Structural stress detected

#### 3. **CRITICAL RISK** (Risk Score ≥ 75) 🔴
- **Status Label**: Immediate Load Restriction & Emergency Inspection Required
- **Visual**: Red background with 🚨 icon
- **Timeline**: Immediate (within 24 hours)
- **Action Items**:
  - IMMEDIATE: Restrict vehicle loads
  - Implement emergency traffic control
  - Emergency structural inspection required
  - Notify authorities immediately
  - Divert traffic if necessary

**Example**: Risk Score 82 - Critical structural failure risk

## 📍 Where to Find It

The Maintenance Recommendation card is displayed prominently on the dashboard:

1. Open the Smart Bridge Dashboard at `http://localhost:3000`
2. Below the **Structural Risk Assessment** (Risk Meter)
3. Full-width responsive card with color-coded styling

## 🎨 Card Components

Each maintenance recommendation card includes:

### Header
- Risk priority badge (LOW/MEDIUM/CRITICAL)
- Icon representation (✅/⚠️/🚨)
- Title: "Maintenance Recommendation"

### Main Recommendation
- Bold, large text with the recommendation
- Description of the current bridge status

### Timeline
- ⏱️ Time indicator showing action urgency

### Action Items
- Bulleted list of required/recommended actions
- Color-coded based on risk level

### Risk Score Meter
- Current risk score (0-100)
- Visual progress bar showing risk percentage
- Dynamic color changes (green → yellow → red)

### Footer Note
- Disclaimer about professional consultation
- Link to best practices documentation

## 🧮 Risk Calculation

The risk score is calculated using sensor data:

```
Risk = (Vibration × 0.4) + (Crack×10 × 0.3) + (Load × 0.3)
```

**Components**:
- Vibration (0-100): Structural vibration in m/s²
- Load (0-100): Stress in MN
- Crack (0-10): Width in mm (scaled to 0-100)

## 💻 Implementation

### Component Location
```
src/components/MaintenanceRecommendation.js
```

### Utility Functions
```
src/utils/maintenanceUtils.js
```

### Integration in Dashboard
```javascript
import MaintenanceRecommendation from '../components/MaintenanceRecommendation';

// Inside JSX
<MaintenanceRecommendation riskScore={riskScore} />
```

### useMemo Optimization
The component uses `useMemo` to efficiently cache recommendation details:

```javascript
const details = useMemo(() => {
  // Generate recommendations based on riskScore
  if (riskScore < 40) { /* LOW */ }
  if (riskScore < 75) { /* MEDIUM */ }
  else { /* CRITICAL */ }
}, [riskScore]);
```

This ensures smooth performance even with frequent updates.

## 🎨 Tailwind CSS Classes

### Low Risk (Green)
```
bgColor: "bg-green-50"
borderColor: "border-green-500"
textColor: "text-green-700"
badgeColor: "bg-green-100 text-green-800"
```

### Medium Risk (Yellow)
```
bgColor: "bg-yellow-50"
borderColor: "border-yellow-500"
textColor: "text-yellow-700"
badgeColor: "bg-yellow-100 text-yellow-800"
```

### Critical Risk (Red)
```
bgColor: "bg-red-50"
borderColor: "border-red-500"
textColor: "text-red-700"
badgeColor: "bg-red-100 text-red-800"
```

## 🔄 Real-Time Updates

The recommendation updates automatically every 2 seconds as sensor data changes:

1. Frontend fetches sensor data every 2 seconds
2. Risk score recalculates automatically
3. `useMemo` detects riskScore change
4. Component re-renders with new recommendation
5. Smooth color transition animations

## 📱 Responsive Design

The card is fully responsive:

- **Desktop**: Full-width card with all details visible
- **Tablet**: Slightly reduced padding, maintains readability
- **Mobile**: Stacked layout, touch-friendly interactions

## 🧪 Testing Scenarios

### Test Low Risk
1. Set sensor values: Vibration=20, Load=30, Crack=2
2. Risk Score ≈ 25 (GREEN)
3. See "Routine Monitoring Recommended"

### Test Medium Risk
1. Set sensor values: Vibration=60, Load=50, Crack=5
2. Risk Score ≈ 55 (YELLOW)
3. See "Schedule Structural Inspection Within 7 Days"

### Test Critical Risk
1. Set sensor values: Vibration=90, Load=80, Crack=8
2. Risk Score ≈ 84 (RED)
3. See "Immediate Load Restriction & Emergency Inspection Required"

## 🔗 Connected Components

The Maintenance Recommendation Engine works with:

1. **RiskMeter Component**
   - Displays numerical risk score in a gauge
   - Same color-coding scheme

2. **SensorCard Component**
   - Real-time sensor value updates
   - Contributes to risk calculation

3. **Dashboard Page**
   - Receives aggregated risk score
   - Passes to MaintenanceRecommendation

4. **Backend API** (optional)
   - `/api/sensor-data` returns risk score
   - Can use backend risk calculation

## 📈 Data Flow

```
Sensor Values → Risk Calculation → Recommendation Engine
                                           ↓
                              Tailwind Styling Applied
                                           ↓
                          Displayed in Card Component
                                           ↓
                              Real-time Updates (2s)
```

## 🚀 Advanced Usage

### Customizing Thresholds

Edit `MaintenanceRecommendation.js` to change risk thresholds:

```javascript
// Change thresholds
if (riskScore < 35) { // was 40
  return { /* LOW */ };
}
if (riskScore >= 35 && riskScore < 70) { // was 75
  return { /* MEDIUM */ };
}
return { /* CRITICAL */ };
```

### Adding Custom Recommendations

Extend the action items for your use case:

```javascript
actionItems: [
  "Custom action 1",
  "Custom action 2",
  "Custom action 3",
],
```

### Integrating with Notifications

Add a hook to send alerts:

```javascript
useEffect(() => {
  if (riskScore >= 75) {
    sendEmail("Critical Risk Detected!");
    sendSMS("Bridge Alert: Risk > 75%");
  }
}, [riskScore]);
```

## 📋 Best Practices

1. **Always Consult Professionals**: The recommendations are guidelines, not replacements for professional engineering judgment
2. **Document Changes**: Keep records of risk score trends
3. **Regular Calibration**: Verify sensor accuracy monthly
4. **Trend Analysis**: Look at patterns, not individual readings
5. **Multi-Factor Review**: Consider weather, traffic, seasonal factors

## 🔍 Debugging Tips

### Card Not Showing
- Check if `MaintenanceRecommendation` is imported in Dashboard.js
- Verify `riskScore` prop is being passed correctly
- Check browser console for errors (F12)

### Wrong Recommendation Showing
- Verify risk calculation formula
- Check `useMemo` dependencies
- Test with manual risk score values

### Color Not Changing
- Clear browser cache (Ctrl+Shift+Delete)
- Verify Tailwind CSS is properly configured
- Check class names match Tailwind definitions

## 🎓 Learning Resources

- **Tailwind CSS**: See [tailwind.config.js](../tailwind.config.js)
- **React Hooks**: [React Documentation](https://react.dev)
- **Component Design**: Review other card components in `src/components/`
- **Risk Calculation**: See [sensorUtils.js](../utils/sensorUtils.js)

## 📞 Support

For issues or enhancements:

1. Check the main README.md
2. Review component code comments
3. Test with different risk score values
4. Check browser developer console

---

**Built with React + Tailwind CSS + useMemo for optimal performance** ⚡
