var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public')); 
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());

var routes = require('./api/routes.js');

app.use('/api', routes);

var port = process.env.PORT || 8080;

var server = app.listen(port, function(req, res){
    console.log("Catch the action at port "+ port);
});