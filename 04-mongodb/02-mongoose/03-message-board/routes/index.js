module.exports = function Route(app) {
    const mongoose = require('mongoose');
    //Connect mongoose to mongoDB
    mongoose.connect('mongodb://localhost/message_board', { useNewUrlParser: true });
    const CommentSchema = new mongoose.Schema({
        name: { type: String, required: [true, 'Name Required Field'], minlength: [2, 'Name must be at least 2 characters'] },
        comment: { type: String, required: [true, 'Comment Required Field'], minlength: [10, "Comment must be at least 10 characters"] }
    }, { timestamps: true });
    const MessageSchema = new mongoose.Schema({
        name: { type: String, required: [true, 'Name Required Field'], minlength: [2, "Name must be at least 2 characters"] },
        message: { type: String, required: [true, "Message Required Field"], minlength: [10, "Message must be at least 10 characters."] },
        comments: { type: [CommentSchema], required: false }
    }, { timestamps: true })

    mongoose.model('Message', MessageSchema); //We are setting this Schema in our Models as 'Message'
    mongoose.model('Comment', CommentSchema); //We are setting this Schema in our Models as 'Comment'
    const Comment = mongoose.model('Comment');
    const Message = mongoose.model('Message');

    //Route to root
    app.get('/', (_req, res) => {
        Message.find({})
            .then(results => {
                res.render('index', { results: results });
            })
            .catch(err => {
                console.log(err);
            });
    });
    //Route to post message
    app.post('/message', (req, res) => {
        Message.create(req.body)
            .then(() => {
                req.flash('success', "Message has been created successfully.")
                res.redirect('/');
            })
            .catch(err => {
                for (let error in err.errors) {
                    req.flash('errors', err.errors[error].message);
                }
                res.redirect('/');
            });
    });
    //Route to comment 
    app.post('/comment/:message_id', (req, res) => {
        Comment.create(req.body)
            .then(comment => {
                Message.updateOne({ _id: req.params.message_id }, { $push: { comments: comment } })
                    .then(() => {
                        req.flash('success', "Comment has been created successfully.");
                        res.redirect('/');
                    })
            })
            .catch(err => {
                for (let error in err.errors) {
                    req.flash('errors', err.errors[error].message);
                }
                res.redirect('/');
            });
    });
}