const { Organizer, User, Package } = require('../models');
const baseRepository = require('./base.repository');

const findAllWithUserAndPackage = () => {
  const queryOptions = {
    include: [
      {
        model: User,
        attributes: ['name'],
      },
      {
        model: Package,
        attributes: ['name'],
      },
    ],
  };

  return Organizer.findAll(queryOptions);
};

module.exports = {
  ...baseRepository,
  findAllWithUserAndPackage,
};
