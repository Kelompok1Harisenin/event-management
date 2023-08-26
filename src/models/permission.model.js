const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the Permission model
const Permission = sequelize.define(
  'permission',
  {
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Permission;
