const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();

console.log("start")

app.use('/', express.static(__dirname));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); // support json encoded bodies

var moveItems = require('./service/items/move');
var searchItems = require('./service/items/search');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

// Initialize API routes
app.post('/api/item/move', moveItems.moveItems);
app.delete('/api/item/delete', moveItems.deleteItem);
app.get('/api/item/search', searchItems.searchItem);
app.post('/api/item/add', moveItems.addItem);

app.listen(process.env.PORT || 8080);

