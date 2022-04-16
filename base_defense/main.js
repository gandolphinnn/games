window.onload = function() {
	function animate() {
		ctx.clearRect(0,0, innerWidth, innerHeight);
		game.engine();
		game.draw();
		inspectVar = game.tanks;
		requestAnimationFrame(animate);
	}
	let game = new Game();
	game.spawnTank('normal');
	animate();
}