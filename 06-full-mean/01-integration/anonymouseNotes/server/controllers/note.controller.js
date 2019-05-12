const Note = require('mongoose').model('Note');
const { Http } = require('@status/codes');

module.exports = {
    index(_req, res) {
        Note.find({})
            .then(notes => res.json(notes))
            .catch(error => res.status(Http.InternalServerError).json(error));
    },

    create(req, res) {
        Note.create(req.body)
            .then(note => res.json(note))
            .catch(error => {
                const errors = Object.keys(error.errors).map(key => error.errors[key].message);
                res.status(Http.UnprocessableEntity).json(errors);
            })
    }
}