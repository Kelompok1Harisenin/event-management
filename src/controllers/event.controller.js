const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { eventService } = require('../services');

const createEvent = catchAsync(async (req, res) => {
  const event = await eventService.createEvent(req.body, req.file, req.user);
  res.status(httpStatus.CREATED).send(event);
});

const getEvents = catchAsync(async (req, res) => {
  const events = await eventService.getEvents(req.query);
  res.send(events);
});

const getEventById = catchAsync(async (req, res) => {
  const event = await eventService.getEventById(req.params.id);
  res.send(event);
});

const removeEvent = catchAsync(async (req, res) => {
  await eventService.removeEvent(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  removeEvent,
};
