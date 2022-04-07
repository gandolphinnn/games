window.onload = function() {
	function animate() {
		requestAnimationFrame(animate);
		ctx.clearRect(0,0, innerWidth, innerHeight);
		game.engine();
		game.draw();
	}
	let game = new Game();
	animate();
}