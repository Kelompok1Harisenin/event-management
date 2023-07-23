const { Role } = require('../models');

const findRole = (role) => {
  return Role.findOne({ where: { name: role } });
};

module.exports = {
  findRole,
};
