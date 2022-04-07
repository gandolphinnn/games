window.onload = function() {
	class Cell {
		constructor(y, x) {
			this.y = y;
			this.x = x;
			this.state = 0;
			this.click = '';
		}
		draw() { //! fix drawing bug
			ctx.rect(fe.grid.x + this.x * dim.cell, fe.grid.y + this.y * dim.cell, dim.cell, dim.cell);
			if (this.click == 'click') {
				ctx.fillStyle = 'black';
				ctx.fillText(this.state, fe.grid.x + this.x * dim.cell, fe.grid.y + this.y * dim.cell + dim.cell);
				ctx.fillStyle = 'gray';
			}
			else {
				ctx.fill();
			}
			if (this.click == 'flag') {
				
			}
			if (this.click == '?') {
				
			}
			//ctx.fill();
			ctx.stroke();
		}
	}
	class Game {
		constructor(dim, nBomb) {
			this.grid = new Array(dim.y);
			for (let y = 0; y < dim.y; y++) {
				this.grid[y] = new Array(dim.x);
				for (let x = 0; x < dim.x; x++) {
					this.grid[y][x] = new Cell(y, x);
				}
			}
			let rY, rX;
			for (let i = 0; i < nBomb; i++) {
				rY = Math.floor(Math.random() * dim.y);
				rX = Math.floor(Math.random() * dim.x);
				if (this.grid[rY][rX].state != -1) {
					this.grid[rY][rX].state = -1;
				}
				else
					i--;
			}
			
		}
		drawAll() {
			this.grid.forEach(row => {
				row.forEach(cell => {
					cell.draw();
				});
			});
		}
	}
	function animate() {
		requestAnimationFrame(animate);
		if (mouse.state == 0) {
			mouse.state = null;
			let y = Math.floor((mouse.pos.y - fe.grid.y) / dim.cell);
			let x = Math.floor((mouse.pos.x - fe.grid.x) / dim.cell);
			if (y > 0 && y < dim.y - 1 && x > 0 && x < dim.x - 1 && game.grid[y][x].click == '') {
				ctx.clearRect(0, 0, innerWidth, innerHeight);
				game.grid[y][x].click = 'click';
				game.grid[y][x].draw();
				console.log(game.grid);
			}
		}
	}
	ctx.font = '30px serif';
	ctx.fillStyle = 'gray';
	ctx.strokeStyle = 'black';
	ctx.lineWidth = '2';
	const dim = {
		y: 10,
		x: 20,
		cell: 30
	}
	const fe = {
		center: new Coord(canvas.height / 2, canvas.width / 2 ),
		grid: new Coord(canvas.height / 2 - dim.y / 2 * dim.cell, canvas.width / 2 - dim.x / 2 * dim.cell)
	}
	let game = new Game(dim, 20);
	game.drawAll();
	animate();
}