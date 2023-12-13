const { Router } = require('express');

const monitoringRouter = Router();

monitoringRouter.get('/livez', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is live! 🚀',
  });
});

module.exports = { monitoringRouter };
