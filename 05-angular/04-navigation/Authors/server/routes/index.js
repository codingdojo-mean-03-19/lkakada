const catchAllRouter = require('./all.routes');

const router = require('express').Router();
const api = require('express').Router();
const authorRouter = require('./author.route');

router.use('/authors', authorRouter);

module.exports = api.use('/api', router).use(catchAllRouter);