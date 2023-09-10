const { User } = require('../models');

const findById = (userId) => {
  return User.findByPk(userId);
};

const findByEmail = (email) => {
  return User.findOne({ where: { email } });
};

module.exports = {
  findById,
  findByEmail,
};
