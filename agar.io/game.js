let player = new Player(new Coord(rand(map.w), rand(map.h)), 10000, 'green');
class Game {
	constructor() {	
		this.points = new Array(Math.floor(map.w * map.h / 5000));
		for (let i = 0; i < this.points.length; i++) {
			this.points[i] = new Point(new Coord(rand(map.w), rand(map.h)), 100, colors[rand(colors.length-1)]);
		}
	}
	engine() {
		player.move();
	}
	draw() {
		player.draw();
		this.points.forEach(point => {
			if (point.coord.x >= player.coord.x-view.w && point.coord.x <= player.coord.x+view.w
				&& point.coord.y >= player.coord.y-view.h && point.coord.y <= player.coord.y+view.h) {
					point.draw(player.coord);
			}
		});
	}
}