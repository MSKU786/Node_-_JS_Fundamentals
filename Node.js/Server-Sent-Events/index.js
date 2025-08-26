const express = require('express');
const http = require('http');
const app = express();
const PORT = 8000;

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.get('/events', (req, res) => {
  // Set SSE headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Access-Control-Allow-Origin': '*',
  });

  console.log('Client connected to SSE stream');

  // Send initial connection message
  res.write('event: connected\n');
  res.write('data: Welcome to SSE Server!\n\n');

  // Send regular updates every 2 seconds
  const intervalId = setInterval(() => {
    const data = {
      message: 'Server time update',
      timestamp: new Date().toISOString(),
      random: Math.random(),
    };

    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 2000);

  // Handle client disconnect
  req.on('close', () => {
    console.log('Client disconnected');
    clearInterval(intervalId);
    res.end();
  });
});

app.get('/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  send(res);
});

function send(res) {
  res.write('data: ' + 'hello!\n\n');

  setTimeout(() => {
    send(res);
  }, 2000);
}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
