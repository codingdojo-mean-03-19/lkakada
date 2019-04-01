module.exports = function Route(app) {
    const mongoose = require('mongoose');
    //Connect mongoose to mongoDB
    mongoose.connect('mongodb://localhost/otter_dashboard', { useNewUrlParser: true });
    const otterSchema = new mongoose.Schema({
        name: { type: String, required: "Please enter otter name", minlength: 3 },
        age: { type: Number },
        description: { type: String, required: "Please enter otter description", minlength: 3 }
    }, { timestamps: true });
    mongoose.model('Otter', otterSchema); //We are setting this schema in our models as 'Otter'
    const Otter = mongoose.model('Otter'); //We are retrieving this schema from our model, named 'Otter'
    //Root route
    app.get('/', (req, res) => {
        Otter.find({}, (err, otters) => {
            if (err) { console.log(err) }
            res.render('index', { title: "Otter Dashboard", otters });
        })
    });

    //Route to new 
    app.get('/otter/new', (req, res) => {
        res.render('new', { title: "Add new Otter" });
    });

    //Route to post new otter
    app.post('/otter/new', (req, res) => {
        Otter.create(req.body, (err) => {
            if (err) {
                res.render('new', { title: "Add new Otter", errors: err.errors });
            } else {
                res.redirect('/')
            }
        });
    });

    //Route to show otter
    app.get('/otter/:id', (req, res) => {
        Otter.findOne({ _id: req.params.id }, (err, otter) => {
            if (err) { console.log(err) };
            res.render('show', { title: "Otter detail", otter });
        });
    });

    //Route to edit otter
    app.get('/otter/edit/:id', (req, res) => {
        Otter.findOne({ _id: req.params.id }, (err, otter) => {
            if (err) { console.log(err) };
            res.render('edit', { title: "Otter Edit", otter })
        });
    });

    //Route to update otter
    app.post('/otter/update/:id', (req, res) => {
        Otter.updateOne({ _id: req.params.id }, req.body, (err, result) => {
            if (err) { console.log(err) };
            res.redirect('/');
        });
    });

    //Route to delete otter
    app.get('/otter/delete/:id', (req, res) => {
        Otter.remove({ _id: req.params.id }, (err) => {
            res.redirect('/')
        });
    });

};