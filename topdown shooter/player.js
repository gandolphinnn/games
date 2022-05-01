class Player extends RigidRect{
	constructor() {
		//* graphic attributes
		super(new Coord(canvas.width/2, canvas.height/2), 0, 200, 200);
	}
	draw() {
		super.calcCorners();
		super.showHitbox();
	}
}