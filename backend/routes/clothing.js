const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const auth = require('../middleware/authMiddleware'); // ✅ Middleware de vérification JWT
const Clothing = require('../models/Clothing');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure storage multer-cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'saudade',        // dossier Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 800, crop: "limit" }]
  },
});

const parser = multer({ storage: storage });

// POST /api/clothing (protégé, upload image)
router.post('/', auth, parser.single('image'), async (req, res) => {
  try {
      const { name, description, price, size, material, quantity, category, gender } = req.body;
    let imageUrl = null;

    if (req.file) {
      imageUrl = req.file.path;  // URL de l’image Cloudinary
    }

    const newClothing = new Clothing({
      name,
      description,
      price: parseFloat(price),
      size,
      material,
      quantityAvailable: parseInt(quantity),
      sku: uuidv4(),
      category,
      gender,
      imageUrl
    });

    await newClothing.save();

    res.status(201).json({ message: 'Vêtement ajouté', clothing: newClothing });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

const { v4: uuidv4 } = require('uuid'); //
// GET /api/clothing - récupérer tous les vêtements
router.get('/', async (req, res) => {
  try {
    const clothes = await Clothing.find();
    res.json(clothes);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
