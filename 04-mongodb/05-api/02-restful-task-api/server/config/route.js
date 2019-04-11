const task = require('../controllers/task.js');

module.exports = function (app) {
    app.get('/', (req, res) => {
        task.index(req, res);
    });
    app.post('/tasks', (req, res) => {
        task.create(req, res);
    });
    app.get('/:id', (req, res) => {
        task.show(req, res);
    });
    app.put('/update/:id', (req, res) => {
        task.update(req, res);
    });
    app.delete('/delete/:id', (req, res) => {
        task.destroy(req, res);
    });
}