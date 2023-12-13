const express = require('express');
const { DB } = require('./config');

const app = express();

// TODO: mount preMiddlewares

// TODO: mount routes

// TODO: mount postMiddlewares

/**
 * @type {import('http').Server}
 */
const server = app.listen(async () => {
  const { NODE_ENV: MODE, PORT } = process.env;
  await DB.connect();

  console.log(`Connected to (${DB.getName()}) database! 🚀`);

  console.log(`App is running in ${MODE} mode on port ${PORT}! 🚀`);
});

module.exports = { server };
