const express = require('express');
const path = require('path');
const session = require('express-session')
const bodyParser = require('body-parser');
const flash = require('express-flash');
const port = process.env.PORT || 5000;

//Create an express app
const app = express();
app.use(session({ secret: 'victoriassecrect', resave: true, saveUninitialized: true }));
app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
//setting static folder directory
app.use(express.static(path.join(__dirname, './static')));
//setting our views folder directory
app.set('views', path.join(__dirname, './views'));
//setting our view engine set to ejs
app.set('view engine', 'ejs');

//Tell the express to listen to port
app.listen(port, () => {
    console.log('listening to port ', port);
});
const route = require('./routes/index.js')(app);