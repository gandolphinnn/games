function formA(angle, type = '') {
	if (type == 'rad') {
		angle %= 360; // turn in |0 - 360| range
		if (angle < 0)
			angle += 360 // turn in positive angle
		angle *= Math.PI / 180;
	}
	if (type == 'degr') {
		angle *= 180 / Math.PI;
		angle %= 360; // turn in |0 - 360| range
		if (angle < 0)
			angle += 360 // turn in positive angle
	}
	if (type == '') {
		angle %= 360; // turn in |0 - 360| range
		if (angle < 0)
			angle += 360 // turn in positive angle
	}
	return angle;
}
function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
let mouse = {
	pos: new Coord(null, null)
}
class Projectile {
	constructor(type, coord, degr) {
		this.type = type;
		this.coord = new Coord(coord.x, coord.y);
		this.degr = degr;
		this.damage = tank[type].damage;
		this.speed = tank[type].speed;
	}
	move() {
		let dx = Math.cos(formA(this.degr, 'rad')) * this.speed;
		let dy = -1 * Math.sin(formA(this.degr, 'rad')) * this.speed;
		this.coord.add(dx, dy);
		if (dist(this.coord, new Coord(canvas.width/2, canvas.height/2)) <= player.dim.r) {
			return true;
		}
		return false;
	}
	draw() {
		ctx.beginPath();
		ctx.arc(this.coord.x, this.coord.y, 5, 0, Math.PI * 2);
		ctx.fill();
	}
}
class Tank {
	constructor(type, dim, data) {
		this.type = type;
		this.dim = dim;
		let dimx = (data.degr % 180 == 0)? this.dim.h /2 : this.dim.w /2;
		let dimy = (data.degr % 180 == 0)? this.dim.w /2 : this.dim.h /2;
		this.coord = addCoord(data.coord, (dimx + offset) * data.multX, (dimy + offset) * data.multY);
		this.degr = {body: data.degr, cannon: 0}
		this.hp = tank[type].hp;
		this.as = tank[type].as;
		this.proj = null;
		this.rotateTo = null;
		this.rotPoints = [
			new Coord(cornerPos[0].coord.x + this.dim.w / 2, cornerPos[0].coord.y + this.dim.w /  2),
			new Coord(cornerPos[1].coord.x - this.dim.w / 2, cornerPos[1].coord.y + this.dim.w /  2),
			new Coord(cornerPos[2].coord.x - this.dim.w / 2, cornerPos[2].coord.y - this.dim.w /  2),
			new Coord(cornerPos[3].coord.x + this.dim.w / 2, cornerPos[3].coord.y - this.dim.w /  2)
		]
		console.log(this.rotPoints);
		console.log(this.coord);
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
				this.proj = new Projectile(this.type, cannonCoord, this.degr.cannon);
			}, this.as);
		}
		else {
			if (this.proj.move()) {
				this.proj = null;
			}
			else {
				this.proj.draw();
			}
		}
	}
	rotate() {
		console.log('+');
	}
	move() {
		if (this.rotateTo != null) {
			this.rotate();
			return
		}
		this.coord.add(Math.cos(formA(this.degr.body, 'rad')), -1 * Math.sin(formA(this.degr.body, 'rad')));
		for (let i = 0; i < 4; i++) {
			if(this.coord.x == this.rotPoints.x && this.coord.y == this.rotPoints.y) {
				this.rotateTo = cornerPos[i].rotateTo[rand(0, 1)];
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
		this.rotPoints.forEach(p => {
			ctx.beginPath();
			ctx.arc(p.x, p.y, 5, 0, Math.PI*2);
			ctx.fill();
		});
	}
}