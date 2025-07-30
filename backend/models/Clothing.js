const mongoose = require('mongoose');

const clothingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  size: String,
  material: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Clothing', clothingSchema);
