import {
  generateTicket,
  getTicketById,
  getTickets,
  Ticket,
  updateTicket,
} from '../services/ticketService';

export const createTicket = (req, res) => {
  try {
    const { numberOfLines } = req.body;
    if (!numberOfLines || numberOfLines <= 0) {
      return res.status(400).json({ message: 'Invalid number of lines' });
    }

    const ticket: Ticket = generateTicket(numberOfLines);
    res.status(201).json({ ticket });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const fetchAllTicket = (req, res) => {
  try {
    const tickets: Ticket[] = getTickets();
    res.status(201).json({ tickets });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const fetchOneTicket = (req, res) => {
  try {
    const { id } = req.params;
    const ticket: Ticket = getTicketById(Number(id));
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json({ ticket });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateTicketController = (req, res) => {
  try {
    const { numberOfLines } = req.body;

    if (!numberOfLines || numberOfLines <= 0) {
      return res.status(400).json({ message: 'Invalid number of lines' });
    }

    const { id } = req.params;
    const ticket: Ticket = updateTicket(Number(id), numberOfLines);
    return res.status(200).json({ ticket });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const checkTicketStatus = (req, res) => {};
