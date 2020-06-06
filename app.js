const express = require('express');
const path = require('path');
const router = require('./router');

const app = express();

app.engine('html', require('express-art-template'));

app.use('/node_modules/', express.static(path.join(__dirname, './node_modules')));
app.use(express.static(__dirname + "/public"));

app.use(router);

app.listen(3000, () => console.log(`Your app listening on port port!`))