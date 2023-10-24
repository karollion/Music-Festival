const Seat = require('../models/seat.model');

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
    const { id, day, seat, client, email } = req.body;
    const newSeat = new Seat({ id: id, day: day, seat: seat, client: client, email: email });
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
