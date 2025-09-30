import React from 'react';
import Icon from './Icon';

const RiskAssessment = ({ overallRisk, riskLevels, sensorData }) => {
  const getRiskLevelText = (risk) => {
    switch (risk) {
      case 'normal': return 'Normal';
      case 'moderate': return 'Early Bloom Formation';
      case 'high': return 'High Risk - Bloom Conditions';
      default: return 'Normal';
    }
  };

  const getRiskDescription = (risk) => {
    switch (risk) {
      case 'normal': return 'No immediate algae bloom risk detected. All parameters within normal ranges.';
      case 'moderate': return 'Moderate risk of algae bloom formation. Monitor conditions closely.';
      case 'high': return 'High probability of algae bloom conditions. Immediate action recommended.';
      default: return 'System monitoring active.';
    }
  };

  const parameters = [
    { key: 'temperature', name: 'Temperature', value: sensorData.temperature, unit: '°C' },
    { key: 'dissolvedOxygen', name: 'Dissolved Oxygen', value: sensorData.dissolvedOxygen, unit: 'mg/L' },
    { key: 'ph', name: 'pH Level', value: sensorData.ph, unit: '' },
    { key: 'electricalConductivity', name: 'Conductivity', value: sensorData.electricalConductivity, unit: 'µS/cm' },
    { key: 'turbidity', name: 'Turbidity', value: sensorData.turbidity, unit: 'NTU' }
  ];

  return (
    <div className="risk-assessment-card">
      <div className="card-header">
        <h3>
          <Icon name="shield" size={20} />
          Risk Assessment
        </h3>
      </div>
      
      <div className="card-content">
        <div className="overall-risk">
          <div className={`risk-level ${overallRisk}`}>
            {getRiskLevelText(overallRisk)}
          </div>
          <div className="risk-description">
            {getRiskDescription(overallRisk)}
          </div>
        </div>
        
        <div className="risk-parameters">
          {parameters.map((param) => (
            <div key={param.key} className={`risk-param ${riskLevels[param.key]}`}>
              <div className="param-info">
                <span className="param-name">{param.name}:</span>
                <span className="param-value">
                  {param.value.toFixed(1)}{param.unit}
                </span>
              </div>
              <span className={`param-status ${riskLevels[param.key]}`}>
                {riskLevels[param.key] === 'normal' ? 'Normal' : 
                 riskLevels[param.key] === 'moderate' ? 'Moderate' : 'High Risk'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiskAssessment;