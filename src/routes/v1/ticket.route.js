const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { ticketValidation } = require('../../validations');
const { ticketController } = require('../../controllers');

const router = express.Router();

router.post('/', auth(), validate(ticketValidation.reserveTicket), ticketController.reserveTicket);

module.exports = router;
