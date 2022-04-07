class Game {
	constructor() {	
		this.player = new Player();
		this.tanks = new Array();
		this.tanks.push(new Tank('normal'));
	}
	play() {
		this.tanks.forEach(tank => {
			tank.move();
			tank.aim(this.player.coord);
		});
	}
	draw() {
		ctx.beginPath();
		ctx.rect(0, 0, fieldx.min, canvas.height);
		ctx.rect(fieldx.max, 0, canvas.width - fieldx.max, canvas.height);
		ctx.fillStyle = '#0a1a02';
		ctx.fill();

		this.player.draw();
		this.tanks.forEach(tank => {
			tank.draw();
		});
	}
}