const otters = require('../controllers/otter.js');
module.exports = function (app) {
    app.get('/', (req, res) => {
        otters.index(req, res);
    });
    app.get('/otter/new', (req, res) => {
        otters.new(req, res);
    });
    app.post('/otter/new', (req, res) => {
        otters.create(req, res);
    });
    app.get('/otter/:id', (req, res) => {
        otters.show(req, res);
    });
    app.get('/otter/edit/:id', (req, res) => {
        otters.edit(req, res);
    });
    app.post('/otter/update/:id', (req, res) => {
        otters.update(req, res);
    });
    app.get('/otter/delete/:id', (req, res) => {
        otters.delete(req, res);
    });
};