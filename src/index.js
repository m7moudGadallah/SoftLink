const express = require('express');
const { DB } = require('./config');
const { loadRoutes } = require('./routes');

const app = express();

// TODO: mount preMiddlewares

loadRoutes(app);

// TODO: mount postMiddlewares

/**
 * @type {import('http').Server}
 */
const { NODE_ENV: MODE, PORT } = process.env;

const server = app.listen(PORT, async () => {
  await DB.connect();

  console.log(`Connected to (${DB.getName()}) database! 🚀`);

  console.log(`App is running in ${MODE} mode on port ${PORT}! 🚀`);
});

module.exports = { server };
