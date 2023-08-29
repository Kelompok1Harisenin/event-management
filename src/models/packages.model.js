const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Packages = sequelize.define('packages', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
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

module.exports = Packages;
