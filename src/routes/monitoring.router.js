const { Router } = require('express');
const { MonitoringController } = require('../controllers');

const monitoringRouter = Router();

monitoringRouter.get('/', MonitoringController.monitorServer);

monitoringRouter.get('/livez', MonitoringController.livez);

module.exports = { monitoringRouter };
