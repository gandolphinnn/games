window.onload = function() {
	document.addEventListener('keydown', function(event) {
		switch(event.code){
			case 'KeyA': case 'ArrowLeft': //move left
				move = 'left';
				break;
			case 'KeyD': case 'ArrowRight': //move right
				move = 'right';
				break;
			case 'KeyS': case 'ArrowDown': //soft drop
				move = 'sd';
				break;
			case 'Space': case 'Enter': // hard drop
				move = 'hd';
				break;
			case 'KeyE': case 'Numpad0': //rotate cw
				move = 'cwRot';
				break;
			case 'KeyQ': case 'ControlRight': //rotate ccw
				move = 'ccwRot';
				break;
			case 'KeyW': case 'Shiftleft': case 'ArrowUp': //hold
				move = 'hold';
				break;
			case 'Escape': //pause
				game.pause = !game.pause;
				break;
		}
	});
	class Cell{
		constructor(y, x) {
			this.y = y;
			this.x = x;
			this.state = '';
			this.color = '';
		}
		draw() {
			if (this.color == '' && this.state != '' || this.color != '' && this.state == '') {
				console.log('error: state=' + this.state + ' , color=' + this.color); //? just to detect bugs
				//this.color = '';
				//this.state = '';
			}
			if (this.state == 'f' || this.state == 'm') {
				let image = new Image(dim.cell, dim.cell); 
				image.src = 'texture/' + texture + this.color + '.png';
				image.onload = ctx.drawImage(image, fe_rect.p.x + (this.x * dim.cell), fe_rect.p.y + (this.y * dim.cell), dim.cell, dim.cell);
			}
			if (this.state == 'p') {
				ctx.beginPath();
				ctx.lineWidth = '2';
				ctx.strokeStyle = blocks[this.color];
				ctx.rect(fe_rect.p.x + (this.x * dim.cell), fe_rect.p.y + (this.y * dim.cell), dim.cell, dim.cell);
				ctx.stroke();
			}
		}
	}
	class Game{
		constructor() {	
			//* grid		
			this.grid = new Array(dim.y);
			for (let y = 0; y < dim.y; y++) {
				this.grid[y] = new Array(dim.x);
				for (let x = 0; x < dim.x; x++) {
					this.grid[y][x] = new Cell(y, x);
				}
			}
			
			//* tests !!!
			//! comment this
			/*for (let y = 19; y > 11; y--) {
				for (let x = 0; x < dim.x; x++) {
					if (!((y < 16 && x == 7) || (x > 2 && x < 7 && y == 15) || ((y > 15 && x == 3)))) {
						this.grid[y][x].state = 'f'; this.grid[y][x].color = 'o';
					}
				}
			}*/

			//* moving blocks
			this.rotState = 0;
			this.cornerCoord = { y: null, x:null };
			this.mBlocks = new Array(4);
			for (let i = 0; i < 4; i++) {
				this.mBlocks[i] = new Cell();
				this.mBlocks[i].state = 'm';
			}

			//* prediction blocks (AKA ghost pieces)
			this.pBlocks = new Array(4);
			for (let i = 0; i < 4; i++) {
				this.pBlocks[i] = new Cell();
				this.pBlocks[i].state = 'p';
			}

			//* pieces bag and first piece generation
			//! bug
			this.pieceq = generateBag();
			this.newBlock(this.pieceq.splice(0, 1));

			//* hold variables
			this.hold = '';
			this.canHold = true;

			//* game state and info variables
			this.score = 0;
			this.lines = 0;
			this.lValue = 0;
			this.level = 0;

			//* gamestate variables
			this.pause = false;
			this.gameover = false;

			//* timed moveDown system
			this.doMD = false;
			this.clockMD();
		}

		//* support functions
			clockMD() {
				setInterval(() => {
					this.doMD = true;
				}, 1000);
			}
			drawBlock(block, image, ry, rx) {
				switch (block) {
					case 'i':
						ry += dim.cell / 2;
						rx -= dim.cell / 2;
						for (let n = 0; n < 4; n++)
							ctx.drawImage(image, rx + n * dim.cell, ry, dim.cell, dim.cell);
						break;
					case 'o':
						rx += dim.cell / 2;
						ctx.drawImage(image, rx, ry, dim.cell, dim.cell);
						ctx.drawImage(image, rx + dim.cell, ry, dim.cell, dim.cell);
						ctx.drawImage(image, rx, ry + dim.cell, dim.cell, dim.cell);
						ctx.drawImage(image, rx + dim.cell, ry + dim.cell, dim.cell, dim.cell);
						break;
					case 't':
						ctx.drawImage(image, rx + dim.cell, ry, dim.cell, dim.cell);
						ctx.drawImage(image, rx, ry + dim.cell, dim.cell, dim.cell);
						ctx.drawImage(image, rx + dim.cell, ry + dim.cell, dim.cell, dim.cell);
						ctx.drawImage(image, rx + dim.cell * 2, ry + dim.cell, dim.cell, dim.cell);
						break;
					case 's':
						ctx.drawImage(image, rx + dim.cell, ry, dim.cell, dim.cell);
						ctx.drawImage(image, rx + dim.cell * 2, ry, dim.cell, dim.cell);
						ctx.drawImage(image, rx, ry + dim.cell, dim.cell, dim.cell);
						ctx.drawImage(image, rx + dim.cell, ry + dim.cell, dim.cell, dim.cell);
						break;
					case 'z':
						ctx.drawImage(image, rx, ry, dim.cell, dim.cell);
						ctx.drawImage(image, rx + dim.cell, ry, dim.cell, dim.cell);
						ctx.drawImage(image, rx + dim.cell, ry + dim.cell, dim.cell, dim.cell);
						ctx.drawImage(image, rx + dim.cell * 2, ry + dim.cell, dim.cell, dim.cell);
						break;
					case 'j':
						ctx.drawImage(image, rx, ry, dim.cell, dim.cell);
						ctx.drawImage(image, rx, ry + dim.cell, dim.cell, dim.cell);
						ctx.drawImage(image, rx + dim.cell, ry + dim.cell, dim.cell, dim.cell);
						ctx.drawImage(image, rx + dim.cell * 2, ry + dim.cell, dim.cell, dim.cell);
						break;
					case 'l':
						ctx.drawImage(image, rx + dim.cell * 2, ry, dim.cell, dim.cell);
						ctx.drawImage(image, rx, ry + dim.cell, dim.cell, dim.cell);
						ctx.drawImage(image, rx + dim.cell, ry + dim.cell, dim.cell, dim.cell);
						ctx.drawImage(image, rx + dim.cell * 2, ry + dim.cell, dim.cell, dim.cell);
						break;
				}
			}
			moveDown(usermade = false) {
				if (usermade || this.doMD) {
					this.mBlocks.forEach(block => {
						if (block.y == dim.y - 1 || this.grid[parseInt(block.y) + 1][block.x].state == 'f') {
							this.bottom = true;
						}
					});
					if (this.bottom) {
						this.mBlocks.forEach(block => {
							this.grid[block.y][block.x].state = 'f';
							this.grid[block.y][block.x].color = block.color;
						});
					}
					else {
						this.cornerCoord.y++;
						this.mBlocks.forEach(block => {
							block.y++;
						});
					}
				}
				if (this.doMD) {
					this.doMD = false;
				}
			}
			rotate(direction) { //todo: add T-Spin detection and fix bugs
				if (this.mBlocks[0].color == 'o') return
				let rotation;
				if (direction == 'cw') rotation = (this.rotState + 5) % 4;
				if (direction == 'ccw') rotation = (this.rotState + 3) % 4;
				let tempBlocks = new Array(4);
				for (let i = 0; i < 4; i++) {
					tempBlocks[i] = {y: this.mBlocks[i].y, x: this.mBlocks[i].x}
				}
				let blockC = 0, legit = true, cx, cy;

				//*  test basic rotation
				for (let y = 0; y < 4; y++) { 
					for (let x = 0; x < 4; x++) {
						if (blockC < 4 && basicRot[this.mBlocks[0].color][rotation][y][x] == 1) {
							cx = this.cornerCoord.x + x;
							cy = this.cornerCoord.y + y;
							this.mBlocks[blockC].x = cx;
							this.mBlocks[blockC].y = cy;
							blockC++;
							if (cx >= dim.x || cx < 0 || cy >= dim.y || cy < 0 || this.grid[cy][cx].state == 'f') {
								legit = false;
							}
						}
					}
				}
				//* test kicks
				if (!legit) {
					let ky, kx, type = (this.mBlocks[0].color == 'i')? 'i' : 'a';
					for (let trial = 0; trial < 4; trial++) {
						legit = true;
						ky = kicks[type][this.rotState][direction][trial].y * -1;
						kx = kicks[type][this.rotState][direction][trial].x;
						for (blockC = 0; blockC < 4; blockC++) {
							cx = this.mBlocks[blockC].x;
							cy = this.mBlocks[blockC].y;
							if (cx + kx >= dim.x || cx + kx < 0 || cy + ky >= dim.y || cy + ky < 0 || this.grid[cy + ky][cx + kx].state == 'f') {
								legit = false;
								break;
							}
						}
						if (legit) {
							this.mBlocks.forEach(block => {
								block.x += kx;
								block.y += ky;
							});
							this.cornerCoord.x += kx;
							this.cornerCoord.y += ky;
							break;
						}
					}
				}
				
				//* if correct, change rotation state
				if (legit) {
					if (direction == 'cw') this.rotState = (this.rotState + 5) % 4;
					if (direction == 'ccw') this.rotState = (this.rotState + 3) % 4;
				}
				else { //* if not, restore old state
					for (let i = 0; i < 4; i++) {
						this.mBlocks[i].y = tempBlocks[i].y;
						this.mBlocks[i].x = tempBlocks[i].x;
					}
				}
			}

		//* gamecycle functions
			ghostPiece() {
				for (let i = 0; i < 4; i++) {
					this.pBlocks[i].y = this.mBlocks[i].y;
					this.pBlocks[i].x = this.mBlocks[i].x;
					this.pBlocks[i].color = this.mBlocks[i].color;
					this.pBlocks[i].state = 'p';
				}
				let bottom = false;
				do {
					this.pBlocks.forEach(block => {
						if (block.y == dim.y - 1 || this.grid[parseInt(block.y) + 1][block.x].state == 'f') {
							bottom = true;
						}
					});
					this.pBlocks.forEach(block => {
						block.y++;
					});
				} while (!bottom);
				this.pBlocks.forEach(block => {
					block.y--;
				});
			}
			removeLine() {
				let remove;
				let lines = 0;
				for (let y = dim.y - 1; y >= 0; y--) {
					remove = true;
					this.grid[y].forEach(cell => {
						if (cell.state != 'f') {
							remove = false;
						}
					});
					if (remove) {
						for (let i = y; i > 0; i--) {
							for (let x = 0; x < dim.x; x++) {
								this.grid[i][x].state = this.grid[i-1][x].state;
								this.grid[i][x].color = this.grid[i-1][x].color;
								this.grid[i-1][x].state = '';
								this.grid[i-1][x].color = '';
							}
						}
						y++;
						lines++;
					}
				}
				this.lines += lines;
				this.lValue += lines * 2 - 1;
				if (lines == 4)
					this.lValue++;
				if (this.lValue >= this.level * 5) {
					this.level++;
					this.lValue = 0;
				}
			}
			newBlock(color) {
				this.bottom = false;
				color = '' + color;
				let newblock;
				switch (color) {
					case 'i':
						newblock = '13141516'; break;
					case 'o':
						newblock = '04051415'; break;
					case 't':
						newblock = '04131415'; break;
					case 's':
						newblock = '04051314'; break;
					case 'z':
						newblock = '03041415'; break;
					case 'j':
						newblock = '03131415'; break;
					case 'l':
						newblock = '05131415'; break;
				}				
				this.mBlocks.forEach(block => {
					let y = newblock.charAt(0);
					let x = newblock.charAt(1);
					newblock = newblock.substring(2);
					if (this.grid[y][x].state == 'f') {
						this.gameover = true;
					}
					else {
						block.y = y;
						block.x = x;
						block.color = color;
					}
				});
				this.cornerCoord.x = 3;
				this.cornerCoord.y = 0;
				this.pBlocks.forEach(block => {
					block.color = color;
				});
				if (this.pieceq.length < 5) {
					this.pieceq = this.pieceq.concat(generateBag());
				}
				this.ghostPiece();
			}
			move() {
				let is_moved = false;
				if (move != '') {
					let legit = true;
					switch (move) {
						case 'left':
							this.mBlocks.forEach(block => {
								if (block.x == 0 || this.grid[block.y][block.x - 1].state == 'f') {
									legit = false;
								}
							});
							if (legit) {
								this.cornerCoord.x--;
								this.mBlocks.forEach(block => {
									block.x--;
								});
								is_moved = true;
							}
							break;
						case 'right':
							this.mBlocks.forEach(block => {
								if (block.x == dim.x - 1 || this.grid[block.y][parseInt(block.x) + 1].state == 'f') {
									legit = false;
								}
							});
							if (legit) {
								this.cornerCoord.x++;
								this.mBlocks.forEach(block => {
									block.x++;
								});
								is_moved = true;
							}
							break;
						case 'sd':
							this.moveDown(true);
							break;
						case 'hd':
							do {
								this.moveDown(true);
							} while (!this.bottom);
							break;
						case 'hold':
							if (this.canHold) {
								let newblock = this.hold;
								this.hold = this.mBlocks[0].color;
								if (newblock)
									this.newBlock(newblock);
								else
									this.newBlock('' + this.pieceq[0]);
								is_moved = true;
								this.canHold = false;
							}
							break;
						case 'cwRot':
							this.rotate('cw');
							is_moved = true;
							break;
						case 'ccwRot':
							this.rotate('ccw');
							is_moved = true;
							break;
					}
					move = '';
				}
				return is_moved;
			}

		//* frontend
			frontEnd() {
				ctx.lineWidth = '2';
				ctx.strokeStyle = '#aaa';
				ctx.fillStyle = '#000';
				ctx.font = "42px arial";

				//* main rect
					ctx.rect(fe_rect.p.x - fe_rect.offset, fe_rect.p.y - fe_rect.offset,
							fe_rect.dimX + fe_rect.offset * 2, fe_rect.dimY + fe_rect.offset * 2);

				//* left rect
					ctx.rect(fe_gui.l.x, fe_gui.l.y, fe_gui.dimX, fe_gui.dimY);
					
				//* right rect
					ctx.rect(fe_gui.r.x, fe_gui.r.y, fe_gui.dimX, fe_gui.dimY);

				ctx.fill(); ctx.stroke();
				
				//* preview
					let image;
					for (let i = 0; i < 5; i++) {
						image = new Image(dim.cell, dim.cell); 
						image.src = 'texture/' + texture + this.pieceq[i] + '.png';
						image.onload = this.drawBlock('' + this.pieceq[i], image, fe_gui.r.y + 3 * dim.cell * (i + 1), fe_gui.r.x + dim.cell);
					}

				//* hold
					if (this.hold) {
						image = new Image(dim.cell, dim.cell); 
						image.src = 'texture/' + texture + this.hold + '.png';
						image.onload = this.drawBlock(this.hold, image, fe_gui.l.y + 3 * dim.cell, fe_gui.l.x + dim.cell);
					}
				
				//* draw blocks
				this.grid.forEach(row => {
					row.forEach(cell => {
						cell.draw();
					});
				});
				this.mBlocks.forEach(block => {
					block.draw();
				});
				this.pBlocks.forEach(block => {
					block.draw();
				});
			}

		//* gamecycle
			gameCycle() {
				let is_moved = this.move();
				this.moveDown();
				if (this.bottom) {
					this.canHold = true;
					this.removeLine();
					this.newBlock(this.pieceq.splice(0, 1));
				}
				if (this.bottom || is_moved) {
					this.ghostPiece();
				}
			}
	}
	function animate() {
		requestAnimationFrame(animate);
		//ctx.clearRect(0,0, innerWidth, innerHeight);
		game.frontEnd();
		if (!game.gameover && !game.pause) {
			game.gameCycle();
		}
	}

	//*frontend
	let canvas = document.querySelector("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	let ctx = canvas.getContext("2d");
	const dim = {y: 20, x: 10, cell: 30};
	const blocks = { i: '#0dd', o: '#bb0', t: '#c0c', s: '#0f0', z: '#f00', j: '#33f', l: '#fc8003' };
	const fe_center = new Coord(canvas.height / 2, canvas.width / 2 );
	const fe_rect = {p: new Coord(fe_center.y - (dim.y / 2) * dim.cell, fe_center.x - (dim.x / 2) * dim.cell ),
					dimY: dim.y * dim.cell,
					dimX: dim.x * dim.cell,
					offset: 1};
	const fe_gui = {l: new Coord(fe_rect.p.y + dim.cell, fe_rect.p.x - 7 * dim.cell),
					r: new Coord(fe_rect.p.y + dim.cell, fe_rect.p.x + fe_rect.dimX + 2 * dim.cell),
					dimY: 18 * dim.cell,
					dimX: 5 * dim.cell};
					
	//*game
	let texture = palettes[Math.floor(Math.random() * palettes.length)] + '/';
	let game = new Game();
	let move = '';
	animate();
}