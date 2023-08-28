const httpStatus = require('http-status');
const { event } = require('../models');
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
  const idUser = req.user.id;
  const {
    // organizerId,
    participantId,
    title,
    description,
    eventType,
    eventMode,
    ettendeQuota,
    availableQuota,
    img,
    dateStart,
    dateEnd,
    location,
    cost,
  } = req.body;
  const data = await event.create({
    organizerId: idUser,
    participantId,
    title,
    description,
    eventType,
    eventMode,
    ettendeQuota,
    availableQuota,
    img,
    dateStart,
    dateEnd,
    location,
    cost,
  });
  return res.status(httpStatus.OK).send({
    masssage: 'Event Was Created',
    data,
  });
});

const removeEvent = catchAsync(async (req, res) => {
  try {
    const { id, title } = req.body;
    const data = await event.destroy({
      where: { id, title },
    });
    return res.status(httpStatus.OK).send({
      masssage: 'Data Has been Deleted',
      data,
    });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: 'was not deleted',
      data: error,
    });
  }
});

module.exports = { getevent, geteventByTitle, removeEvent, creatEvent };
