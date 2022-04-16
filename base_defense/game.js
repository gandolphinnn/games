class Game {
	constructor() {	
		this.player = new Player();
		this.tanks = new Array();
		this.tanksIndex = 0;
		this.projs  = new Array();
		this.level = 1;
		this.money = 0;
		this.medikit = 0;
		this.upgrades; //todo
	}
	spawnTank(type) {
		let body = document.createElement("img");
		body.src = 'texture/' + type + '_body.png';
		body.onload = () => {
			let dim = {w: body.width, h:body.height};
<<<<<<< HEAD
			this.tanks.push(new Tank('normal', dim, spawnPos[rand0(3)][rand0(1)]));
=======
			this.tanks.push(new Tank('normal', dim, spawnPos[rand(0, 3)][rand(0, 1)], this.tanksIndex++));
>>>>>>> 0f2de9830509908efe7e56d514682dedfb1b5ad9
		};
	}
	engine() {
		this.tanks.forEach(tank => {
			tank.shoot();
			tank.move();
			tank.aim(this.player.coord);
		});
<<<<<<< HEAD
		this.player.barr.calcPos();
=======
		this.player.calcBarr();
		this.projs.forEach(proj => {
			proj.move();
		});
>>>>>>> 0f2de9830509908efe7e56d514682dedfb1b5ad9
	}
	draw() {
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