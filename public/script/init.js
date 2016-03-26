// init.js
// Initialize the game after the page has finished rendering
var fruit;

window.onload = function(){
	// Canvas context
	var canvas = document.getElementById('canvas');
	snake.game.ctx = canvas.getContext('2d');
	snake.game.ctx.lineWidth = "1";
  snake.game.ctx.fillStyle = "#30F00C"

	// Call snake.game.keyDown() upon detecting a key press
	document.addEventListener('keydown', snake.game.keyDown, false);

	// Load the fruit image and then connect, if more art is ever implemented
	// then this will be moved to a proper resource loader.
	fruit = new Image(12,12);
	fruit.src = '../img/fruit.png';
	fruit.onload = function(){
		snake.connect();
	}
}
