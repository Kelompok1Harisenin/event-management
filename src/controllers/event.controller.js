const fs = require('fs');
const httpStatus = require('http-status');
const { Event, Organizer, Package, User } = require('../models');
// const {} = require('../services/event.service');
const { catchAsync } = require('../utils');

const getEvent = catchAsync(async (req, res) => {
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

const getEventById = catchAsync(async (req, res) => {
  try {
    const EventId = req.params.id;
    const data = await Event.findOne({
      where: { id: EventId },
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

const creatEvent = catchAsync(async (req, res) => {
  const idUser = req.user.sub;
  // console.log(idUser);
  const {
    // organizerId,
    participantId,
    title,
    description,
    eventType,
    attendeeQuota,
    availableQuota,
    startDate,
    endDate,
    location,
    price,
  } = req.body;
  const user = await User.findOne({
    where: { id: idUser },
  });
  // console.log(user.name);
  const packageOrganize = await Package.create({
    name: user.name,
    maxEvents: 200,
    maxQuota: attendeeQuota,
  });
  const organizer = await Organizer.create({
    userId: idUser,
    packageId: packageOrganize.id,
  });
  const data = await Event.create({
    organizerId: organizer.id,
    participantId,
    title,
    description,
    eventType,
    attendeeQuota,
    availableQuota,
    // img,
    startDate,
    endDate,
    location,
    price,
  });
  return res.status(httpStatus.OK).send({
    masssage: 'Event Was Created',
    data,
    organizer,
  });
});

const removeEvent = catchAsync(async (req, res) => {
  try {
    const idUser = req.user.sub;
    const { id } = req.body;
    const tryEvent = await Event.findOne({
      where: { id },
    });
    const tryOrganize = await Organizer.findOne({
      where: { id: tryEvent.dataValues.organizerId },
    });

    if (!(tryOrganize.dataValues.userId === idUser)) {
      return res.status(httpStatus.NO_CONTENT).send({
        masssage: "You're Not organizer",
      });
    }
    const dataEvent = await Event.destroy({
      where: { id },
    });
    const dataOrgenize = await Organizer.destroy({
      where: { id: tryEvent.organizerId },
    });
    const dataPackage = await Package.destroy({
      where: { id: tryOrganize.packageId },
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

const uploadImage = catchAsync(async (req, res) => {
  try {
    const idUser = req.user.sub;
    const imageEvent = req.file.filename;
    const idEvent = req.body.payload;
    const postDir = `${process.cwd()}/upload/post_picture`;
    const tryEvent = await Event.findOne({
      where: { id: idEvent },
    });
    const tryOrganize = await Organizer.findOne({
      where: { id: tryEvent.organizerId },
    });
    if (tryOrganize.dataValues.userId !== idUser) {
      return res.status(httpStatus.NO_CONTENT).send({
        masssage: "You're Not organizer",
      });
    }
    const oldImage = await Event.findOne({
      where: { id: idEvent },
    });
    if (oldImage.image !== null) {
      fs.unlinkSync(`${postDir}/${oldImage.img}`);
    }
    const data = await Event.update(
      {
        img: imageEvent,
      },
      { where: { id: idEvent } }
    );
    return res.status(httpStatus.OK).send({
      masssage: 'Image Succsed Upload',
      data,
      imageEvent,
    });
  } catch (error) {
    return res.status(httpStatus.BAD_GATEWAY).send({
      masssage: 'Failed post image',
      error,
    });
  }
});

const updateEvent = catchAsync(async (req, res) => {
  try {
    const idUser = req.user.sub;
    const {
      id,
      participantId,
      title,
      description,
      eventType,
      attendeeQuota,
      availableQuota,
      startDate,
      endDate,
      location,
      price,
    } = req.body;
    const tryEvent = await Event.findOne({
      where: { id },
    });
    const tryOrganize = await Organizer.findOne({
      where: { id: tryEvent.dataValues.organizerId },
    });
    console.log(idUser, tryOrganize.dataValues.userId === idUser);
    if (tryOrganize.dataValues.userId !== idUser) {
      return res.status(httpStatus.NO_CONTENT).send({
        masssage: "You're Not organizer",
      });
    }
    const data = await Event.update(
      {
        participantId,
        title,
        description,
        eventType,
        attendeeQuota,
        availableQuota,
        startDate,
        endDate,
        location,
        price,
      },
      { where: { id } }
    );
    return res.status(httpStatus.OK).send({
      masssage: 'Update data was successfully',
      data,
    });
  } catch (error) {
    return res.status(httpStatus.BAD_GATEWAY).send({
      error,
    });
  }
});
module.exports = { getEvent, getEventById, removeEvent, creatEvent, uploadImage, updateEvent };
