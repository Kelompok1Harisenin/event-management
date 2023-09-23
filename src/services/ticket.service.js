const httpStatus = require('http-status');
const moment = require('moment');
const uniqid = require('uniqid');
const { Ticket, Event } = require('../models');
const { eventRepository } = require('../repositories');
const { ApiError, messages } = require('../utils');

const reserveTicket = async (data, user) => {
  const { eventId } = data;
  const transactionDate = moment().format('YYYYMMDDHHmmss');
  const uniqueId = uniqid.time().toUpperCase();
  const number = `TC${transactionDate}${uniqueId}`;

  const event = await eventRepository.findById(Event, eventId);
  if (!event) {
    throw new ApiError(httpStatus.BAD_REQUEST, messages.EVENT_NOT_FOUND);
  }
  const ticketData = await Ticket.create({
    eventId,
    userId: user.id,
    number,
    emailSent: false,
  });

  return ticketData;
};

module.exports = {
  reserveTicket,
};
