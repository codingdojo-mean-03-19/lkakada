const router = require('express').Router();
const { restaurantController, reviewController } = require('../controllers');


module.exports = router
    .get('/', restaurantController.index)
    .post('/', restaurantController.create)
    .get('/:restaurant_id', restaurantController.show)
    .delete('/:restaurant_id', restaurantController.destroy)
    .put('/:restaurant_id', restaurantController.update)

    .get('/review/:restaurant_id', reviewController.index)
    .post('/review/:restaurant_id', reviewController.create)
    .delete('/review/:review_id', reviewController.destroy)
    .put('/review/:review_id', reviewController.update)