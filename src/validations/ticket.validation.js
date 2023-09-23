const Joi = require('joi');

const reserveTicket = {
  body: Joi.object().keys({
    eventId: Joi.number().integer().required(),
  }),
};

module.exports = {
  reserveTicket,
};
