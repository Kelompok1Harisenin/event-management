const Joi = require('joi');

const createOrganizer = {
  body: Joi.object().keys({
    userId: Joi.number().integer().required(),
    packageId: Joi.number().integer().required(),
  }),
};

module.exports = {
  createOrganizer,
};
