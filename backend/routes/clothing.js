const express = require('express');
const router = express.Router();
const auth = require('../routes/auth');

// Exemple : modèle Mongoose fictif
const Clothing = require('../models/Clothing');

// POST /api/clothing (protégé)
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, price, imageUrl } = req.body;
    const newClothing = new Clothing({ name, description, price, imageUrl });
    await newClothing.save();
    res.status(201).json({ message: 'Vêtement ajouté' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// GET /api/clothing : récupérer tous les vêtements
router.get('/', async (req, res) => {
  try {
    const clothes = await Clothing.find();
    res.json(clothes);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});


module.exports = router;
