const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { User } = require('./index');

const Attendee = sequelize.define('attendee', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
});

// one to one relation
Attendee.belongsTo(User, { foreignKey: 'userId' });

module.exports = Attendee;
