// Imports
const express = require('express');
const path = require('path')
const cors = require('cors')
const socket = require('socket.io')
const mongoose = require('mongoose');

// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();
app.use(cors());// middleware for diferent ports client and server

const server = app.listen('3030', () => {
  console.log('Server is running on port: 3030');
});

const io = socket(server)

app.use(express.static(path.join(__dirname, '/public')))
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')))
app.use(express.urlencoded({ extended: true }));   // x-www-form-urlencoded
app.use(express.json());    // form-data JSON format

app.use((req, res, next) => {
	req.io = io
	next()
})

app.use('/api', testimonialsRoutes); // add testimonials routes to server
app.use('/api', concertsRoutes); // add concerts routes to server
app.use('/api', seatsRoutes); // add seats routes to server

// connects our backend code with the database
mongoose.connect('mongodb+srv://karollion:RMDDvHbkjPwNlPsx@cluster0.pbd1wk2.mongodb.net/NewWaveDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '/client/build/index.html'))
})

app.use((req, res) => {
	res.status(404).json({ message: 'Not found...' })
})

io.on('connection', socket => {
	console.log('New client' + socket.id)
})