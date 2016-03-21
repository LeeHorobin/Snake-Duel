// snake.game.js
// Rendering and input logic

snake.game = {
	draw: function(grid, nicks){
		this.ctx.beginPath();
		snake.game.ctx.clearRect(0,0, snake.config.WIDTH, snake.config.HEIGHT);

		// Draw the grid. 0 == snake, 1 == blocked, 2 == food
		for(var i=0; i<grid.length; i++){
			for(var j=0; j<grid[i].length; j++){
				if(typeof grid[i][j] === 'object'){  //TODO, CHANGE THIS?
					snake.game.ctx.fillRect(i*snake.config.TILE_SIZE, j*snake.config.TILE_SIZE, snake.config.TILE_SIZE, snake.config.TILE_SIZE);
				}
				else if(grid[i][j] === 1){
					snake.game.ctx.fillRect(i*snake.config.TILE_SIZE, j*snake.config.TILE_SIZE, snake.config.TILE_SIZE, snake.config.TILE_SIZE);
				}
				else if(grid[i][j] === 2){
					snake.game.ctx.drawImage(fruit,12*i,12*j);
					//ctx.fillRect(i*config.TILE_SIZE, j*config.TILE_SIZE, config.TILE_SIZE, config.TILE_SIZE);
				}
			}
		}
		this.ctx.closePath();
		this.ctx.stroke();
	},
	keyDown: function(evt){
		if(evt.keyCode == 13){
			if(!snake.session.connected){
				snake.session.socket.emit('join');
			}
		}
		else console.log(evt.keyCode);
	}
}
