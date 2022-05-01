class Projectile {
	constructor(type, coord, degr, index) {
		this.type = type;
		this.coord = new Coord(coord.x, coord.y);
		this.degr = degr;
		this.damage = tank[type].damage;
		this.speed = tank[type].speed;
		this.blockTank = index;
	}
	move() {
		let dx = Math.cos(formA(this.degr, 'rad')) * this.speed;
		let dy = -1 * Math.sin(formA(this.degr, 'rad')) * this.speed;
		this.coord.add(dx, dy);
		let hit = '';
		if (dist(this.coord, new Coord(canvas.width/2, canvas.height/2)) <= player.dim.r) {
			hit = 'barrier';
		}
		else if (dist(this.coord, new Coord(canvas.width/2, canvas.height/2)) <= player.dim.r) {
			hit = 'player';
		}
		else if (dist(this.coord, new Coord(canvas.width/2, canvas.height/2)) <= player.dim.r) {
			hit = 'player';
		}
		return hit;
	}
	draw() {
		ctx.beginPath();
		ctx.arc(this.coord.x, this.coord.y, 5, 0, Math.PI * 2);
		ctx.fillStyle = tank[this.type].color
		ctx.fill();
	}
}
class Tank {
	constructor(type, dim, data, index) {
		this.type = type;
		this.dim = dim;
		this.index = index;
		let dimx = (data.degr % 180 == 0)? this.dim.h /2 : this.dim.w /2;
		let dimy = (data.degr % 180 == 0)? this.dim.w /2 : this.dim.h /2;
		this.coord = sumCoord(data.coord, dimx * data.multX, dimy * data.multY);
		this.degr = {body: data.degr, cannon: 0}
		this.hp = tank[type].hp;
		this.as = tank[type].as;
		this.rotateTo = null;
		this.rotPoints = [
			new Coord(offsetPos[0].coord.x + this.dim.w / 2, offsetPos[0].coord.y + this.dim.w /  2),
			new Coord(offsetPos[1].coord.x - this.dim.w / 2, offsetPos[1].coord.y + this.dim.w /  2),
			new Coord(offsetPos[2].coord.x - this.dim.w / 2, offsetPos[2].coord.y - this.dim.w /  2),
			new Coord(offsetPos[3].coord.x + this.dim.w / 2, offsetPos[3].coord.y - this.dim.w /  2)
		]
	}
	aim(pCoord) {
		this.degr.cannon = formA(Math.asin((this.coord.y - pCoord.y)/dist(this.coord, pCoord)), 'degr');
		if (pCoord.x < this.coord.x) {
			this.degr.cannon = 180 - this.degr.cannon;
		}
	}
	shoot() {
		if (this.proj == null && this.rotateTo == null)
		{
			setTimeout(() => {
				let cannonCoord = this.coord;
				this.proj = new Projectile(this.type, cannonCoord, this.degr.cannon, this.index);
			}, this.as);
		}
		else if (this.proj != null) {
			if (this.proj.move()) {
				this.proj = null;
			}
			else {
				this.proj.draw();
			}
		}
	}
	rotate() {
		this.degr.body = formA(this.degr.body);
		if (this.rotateTo == this.degr.body) {
			this.rotateTo = null;
		}
		else if(!(this.rotateTo == 270 && this.degr.body == 0) && (this.rotateTo > this.degr.body || (this.rotateTo == 0 && this.degr.body >= 270))) {
			this.degr.body++;
		}
		else {
			this.degr.body--;
		}
	}
	move() {
		if (this.rotateTo != null) {
			this.rotate();
			return;
		}
		this.coord.add(Math.cos(formA(this.degr.body, 'rad')), -1 * Math.sin(formA(this.degr.body, 'rad')));
		for (let i = 0; i < 4; i++) {
			if(this.coord.x == this.rotPoints[i].x && this.coord.y == this.rotPoints[i].y) {
				this.rotateTo = offsetPos[i].rotateTo[rand(0, 1)];
				break;
			}
		}
	}
	draw() {
		let cont = canvas.getContext("2d");	
		cont.save();
		cont.translate(this.coord.x, this.coord.y);
		let body = document.createElement("img");
		body.src = 'texture/' + this.type + '_body.png';
		cont.rotate(formA(90 - this.degr.body, 'rad'));
		body.onload = cont.drawImage(body, -body.width/2, -body.height/2, body.width, body.height);
		cont.restore();
		cont.save();
		cont.translate(this.coord.x, this.coord.y);
		let cannon = document.createElement("img");
		cannon.src = 'texture/' + this.type + '_cannon.png';
		cont.rotate(formA(90 - this.degr.cannon, 'rad'));
		cannon.onload = cont.drawImage(cannon, -cannon.width/2, -cannon.height/2, cannon.width, cannon.height);
		cont.restore();
	}
}