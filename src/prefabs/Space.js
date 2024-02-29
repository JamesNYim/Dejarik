class Space extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture, frame, width, height, spaceGroup) {
		super(scene,x, y, texture, frame)
		this.scene = scene
		this.x = x
		this.y = y
		this.width = width
		this.height = height
		this.group = spaceGroup

		var spaceBoundary = this.scene.add.rectangle(this.x, this.y, this.width, this.height)
		this.scene.physics.world.enable(spaceBoundary)
		this.group.add(spaceBoundary)
		console.log("created space")
	}
}