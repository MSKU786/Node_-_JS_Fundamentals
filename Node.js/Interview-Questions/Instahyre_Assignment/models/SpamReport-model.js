const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User-model');

const SpamReport = sequelize.define(
  'SpamReport',
  {
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'phone_number',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'userId',
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['userId', 'phoneNumber'], // Avoid duplicate reports
      },
      {
        fields: ['phoneNumber'], // Useful for spam count aggregations
      },
    ],
  }
);

// ✅ Set up association
SpamReport.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});
User.hasMany(SpamReport, { foreignKey: 'userId' });

module.exports = SpamReport;
