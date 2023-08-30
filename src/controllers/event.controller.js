const httpStatus = require('http-status');
const { event, Organizers, Packages, User } = require('../models');
// const {} = require('../services/event.service');
const { catchAsync } = require('../utils');

const getevent = catchAsync(async (req, res) => {
  try {
    const data = await event.findAll();
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
    const data = await event.findOne({
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

const creatEvent = catchAsync(async (req, res) => {
  const idUser = req.user.sub;
  // console.log(idUser);
  const {
    // organizerId,
    participantId,
    title,
    description,
    eventType,
    eventMode,
    ettendeQuota,
    availableQuota,
    dateStart,
    dateEnd,
    location,
    cost,
  } = req.body;
  const user = await User.findOne({
    where: { id: idUser },
  });
  // console.log(user.name);
  const packageOrganize = await Packages.create({
    name: user.name,
    maxEvents: 200,
    maxQuota: ettendeQuota,
  });
  const organizer = await Organizers.create({
    userId: idUser,
    packageId: packageOrganize.id,
  });
  const data = await event.create({
    organizerId: organizer.id,
    participantId,
    title,
    description,
    eventType,
    eventMode,
    ettendeQuota,
    availableQuota,
    // img,
    dateStart,
    dateEnd,
    location,
    cost,
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
    const tryEvent = await event.findOne({
      where: { id },
    });
    const tryOrganize = await Organizers.findOne({
      where: { id: tryEvent.organizerId },
    });

    // const organizeUser = await Organizers.findOne({
    //   where: { userId: tryOrganize.userId },
    // });
    // console.log(tryOrganize.dataValues.userId);

    if (!(tryOrganize.dataValues.userId === idUser)) {
      return res.status(httpStatus.NO_CONTENT).send({
        masssage: "You're Not organizer",
      });
    }
    const dataOrgenize = await Organizers.destroy({
      where: { id: tryEvent.organizerId },
    });
    const dataPackage = await Packages.destroy({
      where: { id: tryOrganize.packageId },
    });
    const dataEvent = await event.destroy({
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

module.exports = { getevent, geteventByTitle, removeEvent, creatEvent };
