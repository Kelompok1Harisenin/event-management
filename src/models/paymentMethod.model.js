const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Payment = require('./payment.model');

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

PaymentMethod.hasMany(Payment, { foreignKey: 'paymentMethodId' });
Payment.belongsTo(PaymentMethod, { foreignKey: 'paymentMethodId' });

module.exports = PaymentMethod;
