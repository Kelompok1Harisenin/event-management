const express = require('express');
const {
  getevent,
  geteventByTitle,
  removeEvent,
  creatEvent,
} = require('../../controllers/event.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

// GET
router.get('/', getevent);
router.get('/:title', geteventByTitle);

// POST
router.post('/createEvent', auth(), creatEvent);

// DELETE
router.delete('/remove', auth(), removeEvent);

module.exports = router;
