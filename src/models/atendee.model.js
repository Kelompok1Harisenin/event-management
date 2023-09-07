const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { User } = require('./index');

const Atendee = sequelize.define('atendee', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
});

// one to one relation
Atendee.hasOne(User, { foreignKey: 'userId' });

module.exports = Atendee;
