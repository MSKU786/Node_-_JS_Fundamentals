const express = require('express');

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use('/tickets', ticketRouter);

app.listen(PORT, (): void => {
  console.log('Server running on port', PORT);
});
