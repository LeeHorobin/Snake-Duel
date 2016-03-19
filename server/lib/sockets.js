// sockets.js
// Initialize the websocket server... and then everyting else
var game = require('./game.js');

// Initialize Socket.io etc
module.exports.init = function(server){
	var io = require('socket.io').listen(server);
	
	// game.init();
	
	io.on('connection', function(socket){
		console.log('Client connected');
		socket.emit('connected');
		console.log('Fully working');
		
		// var session = new Player();
		
		// TODO, assign a default nickname if the player didn't specify one, wait for a join game event from the player
		// then the player can move its self and set update to true, meaning data is sent out
	});
}