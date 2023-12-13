const dotenv = require('dotenv');
const path = require('path');

const envFile = path.resolve(__dirname, '..', '..', '.env');
dotenv.config({ path: envFile }); // load env vars

const { DB } = require('./db');

module.exports = { DB };
