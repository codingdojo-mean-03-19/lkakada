const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

const app = express();


//Integrate body-parser with app
app.use(bodyParser.urlencoded({ extended: true }));
//setting static folder directory
app.use(express.static(path.join(__dirname, './static')));
//setting our views folder directory
app.set('views', path.join(__dirname, './views'));
//setting our view engine set to ejs
app.set('view engine', 'ejs');
//Tell the express app to listen to port
app.listen(port, () => {
    console.log('listening on port ', port);
});
const route = require('./route/index.js')(app);