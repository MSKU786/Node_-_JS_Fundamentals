import {
  createTicket,
  fetchAllTicket,
  fetchOneTicket,
  updateTicketController,
} from '../controllers/ticketController';

import { Router } from 'express';

const ticketRouter = Router();

// Get all tickets
ticketRouter.get('/', fetchAllTicket);

// Create a ticket
ticketRouter.post('/', createTicket);

// Get one ticket
ticketRouter.get('/:id', fetchOneTicket);

// Update a specific ticket
ticketRouter.put('/:id', updateTicketController);

export default ticketRouter;
