const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user.model');
const Package = require('./package.model');

const Organizer = sequelize.define('organizer', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  packageId: {
    type: DataTypes.INTEGER,
    references: {
      model: Package,
      key: 'id',
    },
  },
});

Organizer.belongsTo(User, { foreignKey: 'userId' });
Organizer.belongsTo(Package, { foreignKey: 'packageId' });

module.exports = Organizer;
