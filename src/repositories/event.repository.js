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
    order: [['createdAt', 'DESC']],
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

const countByUserAndOrganizer = (userId) => {
  return Event.count({
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
  findAllByFilterWithUserAndPackage,
  findByIdWithUserAndPackage,
  countByUserAndOrganizer,
};
