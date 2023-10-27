const express = require('express');
const router = express.Router();
const flightsCtrl = require('../controllers/flights');

router.get('/flights', flightsCtrl.index);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Flights' });
});


router.get('/flights/new', flightsCtrl.new);
router.post('/flights', flightsCtrl.create);


module.exports = router;
