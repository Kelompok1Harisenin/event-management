const { Op } = require('sequelize');
const { Event, Organizer, User, Package } = require('../models');
const baseRepository = require('./base.repository');

const findAllByFilterWithUserAndPackage = (filter = null) => {
  const { title } = filter;
  const queryOptions = {
    include: [
      {
        model: Organizer,
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
      },
    ],
  };

  if (title) {
    queryOptions.where = {
      title: {
        [Op.iLike]: `%${title}%`,
      },
    };
  }

  return Event.findAll(queryOptions);
};

const findByIdWithUserAndPackage = (eventId) => {
  return Event.findOne({
    where: { id: eventId },
    include: [
      {
        model: Organizer,
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
      },
    ],
  });
};

module.exports = {
  ...baseRepository,
  findAllByFilterWithUserAndPackage,
  findByIdWithUserAndPackage,
};
