const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Organizer = require('./organizer.model');
const Ticket = require('./ticket.model');

// Define the Event model
const Event = sequelize.define(
  'event',
  {
    organizerId: {
      type: DataTypes.INTEGER,
      references: {
        model: Organizer,
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    eventType: {
      type: DataTypes.STRING,
    },
    attendeeQuota: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    availableQuota: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Event.belongsTo(Organizer, { foreignKey: 'organizerId' });
Event.hasMany(Ticket, { foreignKey: 'eventId' });

module.exports = Event;
