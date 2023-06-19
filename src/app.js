const express = require('express');
const httpStatus = require('http-status');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const { messages, ApiError } = require('./utils');

const app = express();

// Parse json request body
app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());
app.options('*', cors());

// v1 API routes
app.use('/api/v1', routes);

// Send back a 404 error for any unknown API request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, messages.ENDPOINT_NOT_FOUND));
});

// Convert error to ApiError
app.use(errorConverter);

// Handle the error
app.use(errorHandler);

module.exports = app;
