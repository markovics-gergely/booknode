const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static('static'));

// Load routing
require('./route/index')(app);

var server = app.listen(port, () => {
  console.log(`Hello! port: ${port}`)
});