const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const path = require('path');

const corsOptions = {
  origin: [
    'http://localhost:5500',
    'http://127.0.0.1:5500',
    'http://localhost:3001',
    'https://saudade-site.onrender.com'
  ],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

const authRoutes = require('./routes/auth');
const clothingRoutes = require('./routes/clothing');
const contactRoutes = require('./routes/contact');  // importe ta route contact

app.use('/api/auth', authRoutes);
app.use('/api/clothing', clothingRoutes);
app.use('/api/contact', contactRoutes);  // utilise ta route contact sur /api/contact


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connecté à MongoDB');
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
  })
  .catch(err => console.error('Erreur MongoDB :', err));

// En bas de ton fichier (après les routes API)
  app.use(express.static(path.join(__dirname, '../frontend')));
  // Serve uniquement les fichiers statiques pour les routes frontend
  app.use(express.static(path.join(__dirname, '../frontend')));

  // Redirige uniquement les routes "non-API" vers contact.html
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/contact.html'));
  });

  app.use('/api/clothing', (req, res, next) => {
  console.log('Appel à /api/clothing');
  next();
}, clothingRoutes);
