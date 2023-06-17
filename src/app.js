const express = require('express');
const httpStatus = require('http-status');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./routes/v1');

const app = express();

// Parse json request body
app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());

// Enable CORS
app.use(cors());
app.options('*', cors());

// v1 API routes
app.use('/api/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new Error(httpStatus.NOT_FOUND, 'Not found'));
});

module.exports = app;
