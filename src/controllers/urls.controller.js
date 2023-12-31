const mongoose = require('mongoose');
const { UrlService } = require('../services');
const { catchAsync, AppError } = require('../utils');

class UrlController {
  /**
   * @route POST /api/url/shorten
   * @description Shorten a url.
   * @access public
   */
  static shortenUrl = catchAsync(
    /**
     * @param {import('express').Request<any, any, {url: string}>} req
     * @param {import('express').Response<{success: boolean, message: string, data: {url: string}}>} res
     * @param {import('express').NextFunction} next
     */
    async (req, res, next) => {
      // validate url is provided
      if (!req?.body?.url) throw new AppError('url is required!', 400);

      // validate is valid url using regex
      if (req.body.url.match(/^(ftp|http|https):\/\/[^ "]+$/) === null)
        throw new AppError('Url is invalid', 400);

      // shorten url
      const urlId = await UrlService.shortenUrl(req.body.url);

      const { NODE_ENV, DEV_URL, PROD_URL } = process.env;

      const appUrl = NODE_ENV === 'production' ? PROD_URL : DEV_URL;

      // construct shortened url
      const shortUrl = `${appUrl}/${urlId}`;

      // send response
      res.status(200).json({
        success: true,
        message: 'Url shortened successfully!',
        data: {
          shortUrl,
        },
      });
    }
  );

  /**
   * @route GET /api/url/:urlId
   * @description Redirect to original url.
   * @access public
   */
  static getOriginalUrl = catchAsync(
    /**
     * @param {import('express').Request<{urlId: string}, any, any>} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    async (req, res, next) => {
      // validate url id
      if (!mongoose.Types.ObjectId.isValid(req.params.urlId))
        throw new AppError('Invalid url!', 404);

      // get original url
      const originalUrl = await UrlService.getOriginalUrl(req.params.urlId);

      // validate original url
      if (!originalUrl) throw new AppError('Invalid url!', 404);

      // redirect to original url
      res.status(301).redirect(originalUrl);
    }
  );
}

module.exports = { UrlController };
