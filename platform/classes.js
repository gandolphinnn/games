class Coord {
	constructor(y, x) { //* represent the position based on the whole map
		this.y = y;
		this.x = x;
	}
}
class Weapon {
	constructor(type) {
		this.type = type;
		this.damage = weapon[type].damage;
		this.magazine = weapon[type].magazine;
		this.maxAmmo = weapon[type].maxAmmo;
		this.range = weapon[type].range;
	}
}
class Enemy {
	constructor(type) {
		this.type = type;
		this.coord;
		this.hp = enemy[type].hp;
		this.weapon = enemy[type].weapon;
	}
}
class Player {
	constructor() { //todo crouching
		this.coord = new Coord(canvas.height/2, map.xmin + 60);
		this.maxhp = 10;
		this.hp = 10;
		this.weapon = 'knife';
		this.height = blockDim * 2;
		this.width = blockDim - blockDim/10;
	}
	move() {
		
	}
	jump() {

	}
	shoot() {

	}
	draw() {
		ctx.beginPath();
		ctx.rect((canvas.width-player.width)/2, this.coord.y-player.height/2, this.width, this.height);
		ctx.stroke();
	}
}