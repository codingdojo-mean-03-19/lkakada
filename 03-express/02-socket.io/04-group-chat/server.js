const express = require('express');
const path = require('path');
const port = process.env.PORT || 5000;

//Create the express app
const app = express();
//static content
app.use(express.static(path.join(__dirname, './static')));
//Set up the ejs view and folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//Tell the express app to listen to port
const server = app.listen(port, () => {
    console.log('listening on port ', port);;
})

const route = require('./routes/index.js')(app, server);

