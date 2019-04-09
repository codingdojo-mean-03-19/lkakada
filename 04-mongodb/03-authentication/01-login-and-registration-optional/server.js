const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const port = process.env.PORT || 5000;

const app = express();
app.use(flash());
app.use(express.static(path.join(__dirname, './static')));
app.use(session({ secret: 'victoriassecrect', resave: true, saveUninitialized: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log("listening on port ", port);
});
const route = require('./routes/index.js')(app);