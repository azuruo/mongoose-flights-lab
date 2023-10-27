const express = require('express');
const router = express.Router();

const flightsCtrl = require('../controllers/flights');
const ticketsCtrl = require('../controllers/tickets');

router.get('/', flightsCtrl.index);
router.get('/new', flightsCtrl.new); 
router.post('/', flightsCtrl.create);
router.get('/:id', flightsCtrl.show);
router.post('/:id/destinations', flightsCtrl.addDestination);
router.get('/:id/tickets/new', ticketsCtrl.new);
router.post('/:id/tickets', ticketsCtrl.create);

module.exports = router;