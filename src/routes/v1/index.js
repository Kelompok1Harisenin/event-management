const express = require('express');
const authRoute = require('./auth.route');
const eventRoute = require('./event.router');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/event',
    route: eventRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
