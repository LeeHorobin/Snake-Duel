// init.js
// Initialize the game after the page has finished rendering

window.onload = function(){
	// Canvas context
	var canvas = document.getElementById('canvas');
	snake.game.ctx = canvas.getContext('2d');
	snake.game.ctx.lineWidth = "1";
	
	// Call snake.game.keyDown() upon detecting a key press
	document.addEventListener('keydown', snake.game.keyDown, false);
	
	// Connect to the server
	snake.connect();
}