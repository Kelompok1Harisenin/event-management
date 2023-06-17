const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user.model');

// Define the Role model
const Role = sequelize.define('role', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Role.belongsToMany(User, { through: 'UserRole' });

module.exports = Role;
