let player = new Player();
class Game {
	constructor() {	
		this.grid = new Array(map.h);
		for (let y = 0; y < map.h; y++) {
			this.grid[y] = new Array(map.h);
			for (let x = 0; x < map.w; x++) {
				this.grid[y][x] = 0;
				if (y > map.h / 2 + 1) {
					this.grid[y][x] = 1;
				}
			}
		}
		for (let y = 10; y < 14; y++) {
			for (let x = 15; x < 21; x++) {
				if (x == 15 || x == 20) {
					this.grid[y][x] = 3;
				}
				else {
					this.grid[y][x] = 2;
				}
			}
		}
	}
	physics() {
		let c1 = ctoi(player.coord.x - player.width / 2), c2 = ctoi(player.coord.x + player.width / 2);
		if(this.grid[ctoi(player.coord.y + 1 + player.height / 2)][c1] == 0 && this.grid[ctoi(player.coord.y + 1 + player.height / 2)][c2] == 0) {
			player.coord.y += 3;
		}
	}
	engine() {
		this.physics();
	}
	draw() {
		player.draw();
		let imin = ctoi(player.coord.x) - Math.ceil(map.view/2);
		let imax = ctoi(player.coord.x) + Math.ceil(map.view/2) + 1;
		for (let y = 0; y < map.h; y++) {
			for (let x = imin; x < imax; x++) {
				if (this.grid[y][x] != 0) {
					let image = new Image(blockDim, blockDim); 
					image.src = 'texture/' + block[this.grid[y][x]].name + '.png';
					ctx.drawImage(image, itoc(x - imin) - player.coord.x % blockDim, itoc(y), blockDim, blockDim);
				}			
			}
		}
	}
}