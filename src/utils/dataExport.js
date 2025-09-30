export const exportData = (sensorData, dataHistory, riskLevels) => {
  const exportData = {
    timestamp: new Date().toISOString(),
    currentReadings: sensorData,
    historicalData: dataHistory,
    riskAssessment: riskLevels,
    systemInfo: {
      version: '1.0.0',
      exportFormat: 'JSON',
      totalDataPoints: Object.values(dataHistory)[0]?.length || 0
    }
  };

  const dataStr = JSON.stringify(exportData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = `phycosense-data-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up the URL object
  URL.revokeObjectURL(link.href);
};