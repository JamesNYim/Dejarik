class Space extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture, frame, width, height, spaceGroup) {
		super(scene,x, y, texture, frame)
		this.scene = scene
		this.x = x
		this.y = y
		this.width = width
		this.height = height
		this.group = spaceGroup

		
		
	}

	spawnBoundary(x, y) {
		var spaceBoundary = this.scene.add.rectangle(x, y, this.width, this.height)
		this.scene.physics.world.enable(spaceBoundary)
		this.group.add(spaceBoundary)
		console.log("created space")
	}

	spawnBoard() {
		var x = this.x
		var y = this.y
		for (var i = 1; i <= 25; i++) {
			this.spawnBoundary(x, y)
			if (i % 5 == 0) {
				y += this.height + 6
				x = this.x
			}
			else {
				x += this.width + 6
			}
			
		}
	}
}