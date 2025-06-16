const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User-model');

const SpamReport = sequelize.define('SpamReport', {
  phone: { type: DataTypes.STRING, allowNull: false },
});

SpamReport.belongsTo(User);

module.exports = SpamReport;
