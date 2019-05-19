const catchAllRouter = require('./catch-all.routes');

const router = require('express').Router();
const api = require('express').Router();

const restaurantRouter = require('./restaurant.route');
router.use('/restaurants', restaurantRouter);

module.exports = api.use('/api', router).use(catchAllRouter);