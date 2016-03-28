// snake.connect.js
// Initiates socket.io

var score = getElementByID('display_score');
// var speed = getElementByID('display_speed');

snake.connect = function(/*nick*/){

	snake.session.socket = io.connect('http://snake.leehorobin.com');

	snake.session.socket.on('connection', function(){
		snake.session.connected = true;
	});

	snake.session.socket.on('update', function(data){
		snake.game.draw(data.grid, data.nicks);
	});

  snake.session.socket.on('score', function(data){
    score.innerHTML = data;
    // speed.innerHTML = data.speed;
  });
}
