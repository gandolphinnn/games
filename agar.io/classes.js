class Point {
	constructor(coord, area, color) {
		this.coord = coord;
		this.area = area;
		this.radius = Math.sqrt(this.area / Math.PI);
		this.color = color;
	}
	absorbed() {
		if (this.coord.dist(player.coord) <= this.radius) {
			console.log('ù');
			player.area += this.area;
			player.radius = Math.sqrt(player.area / Math.PI);
			this.coord = new Coord(rand(map.w), rand(map.h));
			this.color = colors[rand(colors.length-1)];
		}
		return false;
	}
	draw() {
		ctx.fillStyle = this.color;
		let viewC = new Coord(this.coord.x-(player.coord.x-view.w), this.coord.y-(player.coord.y-view.h));
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
		if (key.up && this.coord.y > this.radius ) {
			this.coord.y -= this.speed;
		}
		if (key.down && this.coord.y < map.h - this.radius) {
			this.coord.y += this.speed;
		}
		if (key.left && this.coord.x > this.radius ) {
			this.coord.x -= this.speed;
		}
		if (key.right && this.coord.x < map.w - this.radius) {
			this.coord.x += this.speed;
		}
	}
	draw() {
		ctx.beginPath();
		ctx.fillStyle = this.color;
		circle(new Coord(canvas.width/2, canvas.height/2), this.radius);
	}
}