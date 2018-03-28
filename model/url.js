'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  originalUrl: String,
  shortenedUrl: String,
  createdAt: { type: Date, default: Date.now() }
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
