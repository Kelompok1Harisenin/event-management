const { Organizer, User, Package } = require('../models');
const baseRepository = require('./base.repository');

const findByUser = (userId) => {
  return Organizer.findOne({ where: { userId } });
};

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
  findByUser,
  findAllWithUserAndPackage,
};
