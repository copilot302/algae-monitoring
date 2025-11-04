const express = require('express');
const router = express.Router();
const SensorData = require('../models/SensorData');

// @route   POST /api/sensor-data
// @desc    Log new sensor data
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { temperature, dissolvedOxygen, ph, electricalConductivity, turbidity, riskLevel } = req.body;

    const sensorData = new SensorData({
      temperature,
      dissolvedOxygen,
      ph,
      electricalConductivity,
      turbidity,
      riskLevel
    });

    const savedData = await sensorData.save();
    res.status(201).json(savedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while logging data' });
  }
});

// @route   GET /api/sensor-data
// @desc    Get sensor data with optional filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { limit = 100, startDate, endDate } = req.query;
    
    let query = {};
    
    // Filter by date range if provided
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate);
      if (endDate) query.timestamp.$lte = new Date(endDate);
    }

    const data = await SensorData.find(query)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit));

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching data' });
  }
});

// @route   GET /api/sensor-data/latest
// @desc    Get the most recent sensor reading
// @access  Public
router.get('/latest', async (req, res) => {
  try {
    const latestData = await SensorData.findOne().sort({ timestamp: -1 });
    
    if (!latestData) {
      return res.status(404).json({ message: 'No data found' });
    }
    
    res.json(latestData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching latest data' });
  }
});

// @route   GET /api/sensor-data/stats
// @desc    Get statistics for a time period
// @access  Public
router.get('/stats', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    let matchQuery = {};
    if (startDate || endDate) {
      matchQuery.timestamp = {};
      if (startDate) matchQuery.timestamp.$gte = new Date(startDate);
      if (endDate) matchQuery.timestamp.$lte = new Date(endDate);
    }

    const stats = await SensorData.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: null,
          avgTemperature: { $avg: '$temperature' },
          avgDO: { $avg: '$dissolvedOxygen' },
          avgPH: { $avg: '$ph' },
          avgEC: { $avg: '$electricalConductivity' },
          avgTurbidity: { $avg: '$turbidity' },
          minTemperature: { $min: '$temperature' },
          maxTemperature: { $max: '$temperature' },
          minDO: { $min: '$dissolvedOxygen' },
          maxDO: { $max: '$dissolvedOxygen' },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json(stats[0] || {});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while calculating stats' });
  }
});

// @route   DELETE /api/sensor-data/:id
// @desc    Delete a specific sensor data entry
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const data = await SensorData.findByIdAndDelete(req.params.id);
    
    if (!data) {
      return res.status(404).json({ message: 'Data not found' });
    }
    
    res.json({ message: 'Data deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while deleting data' });
  }
});

module.exports = router;
