const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { Packages, User } = require('./index');

const Organizers = sequelize.define('organizers', {
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
      model: Packages,
      key: 'id',
    },
  },
});

// One to one relationships
Organizers.hasOne(User, { foreignKey: 'userId' });
Organizers.hasOne(Packages, { foreignKey: 'packageId' });

module.exports = Organizers;
