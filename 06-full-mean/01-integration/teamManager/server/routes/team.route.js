const router = require('express').Router();
const { teamController } = require('../controllers');

module.exports = router
    .get('/', teamController.index)
    .post('/', teamController.create)
    .delete('/:team_id', teamController.destroy)
    .put('/:team_id', teamController.update)