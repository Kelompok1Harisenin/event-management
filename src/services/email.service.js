const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger')('email');

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() =>
      logger.warn(
        'Unable to connect to email server. Make sure you have configured the SMTP options in .env'
      )
    );
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text) => {
  const msg = { from: config.email.from, to, subject, text };
  await transport.sendMail(msg);
};

const sendAttachmentEmail = async (to, subject, text, attachments) => {
  const msg = { from: config.email.from, to, subject, text, attachments };
  try {
    await transport.sendMail(msg);
  } catch (err) {
    logger.error(`Error sending email with attachment to ${to}!`);
  }
};

module.exports = {
  transport,
  sendEmail,
  sendAttachmentEmail,
};
