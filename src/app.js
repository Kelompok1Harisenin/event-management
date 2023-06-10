const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

// Parse json request body
app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());

// Enable CORS
app.use(cors());
app.options('*', cors());

module.exports = app;
