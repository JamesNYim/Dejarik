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
	}

	getPieces() {
		return this.pieces
	}

	addPiece(piece) {
		if (!this.pieces.includes(piece)) {
			this.pieces.push(piece)
			console.log(`Added ${piece.name} to space at ${this.boardCoords}`);
		}
	}

	removePiece(piece) {
		this.pieces = this.pieces.filter(p => p !== piece)
		console.log(`Removed ${piece.name} from ${this.boardCoords}. Remaining Pieces:`, this.pieces.map(p=>p.name))
	}


}