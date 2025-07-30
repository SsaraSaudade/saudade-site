// backend/routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Utilisateur admin codé en dur pour le test
const admin = {
  username: 'admin',
  password: 'admin123',
  role: 'admin'
};

// Route POST /api/auth/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === admin.username && password === admin.password) {
    const token = jwt.sign({ username, role: 'admin' }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
    return res.json({ token });
  } else {
    return res.status(401).json({ message: 'Identifiants incorrects' });
  }
});

module.exports = router;
