class Game {
	constructor() {	
		this.player = new Player();
		this.tanks = new Array();
	}
	spawnTank(type) {
		let body = document.createElement("img");
		body.src = 'texture/' + type + '_body.png';
		body.onload = () => {
			let dim = {w: body.width, h:body.height};
			this.tanks.push(new Tank('normal', dim, spawnPos[rand(0, 3)][rand(0, 1)]));
		};
	}
	engine() {
		this.tanks.forEach(tank => {
			tank.shoot();
			tank.move();
			tank.aim(this.player.coord);
		});
		this.player.calcBarr();
	}
	draw() {
		
		/*for (let i = 0; i < 4; i++) {
			ctx.beginPath();
			ctx.arc(spawnPos[i][0].coord.x, spawnPos[i][0].coord.y, 20, 0, Math.PI*2);
			ctx.arc(spawnPos[i][1].coord.x, spawnPos[i][1].coord.y, 20, 0, Math.PI*2);
			ctx.stroke();
		}*/
		
		this.player.draw();
		this.tanks.forEach(tank => {
			tank.draw();
		});
		ctx.beginPath();
		ctx.rect(0, 0, fieldx.min, canvas.height);
		ctx.rect(fieldx.max, 0, canvas.width - fieldx.max, canvas.height);
		ctx.fillStyle = '#0a1a02';
		ctx.fill();
	}
}