const express = require('express');
const authRoute = require('./auth.route');
const eventRoute = require('./event.route');
const organizerRoute = require('./organizer.route');
const ticketRoute = require('./ticket.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/events',
    route: eventRoute,
  },
  {
    path: '/organizers',
    route: organizerRoute,
  },
  {
    path: '/tickets',
    route: ticketRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
