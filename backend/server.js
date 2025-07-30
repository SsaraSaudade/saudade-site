const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const clothingRoutes = require('./routes/clothing');

app.use('/api/auth', authRoutes);
app.use('/api/clothing', clothingRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connecté à MongoDB');
    app.listen(3000, () => console.log('Serveur lancé sur le port 3000'));
  })
  .catch(err => console.error('Erreur MongoDB :', err));
