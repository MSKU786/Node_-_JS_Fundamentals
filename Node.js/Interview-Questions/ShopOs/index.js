const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());

const users = new Map();
const emails = new Map();

function isValidEmailFormat(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePreferences(preferences) {
  return (
    Array.isArray(preferences) &&
    preferences.every((pref) => typeof pref === 'string')
  );
}

app.post('/api/profile', (req, res) => {
  const { userId, name, email, age, prefernces } = req.body;

  const errors = {};

  // userId validation
  if (!userId || typeof userId !== 'string' || userId.trim() === '') {
    errors.userId = 'User Id is required and must be a non-empty string.';
  }

  // email validation
  if (email !== undefined) {
    if (!isValidEmailFormat(email)) {
      errors.email = 'Invalid email format.';
    } else {
      const existingUserId = emails.get(email);
      if (existingUserId && existingUserId !== userId) {
        errors.email = 'Email address must be unique.';
      }
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

  // Age validation
  if (age !== undefined) {
    if (typeof age !== 'number' || !Number.isInteger(age) || age < 0) {
      errors.age = 'Age must be positive integer';
    }
  }

  // preferences validation
  if (preferences !== undefined) {
    if (!validatePreferences(preferences)) {
      errors.preferences = 'Preferences must be an array of strings.';
    }
  }

  // If any errors, return 400
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  // Prepare user object
  const user = { userId };
  if (name !== undefined) user.name = name;
  if (email !== undefined) user.email = email;
  if (age !== undefined) user.age = age;
  if (preferences !== undefined) user.preferences = preferences;

  // Log the update
  console.log(`Updating profile for userId=${userId} with data:`, user);

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

  const existingUser = user.get(userId);
  if (existingUser && existingUser.email && existingUser.email != email) {
    email.set(email, userId);
  }

  return res.status(200).json({ message: 'Profile updated successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
