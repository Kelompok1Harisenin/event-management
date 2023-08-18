const express = require('express');
const { getevent } = require('../../controllers/event.controller');

const router = express.Router();

router.get('/', getevent);
