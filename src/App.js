import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ParameterCard from './components/ParameterCard';
import RiskAssessment from './components/RiskAssessment';
import Footer from './components/Footer';
import { useSensorData } from './hooks/useSensorData';
import { useRiskAssessment } from './hooks/useRiskAssessment';
import { exportData } from './utils/dataExport';
import './styles/App.css';

const App = () => {
  const { sensorData, dataHistory, isConnected } = useSensorData();
  const { riskLevels, overallRisk } = useRiskAssessment(sensorData);

  const handleExportData = () => {
    exportData(sensorData, dataHistory, riskLevels);
  };

  return (
    <div className="app">
      <div className="container">
        <Header 
          isConnected={isConnected}
          overallRisk={overallRisk}
        />
        
        <main className="dashboard">
          <div className="parameter-grid">
            <ParameterCard
              title="Temperature"
              icon="thermometer"
              value={sensorData.temperature}
              unit="°C"
              data={dataHistory.temperature}
              riskLevel={riskLevels.temperature}
              type="chart"
            />
            
            <ParameterCard
              title="Dissolved Oxygen"
              icon="droplets"
              value={sensorData.dissolvedOxygen}
              unit="mg/L"
              data={dataHistory.dissolvedOxygen}
              riskLevel={riskLevels.dissolvedOxygen}
              type="chart"
            />
            
            <ParameterCard
              title="pH Level"
              icon="flask"
              value={sensorData.ph}
              unit=""
              data={dataHistory.ph}
              riskLevel={riskLevels.ph}
              type="gauge"
              min={0}
              max={14}
            />
            
            <ParameterCard
              title="Electrical Conductivity"
              icon="zap"
              value={sensorData.electricalConductivity}
              unit="µS/cm"
              data={dataHistory.electricalConductivity}
              riskLevel={riskLevels.electricalConductivity}
              type="gauge"
              min={0}
              max={1200}
            />
            
            <ParameterCard
              title="Turbidity"
              icon="eye"
              value={sensorData.turbidity}
              unit="NTU"
              data={dataHistory.turbidity}
              riskLevel={riskLevels.turbidity}
              type="chart"
            />
            
            <RiskAssessment
              overallRisk={overallRisk}
              riskLevels={riskLevels}
              sensorData={sensorData}
            />
          </div>
        </main>
        
        <Footer onExportData={handleExportData} />
      </div>
    </div>
  );
};

export default App;