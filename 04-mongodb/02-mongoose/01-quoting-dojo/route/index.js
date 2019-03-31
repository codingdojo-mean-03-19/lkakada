module.exports = function Route(app) {
    const mongoose = require('mongoose');
    //Connect mongoose to mongoDB
    mongoose.connect('mongodb://localhost/quote_mongoose');
    const QuoteSchema = new mongoose.Schema({
        name: { type: String },
        message: { type: String }
    }, { timestamps: true });
    mongoose.model('Quote', QuoteSchema); //We are setting this schema in our models as 'Quote'
    const Quote = mongoose.model('Quote'); //We are retrieving this schema from our model, named 'Quote'

    app.get('/', (req, res) => {
        res.render('index', { title: 'Quoting Dojo' });
    });
    app.post('/quotes', (req, res) => {
        Quote.create(req.body, function (err) {
            if (err) { console.log(err); }
            res.redirect('/quotes');
        });
    });
    app.get('/quotes', (req, res) => {
        Quote.find({}, (err, quotes) => {
            if (err) {
                console.log(err);
            } else {
                res.render('quote', { title: "All Quotes Dojo", quotes });
            }
        }).sort({ createdAt: 'desc' });
    });
};