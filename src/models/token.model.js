const { Sequelize, DataTypes } = require('sequelize');
const { tokenTypes } = require('../config/token');

const Token = sequelize.define('Token', {
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
});

// Define relationships
Token.belongsTo(User, { foreignKey: 'userId' });

module.exports = Token;
