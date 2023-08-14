const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the Ticket model
const Ticket = sequelize.define(
  'ticket',
  {
    number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    attendeesId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

module.exports = Ticket;
