const httpStatus = require('http-status');
const { Event, Organizer } = require('../models');
const { organizerRepository, eventRepository } = require('../repositories');
const { ApiError, messages, tags, uploadImage } = require('../utils');

const createEvent = async (data, imageFile) => {
  const {
    organizerId,
    title,
    description,
    eventType,
    attendeeQuota,
    availableQuota,
    startDate,
    endDate,
    location,
    price,
  } = data;

  if (!imageFile) {
    throw new ApiError(httpStatus.BAD_REQUEST, messages.IMAGE_NOT_FOUND);
  }

  const image = await uploadImage(imageFile, title, tags.EVENTS);
  const organizer = await organizerRepository.findById(Organizer, organizerId);
  if (!organizer) {
    throw new ApiError(httpStatus.NOT_FOUND, messages.ORGANIZER_NOT_FOUND);
  }

  const createdEvent = await Event.create({
    organizerId,
    title,
    description,
    eventType,
    attendeeQuota,
    availableQuota,
    image,
    startDate,
    endDate,
    location,
    price,
  });

  return createdEvent;
};

const getEvents = async (filter = null) => {
  let events = await eventRepository.findAllByFilterWithUserAndPackage(filter);

  events = events.map((event) => ({
    ...event.toJSON(),
    organizer: {
      id: event.organizer.id,
      userId: event.organizer.userId,
      packageId: event.organizer.packageId,
      username: event.organizer.user.name,
      package: event.organizer.package.name,
    },
  }));

  events = events.map((event) => {
    const { organizerId, ...data } = event;
    return data;
  });

  return events;
};

const getEventById = async (id) => {
  const event = await eventRepository.findByIdWithUserAndPackage(id);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, messages.RECORD_NOT_FOUND);
  }

  const { id: organizerId, userId, packageId, ...organizer } = event.organizer;

  const eventData = {
    ...event.toJSON(),
    organizer: {
      id: organizerId,
      userId,
      packageId,
      username: organizer.user.name,
      package: organizer.package.name,
    },
  };

  eventData.organizerId = undefined;

  return eventData;
};

const removeEvent = async (id) => {
  const event = await eventRepository.findById(Event, id);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, messages.RECORD_NOT_FOUND);
  }
  await eventRepository.deleteById(Event, id);
  return {};
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  removeEvent,
};
