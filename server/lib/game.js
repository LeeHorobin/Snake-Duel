// game.js
// Game logic, moving players, handling collision, adding fruit etc

module.exports = function(){
	this.init = function(io){
		// Load configuration information
		this.config = require('../config/game.json');
		this.config.ROWS = this.config.width/this.config.TILE_SIZE;
		this.config.COLS = this.config.height/this.config.TILE_SIZE;

		// Initialize the grid, 0 == snake, 1 == blocked, 2 == food
		this.grid = new Array(this.config.COLS);
		for(var i=0; i<this.config.COLS; i++){
			this.grid[i] = new Array(this.config.ROWS);
			for(var j=0; j< this.config.ROWS; j++){
				// If tile is a wall
				if (i==0 || i==(this.config.COLS-1) || j==0 || j==(this.config.ROWS-1)){
					if(i > 18 && i < 31){
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
					this.grid[i][j] = 0;
				}
			}
		}
		// Add some fruit to the map
		this.addFruit();
		this.addFruit();
		this.addFruit();
		this.addFruit();

	};
	this.addFruit = function(){
		// Get an empty position on the map and set the value to 2
		// 2 == food
		/*return this.newEmptyPosition(function(pos){
			this.grid[pos.x][pos.y] = 2;
			this.update = true;
		});*/
		var pos = this.newEmptyPosition();
		this.grid[pos.x][pos.y] = 2;
		this.update = true;
	};
	this.newEmptyPosition = function(/*callback*/){
		// Randomly choose tiles on the map until an empty tile is found
		var empty = false;
		var position = {x: 0, y:0};

		// TODO, LOOK THIS UP: Defining and using a callback here will ensure
		// that this while loop is non-blocking, right? Not sure if I am completely
		// wrong on that.  Not that it is too important, it will be very rare for
		// it to run more than once, but still.
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
		// Move a player. Check status of target position, return true if the
		// player eats any food so that the speed can be increased.
		// Temporary test before implementing properly
		/*var i = this.segments.length-1;
		game.grid[this.segments[i].x][this.segments[i].y] = 0;
		this.segments.splice(i, 1);
		game.grid[(this.segments[i].x) + 1][this.segments[i].y] = 1;
		this.segments.splice(0,0,{newposition});

		// io.sockets.emit
		*/
		this.update = true;
	}
	this.activeNicks = [];
	this.update = true;
}
