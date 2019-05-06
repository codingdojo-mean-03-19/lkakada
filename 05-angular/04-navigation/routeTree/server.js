const express = require('express');
const parser = require('body-parser');
const path = require('path');

const { PORT: port = 8000 } = process.env;
const app = express();

app.use(express.static(path.join(__dirname, 'dist/routeTree')));
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.listen(port, () => console.log(`Express server listening on port ${port}`));