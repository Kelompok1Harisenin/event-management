const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { organizerValidation } = require('../../validations');
const { organizerController } = require('../../controllers');

const router = express.Router();

router.post(
  '/',
  auth(),
  validate(organizerValidation.createOrganizer),
  organizerController.createOrganizer
);

module.exports = router;
