'use strict';

const express = require('express');
const validUrl = require('valid-url');
const Url = require('../model/url');
const router = express.Router();

const generateId = () => {
  return Math.floor(Math.random() * 1000);
};

const shortenUrl = (req, res) => {
  const originalUrl = req.params.url;
  if (validUrl.isUri(originalUrl)) {
    // check if originalUrl already stored in database first
    Url.findOne({ originalUrl })
      .then(function(url) {
        if (url) {
          return res
            .set('Content-Type', 'application/json')
            .json({ error: `Url already shortened at ${url.shortenedUrl}` });
        }

        const id = generateId();
        const shortenedUrl = `${req.protocol}://${req.headers.host}/${id}`;
        const newUrl = new Url({ originalUrl, shortenedUrl });

        newUrl
          .save()
          .then(function(newUrl) {
            const { originalUrl, shortenedUrl } = newUrl;
            res
              .set('Content-Type', 'application/json')
              .json({ originalUrl, shortenedUrl });
          })
          .catch(err => {
            return console.error(err);
          });
      })
      .catch(err => {
        return console.error(err);
      });
  } else {
    res.set('Content-Type', 'application/json').json({
      error:
        'Wrong url format, make sure you have a valid protocol and real site.'
    });
  }
};

// pass in (*) so that colons and slashes will not be confused by express
router.get('/:url(*)', shortenUrl);

module.exports = router;
