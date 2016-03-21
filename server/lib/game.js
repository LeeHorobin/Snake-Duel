// game.js
// Game logic, moving players, handling collision, adding fruit etc

module.exports = {
	init: function(){
		// Load configuration information
		this.config = require('../config/game.json');
		this.config.ROWS = this.config.width/this.config.TILE_SIZE;
		this.config.COLS = this.config.height/this.config.TILE_SIZE;

		console.log(this.config.ROWS);
		console.log(this.config.COLS);
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

		// Set an interval to regularly update clients with the new map data.
		// Only send data if it has changed since the last update was sent.
		setInterval(function(){
			if(this.update){
				io.sockets.emit('update', {'grid': this.grid, 'nicks': activeNicks });
				this.update = false;
			}
		},66);

	},
	addFruit: function(){
		// Get an empty position on the map and set the value to 2
		// 2 == food
		/*return this.newEmptyPosition(function(pos){
			this.grid[pos.x][pos.y] = 2;
			this.update = true;
		});*/
		var pos = this.newEmptyPosition();
		this.grid[pos.x][pos.y] = 2;
		this.update = true;
	},
	newEmptyPosition: function(/*callback*/){
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
	},
	activeNicks: [],
	update: true
}
