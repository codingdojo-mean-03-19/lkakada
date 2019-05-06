const router = require('express').Router();
const { productController } = require('../controllers');

module.exports = router
    .get('/', productController.index)
    .post('/create', productController.create)
    .delete('/:product_id', productController.destory)
    .put('/:product_id', productController.update)
    .get('/edit/:product_id', productController.show)