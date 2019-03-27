const express = require('express');
const path = require('path');
const port = process.env.PORT || 5000;

//Create the express app
const app = express();

//static content
app.use(express.static(path.join(__dirname, './static')));

//set up ejs and our view folder
app.set("views", path.join(__dirname, './views'));
app.set("view engine", 'ejs');

//tell the express app to listen on port 
const server = app.listen(port, () => {
    console.log("listening to port ", port);
});
const routes = require('./routes/index.js')(app, server);