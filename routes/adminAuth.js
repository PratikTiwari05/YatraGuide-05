const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_admin_secret'; // replace with env later

router.post('/login', async (req, res) => {
  const { username, password, secret } = req.body;
  console.log("✅ Admin login route hit");

  if (!username || !password || !secret) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = `SELECT * FROM admin_users WHERE username = ? AND password = ? AND secret_key = ?`;
  console.log("🔍 Querying DB...");

  try {
    const [results] = await db.query(sql, [username, password, secret]);
    console.log("✅ DB Query completed", results);

    if (results.length === 0 || !username.includes('@YatraGuide')) {
      return res.status(401).json({ message: 'Invalid admin user' });
    }

    const token = jwt.sign(
      { id: results[0].id, username: results[0].username, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log("🎟️ Token generated");
    return res.status(200).json({ message: 'Admin login successful', token });
  } catch (err) {
    console.error('❌ DB error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
