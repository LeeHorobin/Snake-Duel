// game.js
// Game logic, moving players, handling collision, adding fruit etc

module.exports = function(){
	this.init = function(io){
		// Load configuration information
		this.config = require('./config/game.json');
		this.config.ROWS = this.config.HEIGHT/this.config.TILE_SIZE;
		this.config.COLS = this.config.WIDTH/this.config.TILE_SIZE;

		// Initialize the grid
		this.grid = new Array(this.config.COLS);

		// TODO - Pass the init function a path to a JSON file to load the grid
		// from, making it possible to load different map variations

		// Initial values: 0 == snake, 1 == blocked, 2 == food
		for(var i=0; i<this.config.COLS; i++){
			this.grid[i] = new Array(this.config.ROWS);
			for(var j=0; j< this.config.ROWS; j++){
				// If tile is a wall
				if (i==0 || i==(this.config.COLS-1) ||
					j==0 || j==(this.config.ROWS-1))
				{
					if(i > 30 && i < 40){
						// Place some gaps in the wall
						this.grid[i][j] = 0;
					}
					else if(j > 18 && j < 31){
						// More gaps
						this.grid[i][j] = 0;
					}
					else{
						// Place a wall
						this.grid[i][j] = 1;
					}
				}
				else{
					// Empty tiles
					this.grid[i][j] = 0;
				}
			}
		}

		// Add some fruit
		this.addFruit();
		this.addFruit();
		this.addFruit();
		this.addFruit();
	};
	this.addFruit = function(){
		/*	TODO - Research
			Possible callback implementation to ensure the while loop in
			newEmptyPosition is non-blocking?
			Not sure if I am misunderstanding this or not.

			this.newEmptyPosition(function(pos){
				this.grid[pos.x][pos.y] = 2;
				this.update = true;
			});
		*/

		// Use newEmptyPosition to ensure food is only placed on empty tiles
		var pos = this.newEmptyPosition();
		this.grid[pos.x][pos.y] = 2;
		this.update = true;
	};
	this.newEmptyPosition = function(/*callback*/){
		// Randomly choose tiles on the map until an empty tile is found
		var empty = false;
		var position = {x: 0, y:0};

		while(!empty){
			position.x = Math.floor((Math.random() * (this.config.COLS-1)) + 1);
			position.y = Math.floor((Math.random() * (this.config.ROWS-1)) + 1);
			if(this.grid[position.x][position.y] === 0){
				return position;
				// empty = true;
			}
		}
		//callback(position);
	};
	this.move = function(player){
		// Store the players requested movement direction to ensure it does not
		// change before the target position has been determined.
		var direction = player.nextDirection;
		// Use the player's current 'head' position as a base to determine the
		// next position
		var target = {	x: player.segments[0].x,
						y: player.segments[0].y }

		// TODO - Convert to using object literals maybe for this maybe?
		// So I can do for example: target = determineTarget[direction]();
		// Or at the very least use a switch
		if(direction === 'right'){
			target.x++;
			// Passed through the right hand wall of the map
			if(target.x >= this.config.COLS){
				target.x = 0;
			}
		}
		else if(direction === 'left'){
			target.x--;
			// Passed through the left hand wall of the map
			if(target.x < 0){
				target.x = this.config.COLS-1;
			}
		}
		else if(direction === 'up'){
			target.y--;
			// Passed through the top wall of the map
			if(target.y < 0){
				target.y = this.config.ROWS-1;
			}
		}
		else if(direction === 'down'){
			target.y++;
			// Passed throught he bottom wall of the map
			if(target.y >= this.config.ROWS){
				target.y = 0;
			}
		}

		// TODO - Same as above, this is kinda ugly
		if(this.grid[target.x][target.y] == 0){
			// Target tile is empty
			// Remove the tail segment
			var i = player.segments.length-1;
			this.grid[player.segments[i].x][player.segments[i].y] = 0;
			player.segments.splice(i, 1);

			// Use the target position as the new head segment
			this.grid[target.x][target.y] = 1;
			player.segments.splice(0,0,target);
		}
		else if(this.grid[target.x][target.y] == 1){
			// Player has hit a wall, or another snake
			player.active = false;
			clearInterval(player.timer);

			// TODO - Push the score to the database and check to see if the
			// player has made it on to the high scores list

			// Let the player know their score (snake length)
			player.socket.emit('finalScore', player.segments.length);

			// Clean up the body
			for(var i=0; i<player.segments.length; i++){
				this.grid[player.segments[i].x][player.segments[i].y] = 0;
			}
			player.segments = [];
		}
		else if(this.grid[target.x][target.y] == 2){
			// Player has eaten some food
			// Use the target as the players new head position but do not modify
			// the tail at all
			player.segments.splice(0,0,target);
			this.grid[target.x][target.y] = 1;

			// Replace the fruit
			this.addFruit();

			player.previousDirection = direction;
			this.update = true;

			// Return true so that the players speed is increased
			return true;
		}

		// The previous direction is stored to enable disallowing players to
		// accidentally kill themselves by moving back on their previous segment
		player.previousDirection = direction;
		this.update = true;

		// Return false to indicate that the player did not grab any food
		return false;
	}
	this.activeNicks = [];
	this.update = true;

}
