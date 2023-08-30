const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Event = require('./event.model');

// Define the Ticket model
const Ticket = sequelize.define(
  'ticket',
  {
    eventId: {
      type: DataTypes.INTEGER,
      references: {
        model: Event,
        key: 'id',
      },
    },
    number: {
      type: DataTypes.STRING,
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
