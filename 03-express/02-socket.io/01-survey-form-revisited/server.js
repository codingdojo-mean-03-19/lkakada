const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;

//create the express app
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
//static content
app.use(express.static(path.join(__dirname, "./static")));
//setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
//tell teh express app to listen on port 
const server = app.listen(port, function () {
    console.log("listening on port ", port);
})
//we're going to have /routes/index.js handle all of our routing
const route = require('./route/index.js')(app, server);