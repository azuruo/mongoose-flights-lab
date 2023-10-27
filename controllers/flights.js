const Flight = require('../models/flights');

module.exports = {
  index,
  new: newFlight,
  create
};

async function index(req, res) {
  try {
      const flights = await Flight.find({});
      res.render('flights/index', { flights, title: 'Flights' });
  } catch (err) {
      console.error('Error fetching flights:', err);
      res.redirect('/');
  }
}

function newFlight(req, res) {
  res.render('flights/new');
}

async function create(req, res) {
  try {
      const flight = new Flight(req.body);
      await flight.save();
      res.redirect('/flights');
  } catch (err) {
      console.error('Error saving flight:', err);
      res.render('flights/new');
  }
}