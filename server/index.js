const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();

var moveItems = require('./service/items/move');
var searchItems = require('./service/items/search');

app.use(express.static(path.join(__dirname, '../../build')));


app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, wp_token");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

// Initialize API routes
app.post('/api/item/move', moveItems.moveItems)
app.get('/api/item/search', searchItems.searchItem)

app.listen(process.env.PORT || 8080);

