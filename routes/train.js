const express = require('express');
const router = express.Router();
const db = require('../db');

// ✅ GET /api/trains (with optional ?from=...&to=... filtering)
router.get('/', async (req, res) => {
  const { from, to } = req.query;

  try {
    let query = 'SELECT * FROM trains';
    const params = [];

    if (from && to) {
      query += ' WHERE LOWER(from_station) = LOWER(?) AND LOWER(to_station) = LOWER(?)';
      params.push(from, to);
    }

    const [trains] = await db.query(query, params);
    res.json(trains);
  } catch (error) {
    console.error('Error fetching trains:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// ✅ GET /api/trains/:id
router.get('/:id', async (req, res) => {
  const trainId = req.params.id;

  try {
    const [results] = await db.query('SELECT * FROM trains WHERE id = ?', [trainId]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'Train not found' });
    }

    res.json(results[0]);
  } catch (error) {
    console.error('Error fetching train by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// ✅ GET /api/trains/:id/seats
router.get('/:id/seats', async (req, res) => {
  const trainId = req.params.id;

  try {
    const [[train]] = await db.query('SELECT available_seats FROM trains WHERE id = ?', [trainId]);

    if (!train) {
      return res.status(404).json({ message: 'Train not found' });
    }

    res.json({ trainId, available_seats: train.available_seats });
  } catch (error) {
    console.error('Error fetching seat availability:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



module.exports = router;
