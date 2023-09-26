const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PaymentMethod = sequelize.define(
    'payment_method',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        timestamps: true,
    }
);

module.exports = PaymentMethod;
