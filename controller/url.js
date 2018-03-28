'use strict';

const express = require('express');
const validUrl = require('valid-url');
const Url = require('../model/url');
const router = express.Router();

const generateId = () => {
  return Math.floor(Math.random() * 1000);
};

const createUrl = (req, res) => {
  const originalUrl = req.params.url;
  if (validUrl.isUri(originalUrl)) {
    // check if originalUrl already stored in database first
    Url.find({ originalUrl })
      .then(function(url) {
        if (url.length !== 0) {
          return res.status(200).json({ error: 'Url already shortened' });
        }

        const shortenedUrl = `${req.protocol}://${
          req.headers.host
        }/${generateId()}`;

        const newUrl = new Url({ originalUrl, shortenedUrl });

        newUrl
          .save()
          .then(function(newUrl) {
            console.log('Saved new url: ', newUrl);
            const { originalUrl, shortenedUrl } = newUrl;
            res.status(200).json({ originalUrl, shortenedUrl });
          })
          .catch(err => {
            return console.error(err);
          });
      })
      .catch(err => {
        return console.error(err);
      });
  } else {
    res.status(200).json({
      error:
        'Wrong url format, make sure you have a valid protocol and real site.'
    });
  }
};

// pass in (*) so that colons and slashes will not be confused by express
router.get('/api/:url(*)', createUrl);

module.exports = router;
