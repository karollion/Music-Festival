const mongoose = require('mongoose');

//create shema for model
const concertSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  performer: { type: String, required: true },
  genre: { type: String, required: true },
  price: { type: Number, required: true },
  day: { type: Number, required: true },
  image: { type: String, required: true }
});

// Create and export model for data in concerts colection
module.exports = mongoose.model('Concert', concertSchema);