const { User } = require('../models');

const findByEmail = (email) => {
  return User.findOne({ where: { email } });
};

module.exports = {
  findByEmail,
};
