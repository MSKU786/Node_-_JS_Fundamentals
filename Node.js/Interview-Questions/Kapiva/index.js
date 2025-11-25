const express = require('express');
const bodyparser = require('body-parser');

const app = express();
app.use(bodyparser.json());

const db = new Map();
const longURLMap = new Map();
const alphabets =
  '0123456789abcdefghijklmnopqrstuvwxyxABCDEFGHIJKLMNOPQRSTUVWXYZ';

function generateShortURL(longURL) {
  if (longURLMap.has(longURL)) {
    return longURLMap.get(longURL);
  }

  let shortURL = generateKey(longURL);

  while (db.has(shortURL)) {
    shortURL = generateKey(longURL);
  }

  db.set(shortURL, {
    longURL,
    created_at: Date.now(),
    click: 0,
    expired_at: Date.now() + 10 * 1000,
  });

  longURLMap.set(longURL, shortURL);

  return shortURL;
}

function generateKey(url) {
  let shortURL = '';
  for (let i = 0; i < 7; i++) {
    let num = parseInt(Math.random() * 100) % 62;
    shortURL += alphabets.charAt(num);
  }
  console.log(shortURL);
  return shortURL;
}

function getLongURL(shortURL) {
  const data = db.get(shortURL);
  if (!data) {
    return null;
  }

  console.log(data.expired_at, Date.now());
  if (Date.now() > data.expired_at) {
    deleteExpiredURL(shortURL);
    return null;
  }

  return data.longURL;
}

function deleteExpiredURL(shortURL) {
  const urlData = db.get(shortURL);
  db.delete(shortURL);

  const longURL = urlData.longURL;
  longURLMap.delete(longURL);
}

app.post('/shorten', (req, res) => {
  const {longURL} = req.body;

  if (!longURL) {
    return res.status(400).json({error: 'LongURL Needed'});
  }
  const shortURL = generateShortURL(longURL);

  return res.json({shortURL});
});

app.get('/:key', (req, res) => {
  const {key} = req.params;
  console.log(req.params);
  const longURL = getLongURL(key);
  console.log(longURL);
  if (!longURL) {
    return res.status(404);
  }

  return res.redirect(longURL);
});

app.get('/clickCount/:key', (req, res) => {});

app.listen(8000, () => {
  console.log('Server listening on port 8000');
});
