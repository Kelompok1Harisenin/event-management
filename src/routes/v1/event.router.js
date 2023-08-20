const express = require('express');
const { getevent, geteventByTitle, removeEvent } = require('../../controllers/event.controller');

const router = express.Router();

// GET
router.get('/', getevent);
router.get('/:title', geteventByTitle);

// DELETE
router.delete('/remove', removeEvent);

module.exports = router;
