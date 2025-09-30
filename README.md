# PhycoSense: Real-time Algae Monitoring Dashboard (React)

A modern, responsive React-based web dashboard for monitoring water quality parameters to predict and prevent algae bloom formation.

## 🌊 Features

### Real-time Monitoring
- **Temperature** - Continuous temperature monitoring with trend analysis
- **Dissolved Oxygen** - Critical oxygen level tracking for aquatic health  
- **pH Level** - Circular gauge display for pH monitoring (0-14 scale)
- **Electrical Conductivity** - Water conductivity measurement in mS/cm
- **Turbidity** - Water clarity measurement in NTU

### Risk Assessment System
Three-tier risk classification system:
- **Normal (Green)** - No immediate algae bloom risk
- **Early Bloom Formation (Yellow)** - Moderate risk, monitor closely  
- **High Risk - Bloom Conditions (Red)** - Immediate action required

### 📊 Data Visualization
- Interactive line charts for trending parameters
- Circular gauges for pH and electrical conductivity
- Real-time value displays with units
- Trend indicators (rising, stable, decreasing)

### 🎨 Modern Interface
- Dark theme with gradient backgrounds
- Glassmorphism design elements
- Responsive grid layout
- Smooth animations and transitions
- Mobile-friendly responsive design

## Risk Assessment Thresholds

### Temperature
- **Normal**: 15-28°C
- **Moderate Risk**: 12-32°C (outside normal range)
- **High Risk**: Outside moderate range

### Dissolved Oxygen
- **Normal**: 6-12 mg/L
- **Moderate Risk**: 4-15 mg/L (outside normal range)
- **High Risk**: Below 4 mg/L or above 15 mg/L

### pH Level
- **Normal**: 6.5-8.5
- **Moderate Risk**: 6.0-9.0 (outside normal range)
- **High Risk**: Below 6.0 or above 9.0

### Electrical Conductivity
- **Normal**: 0.5-2.0 mS/cm
- **Moderate Risk**: 0.2-3.0 mS/cm (outside normal range)
- **High Risk**: Outside moderate range

### Turbidity
- **Normal**: 0-20 NTU
- **Moderate Risk**: 20-40 NTU
- **High Risk**: Above 40 NTU

## Technology Stack

- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with animations
- **JavaScript (ES6+)** - Interactive functionality
- **Chart.js** - Data visualization library
- **Font Awesome** - Icons
- **Google Fonts (Inter)** - Typography

## File Structure

```
phycosense/
│
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and animations
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## Getting Started

1. Clone or download the project files
2. Open `index.html` in a modern web browser
3. The dashboard will start with simulated real-time data
4. Monitor the risk assessment panel for algae bloom warnings

## Data Export

The dashboard includes a data export feature that generates JSON files containing:
- Current sensor readings
- Historical data points
- Risk assessment status
- Timestamp information

## Browser Compatibility

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## Future Enhancements

- Real sensor data integration via APIs
- Historical data storage and analysis
- Alert notifications (email/SMS)
- Multi-location monitoring
- Machine learning predictions
- Custom threshold configuration
- User authentication and roles

## License

This project is created for educational and research purposes in algae monitoring and water quality assessment.

## Contact

For questions or contributions related to the PhycoSense algae monitoring system, please refer to your research team documentation.

---

**Note**: This dashboard currently uses simulated data for demonstration purposes. In a production environment, it should be connected to actual sensor hardware or data APIs.