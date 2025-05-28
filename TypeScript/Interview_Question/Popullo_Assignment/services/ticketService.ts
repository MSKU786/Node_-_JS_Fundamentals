import { generateRandomLines } from '../utils/randomGenerator';
import { CalculateResult } from '../utils/resultCalculator';

export interface Ticket {
  id: number;
  lines: number[][];
  statusChecked: boolean;
}

const tickets: Map<number, Ticket> = new Map();
let ticketIdCounter = 1;

// Create a new Ticket
export const generateTicket = (n: number): Ticket => {
  const lines = generateRandomLines(n);

  const ticket: Ticket = {
    id: ticketIdCounter++,
    lines,
    statusChecked: false,
  };

  tickets.set(ticket.id, ticket);
  return ticket;
};

export const getTickets = (): Ticket[] => {
  return Array.from(tickets.values());
};

export const getTicketById = (id: number): Ticket => {
  const ticket = tickets.get(id);
  if (!ticket) {
    throw new Error('Ticket Not Found');
  }
  return ticket;
};

export const updateTicket = (id: number, n: number): Ticket => {
  const ticket = tickets.get(id);
  if (!ticket) {
    throw new Error('Ticket Not Found');
  }

  if (ticket.statusChecked) {
    throw new Error('Cannot update a checked ticket');
  }

  const newLines = generateRandomLines(n);
  ticket.lines.push(...newLines);
  return ticket;
};

// Check ticket status
export interface TicketResult {
  line: number[];
  result: number;
}

export const checkTicketStatus = (id: number): TicketResult[] => {
  const ticket = tickets.get(id);
  if (!ticket) {
    throw new Error('Ticket Not Found');
  }

  if (ticket.statusChecked) {
    throw new Error('Cannot update a checked ticket');
  }

  const results: TicketResult[] = ticket.lines.map((line) => ({
    line,
    result: CalculateResult(line),
  }));

  results.sort((a, b) => b.result - a.result);
  ticket.statusChecked = true;
  return results;
};

// For testing purposes
export const __setTickets = (newTickets: Map<number, Ticket>): void => {
  tickets.clear();
  newTickets.forEach((value, key) => {
    tickets.set(key, value);
  });
};

export const __setTicketIdCounter = (newCounter: number): void => {
  ticketIdCounter = newCounter;
};
