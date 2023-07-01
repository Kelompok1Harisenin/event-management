const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the Role model
const Role = sequelize.define(
  'role',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Role;
