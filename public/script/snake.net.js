// snake.connect.js
// Initiates socket.io

snake.connect = function(){
	snake.session.socket = io.connect('http://snake.leehorobin.com');

  snake.session.socket.on('connect', function(){
    var connectionStatus = document.getElementById('display_connection')
    connectionStatus.className = 'connected';
    connectionStatus.innerHTML = 'Connected';
    snake.session.connected = true;

    // Call snake.game.keyDown() upon detecting a key press
  	document.addEventListener('keydown', snake.game.keyDown, false);
    snake.initiateListeners(snake.session.socket);
  });

  snake.session.socket.on('connect_error', function() {
      console.log('Connection failed');
  });
}

snake.initiateListeners = function(socket){
  var display = {}
  display.score = document.getElementById('display_score');
  display.speed = document.getElementById('display_speed');

  socket.on('update', function(data){
		snake.game.draw(data.grid, data.nicks);
	});

  socket.on('chat.text', function(data){
		// Append content to chat box
	});

  socket.on('info', function(data){
    display.score.innerHTML = data.score;
    // speed.innerHTML = data.speed;
    console.dir(data);
  });
}
