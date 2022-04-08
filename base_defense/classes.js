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
	}
	draw() {
		ctx.beginPath();
		ctx.arc(this.coord.x, this.coord.y, 5, 0, Math.PI * 2);
		ctx.fill();
	}
}
class Tank {
	constructor(type, dim, spawndata) {
		this.type = type;
		this.dim = dim;
		console.log(this.dim);
		this.coord = addCoord(spawndata.coord,
					(this.dim.w / 2 + offset) * spawndata.multX, (this.dim.h / 2 + offset) * spawndata.multY);
		this.degr = { //* these values MUST be converted for the cont rotation
			body: spawndata.degr,
			cannon: 0
		}
		this.hp = tank[type].hp;
		this.as = tank[type].as;
		this.projects = new Array();
		this.rotateTo = null;
	}
	aim(pCoord) {
		let sin = this.coord.y - pCoord.y;
		let cos = pCoord.x - this.coord.x;
		let dist = Math.sqrt((sin ** 2)+(cos ** 2));
		this.degr.cannon = formA(Math.asin(sin/dist), 'degr');
		if (cos < 0) {
			this.degr.cannon = 180 - this.degr.cannon;
		}
	}
	shoot() { //todo fix this
		setInterval(() => {
			if (this.rotateTo == null)
			{
				this.projects.push(new Projectile(this.type, this.coord, this.degr.cannon));
			}
		}, this.as);
		else {
			this.projects.forEach(project => {
				project.move();
				project.draw();
				if (project.coord.x == canvas.width / 2 && project.coord.y == canvas.height / 2) {
					project = null;
				}
			});
		}
	}
	move() {
		let dx = Math.cos(formA(this.degr.body, 'rad'));
		let dy = -1 * Math.sin(formA(this.degr.body, 'rad'));
		this.coord.add(dx, dy);
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