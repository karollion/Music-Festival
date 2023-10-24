const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const testi = await Testimonial.findOne().skip(rand);
    if(!testi) res.status(404).json({ message: 'Not found' });
    else res.json(testi);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getOne = async (req, res) => {
  try {
    const testi = await Testimonial.findById(req.params.id);
    if(!testi) res.status(404).json({ message: 'Not found' });
    else res.json(testi);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postOne = async (req, res) => {
  try {
    const { id, author, text } = req.body;
    const newTestimonial = new Testimonial({ id: id, author: author, text: text });
    await newTestimonial.save();
    res.send( newTestimonial );
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putOne = async (req, res) => {
  const { id, author, text } = req.body;
  try {
    const testi = await Testimonial.findById(req.params.id);
    if(testi) {
      testi.id = id;
      testi.author = author;
      testi.text = text;
      await testi.save();
      res.send( testi );
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const testi = await Testimonial.findById(req.params.id);
    if(testi) {
      await Testimonial.deleteOne({ _id: req.params.id });
      res.send( testi );
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};