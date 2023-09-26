const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Ticket = require('./ticket.model');

// Define the Payment model
const Payment = sequelize.define(
  'payment',
  {
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Payment.belongsTo(Ticket, { foreignKey: 'ticketId' });

module.exports = Payment;
