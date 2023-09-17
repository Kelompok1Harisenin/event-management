const { Event } = require('../models');

const findById = (eventId) => {
  return Event.findByPk(eventId);
};

module.exports = {
  findById,
};
