'use strict';
const express = require('express');
const mongoose = require('mongoose');
const shortenUrl = require('./controller/shortenUrl');
const serveUrl = require('./controller/serveUrl');
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

// set up routing
app.use('/', serveUrl);
app.use('/api', shortenUrl);

module.exports = app;
