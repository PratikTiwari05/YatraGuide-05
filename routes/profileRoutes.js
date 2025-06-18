const express = require('express');
const db = require('../db');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// ✅ GET Profile
router.get('/profile', authenticateToken, async (req, res) => {
  const userId = req.user?.id;

  try {
    const [[user]] = await db.query(
      'SELECT id, username, email FROM users WHERE id = ?',
      [userId]
    );

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ UPDATE Profile
router.patch('/profile', authenticateToken, async (req, res) => {
  const userId = req.user?.id;
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    await db.query(
      'UPDATE users SET username = ?, email = ? WHERE id = ?',
      [name, email, userId]
    );
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; // ✅ CommonJS export
