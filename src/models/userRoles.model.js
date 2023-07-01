const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { User, Role } = require('../models');

// Define the UserRoles model
const UserRoles = sequelize.define(
  'user_roles',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: Role,
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
  }
);

// Define many-to-many relationships
User.belongsToMany(Role, { through: 'user_roles' });
Role.belongsToMany(User, { through: 'user_roles' });

module.exports = UserRoles;
