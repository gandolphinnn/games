window.onload = function() {
	function animate() {
		ctx.clearRect(0, 0, innerWidth, innerHeight);
		game.engine();
		game.draw();
		requestAnimationFrame(animate);
	}
	let game = new Game();
	animate();
}