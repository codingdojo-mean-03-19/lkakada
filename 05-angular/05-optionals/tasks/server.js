const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const app = express();

app.use(express.static(__dirname + '/public/dist/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./server/config/mongoose.js');
require('./server/config/route.js')(app);

app.listen(port, () => {
    console.log("listening on port: ", port);
});