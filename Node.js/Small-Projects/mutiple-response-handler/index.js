const express = require('express');
const { Builder } = require('xml2js');
const app = express();

//Approach 1

const xmlBuilder = new Builder();

// Middleware : Detect format form accept header

app.use((req, res, next) => {
  const accept = req.header['accept'] || '';
  res.locals.format = accept.includes('application/xml') ? 'xml' : 'json';
  next();
});

app.get('/users', (req, res) => {
  const data = {
    users: {
      user: [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ],
    },
  };
  sendResponse(res, data);
});

function sendResponse(res, data) {
  if (res.locals.format === 'xml') {
    res.set('Content-Type', 'application/xml');
    res.send(xmlBuilder.buildObject(data));
  } else {
    res.json(data);
  }
}

app.listen(4000, () => {
  console.log('Running on port 3000');
});
