class Game {
	constructor() {	
		this.player = new Player();
		this.fieldx = {
			min: (canvas.width - canvas.height) / 2,
			max: canvas.width - (canvas.width - canvas.height) / 2,
		}
	}
	draw() {
		ctx.beginPath();
		ctx.rect(0, 0, this.fieldx.min, canvas.height);
		ctx.rect(this.fieldx.max, 0, canvas.width - this.fieldx.max, canvas.height);
		ctx.fillStyle = '#0a1a02';
		ctx.fill();
		this.player.draw();
	}
}