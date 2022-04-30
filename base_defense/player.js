class Barrier extends RigidRect{
	constructor() {
		super(new Coord(canvas.width/2, canvas.height/2-player.dim.r), 90, null, player.barrLen);
		this.len = player.barrLen;
		this.base = {
			c: new Coord(canvas.width/2, canvas.height/2),
			r: player.dim.r
		};
	}
	calcBar() {
		let mAngle = formA(Math.asin((this.base.c.y - mouse.pos.y)/dist(this.base.c, mouse.pos)), 'degr');
		if (mouse.pos.x == null || mouse.pos.y == null)
			mAngle = 90;
		if (mouse.pos.x - this.base.c.x < 0) {
			mAngle = 180 - mAngle;
		}
		this.degr = formA(mAngle + 90);
		this.coord = new Coord(this.base.c.x + Math.cos(formA(mAngle, 'rad'))* this.base.r,
								this.base.c.y - Math.sin(formA(mAngle, 'rad'))* this.base.r);
	}
}
class Player extends RigidCirc{
	constructor() {
		//* graphic attributes
		super(new Coord(canvas.width/2, canvas.height/2), null, player.dim.r);
		this.dim = player.dim;
		this.barr = new Barrier();
		//* gameplay attributes
		this.maxhp = player.maxhp;
		this.hp = this.maxhp;
		this.maxsh = player.maxsh;
		this.sh = null;
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