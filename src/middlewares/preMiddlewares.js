const express = require('express');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

/**
 * Load pre-middlewares to an Express application for enhanced security and functionality.
 * @function
 * @param {import('express').Application} app The Express application to which the middlewares should be applied.
 * @returns {void}
 */
function loadPreMiddlewares(app) {
  // Log requested endpoints in development mode
  if (process.env.NODE_ENV === 'development') {
    const morgan = require('morgan');
    morgan('dev');
  }

  // Parse JSON bodies
  app.use(express.json({ limit: '10kb' }));

  const { RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MIN } = process.env;

  // API rate-Limit using express-rate-limit
  const limiter = rateLimit({
    max: RATE_LIMIT_MAX,
    windowMs: Number(RATE_LIMIT_WINDOW_MIN) * 60 * 1000,
    message: {
      status: 'Error',
      message: 'Too many requests from this IP, please try again in an hour!',
    },
  });

  // Apply API rate limiting to the '/api' endpoint.
  app.use('/', limiter);

  // Data sanitization against XSS
  app.use(xss());

  // Prevent parameter pollution
  app.use(hpp());

  // Enable CORS
  app.use(cors());
}

module.exports = { loadPreMiddlewares };
