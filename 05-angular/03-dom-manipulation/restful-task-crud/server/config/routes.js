const task = require('../controllers/task-api.controller.js');

module.exports = function (app) {
    app.get('/tasks', (req, res) => {
        task.index(req, res);
    });
    app.post('/tasks', (req, res) => {
        task.create(req, res);
    });
    app.get('/tasks/show/:id', (req, res) => {
        task.show(req, res);
    });
    app.put('/tasks/update/:id', (req, res) => {
        task.update(req, res);
    });
    app.delete('/tasks/delete/:id', (req, res) => {
        task.destroy(req, res);
    });
}