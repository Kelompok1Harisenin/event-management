const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const tokenTypes = require('../config/token');
const User = require('./user.model')

// Define the Token model
const Token = sequelize.define('token', {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [[tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL]],
    },
  },
  expires: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  blacklisted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

// Define one-to-one relationships
Token.belongsTo(User, { foreignKey: 'userId' });

module.exports = Token;
