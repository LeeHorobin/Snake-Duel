// snake.game.js
// Rendering and input logic

snake.game = {
	draw: function(grid /*,nicks*/){
		snake.game.ctx.beginPath();
		snake.game.ctx.clearRect(0,0, config.WIDTH, config.HEIGHT);
		
		// Draw the grid. 0 == snake, 1 == blocked, 2 == food
		for(var i=0; i<grid.length; i++){
			for(var j=0; j<grid[i].length; j++){
				if(typeof grid[i][j] === 'object'){  //TODO, CHANGE THIS?
					ctx.fillRect(i*config.TILE_SIZE, j*config.TILE_SIZE, config.TILE_SIZE, config.TILE_SIZE);
				}
				else if(grid[i][j] === 1){
					ctx.fillRect(i*config.TILE_SIZE, j*config.TILE_SIZE, config.TILE_SIZE, config.TILE_SIZE);
				}
				else if(grid[i][j] === 2){
					ctx.drawImage(fruit,12*i,12*j);
					//ctx.fillRect(i*config.TILE_SIZE, j*config.TILE_SIZE, config.TILE_SIZE, config.TILE_SIZE);
				}
			}
		}
	},
	keyDown: function(evt){
		
	}
}