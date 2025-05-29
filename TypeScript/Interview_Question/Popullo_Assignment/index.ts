import express from 'express';
import ticketRouter from './routes/ticketRouter';

const app = express();

const PORT = 8000;

app.use(express.json);

app.use('/tickets', ticketRouter);

app.listen(PORT, (): void => {
  console.log('Server running on port', PORT);
});
