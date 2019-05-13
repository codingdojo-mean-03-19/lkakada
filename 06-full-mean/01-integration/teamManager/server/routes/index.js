const catchAllRouter = require('./catch-all.routes');

const router = require('express').Router();
const api = require('express').Router();

const teamRouter = require('./team.route');
router.use('/teams', teamRouter);

module.exports = api.use('/api', router).use(catchAllRouter);