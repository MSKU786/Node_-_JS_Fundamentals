const { Router } = require('express');

const {
  createTicket,
  fetchAllTicket,
  fetchOneTicket,
  updateTicket,
  checkTicketStatus,
} = require('../controllers/ticketController');

const ticketRouter = Router();

// Get all tickets
ticketRouter.get('/', fetchAllTicket);

// Create a ticket
ticketRouter.post('/', createTicket);

// Get one ticket
ticketRouter.get('/:id', fetchOneTicket);

// Update a specific ticket
ticketRouter.put('/:id', updateTicket);

module.exports = ticketRouter;
