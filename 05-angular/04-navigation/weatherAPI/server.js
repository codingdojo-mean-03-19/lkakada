const express = require('express');
const parser = require('body-parser');
const path = require('path');

const { PORT: port = 4200 } = process.env;
const app = express();

app.use(express.static(path.join(__dirname, 'dist/weatherAPI')));

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

// require('./server/config/mongoose.js');
// require('./server/config/route.js')(app);


app.listen(port, () => console.log(`Express server listening on port ${port}`));