class Space extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture, frame, width, height, spaceGroup, boardCoords) {
		super(scene,x, y, texture, frame)
		this.scene = scene
		this.x = x
		this.y = y
		this.width = width
		this.height = height
		this.boardCoords = boardCoords
		this.group = spaceGroup
		this.pieces = []
		this.scene.physics.world.enable(this)
		this.group.add(this)
		console.log(this)
	}

	getPieces() {
		return this.pieces
	}

	addPiece(piece) {
		this.pieces.push(piece)
	}
}