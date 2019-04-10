const quotes = require('../controllers/quote.js');

module.exports = function (app) {
    app.get('/', (_req, res) => {
        res.render('index', { title: 'Quoting Dojo' });
    });
    app.get('/quotes', (req, res) => {
        quotes.get_quotes(req, res);
    });
    app.post('/quotes', (req, res) => {
        quotes.post_quotes(req, res);
    });
};