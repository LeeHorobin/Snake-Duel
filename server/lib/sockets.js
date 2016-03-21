// sockets.js
// Initialize the websocket server... and then everyting else
// var game = require('./game.js');
var Game = require('./game.js');
var Player = require('./player.js');

// Initialize Socket.io etc
module.exports.init = function(server){
	var io = require('socket.io').listen(server);

	// TODO eventully modify game.js to return an instance of game instead, which
	// will allow a lobby to be implemented and allow several different games
	// to run somultaeneously.
	var game = new Game();
	game.init(io);

	io.on('connection', function(socket){
		socket.emit('update',  {'grid': game.grid, 'nicks': game.activeNicks});

		// TODO I'm not really sure I like how this is set up currently.
		var player = new Player(socket);

		socket.on('join', function(){
			console.log(game.grid);
			player.join(game);
		})

		socket.on('disconnect', function(){
			// Remove from game.activeNicks here

			if(player.timer !== null){
				clearInterval(player.timer);
			};

			player.active = false;
			// Remove segments
			for(var i=0; i<player.segments.length; i++){
				game.grid[player.segments[i].x][player.segments[i].y] = 0;
			}
			game.update = true;
			player = null;
		});
		// TODO, assign a default nickname if the player didn't specify one,
		// wait for a join game event from the player then the player can move
		// its self and set update to true, meaning data is sent out
	});

	// Temporarily placing this here, needs moving

	// Set an interval to regularly update clients with the new map data.
	// Only send data if it has changed since the last update was sent.
	setInterval(function(){
		if(game.update){
			console.log('update');
			io.sockets.emit('update', {"grid": game.grid, "nicks": game.activeNicks });
			game.update = false;
		}
	},66);
}
