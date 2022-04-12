class Coord {
	constructor(x, y) { //* represent the position based on the whole map
		this.x = x;
		this.y = y;
	}
	set(newx, newy) {
		this.x = newx;
		this.y = newy;
	}
	add(addX, addY) {
		this.x += addX;
		this.y += addY;
	}	
}
function circle(coord, radius) {
	ctx.beginPath();
	ctx.arc(coord.x, coord.y, radius, 0, Math.PI * 2);
	ctx.fill();
}
function rand(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function rand(max) {
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - 1));
}
let mousePos = new Coord();

class Point {
	constructor(coord, area, color) {
		this.coord = coord;
		this.area = area;
		this.radius = Math.sqrt(this.area / Math.PI);
		this.radius = 10;
		this.color = color;
	}
	draw(playerC) {
		ctx.fillStyle = this.color;
		let viewC = new Coord(this.coord.x-(playerC.x-view.w), this.coord.y-(playerC.y-view.h));
		console.log(viewC);
		circle(viewC, this.radius);
	}
}

class Player {
	constructor(coord, area, color) {
		this.coord = coord;
		this.area = area;
		this.radius = Math.sqrt(this.area / Math.PI);
		this.color = color;
		this.speed = 5;
	}
	move() {
		if (move.up) {
			this.coord.y -= this.speed;
		}
		if (move.down) {
			this.coord.y += this.speed;
		}
		if (move.left) {
			this.coord.x -= this.speed;
		}
		if (move.right) {
			this.coord.x += this.speed;
		}
	}
	draw() {
		ctx.beginPath();
		ctx.fillStyle = this.color;
		circle(new Coord(canvas.width/2, canvas.height/2), this.radius);
	}
}