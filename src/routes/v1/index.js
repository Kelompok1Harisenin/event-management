const express = require('express');
const authRoute = require('./auth.route');
const eventRoute = require('./event.router');
const organizerRoute = require('./organizer.router');

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
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
