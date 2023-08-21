const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { Ticket } = require('.');

// Define the Payment model
const Payment = sequelize.define(
  'payment',
  {
    ticketId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Payment.belongsTo(Ticket, { foreignKey: 'ticketId' });

module.exports = Payment;
