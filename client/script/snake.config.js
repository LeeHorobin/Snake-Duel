// snake.config.js
// Initiate namespace and set config values
window.snake = {}

// Static configuration information
snake.config = {
	'WIDTH': 600,
	'HEIGHT': 900,
	'TILE_SIZE': 12,
	'ROWS': this.WIDTH/this.TILE_SIZE,
	'COLS': this.HEIGHT/this.TILE_SIZE,
	'PORT': 8080
}


// Store session information
snake.session = {
	connected: false,
	playing: false,
	nick: ''
}
