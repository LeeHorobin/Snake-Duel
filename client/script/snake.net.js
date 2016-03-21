// snake.connect.js
// Contains socket/networking logic as well as poviding a means to initiate socket.io

snake.connect = function(/*nick*/){
	snake.session.socket = io.connect('http://leehorobin.com:8080');

	snake.session.socket.on('connection', function(){
		snake.session.connected = true;
	});

	snake.session.socket.on('update', function(data){

		snake.game.draw(data.grid, data.nicks);
	});
}
