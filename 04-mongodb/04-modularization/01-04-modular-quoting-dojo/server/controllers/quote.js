const Quote = require('./../models/quote.js');
module.exports = {
    get_quotes: function (_req, res) {
        Quote.find({})
            .then(quotes => {
                res.render('quote', { title: "All Quotes Dojo", quotes });
            })
            .catch(err => {
                console.log(err);
            });
    },
    post_quotes: function (req, res) {
        Quote.create(req.body)
            .then(() => {
                res.redirect('/quotes')
            })
            .catch(err => {
                console.log(err)
            })
    }
};