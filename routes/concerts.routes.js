const express = require('express');
const router = express.Router();

const ConcertController = require('../controllers/concert.controller');

router.get('/concerts', ConcertController.getAll);
router.get('/concerts/random', ConcertController.getRandom);
router.get('/concerts/:id', ConcertController.getOne);

router.post('/concerts', ConcertController.postOne);

router.put('/concerts/:id', ConcertController.putOne);

router.delete('/concerts/:id', ConcertController.deleteOne);

// New routes to search concerts
router.get('/concerts/performer/:performer', ConcertController.getArtistConcerts);
router.get('/concerts/genre/:genre', ConcertController.getGenreConcerts);
router.get('/concerts/price/:price_min/:price_max', ConcertController.getPriceRangeConcerts);
router.get('/concerts/day/:day', ConcertController.getDayConcerts);

module.exports = router;
