window.onload = function() {
	document.addEventListener('mousemove', function(e) {
		mouse.pos.y = e.clientY;
		mouse.pos.x = e.clientX;
	});
	function animate() {
		ctx.clearRect(0,0, innerWidth, innerHeight);
		game.engine();
		game.draw();
		requestAnimationFrame(animate);
	}
	let game = new Game();
	game.spawnTank('normal');
	animate();
}