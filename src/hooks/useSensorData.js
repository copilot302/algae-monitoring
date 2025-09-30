import { useState, useEffect, useRef } from 'react';

export const useSensorData = () => {
  const [sensorData, setSensorData] = useState({
    temperature: 22.5,        // Moderate risk (20-25°C range)
    dissolvedOxygen: 3.8,     // Moderate risk (2-5 mg/L range)
    ph: 8.7,                  // Moderate risk (8.5-9 range)
    electricalConductivity: 850,  // Moderate risk (800-1000 µS/cm range)
    turbidity: 35.2           // Moderate risk (10-50 NTU range)
  });

  const [dataHistory, setDataHistory] = useState({
    temperature: [],
    dissolvedOxygen: [],
    ph: [],
    electricalConductivity: [],
    turbidity: []
  });

  const [isConnected, setIsConnected] = useState(true);
  const intervalRef = useRef();

  // Generate realistic sensor data variations with occasional risk conditions
  const generateRealisticValue = (parameter, currentValue) => {
    const variations = {
      temperature: 0.5,           // °C
      dissolvedOxygen: 0.3,       // mg/L
      ph: 0.1,                    // pH units
      electricalConductivity: 25, // µS/cm
      turbidity: 2.0              // NTU
    };

    const bounds = {
      temperature: { min: 15, max: 30 },        // °C
      dissolvedOxygen: { min: 1, max: 12 },     // mg/L
      ph: { min: 6, max: 10 },                  // pH units
      electricalConductivity: { min: 200, max: 1200 },  // µS/cm
      turbidity: { min: 0, max: 80 }            // NTU
    };

    // Occasionally introduce more dramatic changes to trigger risk conditions
    let variation = (Math.random() - 0.5) * 2 * variations[parameter];
    
    // 15% chance of a larger variation that might push into moderate/high risk zones
    if (Math.random() < 0.15) {
      variation *= 3;
    }
    
    const newValue = currentValue + variation;
    
    return Math.max(
      bounds[parameter].min,
      Math.min(bounds[parameter].max, newValue)
    );
  };

  // Initialize data history
  useEffect(() => {
    const initialHistory = {};
    Object.keys(sensorData).forEach(key => {
      initialHistory[key] = Array.from({ length: 20 }, () => 
        generateRealisticValue(key, sensorData[key])
      );
    });
    setDataHistory(initialHistory);
  }, []);

  // Start real-time data simulation
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSensorData(prevData => {
        const newData = {};
        Object.keys(prevData).forEach(key => {
          newData[key] = generateRealisticValue(key, prevData[key]);
        });
        return newData;
      });

      setDataHistory(prevHistory => {
        const newHistory = {};
        Object.keys(prevHistory).forEach(key => {
          const newArray = [...prevHistory[key]];
          newArray.push(sensorData[key]);
          if (newArray.length > 20) {
            newArray.shift();
          }
          newHistory[key] = newArray;
        });
        return newHistory;
      });

      // Simulate occasional connection issues
      setIsConnected(Math.random() > 0.05); // 95% uptime
    }, 3000); // Update every 3 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [sensorData]);

  return {
    sensorData,
    dataHistory,
    isConnected
  };
};