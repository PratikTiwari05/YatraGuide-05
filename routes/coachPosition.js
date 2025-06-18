// routes/coachPosition.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_KEY = '9a5b8f24fb072d02071ef547e2190017';

router.get('/:trainNumber', async (req, res) => {
  const { trainNumber } = req.params;
  try {
    const response = await axios.get(`https://indianrailapi.com/api/v2/CoachPosition/apikey/${API_KEY}/TrainNumber/${trainNumber}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch coach position' });
  }
});

module.exports = router;
