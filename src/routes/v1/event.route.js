const express = require('express');
const multer = require('multer');
const validate = require('../../middlewares/validate');
const { eventValidation } = require('../../validations');
const { eventController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post(
  '/',
  auth(),
  validate(eventValidation.createEvent),
  upload.single('image'),
  eventController.createEvent
);
router.get('/', validate(eventValidation.getEvents), eventController.getEvents);
router.get('/:id', validate(eventValidation.getEventById), eventController.getEventById);
router.delete('/:id', auth(), validate(eventValidation.removeEvent), eventController.removeEvent);

module.exports = router;
