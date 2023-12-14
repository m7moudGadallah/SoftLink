const { monitoringRouter } = require('./monitoring.router');
const { urlRouter } = require('./urls.router');

/**
 * @param {import('express').Application} app
 * @returns {void}
 */
function loadRoutes(app) {
  app.use('/', monitoringRouter);
  app.use('/', urlRouter);
}

module.exports = { loadRoutes };
