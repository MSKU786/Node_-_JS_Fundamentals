const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());

const users = new Map();
const emails = new Map();

function isValidEmailFormat(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePreference(prefernces) {
  if (!Array.isArray(prefernces)) {
    return false;
  }

  for (let pref of prefernces) {
    if (typeof pref !== 'string') return false;
  }

  return true;
}

app.post('/api/profile', (req, res) => {
  const { userId, name, email, age, prefernces } = req.body;

  console.log(users);
  console.log(emails);
  if (!userId) {
    return res.status(400).json({
      error: 'User Id is required',
    });
  }

  const user = {
    userId,
  };

  if (email) {
    if (isValidEmailFormat(email)) {
      console.log(emails.has(email));
      console.log(emails.get(email));
      if (emails.has(email) && userId != emails.get(email)) {
        res.status(400).json({
          error: {
            email: 'Need unique email address',
          },
        });
      } else {
        user[email] = email;
      }
    } else {
      res.status(400).json({
        error: {
          email: 'Invalid email format',
        },
      });
    }
  }

  if (name) {
    if (typeof name === 'string') {
      user[name] = name;
    } else {
      res.status(400).json({
        error: {
          age: 'name should be string only.',
        },
      });
    }
  }

  if (age) {
    if (typeof age === 'number' || age > 0) {
      user[age] = age;
    } else {
      res.status(400).json({
        error: {
          age: 'Age must be a positive integer.',
        },
      });
    }
  }

  if (prefernces) {
    if (validatePreference(prefernces)) {
      user[prefernces] = prefernces;
    } else {
      res.status(400).json({
        error: {
          age: 'Age must be a array of strings.',
        },
      });
    }
  }

  const userInDB = users.get(userId);
  if (userInDB) {
    const updatedData = { ...userInDB, ...user };
    users.set(userId, updatedData);
    if (email) {
      emails.set(email, userId);
    }
    res.status(200).json({ message: 'Profile updated successfully.' });
  } else {
    users.set(userId, user);
    if (email) {
      emails.set(email, userId);
    }
    res.status(200).json({ message: 'Profile updated successfully.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
