// Snake-Duel
// Simple multiplayer snake game with leaderboards, built for my personal website using Node JS and Socket.io
var util = require('util');
var path = require('path');
var port = require('./config/port.json').port;

// Create a HTTP server for Socket.io to bind to; no routing etc required as the website will be served using apache
var server = require('http').createServer();
server.listen(port);
util.log('HTTP server listening on port: ' + port);

// Initialize the websocket server
require(path.join(__dirname, 'lib/sockets')).init(server);