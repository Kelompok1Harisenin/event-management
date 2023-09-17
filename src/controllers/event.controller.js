const httpStatus = require('http-status');
const { Event, Organizer, Package } = require('../models');
const { catchAsync } = require('../utils');
const { eventService } = require('../services');

const createEvent = catchAsync(async (req, res) => {
  const event = await eventService.createEvent(req.body, req.file);
  res.status(httpStatus.CREATED).send({ event });
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
  try {
    const idUser = req.user.sub;
    const { id } = req.body;
    const tryEvent = await Event.findOne({
      where: { id },
    });
    const tryOrganize = await Organizer.findOne({
      where: { id: tryEvent.organizerId },
    });

    // const organizeUser = await Organizer.findOne({
    //   where: { userId: tryOrganize.userId },
    // });
    // console.log(tryOrganize.dataValues.userId);

    if (!(tryOrganize.dataValues.userId === idUser)) {
      return res.status(httpStatus.NO_CONTENT).send({
        masssage: "You're Not organizer",
      });
    }
    const dataOrgenize = await Organizer.destroy({
      where: { id: tryEvent.organizerId },
    });
    const dataPackage = await Package.destroy({
      where: { id: tryOrganize.packageId },
    });
    const dataEvent = await Event.destroy({
      where: { id },
    });
    return res.status(httpStatus.OK).send({
      masssage: 'Event has Been deleted',
      dataEvent,
      dataOrgenize,
      dataPackage,
    });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: 'was not deleted',
      data: error,
    });
  }
});

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  removeEvent,
};
