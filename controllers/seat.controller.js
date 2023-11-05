const Seat = require('../models/seat.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Seat.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const se = await Seat.findOne().skip(rand);
    if(!se) res.status(404).json({ message: 'Not found' });
    else res.json(se);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getOne = async (req, res) => {
  try {
    const se = await Seat.findById(req.params.id);
    if(!se) res.status(404).json({ message: 'Not found' });
    else res.json(se);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postOne = async (req, res) => {
  try {
    const idClean = sanitize(req.body.id);
    const dayClean = sanitize(req.body.day);
    const seatClean = sanitize(req.body.seat);
    const clientClean = sanitize(req.body.client);
    const emailClean = sanitize(req.body.email);
    const newSeat = new Seat({ id: idClean, day: dayClean, seat: seatClean, client: clientClean, email: emailClean });
    await newSeat.save();
    res.send( newSeat );
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putOne = async (req, res) => {
  const { id, day, seat, client, email } = req.body;
  try {
    const se = await Seat.findById(req.params.id);
    if(se) {
      se.id = id;
      se.day = day;
      se.seat = seat;
      se.client = client;
      se.email = email;
      await se.save();
      res.send( se );
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const se = await Seat.findById(req.params.id);
    if(se) {
      await Seat.deleteOne({ _id: req.params.id });
      res.send( se );
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};
