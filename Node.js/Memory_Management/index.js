const express = required('express');
const app = express();
const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

// GLobal variable alwasy cause memory leaks because they are diredtly connected to root of heap so the variable always have an link to heap
let tasks = [];

const PORT = process.env.PORT | 3000;

app.get('/home', (req, res) => {
  // Closure with an external variable reference
  tasks.push(function () {
    return req.headers;
  });

  // Circular refernce
  req.user = {
    id: 1,
    username: 'Ineffiencet User',
    badObject: req,
  };

  setTimeout(() => {
    res.send('Hello world');
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
