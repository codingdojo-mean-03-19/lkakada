module.exports = function Route(app) {
    const mongoose = require('mongoose');
    const bcrypt = require('bcrypt');
    //Connect mongoose to mongoDB
    mongoose.connect('mongodb://localhost/dojo_secrets', { useNewUrlParser: true });
    //registration db
    const UserSchema = new mongoose.Schema({
        email: {
            type: String,
            validate: {
                isAsync: true,
                validator: (e, validate) => {
                    User.find({ email: e }, (err, email) => {
                        validate(email.length === 0 && /^\w+@\w+[.]{1}[\w.]+$/.test(e), email.length !== 0 ? "Email already exists." : `${e} is not a valid email!`);
                    });
                }
            },
            required: [true, 'Email Field is required.']
        },
        first_name: {
            type: String,
            required: [true, "First Name Field is required."],
            minlength: [true, "First name must be at least 2 characters"]
        },
        last_name: {
            type: String,
            required: [true, "Last Name Field is required."],
            minlength: [true, "Last name must be at least 2 characters"]
        },
        birthday: {
            type: Date,
            validate: {
                validator: d => {
                    let current = new Date();
                    return d < new Date(current.getFullYear() - 19, current.getMonth(), current.getDate())
                }, message: `You must be 18 years or older to register.`
            },
            required: [true, 'Birthday Field is required.']
        },
        password: {
            type: String,
            required: [true, "Password Field is required"]
        },
        cpassword: {
            type: String,
            validate: { validator: () => { return this.password === this.cpassword }, message: "Password does not match." },
            required: [true, "Comfirm Password Field is required."]
        }
    }, { timestamps: true });
    //comment db
    const CommentSchema = new mongoose.Schema({
        user_id: { type: String, required: true },
        text: { type: String, required: [true, 'No comment entered.'], minlength: [2, 'Comment must not be less than 2 characters.'] }
    }, { timestamps: true });

    //scret db
    const SecretSchema = new mongoose.Schema({
        user_id: { type: String, required: true },
        text: { type: String, required: [true, 'No secret entered'], minlength: [2, 'Secret must not be less than 2 characters.'] },
        comments: { type: [CommentSchema], required: false }
    });

    mongoose.model('User', UserSchema);
    mongoose.model('Secret', SecretSchema);
    mongoose.model('Comment', CommentSchema);
    const User = mongoose.model('User');
    const Secret = mongoose.model('Secret');
    const Comment = mongoose.model('Comment');

    app.get('/', (req, res) => {
        if (!req.session.user) {
            res.render('index');
        } else {
            res.redirect('/secret');
        }
    });

    app.post('/registration', (req, res) => {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        var chash = bcrypt.hashSync(req.body.cpassword, salt);
        let user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            birthday: req.body.birthday,
            password: hash,
            cpassword: chash
        });
        user.save((err) => {
            if (err) {
                for (let error in err.errors) {
                    req.flash('errors', err.errors[error].message);
                }
                res.redirect('/')
            }
            else {
                req.flash('success', "User has been created successfully.");
                req.session.userId = user._id;
                session = req.session.userId;
                res.redirect('/secret');
            }
        });
    });

    app.post('/login', (req, res) => {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                for (let error in err.errors) {
                    req.flash('errors', err.errors[error].message);
                }
                res.redirect('/')
            }
            if (user) {
                bcrypt.compare(req.body.password, user.password)
                    .then(result => {
                        if (result) {
                            req.session.userId = user._id;
                            user_id = req.session.userId;
                            req.flash('success', 'You have been logged in successfully.');
                            res.redirect('/secret');
                        }
                        else {
                            req.flash('errors', 'Invalid password entered.');
                            return res.redirect('/');
                        }
                    })
                    .catch(error => {
                        req.flash('errors', 'Invalid password entered.');
                        res.redirect('/');
                    })
            } else {
                req.flash('errors', `User not found for email: '${req.body.email}'`);
                res.redirect('/');
            }
        });
    });
    app.get('/secret', (req, res) => {
        if (req.session.userId) {
            Secret.find({}, (err, secrets) => {
                if (err) { console.log(err) }
                res.render('secret', { secrets });
            });
        };
    });

    app.post('/new/secret', (req, res) => {
        let secret = new Secret({
            user_id: req.session.userId,
            text: req.body.secret
        });
        secret.save((err) => {
            if (err) {
                for (let error in err.errors) {
                    req.flash('errors', err.errors[error].message);
                }
                res.redirect('/secret');
            }
            else {
                req.flash('success', "Secret has been created successfully.");
                res.redirect('/secret');
            }
        })
    })
    app.get('/secret/delete/:id', (req, res) => {
        Secret.remove({ _id: req.params.id }, err => {
            if (err) {
                for (let error in err.errors) {
                    req.flash('errors', err.errors[error].message);
                }
                res.redirect('/secret');
            }
            else {
                req.flash('success', "Secret has been deleted successfully.");
                res.redirect('/secret');
            }
        })
    });
    app.get('/secret/detail/:id', (req, res) => {
        Secret.findOne({ _id: req.params.id }, (err, secret) => {
            if (err) {
                for (let error in err.errors) {
                    req.flash('errors', err.errors[error].message);
                }
                res.redirect('/secret');
            }
            else {
                res.render('detail', { secret });
            }
        })
    });
    app.post('/new/comment/:id', (req, res) => {
        let comment = new Comment({ user_id: req.session.userId, text: req.body.comment });
        Secret.update({ _id: req.params.id }, { $push: { comments: comment } }, { runValidators: true }, err => {
            if (err) {
                for (let error in err.errors) {
                    req.flash('errors', err.errors[error].message);
                }
                res.redirect(`/secret/detail/${req.params.id}`);
            } else {
                res.redirect(`/secret/detail/${req.params.id}`);
            }
        })
    });
    app.get('/logout', (req, res) => {
        req.session.destroy();
        res.redirect('/');
    });
};