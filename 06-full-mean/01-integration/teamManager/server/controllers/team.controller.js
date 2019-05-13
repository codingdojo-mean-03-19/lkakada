const Team = require('mongoose').model('Team');
const { Http } = require('@status/codes');

module.exports = {
    index(_req, res) {
        Team.find({})
            .then(teams => res.json(teams))
            .catch(error => res.status(Http.InternalServerError).json(error));
    },
    create(req, res) {
        Team.create(req.body)
            .then(team => res.json(team))
            .catch(error => {
                const errors = Object.keys(error.errors).map(key => error.errors[key].message);
                res.status(Http.UnprocessableEntity).json(errors);
            })
    },
    destroy(req, res) {
        const { team_id } = req.params;
        Team.findByIdAndRemove(team_id)
            .then(removedTeam => res.json(removedTeam))
            .catch(error => res.status(Http.ResetContent).json(error))
    },
    update(req, res) {
        const { team_id } = req.params;
        Team.findByIdAndUpdate(team_id, req.body, { new: true })
            .then(player => res.json(player))
            .catch(error => {
                const errors = Object.keys(error.errors).map(key => error.errors[key].message);
                res.status(Http.UnprocessableEntity).json(errors);
            })
    }
}