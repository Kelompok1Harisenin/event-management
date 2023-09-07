const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the Package model
const Package = sequelize.define('package', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  maxEvents: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  maxQuota: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Package;
