const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User-model');
require('dotenv').config();

// Check if JWT_SECRET is set
if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is not set in environment variables');
  process.env.JWT_SECRET =
    '4ED8D67A831FBE5D1C85A667EEE7E114F1B5D6527109C94F61BD44529E6073AB';
  console.warn(
    'Using default JWT secret. This should not be used in production!'
  );
}

exports.register = async (req, res) => {
  const { name, phoneNumber, email, password } = req.body;

  try {
    if (!name || !phoneNumber || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Required fields: name, phoneNumber, password',
      });
    }

    const existing = await User.findOne({ where: { phoneNumber } });
    if (existing) {
      return res.status(409).json({
        status: 'error',
        message: 'Phone number already registered',
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      phoneNumber,
      password: hashed,
      ...(email && { email }), // include email only if provided
    });

    return res.status(201).json({
      status: 'success',
      data: {
        id: user.id,
        name: user.name,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({
      status: 'error',
      message: 'Failed to register user',
    });
  }
};

exports.login = async (req, res) => {
  const { phoneNumber, password } = req.body;

  try {
    if (!phoneNumber || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Phone number and password are required',
      });
    }

    const user = await User.findOne({ where: { phoneNumber } });
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials',
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials',
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.status(200).json({
      status: 'success',
      data: { token },
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({
      status: 'error',
      message: 'Failed to login',
    });
  }
};
