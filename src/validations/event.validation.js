const Joi = require('joi');

const enumEventTypes = ['Online', 'Offline'];

const createEvent = {
  formData: Joi.object().keys({
    organizerId: Joi.number().integer().required(),
    title: Joi.string().required(),
    description: Joi.string().allow(''),
    eventType: Joi.string()
      .valid(...enumEventTypes)
      .required(),
    attendeeQuota: Joi.number().integer().required(),
    availableQuota: Joi.number().integer().required(),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().required(),
    location: Joi.string().required(),
    price: Joi.number().required(),
  }),
  file: Joi.object({
    fieldname: Joi.string().valid('image').required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string().valid('image/jpeg', 'image/jpg', 'image/png').required(),
    size: Joi.number().required(),
  }),
};

module.exports = {
  createEvent,
};
