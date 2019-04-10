const Otter = require('../models/otter.js');
module.exports = {
    index: function (_req, res) {
        Otter.find({})
            .then((otters) => {
                res.render('index', { title: "Otter Dashboard", otters });
            })
            .catch(err => {
                console.log(err);
            });
    },
    new: function (_req, res) {
        res.render('new', { title: "Add new Otter" });
    },
    create: function (req, res) {
        Otter.create(req.body)
            .then(() => {
                res.redirect('/')
            })
            .catch(err => {
                res.render('new', { title: "Add new Otter", errors: err.errors });
            });
    },
    show: function (req, res) {
        Otter.findOne({ _id: req.params.id })
            .then(otter => {
                res.render('show', { title: "Otter detail", otter });
            })
            .catch(err => {
                console.log(err);
            })
    },
    edit: function (req, res) {
        Otter.findOne({ _id: req.params.id })
            .then(otter => {
                res.render('edit', { title: "Otter Edit", otter });
            })
            .catch(err => {
                console.log(err);
            })
    },
    update: function (req, res) {
        Otter.updateOne({ _id: req.params.id }, req.body)
            .then(() => {
                res.redirect('/');
            })
            .catch(err => {
                console.log(err);
            })
    },
    delete: function (req, res) {
        Otter.deleteOne({ _id: req.params.id })
            .then(() => {
                res.redirect('/');
            })
            .catch(err => {
                console.log(err);
            })
    }
};