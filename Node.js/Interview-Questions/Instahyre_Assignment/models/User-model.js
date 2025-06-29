const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define(
  'User',
  {
    name: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      field: 'phone_number',
      validate: {
        is: {
          args: /^\d{10}$/,
          msg: 'Phone number must be exactly 10 digits',
        },
      },
    },
    email: { type: DataTypes.STRING, allowNull: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    indexes: [
      {
        fields: ['phone_number'], // Index for faster phone number lookups
      },
    ],
  }
);

module.exports = User;
