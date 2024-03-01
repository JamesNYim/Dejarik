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

	spawnBoundary(x, y, boardCoords) {
		var spaceBoundary = this.scene.add.rectangle(x, y, this.width, this.height)
		spaceBoundary.boardCoords = boardCoords
		this.scene.physics.world.enable(spaceBoundary)
		this.group.add(spaceBoundary)
	}

	spawnBoard() {
		var x = this.x
		var y = this.y
		var xCoord = 0
		var yCoord = 0
		for (var i = 1; i <= 25; i++) {
			var boardCoords = [xCoord, yCoord]
			this.spawnBoundary(x, y, boardCoords)
			if (i % 5 == 0) {
				y += this.height + 6
				x = this.x
				yCoord += 1
			}
			else {
				x += this.width + 6
				xCoord += 1
			}
			
		}
	}
}