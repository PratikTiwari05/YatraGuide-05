const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const [[user]] = await db.query('SELECT password FROM users WHERE id = ?', [userId]);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.status(401).json({ message: 'Old password incorrect' });

    const hashed = await bcrypt.hash(newPassword, 10);
    await db.query('UPDATE users SET password = ? WHERE id = ?', [hashed, userId]);

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Password change error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
