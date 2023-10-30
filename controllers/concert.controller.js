const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Concert.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const con = await Concert.findOne().skip(rand);
    if(!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getOne = async (req, res) => {
  try {
    const con = await Concert.findById(req.params.id);
    if(!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

// Search for concerts of a given artist
exports.getArtistConcerts = async (req, res) => {
  try {
    const con = await Concert.find({performer: req.params.performer});
    if(!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

// Search for concerts of a selected music genre
exports.getGenreConcerts = async (req, res) => {
  try {
    const con = await Concert.find({genre: req.params.genre});
    if(!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

// Search for concerts with a price in the range :price_min - :price_max,
exports.getPriceRangeConcerts = async (req, res) => {
  try {
    const con = await Concert.find({price: {$gt: req.params.price_min, $lt: req.params.price_max}});
    if(!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

// Search for concerts on a selected date
exports.getDayConcerts = async (req, res) => {
  const day = Number(req.params.day);
  try {
    const con = await Concert.find({day: day});
    if(!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postOne = async (req, res) => {
  try {
    const { id, performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({ 
      id: id, 
      performer: performer, 
      genre: genre, 
      price: price, 
      day: day, 
      image: image });
    await newConcert.save();
    res.send( newConcert );
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putOne = async (req, res) => {
  const { id, performer, genre, price, day, image } = req.body;
  try {
    const con = await Concert.findById(req.params.id);
    if(con) {
      con.id = id;
      con.performer = performer;
      con.genre = genre;
      con.price = price;
      con.day = day;
      con.image = image;
      await con.save();
      res.send( con );
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const con = await Concert.findById(req.params.id);
    if(con) {
      await Concert.deleteOne({ _id: req.params.id });
      res.send( con );
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};
