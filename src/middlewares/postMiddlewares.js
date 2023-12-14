const { errorHandlers } = require('../utils');

/**
 * Load post-middlewares to an Express application for error handling.
 * @param {import('express').Application} app The Express application to which the middlewares should be applied.
 * @returns {void}
 */
function loadPostMiddlewares(app) {
  // error handling for undefined routes
  app.all('*', errorHandlers.undefinedRoutesErrorHandler);

  // global error handling
  app.use(errorHandlers.globalErrorHandler);
}

module.exports = { loadPostMiddlewares };
