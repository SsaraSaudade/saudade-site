require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const user = new User({ username: 'admin', password: 'motdepasse123' });
    await user.save();
    console.log('Utilisateur admin créé');
    mongoose.disconnect();
  })
  .catch(console.error);
