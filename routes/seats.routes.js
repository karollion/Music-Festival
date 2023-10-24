const express = require('express');
const router = express.Router();

const SeatController = require('../controllers/seat.controller');

router.get('/seats', SeatController.getAll);
router.get('/seats/random', SeatController.getRandom);

router.get('/seats/:id', SeatController.getOne);

router.post('/seats', SeatController.postOne);

router.put('/seats/:id', SeatController.putOne);

router.delete('/seats/:id', SeatController.deleteOne);

module.exports = router;
