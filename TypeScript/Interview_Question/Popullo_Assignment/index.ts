import express, { Application } from 'express';
import ticketRouter from './routes/ticketRouter';

const app: Application = express();
const PORT = 8000;

// Use express.json() middleware (add parentheses)
app.use(express.json());

// Mount the ticket router
app.use('/tickets', ticketRouter);

// Root route (optional)
app.get('/', (req, res) => {
  res.send('Welcome to the Ticket API');
});

// Start the server
app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
