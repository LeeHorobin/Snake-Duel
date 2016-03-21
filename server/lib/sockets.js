// sockets.js
// Initialize the websocket server... and then everyting else
// var game = require('./game.js');
var Player = require('./player.js');

// Initialize Socket.io etc
module.exports.init = function(server){
	var io = require('socket.io').listen(server);

	// TODO eventully modify game.js to return an instance of game instead, which
	// will allow a lobby to be implemented and allow several different games
	// to run somultaeneously.

	var game = require('./game.js').init();

	io.on('connection', function(socket){

		var player = new Player(socket);

		socket.on('join', function(){
			player.join();
		})

		// TODO, assign a default nickname if the player didn't specify one, wait for a join game event from the player
		// then the player can move its self and set update to true, meaning data is sent out
	});
}
