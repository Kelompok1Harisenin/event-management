const { Organizer } = require('../models');
const baseRepository = require('./base.repository');

const findById = (organizerId) => {
  return Organizer.findByPk(organizerId);
};

module.exports = {
  findById,
  ...baseRepository,
};
