const catchAllRouter = require('./all.router');

const router = require('express').Router();
const api = require('express').Router();
const productRouter = require('./product.route');

router.use('/product', productRouter);

module.exports = api.use('/', router).use(catchAllRouter);
// const router = require('express').Router();
// const productRouter = require('./product.route');

// module.exports = router.use('/product', productRouter);