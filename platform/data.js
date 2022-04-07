const block = [
	{
		name: 'air',
		solid: false,
		break: false
	},
	{
		name: 'dirt',
		solid: true,
		break: false
	},
	{
		name: 'wood',
		solid: true,
		break: true
	},
	{
		name: 'brick',
		solid: true,
		break: false
	},
	{
		name: 'ladder',
		solid: false,
		break: false
	},
	{
		name: 'bag_of_coin',
		solid: false,
		break: false
	},
	{
		name: 'box_of_ammo',
		solid: false,
		break: false
	},
]
const weapon = {
	knife: {
		damage: 10,
		magazine: null,
		maxAmmo: null,
		range: 1
	},
	glock: {
		damage: 3,
		magazine: 10,
		maxAmmo: 40,
		range: 6
	},
	sniper: {
		damage: 3,
		magazine: 2,
		maxAmmo: 8,
		range: 8
	}
}
const enemy = {
	hunter: {
		hp: 10,
		weapon: 'knife'
	},
	killer: {
		hp: 4,
		weapon: 'glock'
	},
	sniper: {
		hp: 2,
		weapon: 'sniper'
	}
}