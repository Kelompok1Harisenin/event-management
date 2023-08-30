const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const event = sequelize.define(
  'event',
  {
    organizerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    participantId: {
      type: DataTypes.INTEGER,
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
    eventMode: {
      type: DataTypes.STRING,
    },
    attendeQuota: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    availableQuota: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
    },
    dateStart: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dateEnd: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = event;
