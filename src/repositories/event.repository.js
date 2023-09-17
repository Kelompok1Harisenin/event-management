const { Event } = require('../models');
const baseRepository = require('./base.repository');

const findById = (eventId) => {
  return Event.findByPk(eventId);
};

module.exports = {
  findById,
  ...baseRepository,
};
