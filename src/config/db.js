const mongoose = require('mongoose');

/**
 * @class
 * Database class to connect and disconnect to database easily.
 */
class DB {
  /**
   * Retrieve database uri
   * @returns {string} database uri
   */
  static getURI() {
    const { NODE_ENV } = process.env;

    if (NODE_ENV === 'development') return process.env.DATABASE_URI_DEV;
    if (NODE_ENV === 'test') return process.env.DATABASE_URI_TEST;

    return undefined;
  }

  /**
   * Retrieve database name
   * @returns {string} database name
   */
  static getName() {
    return DB.getURI()?.split('/')?.pop();
  }

  /**
   * @async
   * Connect to database
   * @returns {Promise<void>}
   */
  static async connect() {
    try {
      await mongoose.connect(DB.getURI());
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * @async
   * DisConnect database
   * @returns {Promise<void>}
   */
  static async disConnect() {
    await mongoose.disconnect();
  }
}

module.exports = { DB };
