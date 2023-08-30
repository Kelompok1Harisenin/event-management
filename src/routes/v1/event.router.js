const express = require('express');
const multer = require('multer');
const {
  getEvent,
  getEventById,
  removeEvent,
  creatEvent,
  uploadImage,
} = require('../../controllers/event.controller');
const auth = require('../../middlewares/auth');

const postDir = `${process.cwd()}/upload/post_picture`;
const uploadPost = multer({ dest: postDir });

const router = express.Router();

// GET
router.get('/', getEvent);
router.get('/:title', getEventById);

// POST
router.post('/createEvent', auth(), creatEvent);

// PUT
router.put('/uploadImage', auth(), uploadPost.single('eventImage'), uploadImage);
// DELETE
router.delete('/remove', auth(), removeEvent);

module.exports = router;
