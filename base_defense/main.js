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
	let body = document.createElement("img");
		body.src = 'texture/normal_body.png';
		let dim;
		body.onload = () => {
			dim = {w: body.width, h:body.height};
			for (let i = 0; i < 4; i++) {
				ctx.beginPath();
				let x = offsetPos[i].coord.x + dim.w/2 * spawnPos[i][0].multY;
				let y = offsetPos[i].coord.y + dim.w/2 * spawnPos[i][1].multX;
				ctx.arc(x, y, 50, 0, Math.PI*2);
				ctx.stroke();
			}
		};
	game.spawnTank('normal');
	animate();
}