// Chat! Self explanatory, game chat logic
exports.join = function(io, socket){
  // Alias for the players nickname for convenience
  var nick = socket.client.player.nick;

  // Let the player know they have successfully joined the chat so that client
  // side chat listeners can be set up.
	socket.emit('chat.joined');
  socket.emit('chat.text', 'You have been assigned the following nickname: '
              + nick + '. If you would like to change this to something else, \
              type "!nick newnick"');

  io.sockets.emit('chat.text', 'Server: ' + nick + ' has \ joined the chat!');
  console.log(socket.client.player.nick + ' has joined the chat');

  // Recieve chat, send it to everyone else
	socket.on('chat.text', function(text){
    if(text.slice(0,6) === '!nick '){
      socket.emit('chat.text', "I'll add this next, promise.");
    }
    else{
    	// TODO, check chat length etc
    	io.sockets.emit('chat.text', nick + ': ' + text);
    	console.log(nick + ': ' + text);
    }
	});

  socket.on('disconnect', function(){
		io.sockets.emit('chat.text', nick + ' has disconnected.');
		console.log(socket.client.username + ' has disconnected.');
	});
}
