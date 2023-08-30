const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Role = require('./role.model');
const Permission = require('./permission.model');

// Define the RolePermissions model
const RolePermissions = sequelize.define(
  'role_permissions',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: Role,
        key: 'id',
      },
    },
    permissionId: {
      type: DataTypes.INTEGER,
      references: {
        model: Permission,
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
  }
);

// Define many-to-many relationships
Permission.belongsToMany(Role, { through: 'role_permissions' });
Role.belongsToMany(Permission, { through: 'role_permissions' });

module.exports = RolePermissions;
