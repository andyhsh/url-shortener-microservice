'use strict';
const express = require('express');
const Url = require('../model/url');
const router = express.Router();

const serveUrl = (req, res) => {
  const shortenedUrl = `${req.protocol}://${req.headers.host}/${req.params.id}`;
  // check if id exists in database and redirect to originalUrl
  Url.findOne({ shortenedUrl }).then(function(url) {
    if (url) {
      res.redirect(url.originalUrl);
    } else {
      res.json({
        error: 'This url cannot be found in the database.'
      });
    }
  });
};

const generateIndex = (req, res) => {
  const url = `${req.protocol}://${req.headers.host}`;
  res.render('index', { url });
};

router.get('/:id', serveUrl);
router.get('/', generateIndex);

module.exports = router;
