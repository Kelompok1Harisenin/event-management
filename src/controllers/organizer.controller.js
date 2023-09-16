const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { organizerService } = require('../services');

const createOrganizer = catchAsync(async (req, res) => {
  const organizer = await organizerService.createOrganizer(req.body);
  res.status(httpStatus.CREATED).send({ organizer });
});

module.exports = {
  createOrganizer,
};
