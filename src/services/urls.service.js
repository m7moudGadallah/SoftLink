const { UrlModel } = require('../models');
const { AppError } = require('../utils');

class UrlService {
  /**
   * Shorten a url
   * @param {string} url
   * @returns {Promise<string>} urlId
   */
  static async shortenUrl(url) {
    // check if exists before
    const oldUrl = await UrlModel.findOne({ originalUrl: url });

    if (oldUrl) return oldUrl._id;

    const newUrl = await UrlModel.create({ originalUrl: url });

    return newUrl._id;
  }

  /**
   * Search for a url
   * @param {string} urlId
   * @returns {Promise<string>} originalUrl
   */
  static async getOriginalUrl(urlId) {
    const url = await UrlModel.findByIdAndUpdate(urlId, {
      $inc: { clicks: 1 },
    });

    if (!url) {
      throw new AppError('Url not found', 404);
    }

    return url.originalUrl;
  }
}

module.exports = { UrlService };
