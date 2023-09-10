const { Package } = require('../models');

const findById = (packageId) => {
  return Package.findByPk(packageId);
};

module.exports = {
  findById,
};
