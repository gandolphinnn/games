class Coord {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	set(newx, newy) {
		this.x = newx;
		this.y = newy;
	}
	add(addx, addy) {
		this.x += addx;
		this.y += addy;
	}
}
function addCoord(coord, addx, addy) {
	return new Coord(coord.x + addx, coord.y + addy);
}
let tank = {
	normal: {
		hp: 10,
		speed: 4,
		damage: 1,
		as: 1500
	},
	rocket: {
		hp: 10,
		speed: 2,
		damage: 1,
		as: 2500
	}
}
const player = {
	dim: {w: 60, h: 40, r: 70},
	barrLen: 120,
	maxhp: 100,
	maxsh: 100,
}
const fieldx = {
	min: (canvas.width - canvas.height) / 2,
	max: canvas.width - (canvas.width - canvas.height) / 2
}
const offset = 10;
const cornerPos = [
	{coord: new Coord(fieldx.min + offset, offset), rotateTo: [0, 270]},
	{coord: new Coord(fieldx.max - offset, offset), rotateTo: [180, 270]},
	{coord: new Coord(fieldx.max - offset, canvas.height - offset), rotateTo: [90, 180]},
	{coord: new Coord(fieldx.min + offset, canvas.height - offset), rotateTo: [0, 90]},
]
const spawnPos = [
	[{coord: new Coord(fieldx.min, offset), degr: 0, multX: -1, multY: 1}, //top-left (left)
	{coord: new Coord(fieldx.min + offset, 0), degr: 270, multX: 1, multY: -1}], //top-left (top)

	[{coord: new Coord(fieldx.max - offset, 0), degr: 270, multX: -1, multY: -1}, //top-right (top)
	{coord: new Coord(fieldx.max, offset), degr: 180, multX: 1, multY: 1}], //top-right (right) 

	[{coord: new Coord(fieldx.max, canvas.height - offset), degr: 180, multX: 1, multY: -1}, //bottom-right (right)
	{coord: new Coord(fieldx.max - offset, canvas.height), degr: 90, multX: -1, multY: 1}], //bottom-right (bottom)

	[{coord: new Coord(fieldx.min + offset, canvas.height), degr: 90, multX: 1, multY: 1}, //bottom-left (bottom)
	{coord: new Coord(fieldx.min, canvas.height - offset), degr: 0, multX: -1, multY: -1}], //bottom-left (left)
]