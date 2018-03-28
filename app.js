'use strict';
const express = require('express');
const mongoose = require('mongoose');
const router = require('./controller/url');
const app = express();

// set up view engine
app.set('view engine', 'ejs');

// connect with MongoDB
const uriString =
  process.env.MONGODB_URI || 'mongodb://localhost/url-shortener-microservice';
mongoose.connect(uriString);
mongoose.connection.on('error', () =>
  console.error(`Error connecting to database: ${uriString}`)
);
mongoose.connection.once('open', () => {
  console.log(`Successfully connected to database: ${uriString}`);
});

app.use('/', router);

module.exports = app;
