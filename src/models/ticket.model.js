const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Event = require('./event.model');
const Attendee = require('./attendee.model');

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
    attendeeId: {
      type: DataTypes.INTEGER,
      references: {
        model: Attendee,
        key: 'id',
      },
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

Ticket.belongsTo(Attendee, { foreignKey: 'attendeeId' });

module.exports = Ticket;
