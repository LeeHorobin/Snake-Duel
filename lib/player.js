// player.js
// Player object constructor, instantiated for each player upon connecting
// Acts as an interface between the game and the socket layer

module.exports = function(socket){
	this.active = false;
	this.nick = '';
	this.segments = [];
	this.nextDirection = 'right';
	this.previousDirection = 'right';
	this.socket = socket;
	this.timer = null;
	this.speed =  0;
	this.ms = 100;
	this.initPosition = function(game){
		var valid = false;
		while(!valid){
			var pos1 = game.newEmptyPosition();
			var pos2 = {x: pos1.x-1, y: pos1.y}
			if(game.grid[pos2.x][pos2.y]==0){
				valid = true;
			}
		}
		console.log('adding segments');
		this.segments.push(pos1);
		this.segments.push(pos2);
	};
	this.enableListeners = function(game){
		// Movemenet listeners, ensure snake can not move back on it's self
		this.socket.on('right', function(){
			 if(this.previousDirection !=='left') this.nextDirection = 'right';
		});
		this.socket.on('left', function(){
			if(this.previousDirection !=='right') this.nextDirection = 'left';
		});
		this.socket.on('up', function(){
			if(this.previousDirection !=='down') this.nextDirection = 'up';
		});
		this.socket.on('down', function(){
			if(this.previousDirection !=='up') this.nextDirection = 'down';
		});

	};
	this.disableListeners = function(){
		// Remove socket listeners
	};
	this.join = function(game){
		if(!this.active){
			this.initPosition(game);
			console.log(this.segments[0]);
			game.grid[this.segments[0].x][this.segments[0].y] = 1;
			game.grid[this.segments[1].x][this.segments[1].y] = 1;
			// game.activeNicks.push(this.nick);
			game.update = true;
			this.active = true;
			this.enableListeners(game);

			// Create a reference for the timer to use as it uses a different
			// context for 'this'
			var snake = this;
			this.timer = setInterval(function(){
				if(game.move(snake)){
					// Food has been eaten, increase speed
				}
			}, this.ms);
		}
	};
}