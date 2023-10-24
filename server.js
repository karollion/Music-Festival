// Imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();

app.use(cors());// middleware for diferent ports client and server
app.use(express.urlencoded({ extended: true }));   // x-www-form-urlencoded
app.use(express.json());    // form-data JSON format

app.use('/api', testimonialsRoutes); // add testimonials routes to server
app.use('/api', concertsRoutes); // add concerts routes to server
app.use('/api', seatsRoutes); // add seats routes to server

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
})

// connects our backend code with the database
mongoose.connect('mongodb://0.0.0.0:27017/NewWaveDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

app.listen('3030', () => {
  console.log('Server is running on port: 3030');
});
