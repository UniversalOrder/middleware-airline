var express = require('express');

var order = require('./order');
var app = express();

app.use('/', order);
app.listen(3000);

console.log('server running on port 3000');
