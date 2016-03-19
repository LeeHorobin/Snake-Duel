// game.js
// Game logic, moving players, handling collision, adding fruit etc

module.exports.game = {
	init: function(){
		// Load configuration information
		this.config = require('../config/game.json');
		this.config.ROWS = this.config.width/this.config.TILE_SIZE;
		this.config.COLS = this.config.height/this.config.TILE_SIZE;
		
		// Initialize the grid, 0 == snake, 1 == blocked, 2 == food
		this.grid = new Array(game.COLS);
		for(var i=0; i<game.COLS; i++){
			game.grid[i] = new Array(game.ROWS);
			for(var j=0; j< game.ROWS; j++){
				if (i==0 || i==(game.COLS-1) || j==0 || j==(game.ROWS-1)){
					if(i > 18 && i < 31){
						// Place some gaps in the wall for coming out the other side
						game.grid[i][j] = 0;
					}
					else if(j > 18 && j < 31){
						game.grid[i][j] = 0;
					}
					else{
						game.grid[i][j] = 1;
					}
				}
				else{
					game.grid[i][j] = 0;
				}
			}
		}
		// Add some fruit to the map
		this.addFruit();
		this.addFruit();
		this.addFruit();
		this.addFruit();
		
		// Set an interval to regularly update clients with the new map data.
		// Only send data if it has changed since the last update was sent (update==true).
		setInterval(function(){
			if(this.update){
				io.sockets.emit('update', {'grid': game.grid /*'nicks: activeNicks*/ });
				this.update = false;
			}
		},66);
		
	},
	addFruit: function(){
		// Get an empty position on the map and set the value to 2 (food) when one is found
		return newEmptyPosition(function(pos){
			this.grid[pos.x][pos.y] = 2;
			this.update = true;
		});
	},
	newEmptyPosition: function(callback){
		// Randomly choose tiles on the map until one which is not already occupied is found
		var empty = false;
		var position = {x: 0, y:0};
		
		// TODO, LOOK THIS UP: Defining and using a callback here will ensure that this while loop is non-blocking, right?
		// Not sure if I am completely wrong on that.  Not that it is too important, it will be very rare for it to run more than once, but still.
		while(!empty){
			position.x = Math.floor((Math.random() * (game.COLS-1)) + 1);
			position.y = Math.floor((Math.random() * (game.ROWS-1)) + 1);
			if(game.grid[position.x][position.y] === 0){
				empty = true;
			}
		}
		callback(position);
	},
	activeNicks: [],
	update: true
}