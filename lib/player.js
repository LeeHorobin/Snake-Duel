// player.js
// Player object constructor, instantiated for each player upon connecting
// Acts as an interface between the game and the socket layer

module.exports = function(socket){
	this.active = false;
	this.nick = '';
	this.segments = [];
	this.nextDirection = 'right';
	this.previousDirection = 'right';
  // socket now refers to the parent object, not sure if this is the best way to do it
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
		this.segments.push(pos1);
		this.segments.push(pos2);
	};
	this.enableListeners = function(game){
    // Reference to player to prevent socket modifying self with this instead
    // of the player
    var snake = this;

		// Movemenet listeners, set the requested direction for the game to process
    // upon the next loop.
    // Ensure the player can not turn directly back on themselves
    // TODO - optional game mode, snakes can reverse direction.
		this.socket.on('right', function(){
			 if(snake.previousDirection !== 'left'){
         snake.nextDirection = 'right';
         game.update = true;
       }
		});
		this.socket.on('left', function(){
			if(snake.previousDirection !== 'right'){
        snake.nextDirection = 'left';
        game.update = true;
      }
		});
		this.socket.on('up', function(){
			if(snake.previousDirection !== 'down'){
        snake.nextDirection = 'up';
        game.update = true;
      }
		});
		this.socket.on('down', function(){
			if(snake.previousDirection !== 'up'){
        snake.nextDirection = 'down';
        game.update = true;
      }
		});
	};
	this.disableListeners = function(){
		// Remove socket listeners
	};
	this.join = function(game){
    // TODO, change this to game.add(player) or smething instead.
    // Join the active game, making sure the player is not already in the game.
		if(!this.active){
			this.initPosition(game);
			game.grid[this.segments[0].x][this.segments[0].y] = 1;
			game.grid[this.segments[1].x][this.segments[1].y] = 1;
			// game.activeNicks.push(this.nick);
			game.update = true;
			this.active = true;
			this.enableListeners(game);
      this.socket.emit('score', this.segments.length);

			// Create a reference for the timer to use as it uses a different
			// context for 'this'
      var moveTimer = this.timer;
      var ms = this.ms;
			var snake = this;
			moveTimer = setInterval(function(){
				if(game.move(snake)){
          socket.emit('score', snake.segments.length);
					// game.move will return true if some food is eaten by the player,
          // allowing the players speed to be increased.
				}
			}, this.ms);
		}
	};
}
