const mongoose = require('mongoose');

//create shema for model
const testimonialSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  author: { type: String, required: true },
  text: { type: String, required: true }
});

// Create and export model for data in testimonials colection
module.exports = mongoose.model('Testimonial', testimonialSchema);