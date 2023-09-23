const { UserRoles } = require('../models');
const baseRepository = require('./base.repository');

const findByUser = (userId) => {
  return UserRoles.findAll({ where: { userId } });
};

module.exports = {
  ...baseRepository,
  findByUser,
};
