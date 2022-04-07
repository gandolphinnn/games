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
class Coord {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	set(newx, newy) {
		this.x = newx;
		this.y = newy;
	}
}
let mouse = {
	pos: new Coord(null, null)
}
class Projectile {
	constructor(type) {
		this.type = type;
		this.damage = weapon[type].damage;
		this.speed = weapon[type].speed
		this.range = weapon[type].range;
	}
}
class Tank {
	constructor(type) {
		this.type = type;
		this.coord;
		this.hp = enemy[type].hp;
		this.weapon = enemy[type].weapon;
	}
}
class Player {
	constructor() {
		this.dim = player.dim;
		this.coord = new Coord(canvas.width/2, canvas.height/2);
		this.maxhp = player.maxhp;
		this.hp = this.maxhp;
		this.maxsh = player.maxsh;
		this.sh = null;
		this.barr = {
			degr: 180, //? angle relatvie to p1, so starts with top-most barrier position
			len: player.barrLen,
			p1: new Coord(),
			p2: new Coord(),
		}
	}
	calcBarr() {
		let sin = this.coord.y - mouse.pos.y;
		let cos = mouse.pos.x - this.coord.x;
		let dist = Math.sqrt((sin ** 2)+(cos ** 2))
		let mAngle = formA(Math.asin(sin/dist), 'degr');
		if (cos < 0) {
			mAngle = 180 - mAngle;
		}
		this.barr.degr = mAngle + 90;
		let inters = new Coord(this.coord.x + Math.cos(formA(mAngle, 'rad'))* this.dim.r,
								this.coord.y - Math.sin(formA(mAngle, 'rad'))* this.dim.r);
		this.barr.p1.set(inters.x + Math.cos(formA(this.barr.degr, 'rad'))* this.barr.len/2,
						inters.y - Math.sin(formA(this.barr.degr, 'rad'))* this.barr.len/2);
		this.barr.p2.set(inters.x - Math.cos(formA(this.barr.degr, 'rad'))* this.barr.len/2,
						inters.y + Math.sin(formA(this.barr.degr, 'rad'))* this.barr.len/2);
	}
	draw() {
		this.calcBarr();
		ctx.beginPath();
		ctx.arc(this.coord.x, this.coord.y, this.dim.r, 0, Math.PI*2);
		ctx.fillStyle = '#b32c00';
		ctx.fill();
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 3;
		ctx.stroke();

		ctx.beginPath();
		ctx.rect(this.coord.x - this.dim.w/2, this.coord.y-this.dim.h/2, this.dim.w, this.dim.h);
		ctx.fillStyle = '#163007'
		ctx.fill();
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(this.barr.p1.x, this.barr.p1.y);
		ctx.lineTo(this.barr.p2.x, this.barr.p2.y);
		ctx.strokeStyle = 'blue';
		ctx.lineWidth = 5;
		ctx.stroke();

		ctx.save();
		let image = document.createElement("img");
		image.src="texture/und.png";
		image.onload =()=>{ctx.drawImage(image,canvas.width/2-image.width/2,canvas.height/2-image.width/2)}
		ctx.rotate(this.barr.degr*-Math.PI/180);
		ctx.drawImage(image,-image.width/2,-image.width/2);
		ctx.restore();
		
		ctx.save();
		let img2 = document.createElement("img");
		img2.src="texture/und.png";
		img2.onload =()=>{ctx.drawImage(img2,canvas.width/2-img2.width/2,canvas.height/2-img2.width/2)}
		ctx.rotate(this.barr.degr*Math.PI/180);
		ctx.drawImage(img2,-img2.width/2,-img2.width/2);
		ctx.restore();
	}
}