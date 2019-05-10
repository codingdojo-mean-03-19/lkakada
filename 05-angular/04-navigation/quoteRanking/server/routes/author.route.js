const router = require('express').Router();
const { authorController, quoteController } = require('../controllers');

module.exports = router
    .get('/', authorController.index)
    .post('/', authorController.create)
    .get('/:author_id', authorController.show)
    .put('/:author_id', authorController.update)
    .delete('/:author_id', authorController.destroy)

    .get('/quotes/:author_id', quoteController.index)
    .post('/quotes/:author_id', quoteController.create)
    .delete('/:author_id/quotes/:quote_id', quoteController.remove)
    .put('/:author_id/quotes/:quote_id', quoteController.quoteChange)