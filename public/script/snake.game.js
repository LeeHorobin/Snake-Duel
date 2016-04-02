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
          // Fill white
					snake.game.ctx.fillRect(i*snake.config.TILE_SIZE,
											j*snake.config.TILE_SIZE,
											snake.config.TILE_SIZE,
											snake.config.TILE_SIZE);
          // Add border/outline
          snake.game.ctx.rect(i*snake.config.TILE_SIZE,
											j*snake.config.TILE_SIZE,
											snake.config.TILE_SIZE,
											snake.config.TILE_SIZE);
				}
				else if(grid[i][j] === 1){
          // Fill white
					snake.game.ctx.fillRect(i*snake.config.TILE_SIZE,
											j*snake.config.TILE_SIZE,
											snake.config.TILE_SIZE,
											snake.config.TILE_SIZE);
          // Add border/outline
          snake.game.ctx.rect(i*snake.config.TILE_SIZE,
											j*snake.config.TILE_SIZE,
											snake.config.TILE_SIZE,
											snake.config.TILE_SIZE);
				}
				else if(grid[i][j] === 2){
					snake.game.ctx.drawImage(fruit,12*i,12*j);
				}
			}
		}
		this.ctx.closePath();
		this.ctx.stroke();
	},
	keyDown: function(evt){
		// Right arrow == 39, 'd' == 68
		if (evt.keyCode == 39 || evt.keyCode == 68){
			snake.session.socket.emit('right');
		}
		// Left arrow = 37, 'a' == 65
		else if (evt.keyCode == 37 || evt.keyCode == 65){
			snake.session.socket.emit('left');
		}
		// Up arrow = 38, 'w' == 87
		else if (evt.keyCode == 38 || evt.keyCode == 87){
			snake.session.socket.emit('up');
		}
		// Down arrow = 40, 's' == 83
		else if (evt.keyCode == 40 || evt.keyCode == 83){
			snake.session.socket.emit('down');
		}
		// Enter key == 13
		else if(evt.keyCode == 13){
			if(snake.session.connected){
        if(document.activeElement.id === 'chatMessage'){
          // Chat input is in focus, submit the chat, don't emit a join requested
          snake.layout.chatSubmit.click();
        }
        else{
          console.log('Emitting join request');
				  snake.session.socket.emit('join');
        }
			}
		}
		else console.log(evt.keyCode);
	}
}
