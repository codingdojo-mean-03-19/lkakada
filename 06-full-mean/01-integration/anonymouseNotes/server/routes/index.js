const catchAllRouter = require('./all.routes');

const router = require('express').Router();
const api = require('express').Router();
const noteRouter = require('./note.route');

router.use('/notes', noteRouter);

module.exports = api.use('/api', router).use(catchAllRouter);