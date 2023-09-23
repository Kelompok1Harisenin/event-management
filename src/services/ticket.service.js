const httpStatus = require('http-status');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const uniqid = require('uniqid');
const qr = require('qrcode');
const { Ticket, Event } = require('../models');
const { eventRepository } = require('../repositories');
const emailService = require('./email.service');
const { ApiError, messages, convertDateTime } = require('../utils');
const logger = require('../config/logger')('ticket');

const fillEmailTemplate = (username, eventTitle, eventDate, eventTime, location) => {
  const basePath = path.join(__dirname, './../views/templates' || '');
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const emailTemplate = fs.readFileSync(`${basePath}/ticket-confirmation.txt`, 'utf-8');
  let filledTemplate = emailTemplate;
  filledTemplate = filledTemplate.replace('{{username}}', username);
  filledTemplate = filledTemplate.replace('{{eventTitle}}', eventTitle);
  filledTemplate = filledTemplate.replace('{{eventDate}}', eventDate);
  filledTemplate = filledTemplate.replace('{{eventTime}}', eventTime);
  filledTemplate = filledTemplate.replace('{{location}}', location);
  return filledTemplate;
};

const reserveTicket = async (data, user) => {
  const { eventId } = data;
  const transactionDate = moment().format('YYYYMMDDHHmmss');
  const uniqueId = uniqid.time().toUpperCase();
  const number = `TC${transactionDate}${uniqueId}`;

  const event = await eventRepository.findById(Event, eventId);
  if (!event) {
    throw new ApiError(httpStatus.BAD_REQUEST, messages.EVENT_NOT_FOUND);
  }

  const { title, startDate, endDate, location } = event.dataValues;
  const eventDate = convertDateTime.formatDate(startDate);
  const eventStart = convertDateTime.formatTime(startDate);
  const eventEnd = convertDateTime.formatTime(endDate);

  const ticketData = await Ticket.create({
    eventId,
    userId: user.id,
    number,
    emailSent: false,
  });

  // Generate the QR code
  const qrCodeText = `Ticket Number: ${number}`;
  const qrCodeBuffer = await qr.toBuffer(qrCodeText, { type: 'png' });

  try {
    const emailContent = fillEmailTemplate(
      user.name,
      title,
      eventDate,
      `${eventStart} - ${eventEnd}`,
      location
    );
    await emailService.sendAttachmentEmail(user.email, 'Your Ticket Reservation', emailContent, [
      {
        filename: `${number}-QRCode.png`,
        content: qrCodeBuffer,
      },
    ]);

    // If the email is sent successfully, update emailSent to true
    await ticketData.update({ emailSent: true });
    logger.info('Email successfully sent!');
  } catch (error) {
    logger.error('Error sending email or update ticket data - ', error);
  }

  return ticketData;
};

module.exports = {
  reserveTicket,
};
