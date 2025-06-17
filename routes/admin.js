const express = require('express');
const router = express.Router();
const db = require('../db');

// ✅ POST /api/admin/trains → Add a new train
router.post('/trains', async (req, res) => {
  const { name, from_station, to_station } = req.body;

  if (!name || !from_station || !to_station) {
    return res.status(400).json({ message: 'Missing train details' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO trains (name, from_station, to_station) VALUES (?, ?, ?)',
      [name, from_station, to_station]
    );

    res.status(201).json({
      message: 'Train added successfully',
      train: { id: result.insertId, name, from_station, to_station }
    });
  } catch (error) {
    console.error('❌ Insert error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// ✅ DELETE /api/admin/trains/:id → Delete a train
router.delete('/trains/:id', async (req, res) => {
  const trainId = req.params.id;

  try {
    const [result] = await db.query('DELETE FROM trains WHERE id = ?', [trainId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Train not found' });
    }

    res.json({ message: 'Train deleted successfully' });
  } catch (error) {
    console.error('❌ Delete error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
router.get('/bookings', async (req, res) => {
  try {
    const [results] = await db.query(`SELECT * FROM bookings`);
    res.status(200).json(results);
  } catch (error) {
    console.error(' DB error while fetching bookings:', error);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});
router.delete('/bookings/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await db.query('DELETE FROM bookings WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
