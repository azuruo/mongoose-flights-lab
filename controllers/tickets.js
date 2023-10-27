const Ticket = require('../models/ticket');
const Flight = require('../models/flights');

module.exports = {
  new: newTicket,
  create
};

function newTicket(req, res) {
    res.render('tickets/new', {flightId: req.params.id});
  }

async function create(req, res) {
  try {
      const ticket = new Ticket(req.body);
      ticket.flight = req.params.id;
      await ticket.save();
      res.redirect(`/flights/${req.params.id}`);
  } catch (err) {
      console.error('Error saving ticket:', err);
      res.render('tickets/new', {flightId: req.params.id});
  }
}
