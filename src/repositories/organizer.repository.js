const { Organizer } = require('../models');

const findByPk = (organizerId) => {
  return Organizer.findByPk(organizerId);
};

module.exports = {
  findByPk,
};
