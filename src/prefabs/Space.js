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
		return this.pieces;
	}

	addPiece(piece) {
		if (!this.pieces.includes(piece)) {
			this.pieces.push(piece)
			console.log(`Added ${piece.name} to space at ${this.boardCoords}`);
		}
		return;
	}

	removePiece(piece) {
		this.pieces = this.pieces.filter(p => p !== piece)
		console.log(`Removed ${piece.name} from ${this.boardCoords}. Remaining Pieces:`, this.pieces.map(p=>p.name));
		return;
	}

	isOccupiedByMultiplePieces() {
		console.log(this.pieces.length)
		return this.pieces.length > 1;
	}

	resolveSpaceConflict() {
		let pieces = this.getPieces();
		if (pieces.length === 2) {
			let newX1 = this.x; // Position for first piece
        	let newX2 = this.x + this.width - 32; // Position for second piece
			let newY1 = this.y
			let newY2 = this.y + this.height - 32;

			this.scene.tweens.add({
				targets: pieces[0],
				x: newX1,
				y: newY1,
				ease: 'Power1',
				duration: 1000,
				onComplete: () => {
					pieces[0].originalX = newX1;
					pieces[0].originalY = newY1;
				}
			});
	
			this.scene.tweens.add({
				targets: pieces[1],
				x: newX2,
				y: newY2,
				ease: 'Power1',
				duration: 1000,
				onComplete: () => {
					pieces[1].originalX = newX2;
					pieces[1].originalY = newY2;
				}
			});
		}

		
	}


}