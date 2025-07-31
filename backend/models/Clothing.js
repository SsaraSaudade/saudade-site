const mongoose = require('mongoose');

const clothingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  size: String,
  material: String,
  quantityAvailable: { type: Number, required: true }, // quantités disponibles
  imageUrl: String,
  sku: { type: String, default: () => uuidv4(), unique: true }, // identifiant unique
  createdAt: { type: Date, default: Date.now },
  category: {
    type: String,
    required: true,
    enum: ['pantalon', 'robe', 'chemise', 'tshirt', 'jupe', 'manteau']},
  gender: {
    type: String,
    required: true,
    enum: ['homme', 'femme', 'unisexe']}
});

module.exports = mongoose.model('Clothing', clothingSchema);
