const express = require('express');
const { Worker } = require('worker_threads');
const app = express();
const PORT = 4000;

app.get('/blocking', (req, res) => {
  const worker = new Worker('./worker.js');

  worker.on('message', (data) => {
    res.status(200).send(`This is blockin page ${data}`);
  });

  worker.on('error', (err) => {
    res.status(400).send(`An error occured ${err}`);
  });
});

app.get('/non-blocking', (req, res) => {
  res.status(200).send('this is non blocking page');
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
