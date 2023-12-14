const express = require('express');
const { DB } = require('./config');
const { loadRoutes } = require('./routes');
const { loadPreMiddlewares, loadPostMiddlewares } = require('./middlewares');

const app = express();

loadPreMiddlewares(app);

loadRoutes(app);

loadPostMiddlewares(app);

const { NODE_ENV: MODE, PORT } = process.env;

/**
 * @type {import('http').Server | null}
 */
let server = null;

/**
 * Start http server
 * @returns {import('http').Server}
 */
function createServer() {
  if (!server) {
    server = app.listen(PORT, async () => {
      await DB.connect();

      console.log(`Connected to (${DB.getName()}) database! 🚀`);

      console.log(`App is running in ${MODE} mode on port ${PORT}! 🚀`);
    });
  }

  return server;
}

/**
 * Close http server
 * @async
 * @param {import('http').Server} server
 * @returns {Promise<void>}
 */
async function closeServer() {
  if (server) {
    await DB.disConnect();

    server.close();
    server = null;
  }
}

if (MODE !== 'test') {
  createServer();
}

module.exports = { createServer, closeServer };
