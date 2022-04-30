const tankTypes = ['normal', 'rocket', 'minigun'];
const tank = {
	normal: {
		hp: 10,
		as: 1500,

		speed: 6,
		damage: 2,
		color: '#1f4d1a'
	},
	rocket: {
		hp: 10,
		as: 2500,

		speed: 2,
		damage: 5,
		color: 'red'
	},
	minigun: {
		hp: 20,
		as: 500,

		speed: 5,
		damage: 1,
		color: 'black'
	}
}
const player = {
	dim: {w: 60, h: 40, r: 70},
	barrLen: 120,
	maxhp: 100,
	maxsh: 10,
}
const fieldx = {
	min: (canvas.width - canvas.height) / 2,
	max: canvas.width - (canvas.width - canvas.height) / 2
}
const offset = 20;
const offsetPos = [
	{coord: new Coord(fieldx.min + offset, offset), rotateTo: [0, 270]}, //top-left
	{coord: new Coord(fieldx.max - offset, offset), rotateTo: [180, 270]}, //top-right
	{coord: new Coord(fieldx.max - offset, canvas.height - offset), rotateTo: [90, 180]}, //bottom-right
	{coord: new Coord(fieldx.min + offset, canvas.height - offset), rotateTo: [0, 90]}, //bottom-left
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