const httpStatus = require('http-status');
// const {} = require('../services/event.service');
const { catchAsync } = require('../utils');

const getevent = catchAsync(async (req, res) => {
  try {
    return res.status(httpStatus.OK).send({
      masssage: 'good',
      data: 'try',
    });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({
      masssage: 'Nothing data found',
      data: 'error',
    });
  }
});

module.exports = { getevent };
