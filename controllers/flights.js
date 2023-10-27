const Flight = require('../models/flights');
const Ticket = require('../models/ticket');

module.exports = {
  index,
  new: newFlight,
  create,
  show,
  addDestination
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

async function show(req, res) {
  try {
      const flight = await Flight.findById(req.params.id);
      const tickets = await Ticket.find({flight: flight._id});
      res.render('flights/show', { flight, tickets });
  } catch (err) {
      console.error('Error fetching flight details:', err);
      res.redirect('/flights');
  }
}

async function addDestination(req, res) {
  try {
      const flight = await Flight.findById(req.params.id);
      flight.destinations.push(req.body);
      await flight.save();
      res.redirect(`/flights/${flight._id}`);
  } catch (err) {
      console.error('Error adding destination:', err);
      res.redirect(`/flights/${req.params.id}`);
  }
}

