const { Organizer } = require('../models');

const findById = (organizerId) => {
  return Organizer.findByPk(organizerId);
};

module.exports = {
  findById,
};
