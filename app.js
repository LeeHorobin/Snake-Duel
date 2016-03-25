// Snake-Duel
// Simple multiplayer snake game with leaderboards, built for my personal
// website using Node JS and Socket.io
var util = require('util');
var path = require('path');
var port = require('./lib/config/port.json').port;
var fs = require('fs');
var express = require('express');

// Initialize Express
var app = express();
app.use(express.static(__dirname + '/public'));

// Create the HTTP server for socket.io to bind to
var server = require('http').createServer(app);
server.listen(port);
util.log('HTTP server listening on port: ' + port);

// Root route
app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Initialize the websocket server
require(path.join(__dirname, 'lib/sockets')).init(server);
