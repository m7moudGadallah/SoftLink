const { Router } = require('express');

const { UrlController } = require('../controllers');

const urlRouter = Router();

urlRouter.route('/shorten').post(UrlController.shortenUrl);

urlRouter.route('/:urlId').get(UrlController.getOriginalUrl);

module.exports = { urlRouter };
