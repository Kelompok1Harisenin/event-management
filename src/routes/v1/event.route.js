const express = require('express');
const multer = require('multer');
const validate = require('../../middlewares/validate');
const { eventValidation } = require('../../validations');
const { eventController } = require('../../controllers');
const auth = require('../../middlewares/auth');

// const postDir = `${process.cwd()}/upload`;
// const uploadPost = multer({ dest: postDir });

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

// GET
// router.get('/', getevent);
// router.get('/:title', geteventByTitle);

router.post(
  '/',
  auth(),
  validate(eventValidation.createEvent),
  upload.single('image'),
  eventController.createEvent
);
// router.post('/', auth(), uploadPost.single('post_photo'), creatEvent);

// DELETE
// router.delete('/remove', auth(), removeEvent);

module.exports = router;
