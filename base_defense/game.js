class Game {
	constructor() {	
		this.player = new Player();
		this.tanks = new Array();
		this.tanks.push(new Tank('normal'));
		this.fieldx = {
			min: (canvas.width - canvas.height) / 2,
			max: canvas.width - (canvas.width - canvas.height) / 2,
		}
	}
	play() {
		this.tanks.forEach(tank => {
			tank.aim(this.player.coord);
		});
	}
	draw() {
		ctx.beginPath();
		ctx.rect(0, 0, this.fieldx.min, canvas.height);
		ctx.rect(this.fieldx.max, 0, canvas.width - this.fieldx.max, canvas.height);
		ctx.fillStyle = '#0a1a02';
		ctx.fill();

		this.player.draw();
		this.tanks.forEach(tank => {
			tank.draw();
		});
	}
}