const express = require('express');
const path = require('path');
const port = process.env.PORT || 5000;
//create express app
const app = express();
//get static content
app.use(express.static(path.join(__dirname, './static')));
//set up the eje view and folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs')

//tell the express app to listen to the port
const server = app.listen(port, () => {
    console.log("listenning on port: ", port);
});

const route = require('./routes/route.js')(app, server)