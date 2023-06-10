const { Sequelize } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(
  config.mysql.name,
  config.mysql.user,
  config.mysql.pass,
  {
    host: config.mysql.host,
    dialect: 'mysql'
  }
);

module.exports = sequelize;
