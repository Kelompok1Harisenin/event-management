const httpStatus = require('http-status');
const { Event, Organizer, Package } = require('../models');
const { catchAsync } = require('../utils');
const { eventService } = require('../services');

const getevent = catchAsync(async (req, res) => {
  try {
    const data = await Event.findAll();
    return res.status(httpStatus.OK).send({
      masssage: 'Get Data',
      data,
    });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({
      masssage: 'Nothing data found',
      data: 'error',
    });
  }
});

const geteventByTitle = catchAsync(async (req, res) => {
  try {
    const Eventtitle = req.params.title;
    const data = await Event.findOne({
      where: { title: Eventtitle },
    });
    return res.status(httpStatus.OK).send({
      masssage: 'Get Data',
      data,
    });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({
      masssage: 'Nothing data found',
      data: 'error',
    });
  }
});

const createEvent = catchAsync(async (req, res) => {
  const event = await eventService.createEvent(req.body, req.file);
  res.status(httpStatus.CREATED).send({ event });
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

module.exports = { getevent, geteventByTitle, removeEvent, createEvent };
