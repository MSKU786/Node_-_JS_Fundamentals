const express = require('express');

const app = express();
const PORT = 4000;

app.get('/blocking', (req, res) => {
  res.status(200).send('This is blocking page');
});

app.get('/non-blocking', (req, res) => {
  res.status(200).send('this is non blocking page');
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
