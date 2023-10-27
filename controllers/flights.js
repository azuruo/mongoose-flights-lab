const Flight = require('../models/flights');
const Ticket = require('../models/ticket');

module.exports = {
  index,
  new: newFlight,
  create,
  show,
  addDestination,
  delete: deleteFlight
};

async function index(req, res) {
  try {
      const flights = await Flight.find({}).sort({ departs: 'asc' });
      res.render('flights/index', { flights, title: 'Flights', currentDate: new Date() });
  } catch (err) {
      console.error('Error fetching flights:', err);
      res.redirect('/');
  }
}

async function newFlight(req, res) {
  const newFlight = new Flight();
  const dt = newFlight.departs;

  let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
  departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
  
  res.render('flights/new', { departsDate });
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
      if (flight.destinations && flight.destinations.length) {
          flight.destinations.sort((a, b) => new Date(a.arrivalDate) - new Date(b.arrivalDate));
      }
      const usedAirports = flight.destinations.map(dest => dest.airport);
      usedAirports.push(flight.airport);
      const tickets = await Ticket.find({flight: flight._id});
      res.render('flights/show', { flight, tickets, usedAirports });
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

async function deleteFlight(req, res) {
  try {
      await Flight.findByIdAndRemove(req.params.id);
      res.redirect('/flights');
  } catch (err) {
      console.error('Error deleting flight:', err);
      res.redirect('/flights');
  }
}