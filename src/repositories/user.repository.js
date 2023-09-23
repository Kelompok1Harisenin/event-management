const { User } = require('../models');
const baseRepository = require('./base.repository');

const findByEmail = (email) => {
  return User.findOne({ where: { email } });
};

module.exports = {
  ...baseRepository,
  findByEmail,
};
