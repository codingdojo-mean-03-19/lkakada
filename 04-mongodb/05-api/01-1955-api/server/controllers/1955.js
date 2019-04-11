const People = require('../models/person.js');
module.exports = {
    index: function (req, res) {
        People.find({})
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                console.log(err);
            })
    },
    create: function (req, res) {
        People.create({ name: req.params.name })
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                console.log(err);
            })
    },
    remove: function (req, res) {
        People.deleteOne({ name: req.params.name })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                console.log(err);
            })
    },
    fine: function (req, res) {
        People.findOne({ name: req.params.name })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                console.log(err);
            })
    }
}