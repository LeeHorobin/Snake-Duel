// game.js
// Initialize the websocket server... and then everyting else

// Initialize Socket.io etc
module.exports.init = function(server){
	var io = require('socket.io').listen(server);
	
	io.on('connection', function(socket){
		console.log('Client connected');
		socket.emit('connected');
		console.log('Fully working');
	});
}