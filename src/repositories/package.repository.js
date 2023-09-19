const { Package, Organizer } = require('../models');
const baseRepository = require('./base.repository');

const findByUserAndOrganizer = (userId) => {
  return Package.findOne({
    include: [
      {
        model: Organizer,
        where: { userId },
      },
    ],
  });
};

module.exports = {
  ...baseRepository,
  findByUserAndOrganizer,
};
