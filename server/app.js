// Wrapped in module.exports for access by launch.js
module.exports = function(){

// Snake-Duel
// Simple multiplayer snake game with leaderboards, built for my personal
// website using Node JS and Socket.io
var util = require('util');
var path = require('path');
var port = require('./config/port.json').port;
var fs = require('fs');

// Create a HTTP server for Socket.io to bind to; no routing etc required as the
// website will be served using apache
var server = require('http').createServer(handler);
server.listen(port);
util.log('HTTP server listening on port: ' + port);

// Initialize the websocket server
require(path.join(__dirname, 'lib/sockets')).init(server);


function handler (req, res) {
  fs.readFile(path.join(__dirname, 'public/index.html'),
  function (err, data) {
    if (err) {
      res.writeHead(500);
      console.log(err);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}


}
