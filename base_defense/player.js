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
		let mAngle = formA(Math.asin((this.coord.y - mouse.pos.y)/dist(this.coord, mouse.pos)), 'degr');
		if (mouse.pos.x - this.coord.x < 0) {
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
	}
}