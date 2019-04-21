const express = require('express');
const path = require('path');
const { PORT: port = 5000 } = process.env;
const app = express();

app.use(express.static(path.join(__dirname, 'dist/api')));
app.listen(port, () => console.log(`listening on port ${port}`));
