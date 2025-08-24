const express = require('express');
const app = express();
const PORT = 8000;

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.get('/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.write('data: ' + 'hello!');
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
