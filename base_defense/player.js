class Player {
	constructor() {
		//* graphic attributes
		this.dim = player.dim;
		this.coord = new Coord(canvas.width/2, canvas.height/2);
		this.barr = {
			degr: null, //? angle relatvie to p1, so starts with top-most barrier position
			len: player.barrLen,
			p1: new Coord(),
			p2: new Coord(),
		}
		//* gameplay attributes
		this.maxhp = player.maxhp;
		this.hp = this.maxhp;
		this.maxsh = player.maxsh;
		this.sh = null;
	}
	calcBarr() {
		let mAngle = formA(Math.asin((this.coord.y - mouse.pos.y)/dist(this.coord, mouse.pos)), 'degr');
		if (mouse.pos.x == null || mouse.pos.y == null)
			mAngle = 90;
		if (mouse.pos.x - this.coord.x < 0) {
			mAngle = 180 - mAngle;
		}
		this.barr.degr = formA(mAngle + 90);
		let inters = new Coord(this.coord.x + Math.cos(formA(mAngle, 'rad'))* this.dim.r,
								this.coord.y - Math.sin(formA(mAngle, 'rad'))* this.dim.r);
		this.barr.p1.set(inters.x + Math.cos(formA(this.barr.degr, 'rad'))* this.barr.len/2,
						inters.y - Math.sin(formA(this.barr.degr, 'rad'))* this.barr.len/2);
		this.barr.p2.set(inters.x - Math.cos(formA(this.barr.degr, 'rad'))* this.barr.len/2,
						inters.y + Math.sin(formA(this.barr.degr, 'rad'))* this.barr.len/2);
	}
	draw() {
		//* red area	
		ctx.beginPath();
		ctx.arc(this.coord.x, this.coord.y, this.dim.r, 0, Math.PI*2);
		ctx.fillStyle = '#8c2401';
		ctx.globalAlpha = 0.8;
		ctx.fill();
		ctx.globalAlpha = 1;
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 3;
		ctx.stroke();
		//* green base
		ctx.beginPath();
		ctx.rect(this.coord.x - this.dim.w/2, this.coord.y-this.dim.h/2, this.dim.w, this.dim.h);
		ctx.fillStyle = '#163007'
		ctx.fill();
		ctx.stroke();
		//* barrier
		ctx.beginPath();
		ctx.moveTo(this.barr.p1.x, this.barr.p1.y);
		ctx.lineTo(this.barr.p2.x, this.barr.p2.y);
		ctx.strokeStyle = 'blue';
		ctx.lineWidth = 5;
		ctx.stroke();
	}
}