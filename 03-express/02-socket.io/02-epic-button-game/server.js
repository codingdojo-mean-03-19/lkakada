const express = require('express');
const path = require('path');
const parser = require('body-parser');
const port = process.env.PORT || 5000;

//Create the express app
const app = express();

app.use(parser.urlencoded({extended: true}));

//static content 
app.use(express.static(path.join(__dirname, './static')));

//setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//tell the express app to listen on port 
const server = app.listen(port, () => {
	console.log("listening on port ", port);
});
const routes = require('./routes/index.js')(app, server);