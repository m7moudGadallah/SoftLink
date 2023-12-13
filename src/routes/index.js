const { Router } = require('express');

const { monitoringRouter } = require('./monitoring.router');

const apiRouter = Router();

apiRouter.use('/', monitoringRouter);

/**
 * @param {import('express').Application} app
 * @returns {void}
 */
function loadRoutes(app) {
  app.use('/api', apiRouter);
}

module.exports = { loadRoutes };
