module.exports = function Route(app) {
    const mongoose = require('mongoose');
    const bcrypt = require('bcrypt');
    //Connect mongoose to mongoDB
    mongoose.connect('mongodb://localhost/login_register', { useNewUrlParser: true });
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

    mongoose.model('User', UserSchema);
    const User = mongoose.model('User');

    app.get('/', (req, res) => {
        if (!req.session.user) {
            res.render('index');
        } else {
            res.redirect('/profile')
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
                req.session.user = user;
                session = req.session.user
                res.redirect('/profile');
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
                            req.session.user = user;
                            session = req.session.user;
                            req.flash('success', 'You have been logged in successfully.');
                            res.redirect('/profile');
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
    app.get('/profile', (_req, res) => {
        res.render('profile')
    });

    app.get('/logout', (req, res) => {
        req.session.destroy();
        res.redirect('/');
    });
};