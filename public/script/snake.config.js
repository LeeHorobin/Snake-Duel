// snake.config.js
// Initiate namespace and set config values
window.snake = {}

// Static configuration information
snake.config = {
	'WIDTH':     900,
	'HEIGHT':    600,
	'TILE_SIZE': 12,
	'ROWS':      this.WIDTH/this.TILE_SIZE,
	'COLS':      this.HEIGHT/this.TILE_SIZE
}

// Store session information
snake.session = {
	connected: false,
	playing: false,
	nick: ''
}
