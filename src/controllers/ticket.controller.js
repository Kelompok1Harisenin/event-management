const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { ticketService } = require('../services');

const reserveTicket = catchAsync(async (req, res) => {
  const ticket = await ticketService.reserveTicket(req.body, req.user);
  res.status(httpStatus.CREATED).send(ticket);
});

module.exports = {
  reserveTicket,
};
