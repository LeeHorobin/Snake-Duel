// Chat! Self explanatory, game chat logic
exports.join = function(io, socket){
  // Alias for the players nickname for convenience
  var nick = socket.client.player.nick;

  // Let the player know they have successfully joined the chat so that client
  // side chat listeners can be set up.
	socket.emit('chat.joined');
  socket.emit('You have been assigned the following nickname: ' + nick + '. \
              If you would like to change this to something else, type \
              "!nick newnick"');

  io.sockets.emit('chat.text', 'Server: ' + nick + ' has \ joined the chat!');
  console.log(socket.client.player.nick + ' has joined the chat');

  // Recieve chat, send it to everyone else
	socket.on('chat.text', function(text){
		// TODO, check chat length etc
		io.sockets.emit('chat.text', {"nick": nick, "text": text});
		console.log(nick + ': ' + data);
	});

  socket.on('disconnect', function(){
		io.sockets.emit('chat.text', {"nick": nick, "text": "has disconnected."});
		console.log(socket.client.username + ' has disconnected.');
	});
}
