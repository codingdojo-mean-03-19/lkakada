const Author = require('mongoose').model('Author');
const { Http } = require('@status/codes');

module.exports = {
    index(_req, res) {
        Author.find({})
            .then(authors => res.json(authors))
            .catch(error => response.status(Http.InternalServerError).json(error));
    },
    create(req, res) {
        Author.create(req.body)
            .then(author => res.json(author))
            .catch(error => {
                const errors = Object.keys(error.errors).map(key => error.errors[key].message);
                response.status(Http.UnprocessableEntity).json(errors);
            })
    },
    update(req, res) {
        const { author_id: authorId } = req.params;
        Author.findByIdAndUpdate(authorId, req.body, { new: true })
            .then(author => res.json(author))
            .catch(error => {
                const errors = Object.keys(error.errors).map(key => error.errors[key].message);
                res.status(Http.UnprocessableEntity).json(errors);
            })

    },
    show(req, res) {
        const { author_id: authorId } = req.params;
        Author.findById(authorId)
            .then(author => res.json(author))
            .catch(error => res.status(Http.UnavailableForLegalReasons).json(error));
    },
    destory(req, res) {
        const { author_id: authorId } = req.params;
        Author.findByIdAndRemove(authorId)
            .then(author => res.json(author))
            .catch(error => res.status(Http.ResetContent).json(error));
    }
}