const mongoose = require('mongoose');

//create shema for model
const seatSchema = new mongoose.Schema({
  id: { type: Number },
  day: { type: Number, required: true },
  seat: { type: Number, required: true },
  client: { type: String, required: true },
  email: { type: String, required: true }
});

// Create and export model for data in seats colection
module.exports = mongoose.model('Seat', seatSchema);