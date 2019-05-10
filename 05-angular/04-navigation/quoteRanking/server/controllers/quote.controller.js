const Author = require('mongoose').model('Author');
const { Http } = require('@status/codes');

module.exports = {
    index(req, res) {
        const { author_id: authorId } = req.params;
        Author.findById(authorId)
            .then(quotes => res.json(quotes))
            .catch(error => res.status(Http.UnavailableForLegalReasons).json(error));
    },
    create(req, res) {
        const { author_id: authorId } = req.params;
        Author.findByIdAndUpdate(authorId, { $push: { quotes: req.body } }, { runValidators: true })
            .then(author => {
                res.json(author);
            })
            .catch(error => {
                console.log(error.errors)
                const errors = Object.keys(error.errors).map(key => error.errors[key].message);
                res.status(Http.UnprocessableEntity).json(errors);
            })
    },
    remove(req, res) {
        const { quote_id, author_id } = req.params;
        console.log(quote_id, author_id)
        Author.findOneAndUpdate(author_id, { $pull: { quotes: { _id: quote_id } } }, { new: true })
            .then(data => {
                console.log('Removed quote', data);
                res.json(data);
            })
            .catch(error => res.status(Http.ResetContent).json(error));
    },
    quoteChange(req, res) {
        const { change } = req.body;
        const { quote_id } = req.params;
        Author.findOneAndUpdate({ 'quotes._id': quote_id }, { $inc: { 'quotes.$.votes': change } }, { new: true })
            .then(quote => {
                res.json(quote);
            })
            .catch(error => {
                console.log(error);
            })
    }
}   