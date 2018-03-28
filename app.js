'use strict';
const express = require('express');
const mongoose = require('mongoose');
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
mongoose.connection.once('open', () =>
  consoel.log(`Successfully connected to database: ${uriString}`)
);

module.exports = app;
