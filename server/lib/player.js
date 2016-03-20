// player.js
// Player object constructor, instantiated for each player upon connecting, enables keeping track of
// acts as an interface between the game and the socket layer and allows players to move independently
// and at different speeds to one another, speeding up in correlation with fruit eaten.

module.exports = function(socket){
	this.active = false,
	this.nick = '',
	this.segments: [],
	this.nextDirection: 'right',
	this.previousDirection: 'right',
	this.socket: socket,
	this.timer: null,
	this.speed: 0,
	this.ms: 100,
	this.initPosition: function(){
		this.segments = [];
		var valid = false;
		while(!valid){
			var pos1 = newEmptyPosition();
			var pos2 = {x: pos1.x-1, y: pos1.y}
			if(game.grid[pos2.x][pos2.y]==0){
				valid = true;
			}
		}
		this.segments.push(pos1);
		this.segments.push(pos2);
	},
	this.enableListeners: function(){
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
		
		this.socket.on('disconnect', function(){
			// Remove from game.activeNicks here
			
			// Remove segments
			if(this.active){
				clearInterval(this.timer);
				for(var i=0; i < this.segments.length; i++){
					game.grid[this.segments[i].x][this.segments[i].y] = 0;
				}
			}
		});
	},
	this.disableListeners: function(){
		// Remove socket listeners
	},
	this.move: function(){
		// This will return true upon eating food so that speed can be increased
		if(game.move(this)){
			// Decrease ms here
		}
		/*
		// Temporary test before implementing properly
		var i = this.segments.length-1;
		game.grid[this.segments[i].x][this.segments[i].y] = 0;
		this.segments.splice(i, 1);
		game.grid[(this.segments[i].x) + 1][this.segments[i].y] = 1;
		this.segments.splice(0,0,{newposition});
		*/
	}
	this.join: function(){
		if(!this.active){
			this.initPosition();
		}
		game.grid[this.segments[0].x][this.segments[0].y] = 1;
		// game.activeNicks.push(this.nick);
		this.active = true;
		this.enableListeners();
		
		
		this.timer = setInterval(this.move, this.ms);
		
	},
}