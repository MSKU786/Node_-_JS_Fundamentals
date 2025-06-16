const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User-model');

const Contact = sequelize.define('Contact', {
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
});

Contact.belongsTo(User);
User.hasMany(Contact);

module.exports = Contact;
