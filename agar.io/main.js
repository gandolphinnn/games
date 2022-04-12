window.onload = function() {
	document.addEventListener('mousemove', function(e) {
		mousePos.y = e.clientY;
		mousePos.x = e.clientX;
	});
	document.addEventListener('keydown', function(e) {
		if ((e.code == 'KeyW' || e.code == 'ArrowUp') && !move.up) {
			move.up = true;
		}
		if ((e.code == 'KeyA' || e.code == 'ArrowLeft') && !move.left) {
			move.left = true;
		}
		if ((e.code == 'KeyD' || e.code == 'ArrowRight') && !move.right) {
			move.right = true;
		}
		if ((e.code == 'KeyS' || e.code == 'ArrowDown') && !move.down) {
			move.down = true;
		}
	});
	document.addEventListener('keyup', function(e) {
		if ((e.code == 'KeyW' || e.code == 'ArrowUp') && move.up) {
			move.up = false;
		}
		if ((e.code == 'KeyA' || e.code == 'ArrowLeft') && move.left) {
			move.left = false;
		}
		if ((e.code == 'KeyD' || e.code == 'ArrowRight') && move.right) {
			move.right = false;
		}
		if ((e.code == 'KeyS' || e.code == 'ArrowDown') && move.down) {
			move.down = false;
		}
	});
	function animate() {
		requestAnimationFrame(animate);
		ctx.clearRect(0,0, innerWidth, innerHeight);
		game.engine();
		game.draw();
	}
	let game = new Game();
	animate();
}