const express = require('express');
const session = require('express-session');
const path = require('path');
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const sessionConfig = {
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: true,

}
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve('views'));

app.use(express.static(path.resolve('static')));
app.use(session(sessionConfig));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    if (!req.session.number) {
        req.session.number = Math.floor(Math.random() * 100 + 1);
    }
    if (!req.session.status) {
        req.session.status = "";
        req.session.wrong = "hidden";
        req.session.correct = "hidden";
    }
    console.log("I am thinking of number ", req.session.number);
    res.render('index', { mgs: req.session.status, correct: req.session.correct, wrong: req.session.wrong });
});

app.post('/guess', (req, res) => {
    const [mgs, wrong, correct] = checkNum(req.session.number, req.body.number);
    req.session.status = mgs;
    req.session.wrong = wrong;
    req.session.correct = correct;
    res.redirect('/')
});

app.post('/reset', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

const checkNum = (random, num) => {
    if (num > 100 || num < 0) {
        return ["Out of range", "", "hidden"];
    }
    else if (random > num) {
        return ["Too Low!", "", "hidden"];
    }
    else if (random < num) {
        return ["Too High!", "", "hidden"];
    }
    else if (random == num) {
        return [`${num} is the number`, "hidden", ""];
    }
};

app.listen(port, () => {
    console.log(`Listenning on port: ${port}`);
});