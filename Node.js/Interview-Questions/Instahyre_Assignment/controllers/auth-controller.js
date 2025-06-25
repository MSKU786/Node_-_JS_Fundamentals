const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

exports.register = async (req, res) => {
  const { name, phone, email, password } = req.body;
  try {
    const existing = await User.findOne({ where: { phone } });
    if (existing)
      return res.status(400).json({ message: 'Phone already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, phone, email, password: hashed });
    return res
      .status(201)
      .json({ id: user.id, name: user.name, phone: user.phone });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { phone, password } = req.body;
  try {
    const user = await User.findOne({ where: { phone } });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
