const bodyParser = require("body-parser");
const db = require('./queries');

const express = require('express');
const app = express();
const port = 3001;


app.use(bodyParser.json());

app.get('/units', db.getUnits);
app.get('/units/type/:id', db.getUnitsByType);

app.get('/units/:unitName', db.getUnitByName);

app.listen(port, () => console.log(`UnitConverterAPI listening at http://localhost:${port}`));