const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Event = require('./event.model');
const User = require('./user.model');

// Define the Ticket model
const Ticket = sequelize.define(
  'ticket',
  {
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Event,
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    emailSent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Ticket.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Ticket, { foreignKey: 'userId' });

module.exports = Ticket;
