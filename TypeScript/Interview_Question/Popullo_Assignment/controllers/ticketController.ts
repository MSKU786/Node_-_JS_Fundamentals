import { Request, Response } from 'express';
import {
  generateTicket,
  getTicketById,
  getTickets,
  Ticket,
  updateTicket,
} from '../services/ticketService';

export const createTicket = (req: Request, res: Response): void => {
  try {
    const { numberOfLines } = req.body;
    if (!numberOfLines || numberOfLines <= 0) {
      res.status(400).json({ message: 'Invalid number of lines' });
      return;
    }

    const ticket: Ticket = generateTicket(numberOfLines);
    res.status(201).json({ ticket });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const fetchAllTicket = (req: Request, res: Response): void => {
  try {
    const tickets: Ticket[] = getTickets();
    res.status(200).json({ tickets });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const fetchOneTicket = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const ticket: Ticket = getTicketById(Number(id));
    if (!ticket) {
      res.status(404).json({ message: 'Ticket not found' });
      return;
    }

    res.status(200).json({ ticket });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateTicketController = (req: Request, res: Response): void => {
  try {
    const { numberOfLines } = req.body;

    if (!numberOfLines || numberOfLines <= 0) {
      res.status(400).json({ message: 'Invalid number of lines' });
      return;
    }

    const { id } = req.params;
    const ticket: Ticket = updateTicket(Number(id), numberOfLines);
    res.status(200).json({ ticket });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const checkTicketStatus = (req: Request, res: Response): void => {};
