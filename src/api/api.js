const bodyParser = require("body-parser");
const db = require('./queries');

const express = require('express');
const app = express();
const port = 3001;


app.use(bodyParser.json());

app.get('/units', db.getUnits);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));