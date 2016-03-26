// sockets.js
// Initialize the websocket server... and then everyting else
// var game = require('./game.js');
var Game = require('./game.js');
var Player = require('./player.js');
var chat = require('./chat.js');

// For assigning random nicks of snake+n
// TODO - move the nick assignment somewhere else
var n = 1;

// Initialize Socket.io etc
module.exports.init = function(server){
	var io = require('socket.io').listen(server);

	// TODO eventully modify game.js to return an instance of game instead, which
	// will allow a lobby to be implemented and allow several different games
	// to run somultaeneously.
	var game = new Game();

  // TODO, change this to something like game.addRoom() and pass a socket.io
  // room to it for sending data instead of passing the full io object to
  // init.
	game.init(io);

	io.on('connection', function(socket){
		socket.emit('update',  {'grid': game.grid, 'nicks': game.activeNicks});

		socket.client.player = new Player(socket);

    // Set default nick (can be changed via a chat command) and then join chat
    socket.client.player.nick = 'Snake' + n;
    n++;
    console.log(socket.client.player.nick);
    chat.join(io, socket);

		socket.on('join', function(){
			socket.client.player.join(game);
		})

		socket.on('disconnect', function(){
			// Remove from game.activeNicks here

			if(socket.client.player.timer !== null){
				clearInterval(socket.client.player.timer);
			};

			socket.client.player.active = false;
			// Remove segments
			for(var i=0; i<socket.client.player.segments.length; i++){
				game.grid[socket.client.player.segments[i].x][socket.client.player.segments[i].y] = 0;
			}
			game.update = true;
			socket.client.player = null;
		});
	});

	// Temporarily placing this here, needs moving

	// Set an interval to regularly update clients with the new map data.
	// Only send data if it has changed since the last update was sent.
	setInterval(function(){
		if(game.update){
			io.sockets.emit('update', {"grid": game.grid, "nicks": game.activeNicks });
			game.update = false;
		}
	},66);
}
